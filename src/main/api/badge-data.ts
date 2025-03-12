import { BadgePartialData } from './badge-partial-data'
import { Link } from './link'
import { BadgeType } from './badge-type'
import { AlternateData } from './alternate-data'
import { Alignment } from './alignment'

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
  readonly type: BadgeType | string

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
   *
   * Supports {@link https://www.markdownguide.org/|Markdown} format.
   */
  readonly acquisition?: string

  /**
   * List of absolute URLs for this badge's icons.
   *
   * If the value differs by sex or alignment, include an {@link AlternateData} for each variant.
   */
  readonly icon?: AlternateData<string>[]

  /**
   * Freeform notes or tips about the badge.
   *
   * Supports {@link https://www.markdownguide.org/|Markdown} format.
   */
  readonly notes?: string

  /**
   * List of external links for this Badge. Wiki, forums, etc.
   */
  readonly links?: Link[]

  /**
   * For exploration badges, the key of the {@link GameMapData|GameMap} that this badge is found on.
   */
  readonly mapKey?: string

  /**
   * For exploration badges, the `/loc` coordinates of the badge on the in-game map.
   */
  readonly loc?: [number, number, number]

  /**
   * For badges that appear on a Vidiot Map, the number or letter the badge appears as.
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
   *
   * Supports {@link https://www.markdownguide.org/|Markdown} format.
   */
  readonly effect?: string

  /**
   * A list of requirements for badges that have partial fulfilment steps, such as visiting plaques for history badges, or collecting other badges for meta-badges like accolades.
   */
  readonly partials?: BadgePartialData[]

  /**
   * Some badges are not included in the badge total count... such as Flames of Prometheus, which can be removed by redeeming it for a Notice of the Well.
   */
  readonly ignoreInTotals?: boolean
}
