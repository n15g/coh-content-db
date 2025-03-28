import { EnhancementCategory } from './enhancement-category'
import { BadgeRequirementType } from './badge-requirement-type'
import { PlaqueType } from './plaque-type'
import { MarkdownString } from './markdown-string'

export interface BadgeRequirementData {
  /**
   * Key.
   */
  readonly key: string

  /**
   * Type of requirement.
   */
  readonly type: BadgeRequirementType

  /**
   * Zone the requirement is located in.
   */
  readonly zoneKey?: string

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
  readonly plaqueInscription?: string

  /**
   * The number or letter the plaque appears as on Vidiot Maps.
   */
  readonly vidiotMapKey?: string

  /**
   * The key of the badge for this requirement.
   */
  readonly badgeKey?: string

  /**
   * Story arc name.
   */
  readonly arcName?: string

  /**
   * Story arc contact name.
   */
  readonly arcContactName?: string

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
  readonly notes?: MarkdownString
}
