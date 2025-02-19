import { ArchetypeData } from './archetype-data'
import { GameMapData } from './game-map-data'
import { BadgeData } from './badge-data'
import { Change } from './change'

/**
 * A server group is a group or company that hosts a set of game servers, such as Homecoming (https://forums.homecomingservers.com/).
 */
export interface ServerGroupData {
  /**
   * Unique key used to reference this server group.
   *
   * Keys can only contain lowercase letters, numbers and hyphens (`-`).
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
  readonly archetypes: ArchetypeData[]

  /**
   * List of game maps supported by this server group.
   */
  readonly maps: GameMapData[]

  /**
   * List of badges available on this server group.
   */
  readonly badges: BadgeData[]

  /**
   * Change log.
   */
  readonly changelog: Change[]
}
