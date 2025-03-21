import { Badge } from './badge'
import { BadgeSearchOptions } from './badge-search-options'
import { GameMap } from './game-map'
import { SearchResults } from './search-results'

export class BadgeIndex {
  readonly #badges: Badge[] = []
  readonly #badgeIndex: Record<string, Badge> = {}

  readonly mapOrder: Record<string, number> = {}

  constructor(badges: Badge[], maps?: GameMap[]) {
    this.mapOrder = Object.fromEntries(
      maps
        ?.sort((a, b) => a.name.localeCompare(b.name))
        ?.map((x, index) => [x.name, index]) ?? [],
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

  searchBadges(options?: BadgeSearchOptions): SearchResults<Badge> {
    const filtered = (options?.query || options?.filter)
      ? this.#badges.filter(badge => satisfiesQueryPredicate(badge, options?.query))
      : this.#badges

    const paged = options?.pageSize ? filtered.slice(options?.pageIndex ?? 0, ((options?.pageIndex ?? 0) + 1) * options?.pageSize) : filtered

    return {
      value: paged,
      pageIndex: options?.pageIndex ?? 0,
      pageSize: options?.pageSize,
      total: filtered.length,
    }
  }
}

function satisfiesQueryPredicate(badge: Badge, query?: BadgeSearchOptions['query']): boolean {
  const queryString = query?.str?.toLowerCase() ?? ''
  return !!(((query?.on?.name ?? true) && badge.name.canonical.some(x => x.value.toLowerCase().includes(queryString)))
    || (query?.on?.badgeText && badge.badgeText.canonical.some(x => x.value.toLowerCase().includes(queryString)))
    || (query?.on?.acquisition && badge.acquisition?.toLowerCase().includes(queryString))
    || (query?.on?.effect && badge.effect?.toLowerCase().includes(queryString))
    || (query?.on?.notes && badge.notes?.toLowerCase().includes(queryString))
    || (query?.on?.setTitle && (badge.setTitle?.id?.toString().includes(queryString) || badge.setTitle?.praetorianId?.toString().includes(queryString))))
}
