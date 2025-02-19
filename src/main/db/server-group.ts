import { Archetype } from './archetype'
import { Badge } from './badge'
import { ServerGroupData } from '../api/server-group-data'
import { Key } from './key'
import { Change } from '../api/change'
import { GameMap } from './game-map'

export class ServerGroup {
  readonly #archetypeIndex: Record<string, Archetype> = {}
  readonly #mapIndex: Record<string, GameMap> = {}
  readonly #badgeIndex: Record<string, Badge> = {}

  /**
   * The database key for this server group.
   */
  readonly key: string

  /**
   * Name of the server group.
   */
  readonly name: string

  /**
   * Description of the server group.
   *
   * Supports {@link https://www.markdownguide.org/|Markdown} format.
   */
  readonly description?: string

  /**
   * Repository where the db content package is maintained.
   */
  readonly repository?: string

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
   * Change log.
   */
  readonly changelog: Change[]

  constructor(data: ServerGroupData) {
    this.key = new Key(data.key).value
    this.name = data.name
    this.description = data.description
    this.repository = data.repository
    this.servers = data.servers
    this.archetypes = data.archetypes.map((data) => {
      if (this.#archetypeIndex[data.key] !== undefined) throw new Error(`Duplicate archetype key [${data.key}]`)
      const archetype = new Archetype(data)
      this.#archetypeIndex[archetype.key] = archetype
      return archetype
    })
    this.maps = data.maps.map((data) => {
      if (this.#mapIndex[data.key] !== undefined) throw new Error(`Duplicate map key [${data.key}]`)
      const map = new GameMap(data)
      this.#mapIndex[map.key] = map
      return map
    })
    this.badges = data.badges.map((data) => {
      if (this.#badgeIndex[data.key] !== undefined) throw new Error(`Duplicate badge key [${data.key}]`)
      const badge = new Badge(data)
      this.#badgeIndex[badge.key] = badge
      return badge
    })
    this.changelog = data.changelog
  }

  getArchetype(key: string): Archetype {
    const result = this.#archetypeIndex[key]
    if (result === undefined) throw new Error(`Unknown key [${key}]`)
    return result
  }

  getMap(key: string): GameMap {
    const result = this.#mapIndex[key]
    if (result === undefined) throw new Error(`Unknown key [${key}]`)
    return result
  }

  getBadge(key: string): Badge {
    const result = this.#badgeIndex[key]
    if (result === undefined) throw new Error(`Unknown key [${key}]`)
    return result
  }
}
