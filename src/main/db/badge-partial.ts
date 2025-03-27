import { BadgePartialData } from '../api/badge-partial-data'
import { PlaqueType } from '../api/plaque-type'
import { BadgePartialType } from '../api/badge-partial-type'
import { EnhancementCategory } from '../api/enhancement-category'
import { Key } from './key'
import { MarkdownString } from '../api/markdown-string'

export class BadgePartial {
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
  readonly plaqueInscription?: string

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
  readonly notes?: MarkdownString

  constructor(data: BadgePartialData) {
    this.key = new Key(data.key).value
    this.type = data.type
    this.mapKey = data.mapKey
    this.loc = data.loc
    this.plaqueType = data.plaqueType
    this.plaqueInscription = data.plaqueInscription
    this.vidiotMapKey = data.vidiotMapKey
    this.badgeKey = data.badgeKey
    this.inventionLevel = data.inventionLevel
    this.inventionTypes = data.inventionTypes
    this.inventionCount = data.inventionCount
    this.notes = data.notes
  }
}
