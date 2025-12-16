import { Link } from './link'
import { MarkdownString } from './markdown-string'
import { MissionType } from './mission-type'
import { MoralityExtended } from './morality'
import { LevelRangeData } from './level-range-data'
import { MissionFlashbackData } from './mission-flashback-data'

export interface MissionData {
  /**
   * Unique key used to reference this mission.
   *
   * Keys must be unique and can only contain lowercase letters, numbers and hyphens (`-`).
   */
  readonly key: string

  /**
   * The name of the mission as it appears from the contact.
   *
   * The name may be different when viewed in Ouroboros as a Flashback.
   */
  readonly name: string

  /**
   * The type of mission... Story arc, task force, trial, etc.
   */
  readonly type: MissionType

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
  readonly levelRange?: LevelRangeData

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
