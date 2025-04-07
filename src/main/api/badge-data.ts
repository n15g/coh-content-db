import { BadgeRequirementData } from './badge-requirement-data'
import { Link } from './link'
import { BadgeType } from './badge-type'
import { AlternateData } from './alternate-data'
import { MarkdownString } from './markdown-string'
import { MoralityExtended } from './morality'

export interface BadgeData {

  /**
   * Unique key used to reference this badge.
   *
   * Keys must be unique and can only contain lowercase letters, numbers and hyphens (`-`).
   */
  readonly key: string

  /**
   * The type of badge.
   */
  readonly type: BadgeType

  /**
   * The name of this badge.
   *
   * If the value differs by sex or alignment, include an {@link AlternateData} for each variant.
   */
  readonly name: string | AlternateData<string>[]

  /**
   * The {@link MoralityExtended|moralities} that this badge is available to. If undefined then all moralities will be assumed.
   */
  readonly morality?: MoralityExtended | MoralityExtended[]

  /**
   * The badge text as it appears in-game. May vary by character sex or alignment.
   */
  readonly badgeText?: AlternateData<MarkdownString>[] | MarkdownString

  /**
   * Short description of how to acquire the badge. Detailed instructions should go in the notes field.
   */
  readonly acquisition?: MarkdownString

  /**
   * List of absolute URLs for this badge's icons.
   *
   * If the value differs by sex or alignment, include an {@link AlternateData} for each variant.
   */
  readonly icon?: string | AlternateData<string>[]

  /**
   * Freeform notes or tips about the badge.
   */
  readonly notes?: MarkdownString

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links?: Link[]

  /**
   * For plaques that appear on a Vidiot Map, the number or letter the badge appears as.
   */
  readonly vidiotMapKey?: string

  /**
   * The id used with the in-game `/settitle` command to apply the badge.
   * The first value is the id for primal characters and the (optional) second number is the id for praetorian characters.
   */
  readonly setTitleId?: [number, number?]

  /**
   * A description of the effect the badge will have, such as a buff or granting a temporary power.
   */
  readonly effect?: MarkdownString

  /**
   * Represents the requirements for badges with multiple fulfillment steps, such as visiting plaques for history badges, completing missions, or collecting other badges.
   */
  readonly requirements?: BadgeRequirementData[]

  /**
   * Some badges are not included in the badge total count... such as Flames of Prometheus, which can be removed by redeeming it for a Notice of the Well.
   */
  readonly ignoreInTotals?: boolean
}
