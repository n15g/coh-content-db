import { Badge, compareByDefaultName, compareByZoneKey } from './badge'
import { BadgeSearchOptions } from './badge-search-options'
import { Paged } from './paged'

export class BadgeIndex {
  readonly #badges: Badge[] = []
  readonly #badgeIndex: Record<string, Badge> = {}

  constructor(badges: Badge[]) {
    this.#badges = badges
    for (const badge of badges) {
      if (this.#badgeIndex[badge.key] !== undefined) throw new Error(`Duplicate badge key [${badge.key}]`)
      this.#badgeIndex[badge.key] = badge
    }
  }

  getBadge(key?: string): Badge | undefined {
    if (!key) return undefined
    return this.#badgeIndex[key]
  }

  searchBadges(options?: BadgeSearchOptions): Paged<Badge> {
    const filtered = (options?.query || options?.filter)
      ? this.#badges.filter(badge => this.#satisfiesQueryPredicate(badge, options?.query) && this.#satisfiesFilterPredicate(badge, options?.filter))
      : this.#badges

    const totalPages = options?.pageSize ? Math.ceil(filtered.length / (options?.pageSize)) : 1
    const page = Math.max(1, Math.min(totalPages, options?.page ?? 1))
    const paged = options?.pageSize ? filtered.slice((page - 1) * options.pageSize, page * options?.pageSize) : filtered

    const sorted = this.#sort(paged, options?.sort)

    return {
      items: sorted,
      page: page,
      pageSize: options?.pageSize,
      totalItems: filtered.length,
      totalPages: totalPages,
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
      && (!filter?.zoneKey || badge.zoneKey === filter.zoneKey)
      && (!filter?.alignment || badge.alignment.items.includes(filter.alignment))
  }

  #sort(badges: Badge[], sort?: BadgeSearchOptions['sort']): Badge[] {
    if (!sort) return badges
    const ascending = sort.dir !== 'DESC'

    if (sort.by === 'BADGE_NAME') return badges.sort((a, b) => ascending ? compareByDefaultName(a, b) : compareByDefaultName(b, a))

    if (sort.by === 'ZONE_KEY') return badges.sort((a, b) => ascending ? compareByZoneKey(a, b) : compareByZoneKey(b, a))

    return sort.dir === 'DESC' ? badges.reverse() : badges
  }
}
