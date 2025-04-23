import { Badge, compareByDefaultName, compareByReleaseDate, compareByZoneKey } from './badge'
import { BadgeSearchOptions } from './badge-search-options'
import { Paged } from './paged'
import { AbstractIndex } from './abstract-index'

export class BadgeIndex extends AbstractIndex<Badge> {
  constructor(values: Badge[] | undefined) {
    super('key', values)
  }

  search(options?: BadgeSearchOptions): Paged<Badge> {
    const filtered = (options?.query || options?.filter)
      ? this._values.filter(badge => this.#satisfiesQueryPredicate(badge, options?.query) && this.#satisfiesFilterPredicate(badge, options?.filter))
      : this._values

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
    const fields = query?.fields ? new Set(query?.fields) : new Set(['name']) // Default to name if not provided
    if (fields.size === 0) return true

    return !!((fields.has('name') && badge.name.canonical.some(x => x.value.toLowerCase().includes(queryString)))
      || (fields.has('badge-text') && badge.badgeText.canonical.some(x => x.value.toLowerCase().includes(queryString)))
      || (fields.has('acquisition') && badge.acquisition?.toLowerCase().includes(queryString))
      || (fields.has('effect') && badge.effect?.toLowerCase().includes(queryString))
      || (fields.has('notes') && badge.notes?.toLowerCase().includes(queryString))
      || (fields.has('set-title-id') && (badge.setTitleId?.some(x => x?.toString().includes(queryString)))))
  }

  #satisfiesFilterPredicate(badge: Badge, filter?: BadgeSearchOptions['filter']): boolean {
    return (!filter?.type || badge.type === filter.type)
      && (!filter?.zoneKey || badge.zoneKey === filter.zoneKey)
      && (!filter?.morality || badge.morality.has(filter.morality))
  }

  #sort(badges: Badge[], sort?: BadgeSearchOptions['sort']): Badge[] {
    if (!sort) return badges
    const ascending = sort.dir !== 'desc'

    if (sort.by === 'name') return badges.sort((a, b) => ascending ? compareByDefaultName(a, b) : compareByDefaultName(b, a))
    if (sort.by === 'zone-key') return badges.sort((a, b) => ascending ? compareByZoneKey(a, b) : compareByZoneKey(b, a))
    if (sort.by === 'release-date') return badges.sort((a, b) => ascending ? compareByReleaseDate(a, b) : compareByReleaseDate(b, a))

    return sort.dir === 'desc' ? badges.reverse() : badges
  }
}
