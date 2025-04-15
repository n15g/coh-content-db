import { ArchetypeData } from './archetype-data'
import { ZoneData } from './zone-data'
import { BadgeData } from './badge-data'
import { ContactData } from './contact-data'
import { MissionData } from './mission-data'
import { BundleHeaderData } from './bundle-header-data'

/**
 * A bundle of game data from a forked instance of the game, such as Homecoming (https://forums.homecomingservers.com/).
 */
export interface BundleData {
  /**
   * Bundle header.
   */
  readonly header?: BundleHeaderData

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
}
