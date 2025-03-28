import { ContentBundle } from '../api/content-bundle'
import { Archetype } from './archetype'
import { Zone } from './zone'
import { Badge } from './badge'
import { BundleMetadata } from './bundle-metadata'
import { BadgeIndex } from './badge-index'
import { BadgeSearchOptions } from './badge-search-options'
import { Paged } from './paged'

export class CohContentDatabase {
  readonly #archetypeIndex: Record<string, Archetype> = {}
  readonly #zoneIndex: Record<string, Zone> = {}
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

    this.badges = bundle.badges?.map(data => new Badge(data)) ?? []
    this.#badgeIndex = new BadgeIndex(this.badges, this.zones)
  }

  getArchetype(key: string): Archetype {
    const result = this.#archetypeIndex[key]
    if (result === undefined) throw new Error(`Unknown archetype key '${key}'`)
    return result
  }

  getZone(key: string): Zone {
    const result = this.#zoneIndex[key]
    if (result === undefined) throw new Error(`Unknown zone key '${key}'`)
    return result
  }

  zoneExists(key: string): boolean {
    return !!this.#zoneIndex[key]
  }

  getBadge(key: string): Badge {
    return this.#badgeIndex.getBadge(key)
  }

  badgeExists(key: string): boolean {
    return this.#badgeIndex.badgeExists(key)
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
