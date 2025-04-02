import { BadgeRequirementData } from '../api/badge-requirement-data'
import { PlaqueType } from '../api/plaque-type'
import { BadgeRequirementType } from '../api/badge-requirement-type'
import { EnhancementCategory } from '../api/enhancement-category'
import { Key } from './key'
import { MarkdownString } from '../api/markdown-string'
import { Link } from '../api/link'

export class BadgeRequirement {
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
   * Mission name.
   */
  readonly missionName?: string

  /**
   * {@link Contact} key for the requirement contact(s).
   */
  readonly contactKey?: string | string[]

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

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links: Link[]

  constructor(data: BadgeRequirementData) {
    this.key = new Key(data.key).value
    this.type = data.type
    this.zoneKey = data.zoneKey
    this.loc = data.loc
    this.plaqueType = data.plaqueType
    this.plaqueInscription = data.plaqueInscription
    this.vidiotMapKey = data.vidiotMapKey
    this.badgeKey = data.badgeKey
    this.missionName = data.missionName
    this.contactKey = data.contactKey
    this.inventionLevel = data.inventionLevel
    this.inventionTypes = data.inventionTypes
    this.inventionCount = data.inventionCount
    this.notes = data.notes
    this.links = data.links ?? []
  }
}
