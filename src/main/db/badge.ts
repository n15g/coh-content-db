import { BadgeType } from '../api/badge-type'
import { Link } from '../api/link'
import { BadgeData } from '../api/badge-data'
import { BadgeRequirement } from './badge-requirement'
import { Key } from './key'
import { Alternates } from './alternates'
import { Alignments } from './alignments'
import { MarkdownString } from '../api/markdown-string'

export class Badge {
  readonly #requirementsIndex: Record<string, BadgeRequirement> = {}

  /**
   * The database key for this badge.
   */
  readonly key: string

  /**
   * The type of badge.
   */
  readonly type: BadgeType

  /**
   * The name of this badge.
   *
   * May vary by character sex or alignment.
   */
  readonly name: Alternates<string>

  /**
   * The character alignments that this badge is available to.
   */
  readonly alignment: Alignments

  /**
   * The badge text as it appears in-game. May vary by character sex or alignment.
   */
  readonly badgeText: Alternates<string>

  /**
   * Description of how to acquire the badge.
   */
  readonly acquisition?: MarkdownString

  /**
   * Absolute URL to this badge's icon.
   *
   * May vary by character sex or alignment.
   */
  readonly icon: Alternates<string>

  /**
   * Freeform notes or tips about the badge.
   */
  readonly notes?: MarkdownString

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links: Link[]

  /**
   * For exploration badges, the key of the {@link Zone} that this badge is found on.
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
  readonly requirements?: BadgeRequirement[][]

  /**
   * Some badges are not included in the badge total count... such as Flames of Prometheus, which can be removed by redeeming it for a Notice of the Well.
   */
  readonly ignoreInTotals: boolean

  constructor(badgeData: BadgeData) {
    this.key = new Key(badgeData.key).value
    this.type = badgeData.type
    this.name = new Alternates(badgeData.name)
    this.alignment = new Alignments(badgeData.alignment)
    this.badgeText = new Alternates(badgeData.badgeText ?? [])
    this.acquisition = badgeData.acquisition
    this.icon = new Alternates(badgeData.icon ?? [])
    this.notes = badgeData.notes
    this.links = badgeData.links ?? []
    this.zoneKey = badgeData.zoneKey
    this.loc = badgeData.loc
    this.effect = badgeData.effect
    this.vidiotMapKey = badgeData.vidiotMapKey
    this.setTitle = badgeData.setTitle
    this.ignoreInTotals = badgeData.ignoreInTotals ?? false

    this.requirements = badgeData.requirements?.map((groups, index) => {
      const existingKeysInGroup = new Set<string>()
      return groups.map((requirementData) => {
        if (existingKeysInGroup.has(requirementData.key)) throw new Error(`Duplicate badge requirement key [${badgeData.key}:${requirementData.key}] in group [${index + 1}]`)
        existingKeysInGroup.add(requirementData.key)

        const badge = new BadgeRequirement(requirementData)
        this.#requirementsIndex[badge.key] = badge
        return badge
      })
    })
  }

  getRequirement(key: string): BadgeRequirement {
    const result = this.#requirementsIndex[key]
    if (result === undefined) throw new Error(`Unknown badge requirement key [${key}]`)
    return result
  }
}
