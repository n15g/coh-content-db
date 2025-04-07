import { Link } from './link'
import { MarkdownString } from './markdown-string'
import { MissionType } from './mission-type'
import { MoralityExtended } from './morality'

export interface MissionData {
  /**
   * Unique key used to reference this mission.
   *
   * Keys must be unique and can only contain lowercase letters, numbers and hyphens (`-`).
   */
  readonly key: string

  /**
   * The type of mission... Story arc, task force, trial, etc.
   */
  readonly type: MissionType

  /**
   * The name of the mission as it appears from the contact.
   *
   * The name may be different when viewed in Ouroboros as a Flashback.
   */
  readonly name: string

  /**
   * The character moralities that may accept the mission.
   */
  readonly morality?: MoralityExtended | MoralityExtended[]

  /**
   * The keys of any contacts that provide this mission.
   */
  readonly contactKeys?: string | string[]

  /**
   * The level range this mission is available for.
   */
  readonly levelRange?: [number, number?]

  /**
   * Freeform notes or tips about the mission.
   */
  readonly notes?: MarkdownString

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links?: Link[]

  /**
   * If the mission is available in Ouroboros as a Flashback.
   */
  readonly flashback?: MissionFlashbackData
}

export interface MissionFlashbackData {

  /**
   * The id of the mission as seen in the Flashback menu, i.e. '14.01'.
   */
  readonly id: string

  /**
   * The level range this mission appears under as a Flashback. Leave undefined if the same as the base mission.
   */
  readonly levelRange?: [number, number?]

  /**
   * The name as it appears in the Flashback list. Leave undefined if the same as the base mission.
   */
  readonly name?: string

  /**
   * The character moralities that the mission will appear for in the Flashback list. Leave undefined if the same as the base mission.
   */
  readonly morality?: MoralityExtended | MoralityExtended[]

  /**
   * The contact for the mission during the Flashback.
   */
  readonly contactKey?: string

  /**
   * Freeform notes or tips about the Flashback version of the mission.
   */
  readonly notes?: MarkdownString
}
