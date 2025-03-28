import { Badge } from './badge'
import { BadgeSearchOptions } from './badge-search-options'
import { GameMap } from './game-map'
import { Paged } from './paged'

export class BadgeIndex {
  readonly #badges: Badge[] = []
  readonly #badgeIndex: Record<string, Badge> = {}

  readonly #mapOrder: Record<string, number> = {}

  constructor(badges: Badge[], maps?: GameMap[]) {
    this.#mapOrder = Object.fromEntries(
      maps
        ?.sort((a, b) => a.name.localeCompare(b.name))
        ?.map((x, index) => [x.key, index]) ?? [],
    )

    this.#badges = badges
    for (const badge of badges) {
      if (this.#badgeIndex[badge.key] !== undefined) throw new Error(`Duplicate badge key [${badge.key}]`)
      this.#badgeIndex[badge.key] = badge
    }
  }

  getBadge(key: string): Badge {
    const result = this.#badgeIndex[key]
    if (result === undefined) throw new Error(`Unknown badge key [${key}]`)
    return result
  }

  badgeExists(key: string): boolean {
    return !!this.#badgeIndex[key]
  }

  searchBadges(options?: BadgeSearchOptions): Paged<Badge> {
    const filtered = (options?.query || options?.filter)
      ? this.#badges.filter(badge => this.#satisfiesQueryPredicate(badge, options?.query) && this.#satisfiesFilterPredicate(badge, options?.filter))
      : this.#badges

    const paged = options?.pageSize ? filtered.slice(((options?.page ?? 1) - 1) * options.pageSize, (options?.page ?? 1) * options?.pageSize) : filtered

    const sorted = this.#sort(paged, options?.sort)

    return {
      items: sorted,
      page: options?.page ?? 1,
      pageSize: options?.pageSize,
      totalItems: filtered.length,
      totalPages: options?.pageSize ? Math.ceil(filtered.length / (options?.pageSize)) : 1,
    }
  }

  #satisfiesQueryPredicate(badge: Badge, query?: BadgeSearchOptions['query']): boolean {
    const queryString = query?.str?.toLowerCase() ?? ''
    return !!(((query?.on?.name ?? true) && badge.name.canonical.some(x => x.value.toLowerCase().includes(queryString)))
      || (query?.on?.badgeText && badge.badgeText.canonical.some(x => x.value.toLowerCase().includes(queryString)))
      || (query?.on?.acquisition && badge.acquisition?.toLowerCase().includes(queryString))
      || (query?.on?.effect && badge.effect?.toLowerCase().includes(queryString))
      || (query?.on?.notes && badge.notes?.toLowerCase().includes(queryString))
      || (query?.on?.setTitle && (badge.setTitle?.id?.toString().includes(queryString) || badge.setTitle?.praetorianId?.toString().includes(queryString))))
  }

  #satisfiesFilterPredicate(badge: Badge, filter?: BadgeSearchOptions['filter']): boolean {
    return (!filter?.type || badge.type === filter.type)
      && (!filter?.mapKey || badge.mapKey === filter.mapKey)
      && (!filter?.alignment || badge.alignment.items.includes(filter.alignment))
  }

  #sort(badges: Badge[], sort?: BadgeSearchOptions['sort']): Badge[] {
    if (!sort) return badges
    const ascending = sort.dir !== 'DESC'

    if (!sort.by || sort.by === 'CANONICAL') return sort.dir === 'DESC' ? badges.reverse() : badges

    if (sort.by === 'BADGE_NAME') return ascending
      ? badges.sort((a, b) => a.name.default?.value.localeCompare(b.name.default?.value ?? '') ?? 0)
      : badges.sort((a, b) => b.name.default?.value.localeCompare(a.name.default?.value ?? '') ?? 0)

    return badges.sort((a, b) => {
      const aIndex = this.#mapOrder[a.mapKey ?? '']
      const bIndex = this.#mapOrder[b.mapKey ?? '']

      if (aIndex === bIndex) return 0
      if (aIndex === undefined) return ascending ? 1 : -1
      if (bIndex === undefined) return ascending ? -1 : 1

      return ascending ? aIndex - bIndex : bIndex - aIndex
    })
  }
}
