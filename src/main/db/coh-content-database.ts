import { ContentBundle } from '../api/content-bundle'
import { Archetype } from './archetype'
import { GameMap } from './game-map'
import { Badge } from './badge'
import { BundleMetadata } from './bundle-metadata'

export class CohContentDatabase {
  readonly #archetypeIndex: Record<string, Archetype> = {}
  readonly #mapIndex: Record<string, GameMap> = {}
  readonly #badgeIndex: Record<string, Badge> = {}

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
    this.badges = bundle.badges?.map((data) => {
      if (this.#badgeIndex[data.key] !== undefined) throw new Error(`Duplicate badge key [${data.key}]`)
      const badge = new Badge(data)
      this.#badgeIndex[badge.key] = badge
      return badge
    }) ?? []
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
    const result = this.#badgeIndex[key]
    if (result === undefined) throw new Error(`Unknown badge key [${key}]`)
    return result
  }

}
