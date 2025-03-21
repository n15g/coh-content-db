import { BadgeType } from '../api/badge-type'
import { Alignment } from '../api/alignment'
import { Link } from '../api/link'
import { BadgeData } from '../api/badge-data'
import { BadgePartial } from './badge-partial'
import { Key } from './key'
import { Alternates } from './alternates'

export class Badge {
  readonly #partialsIndex: Record<string, BadgePartial> = {}

  /**
   * The database key for this badge.
   */
  readonly key: string

  /**
   * The type of badge.
   */
  readonly type: BadgeType | string

  /**
   * The name of this badge.
   *
   * May vary by character sex or alignment.
   */
  readonly name: Alternates<string>

  /**
   * The character alignments that this badge is available to.
   */
  readonly alignment: Alignment[]

  /**
   * The badge text as it appears in-game. May vary by character sex or alignment.
   */
  readonly badgeText: Alternates<string>

  /**
   * Description of how to acquire the badge.
   *
   * Supports {@link https://www.markdownguide.org/|Markdown} format.
   */
  readonly acquisition?: string

  /**
   * Absolute URL to this badge's icon.
   *
   * May vary by character sex or alignment.
   */
  readonly icon: Alternates<string>

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
   * For exploration badges, the key of the {@link GameMap} that this badge is found on.
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
  readonly partials?: BadgePartial[]

  /**
   * Some badges are not included in the badge total count... such as Flames of Prometheus, which can be removed by redeeming it for a Notice of the Well.
   */
  readonly ignoreInTotals: boolean

  constructor(data: BadgeData) {
    this.key = new Key(data.key).value
    this.type = data.type
    this.name = new Alternates(data.name)
    this.alignment = data.alignment
    this.badgeText = new Alternates(data.badgeText ?? [])
    this.acquisition = data.acquisition
    this.icon = new Alternates(data.icon ?? [])
    this.notes = data.notes
    this.links = data.links
    this.mapKey = data.mapKey
    this.loc = data.loc
    this.effect = data.effect
    this.vidiotMapKey = data.vidiotMapKey
    this.setTitle = data.setTitle
    this.ignoreInTotals = data.ignoreInTotals ?? false

    this.partials = data.partials?.map((data) => {
      if (this.#partialsIndex[data.key] !== undefined) throw new Error(`Duplicate badge partial key [${data.key}]`)
      const badge = new BadgePartial(data)
      this.#partialsIndex[badge.key] = badge
      return badge
    })
  }

  getPartial(key: string): BadgePartial {
    const result = this.#partialsIndex[key]
    if (result === undefined) throw new Error(`Unknown badge partial key [${key}]`)
    return result
  }
}
