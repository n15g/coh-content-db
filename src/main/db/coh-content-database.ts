import { ContentBundle } from '../api/content-bundle'
import { Archetype } from './archetype'
import { GameMap } from './game-map'
import { Badge } from './badge'
import { BundleMetadata } from './bundle-metadata'
import { BadgeIndex } from './badge-index'
import { BadgeSearchOptions } from './badge-search-options'
import { SearchResults } from './search-results'

export class CohContentDatabase {
  readonly #archetypeIndex: Record<string, Archetype> = {}
  readonly #mapIndex: Record<string, GameMap> = {}
  readonly #badgeIndex: BadgeIndex

  /**
   * Metadata about the content bundle.
   */
  readonly metadata: BundleMetadata

  /**
   * List of the game server names in this server group.
   * Torchbearer, Excelsior, etc.
   */
  readonly servers: string[]

  /**
   * List of archetypes available in this server group.
   */
  readonly archetypes: Archetype[]

  /**
   * List of game maps supported by this server group.
   */
  readonly maps: GameMap[]

  /**
   * List of badges available on this server group.
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
      if (this.#archetypeIndex[data.key] !== undefined) throw new Error(`Duplicate archetype key [${data.key}]`)
      const archetype = new Archetype(data)
      this.#archetypeIndex[archetype.key] = archetype
      return archetype
    }) ?? []

    this.maps = bundle.maps?.map((data) => {
      if (this.#mapIndex[data.key] !== undefined) throw new Error(`Duplicate map key [${data.key}]`)
      const map = new GameMap(data)
      this.#mapIndex[map.key] = map
      return map
    }) ?? []

    this.badges = bundle.badges?.map(data => new Badge(data)) ?? []
    this.#badgeIndex = new BadgeIndex(this.badges, this.maps)
  }

  getArchetype(key: string): Archetype {
    const result = this.#archetypeIndex[key]
    if (result === undefined) throw new Error(`Unknown archetype key [${key}]`)
    return result
  }

  getMap(key: string): GameMap {
    const result = this.#mapIndex[key]
    if (result === undefined) throw new Error(`Unknown map key [${key}]`)
    return result
  }

  getBadge(key: string): Badge {
    return this.#badgeIndex.getBadge(key)
  }

  /**
   * Search, sort and filter the badge list.
   * This is a fairly brute-forced approach and will not be as performant as loading the badge data into a traditional
   * database engine, but is sufficient for most operations.
   * @param options {@link BadgeSearchOptions}
   */
  searchBadges(options?: BadgeSearchOptions): SearchResults<Badge> {
    return this.#badgeIndex.searchBadges(options)
  }
}
