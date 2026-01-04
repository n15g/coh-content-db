import { Badge, compareByName, compareByReleaseDate, compareByZoneKey } from './badge'
import { BadgeSearchOptions } from './badge-search-options'
import { Paged } from './paged'
import { AbstractIndex } from './abstract-index'

export class BadgeIndex extends AbstractIndex<Badge> {
  constructor(values: Badge[] | undefined) {
    super('key', values)
  }

  search(options?: BadgeSearchOptions): Paged<Badge> {
    const matched = (options?.query || options?.filter)
      ? this._values.filter(badge => this.#satisfiesQueryPredicate(badge, options?.query) && this.#satisfiesFilterPredicate(badge, options?.filter))
      : this._values

    const sorted = this.#sort(matched, options)

    const totalPages = options?.pageSize ? Math.ceil(matched.length / (options?.pageSize)) : 1
    const pageNumber = Math.max(1, Math.min(totalPages, options?.page ?? 1))
    const items = options?.pageSize ? sorted.slice((pageNumber - 1) * options.pageSize, pageNumber * options?.pageSize) : sorted

    return {
      items: items,
      pageIndex: pageNumber - 1,
      pageNumber: pageNumber,
      pageSize: options?.pageSize,
      matchedItemCount: matched.length,
      totalItemCount: this._values.length,
      totalPageCount: totalPages,
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
      || (fields.has('set-title-id') && (badge.setTitleId?.primal.toString() === queryString))
      || (fields.has('set-title-id') && (badge.setTitleId?.praetorian?.toString() === queryString))
    )
  }

  #satisfiesFilterPredicate(badge: Badge, filter?: BadgeSearchOptions['filter']): boolean {
    return (!filter?.type || badge.type === filter.type)
      && (!filter?.zoneKey || badge.zoneKey === filter.zoneKey)
      && (!filter?.morality || badge.morality.has(filter.morality))
      && (!filter?.predicate || filter.predicate(badge))
  }

  #sort(badges: Badge[], options?: BadgeSearchOptions): Badge[] {
    switch (options?.sort) {
      case 'name.asc': {
        return badges.toSorted((a, b) => compareByName(a, b, options.variantContext))
      }
      case 'name.desc': {
        return badges.toSorted((a, b) => compareByName(b, a, options.variantContext))
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
