import { BadgeRequirementData } from './badge-requirement-data'
import { Link } from './link'
import { BadgeType } from './badge-type'
import { AlternateData } from './alternate-data'
import { Alignment } from './alignment'
import { MarkdownString } from './markdown-string'

export interface BadgeData {

  /**
   * Unique key used to reference this badge.
   *
   * Keys can only contain lowercase letters, numbers and hyphens (`-`).
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
  readonly name: AlternateData<string>[]

  /**
   * The character alignments that this badge is available to.
   */
  readonly alignment: Alignment[]

  /**
   * The badge text as it appears in-game. May vary by character sex or alignment.
   */
  readonly badgeText?: AlternateData<string>[]

  /**
   * Description of how to acquire the badge.
   */
  readonly acquisition?: MarkdownString

  /**
   * List of absolute URLs for this badge's icons.
   *
   * If the value differs by sex or alignment, include an {@link AlternateData} for each variant.
   */
  readonly icon?: AlternateData<string>[]

  /**
   * Freeform notes or tips about the badge.
   */
  readonly notes?: MarkdownString

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links?: Link[]

  /**
   * For exploration badges, the key of the {@link ZoneData|Zone} that this badge is found on.
   */
  readonly zoneKey?: string

  /**
   * For exploration badges, the `/loc` coordinates of the badge.
   */
  readonly loc?: [number, number, number]

  /**
   * For plaques that appear on a Vidiot Map, the number or letter the badge appears as.
   */
  readonly vidiotMapKey?: string

  /**
   * ID used with the in-game `/settitle` command to apply the badge.
   */
  readonly setTitle?: {
    /**
     * `/settitle` id.
     */
    id?: number
    /**
     * `/settitle` id if different for praetorian characters.
     */
    praetorianId?: number
  }

  /**
   * A description of the effect the badge will have, such as a buff or granting a temporary power.
   */
  readonly effect?: MarkdownString

  /**
   * Represents the layered requirements for badges with multiple fulfillment steps,
   * such as visiting plaques for history badges or collecting other badges.
   *
   * The outer array represents groups of requirements evaluated with OR logic —
   * fulfilling any group satisfies the badge.
   *
   * Each inner array represents individual requirements evaluated with AND logic —
   * all conditions in the group must be met.
   */
  readonly requirements?: BadgeRequirementData[][]

  /**
   * Some badges are not included in the badge total count... such as Flames of Prometheus, which can be removed by redeeming it for a Notice of the Well.
   */
  readonly ignoreInTotals?: boolean
}
