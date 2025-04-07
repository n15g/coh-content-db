import { ContentBundle } from '../api/content-bundle'
import { Archetype } from './archetype'
import { Zone } from './zone'
import { Badge } from './badge'
import { BundleMetadata } from './bundle-metadata'
import { BadgeIndex } from './badge-index'
import { BadgeSearchOptions } from './badge-search-options'
import { Paged } from './paged'
import { Contact } from './contact'
import { Mission } from './mission'

export class CohContentDatabase {
  readonly #archetypeIndex: Record<string, Archetype> = {}
  readonly #zoneIndex: Record<string, Zone> = {}
  readonly #contactIndex: Record<string, Contact> = {}
  readonly #missionIndex: Record<string, Mission> = {}
  readonly #badgeIndex: BadgeIndex

  /**
   * Metadata about the content bundle.
   */
  readonly metadata: BundleMetadata

  /**
   * List of the game server names.
   *
   * Torchbearer, Excelsior, etc.
   */
  readonly servers: string[]

  /**
   * List of archetypes.
   */
  readonly archetypes: Archetype[]

  /**
   * List of game zones.
   */
  readonly zones: Zone[]

  /**
   * List of contacts.
   */
  readonly contacts: Contact[]

  /**
   * List of missions.
   */
  readonly missions: Contact[]

  /**
   * List of badges.
   */
  readonly badges: Badge[]

  /**
   * Initialize the database with a content bundle.
   * @param bundle The data to load.
   */
  constructor(bundle: ContentBundle) {
    this.metadata = new BundleMetadata(bundle)
    this.servers = bundle.servers ?? []

    this.archetypes = bundle.archetypes?.map((data) => {
      if (this.#archetypeIndex[data.key] !== undefined) throw new Error(`Duplicate archetype key '${data.key}'`)
      const archetype = new Archetype(data)
      this.#archetypeIndex[archetype.key] = archetype
      return archetype
    }) ?? []

    this.zones = bundle.zones?.map((data) => {
      if (this.#zoneIndex[data.key] !== undefined) throw new Error(`Duplicate zone key '${data.key}'`)
      const zone = new Zone(data)
      this.#zoneIndex[zone.key] = zone
      return zone
    }) ?? []

    this.contacts = bundle.contacts?.map((data) => {
      if (this.#contactIndex[data.key] !== undefined) throw new Error(`Duplicate contact key '${data.key}'`)
      const contact = new Contact(data)
      this.#contactIndex[contact.key] = contact
      return contact
    }) ?? []

    this.missions = bundle.missions?.map((data) => {
      if (this.#missionIndex[data.key] !== undefined) throw new Error(`Duplicate mission key '${data.key}'`)
      const mission = new Mission(data)
      this.#missionIndex[mission.key] = mission
      return mission
    }) ?? []

    this.badges = bundle.badges?.map(data => new Badge(data)) ?? []
    this.#badgeIndex = new BadgeIndex(this.badges)
  }

  getArchetype(key?: string): Archetype | undefined {
    if (!key) return undefined
    return this.#archetypeIndex[key]
  }

  getZone(key?: string): Zone | undefined {
    if (!key) return undefined
    return this.#zoneIndex[key]
  }

  getContact(key?: string): Contact | undefined {
    if (!key) return undefined
    return this.#contactIndex[key]
  }

  getMission(key?: string): Mission | undefined {
    if (!key) return undefined
    return this.#missionIndex[key]
  }

  getBadge(key?: string): Badge | undefined {
    return this.#badgeIndex.getBadge(key)
  }

  /**
   * Search, sort and filter the badge list.
   * This is a fairly brute-forced approach and will not be as performant as loading the badge data into a traditional
   * database engine, but is sufficient for most operations.
   * @param options {@link BadgeSearchOptions}
   */
  searchBadges(options?: BadgeSearchOptions): Paged<Badge> {
    return this.#badgeIndex.searchBadges(options)
  }
}
