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

    const sorted = this.#sort(filtered, options?.sort)

    const totalPages = options?.pageSize ? Math.ceil(filtered.length / (options?.pageSize)) : 1
    const page = Math.max(1, Math.min(totalPages, options?.page ?? 1))
    const paged = options?.pageSize ? sorted.slice((page - 1) * options.pageSize, page * options?.pageSize) : sorted

    return {
      items: paged,
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
    switch (sort) {
      case 'name.asc': {
        return badges.toSorted(compareByDefaultName)
      }
      case 'name.desc': {
        return badges.toSorted((a, b) => compareByDefaultName(b, a))
      }
      case 'zone-key.asc': {
        return badges.toSorted(compareByZoneKey)
      }
      case 'zone-key.desc': {
        return badges.toSorted((a, b) => compareByZoneKey(b, a))
      }
      case 'release-date.asc': {
        return badges.toSorted(compareByReleaseDate)
      }
      case 'release-date.desc': {
        return badges.toSorted((a, b) => compareByReleaseDate(b, a))
      }
      case 'canonical.desc': {
        return badges.toReversed()
      }
      default: {
        return [...badges]
      }
    }
  }
}
