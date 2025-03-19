import { ArchetypeData } from './archetype-data'
import { GameMapData } from './game-map-data'
import { BadgeData } from './badge-data'
import { Change } from './change'
import { Link } from './link'

/**
 * A content bundle holds the data that makes up one forked instance of the game since the original sunset, such as Homecoming (https://forums.homecomingservers.com/).
 */
export interface ContentBundle {
  /**
   * Name of the fork this bundle contains data for.
   */
  readonly name: string

  /**
   * Description of the fork.
   *
   * Supports {@link https://www.markdownguide.org/|Markdown} format.
   */
  readonly description?: string

  /**
   * Repository where the db content package is maintained.
   */
  readonly repository?: string

  /**
   * List of external links for this Badge. Wiki, forums, etc.
   */
  readonly links?: Link[]

  /**
   * List of the game server names in this fork.
   * Torchbearer, Excelsior, etc.
   */
  readonly servers?: string[]

  /**
   * List of archetypes available in this fork.
   */
  readonly archetypes?: ArchetypeData[]

  /**
   * List of game maps supported by this fork.
   */
  readonly maps?: GameMapData[]

  /**
   * List of badges available on this fork.
   */
  readonly badges?: BadgeData[]

  /**
   * Change log for this data package.
   */
  readonly changelog?: Change[]
}
