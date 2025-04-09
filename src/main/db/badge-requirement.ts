import { BadgeRequirementData } from '../api/badge-requirement-data'
import { BadgeRequirementType } from '../api/badge-requirement-type'
import { EnhancementCategory } from '../api/enhancement-category'
import { Key } from './key'
import { MarkdownString } from '../api/markdown-string'
import { Link } from '../api/link'
import { Location } from './location'
import { coalesceToArray } from '../util'

export class BadgeRequirement {
  /**
   * Unique key used to reference this badge requirement.
   *
   * Keys must be unique and can only contain lowercase letters, numbers and hyphens (`-`).
   */
  readonly key: string

  /**
   * The requirement type.
   */
  readonly type: BadgeRequirementType

  /**
   * If the requirement involves a location, where it is.
   */
  readonly location?: Location[]

  /**
   * If the requirement involves a badge, the badge key.
   */
  readonly badgeKey?: string

  /**
   * If the requirement involves a mission, the mission key.
   */
  readonly missionKey?: string

  /**
   * If this requirement appears as an icon on a Vidiot Map, the number or letter of the icon.
   */
  readonly vidiotMapKey?: string

  /**
   * If the requirement involves a plaque or pedestal, the text that is displayed thereon.
   */
  readonly monumentText?: string

  /**
   * If the requirement involves crafting an invention, the Level of the invention required.
   */
  readonly inventionLevel?: number

  /**
   * If the requirement involves crafting an invention, the types of enhancements that will qualify.
   */
  readonly inventionTypes?: EnhancementCategory[]

  /**
   * Number of times the task needs to be repeated.
   */
  readonly count?: number

  /**
   * Additional information about the requirement.
   */
  readonly notes?: MarkdownString

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links: Link[]

  constructor(data: BadgeRequirementData) {
    this.key = new Key(data.key).value
    this.type = data.type
    this.location = coalesceToArray(data.location)
    this.badgeKey = data.badgeKey
    this.missionKey = data.missionKey
    this.vidiotMapKey = data.vidiotMapKey
    this.monumentText = data.monumentText
    this.inventionLevel = data.inventionLevel
    this.inventionTypes = data.inventionTypes
    this.count = data.count
    this.notes = data.notes
    this.links = data.links ?? []
  }
}
