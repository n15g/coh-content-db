import { EnhancementCategory } from './enhancement-category'
import { BadgePartialType } from './badge-partial-type'
import { PlaqueType } from './plaque-type'

export interface BadgePartialData {
  /**
   * Key.
   */
  readonly key: string

  /**
   * Type of partial.
   */
  readonly type: BadgePartialType

  /**
   * Map the partial is located on.
   */
  readonly mapKey?: string

  /**
   * /loc coordinates.
   */
  readonly loc?: number[]

  /**
   * Is it a wall plaque or a physical monument?
   */
  readonly plaqueType?: PlaqueType

  /**
   * Plaque inscription.
   */
  readonly inscription?: string

  /**
   * The number or letter the partial appears as on Vidiot Maps.
   */
  readonly vidiotMapKey?: string

  /**
   * The badge required for this partial.
   */
  readonly badgeKey?: string

  /**
   * Level of the invention required.
   */
  readonly inventionLevel?: number

  /**
   * The types of enhancements required to be crafted.
   */
  readonly inventionTypes?: EnhancementCategory[]

  /**
   * Number of invention crafts required.
   */
  readonly inventionCount?: number

  /**
   * Any additional notes.
   */
  readonly notes?: string
}
