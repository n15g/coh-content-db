import { ArchetypeData } from './archetype-data'
import { ZoneData } from './zone-data'
import { BadgeData } from './badge-data'
import { Change } from './change'
import { Link } from './link'
import { MarkdownString } from './markdown-string'
import { ContactData } from './contact-data'
import { MissionData } from './mission-data'

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
   */
  readonly description?: MarkdownString

  /**
   * Repository where the db content package is maintained.
   */
  readonly repository?: string

  /**
   * List of external links. Wiki, forums, etc.
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
   * List of zones supported by this fork.
   */
  readonly zones?: ZoneData[]

  /**
   * List of contacts available in this fork.
   */
  readonly contacts?: ContactData[]

  /**
   * List of missions available in this fork.
   */
  readonly missions?: MissionData[]

  /**
   * List of badges available on this fork.
   */
  readonly badges?: BadgeData[]

  /**
   * Change log for this data package.
   */
  readonly changelog?: Change[]
}
