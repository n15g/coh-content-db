import { BundleData } from '../api/bundle-data'
import { Archetype } from './archetype'
import { Zone } from './zone'
import { Badge } from './badge'
import { BundleHeader } from './bundle-header'
import { BadgeSearchOptions } from './badge-search-options'
import { Paged } from './paged'
import { Contact } from './contact'
import { Mission } from './mission'
import { AbstractIndex } from './abstract-index'
import { BadgeIndex } from './badge-index'

export class CohContentDatabase {
  readonly #archetypeIndex
  readonly #zoneIndex
  readonly #contactIndex
  readonly #missionIndex
  readonly #badgeIndex

  readonly #header: BundleHeader
  readonly #servers: string[]

  /**
   * Create a db instance from the given content bundle.
   * @param bundle The bundle to load.
   */
  constructor(bundle: BundleData) {
    this.#header = new BundleHeader(bundle.header)
    this.#servers = bundle.servers ?? []

    this.#archetypeIndex = new AbstractIndex<Archetype>('key', bundle.archetypes?.map(x => new Archetype(x)))
    this.#zoneIndex = new AbstractIndex<Zone>('key', bundle.zones?.map(x => new Zone(x)))
    this.#contactIndex = new AbstractIndex<Contact>('key', bundle.contacts?.map(x => new Contact(x)))
    this.#missionIndex = new AbstractIndex<Mission>('key', bundle.missions?.map(x => new Mission(x)))
    this.#badgeIndex = new BadgeIndex(bundle.badges?.map(x => new Badge(x)))
  }

  /**
   * Header information about the content bundle.
   */
  get header(): BundleHeader {
    return this.#header
  }

  /**
   * List of the game server names.
   *
   * Torchbearer, Excelsior, etc.
   */
  get servers(): string[] {
    return this.#servers
  }

  /**
   * List of archetypes.
   */
  get archetypes(): Archetype[] {
    return this.#archetypeIndex.values
  }

  /**
   * Get archetype by key.
   * @param key The key.
   */
  getArchetype(key: string | undefined): Archetype | undefined {
    return this.#archetypeIndex.get(key)
  }

  /**
   * List of game zones.
   */
  get zones(): Zone[] {
    return this.#zoneIndex.values
  }

  /**
   * Get zone by key.
   * @param key The key.
   */
  getZone(key: string | undefined): Zone | undefined {
    return this.#zoneIndex.get(key)
  }

  /**
   * List of contacts.
   */
  get contacts(): Contact[] {
    return this.#contactIndex.values
  }

  /**
   * Get contact by key.
   * @param key The key.
   */
  getContact(key: string | undefined): Contact | undefined {
    return this.#contactIndex.get(key)
  }

  /**
   * List of missions.
   */
  get missions(): Mission[] {
    return this.#missionIndex.values
  }

  /**
   * Get mission by key.
   * @param key The key.
   */
  getMission(key: string | undefined): Mission | undefined {
    return this.#missionIndex.get(key)
  }

  /**
   * List of badges.
   */
  get badges(): Badge[] {
    return this.#badgeIndex.values
  }

  /**
   * Get badge by key.
   * @param key The key.
   */
  getBadge(key: string | undefined): Badge | undefined {
    return this.#badgeIndex.get(key)
  }

  /**
   * Search, sort and filter the badge list.
   * This is a fairly brute-forced approach and will not be as performant as loading the badge data into a traditional
   * database engine, but is sufficient for most operations.
   * @param options {@link BadgeSearchOptions}
   */
  searchBadges(options?: BadgeSearchOptions): Paged<Badge> {
    return this.#badgeIndex.search(options)
  }
}
