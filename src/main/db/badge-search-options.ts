import { BadgeType } from '../api/badge-type'
import { Alignment } from '../api/alignment'

export interface BadgeSearchOptions {

  /**
   * Text-based search.
   *
   * Case-insensitive. Defaults to searching on name only.
   */
  query?: {
    str?: string
    on?: {
      name?: boolean
      badgeText?: boolean
      acquisition?: boolean
      notes?: boolean
      effect?: boolean
      setTitle?: boolean
    }
  }

  /**
   * Filter results matching the given values.
   */
  filter?: {
    type?: BadgeType
    mapKey?: string
    alignment?: Alignment
  }

  /**
   * Sort results.
   *
   * Badges are assumed to be in canonical order in the content bundle, and should match the in-game display order.
   */
  sort?: {
    by?: 'CANONICAL' | 'BADGE_NAME' | 'MAP_NAME'
    dir?: 'ASC' | 'DESC'
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
