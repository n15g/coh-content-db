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
import { AbstractIndex } from './abstract-index'

export class CohContentDatabase {
  #archetypeIndex = new AbstractIndex<Archetype>('key')
  #zoneIndex = new AbstractIndex<Zone>('key')
  #contactIndex = new AbstractIndex<Contact>('key')
  #missionIndex = new AbstractIndex<Mission>('key')
  #badgeIndex = new BadgeIndex()

  #metadata?: BundleMetadata
  #servers?: string[]

  /**
   * Load the given content bundle, resetting the db if a bundle is already loaded.
   * @param bundle The bundle to load.
   */
  load(bundle: ContentBundle): void {
    this.#metadata = new BundleMetadata(bundle)
    this.#servers = bundle.servers ?? []

    this.#archetypeIndex.load(bundle.archetypes?.map(x => new Archetype(x)))
    this.#zoneIndex.load(bundle.zones?.map(x => new Zone(x)))
    this.#contactIndex.load(bundle.contacts?.map(x => new Contact(x)))
    this.#missionIndex.load(bundle.missions?.map(x => new Mission(x)))
    this.#badgeIndex.load(bundle.badges?.map(x => new Badge(x)))
  }

  /**
   * Metadata about the content bundle.
   */
  get metadata(): BundleMetadata | undefined {
    return this.#metadata
  }

  /**
   * List of the game server names.
   *
   * Torchbearer, Excelsior, etc.
   */
  get servers(): string[] {
    return this.#servers ?? []
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
