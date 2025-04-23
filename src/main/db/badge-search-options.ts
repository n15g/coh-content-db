import { BadgeType } from '../api/badge-type'
import { Morality } from '../api/morality'

export type BadgeQueryableField = 'name' | 'badge-text' | 'acquisition' | 'notes' | 'effect' | 'set-title-id'
export type BadgeSortableField = 'canonical' | 'name' | 'zone-key' | 'release-date'

export interface BadgeSearchOptions {

  /**
   * Text-based search.
   *
   * Case-insensitive. Defaults to searching on name only.
   */
  query?: {
    str?: string
    fields?: BadgeQueryableField[]
  }

  /**
   * Filter results matching the given values.
   */
  filter?: {
    type?: BadgeType
    zoneKey?: string
    morality?: Morality
  }

  /**
   * Sort results.
   *
   * Badges are assumed to be in canonical order in the content bundle, and should match the in-game display order.
   */
  sort?: {
    by?: BadgeSortableField
    dir?: 'asc' | 'desc'
  }

  /**
   * The page (1-based)
   */
  page?: number

  /**
   * How many results per page
   */
  pageSize?: number
}
