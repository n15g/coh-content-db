import { EnhancementCategory } from './enhancement-category'
import { BadgeRequirementType } from './badge-requirement-type'
import { MarkdownString } from './markdown-string'
import { Link } from './link'
import { LocationData } from './location-data'

export interface BadgeRequirementData {
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
  readonly location?: LocationData | LocationData[]

  /**
   * If the requirement involves a badge, the badge key.
   */
  readonly badgeKey?: string

  /**
   * If the requirement involves a mission, the mission key.
   */
  readonly missionKey?: string

  /**
   * If the requirement involves a monument, the text that is displayed thereon.
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
  readonly links?: Link[]
}
