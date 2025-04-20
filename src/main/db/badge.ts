import { BadgeType } from '../api/badge-type'
import { Link } from '../api/link'
import { BadgeData } from '../api/badge-data'
import { BadgeRequirement } from './badge-requirement'
import { Key } from './key'
import { Alternates } from './alternates'
import { MarkdownString } from '../api/markdown-string'
import { coalesceToArray } from '../util'
import { MoralityList } from './morality-list'
import { AbstractIndex } from './abstract-index'

export class Badge {
  readonly #requirementsIndex: AbstractIndex<BadgeRequirement>
  readonly #zoneKeys = new Set<string>()

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
   * The date that the badge was added to the game.
   */
  readonly releaseDate: Date

  /**
   * The character moralities that this badge is available to.
   */
  readonly morality: MoralityList

  /**
   * The badge text as it appears in-game. May vary by character sex or alignment.
   */
  readonly badgeText: Alternates<MarkdownString>

  /**
   * Short description of how to acquire the badge. Detailed instructions will be in the notes field.
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
   * The id used with the in-game `/settitle` command to apply the badge.
   * The first value is the id for primal characters and the (optional) second number is the id for praetorian characters.
   */
  readonly setTitleId?: [number, number?]

  /**
   * A description of the effect the badge will have, such as a buff or granting a temporary power.
   */
  readonly effect?: MarkdownString

  /**
   * Some badges are not included in the badge total count... such as Flames of Prometheus, which can be removed by redeeming it for a Notice of the Well.
   */
  readonly ignoreInTotals: boolean

  constructor(badgeData: BadgeData) {
    this.key = new Key(badgeData.key).value
    this.type = badgeData.type
    this.name = new Alternates(badgeData.name)
    this.releaseDate = new Date(badgeData.releaseDate)
    this.morality = new MoralityList(coalesceToArray(badgeData.morality))
    this.badgeText = new Alternates(badgeData.badgeText ?? [])
    this.acquisition = badgeData.acquisition
    this.icon = new Alternates(badgeData.icon ?? [])
    this.notes = badgeData.notes
    this.links = badgeData.links ?? []
    this.effect = badgeData.effect
    this.setTitleId = badgeData.setTitleId
    this.ignoreInTotals = badgeData.ignoreInTotals ?? false

    this.#requirementsIndex = new AbstractIndex<BadgeRequirement>('key', badgeData.requirements?.map(x => new BadgeRequirement(x)))

    for (const requirement of this.#requirementsIndex.values) {
      if (requirement.location) for (const location of requirement.location) {
        if (location.zoneKey) this.#zoneKeys.add(location.zoneKey)
      }
    }
  }

  /**
   * Represents the requirements for badges with multiple fulfillment steps, such as visiting monuments for history badges, completing missions, or collecting other badges.
   */
  get requirements(): BadgeRequirement[] {
    return this.#requirementsIndex.values
  }

  getRequirement(key: string): BadgeRequirement | undefined {
    return this.#requirementsIndex.get(key)
  }

  /**
   * Return a list of all the zone keys referenced by this badge.
   */
  get zoneKeys(): string[] {
    return [...this.#zoneKeys]
  }

  /**
   * The zone key if this badge relates to a single zone.
   */
  get zoneKey(): string | undefined {
    return this.#zoneKeys.size === 1 ? this.#zoneKeys.values().next().value : undefined
  }
}

export function compareByDefaultName(a?: Badge, b?: Badge): number {
  const aName = a?.name.default?.value
  const bName = b?.name.default?.value
  if (!aName && !bName) return 0
  if (!aName) return 1
  if (!bName) return -1
  return aName.localeCompare(bName)
}

export function compareByZoneKey(a?: Badge, b?: Badge): number {
  const aZone = a?.zoneKey
  const bZone = b?.zoneKey
  if (!aZone && !bZone) return 0
  if (!aZone) return 1
  if (!bZone) return -1
  return aZone.localeCompare(bZone)
}

export function compareByReleaseDate(a?: Badge, b?: Badge): number {
  const aReleaseDate = a?.releaseDate?.getTime()
  const bReleaseDate = b?.releaseDate?.getTime()
  if (aReleaseDate === bReleaseDate) return 0
  if (!aReleaseDate) return 1
  if (!bReleaseDate) return -1
  return aReleaseDate < bReleaseDate ? -1 : 1
}
