import { MarkdownString } from './markdown-string'
import { MoralityExtended } from './morality'
import { LevelRangeData } from './level-range-data'

export interface MissionFlashbackData {

  /**
   * The id of the mission as seen in the Flashback menu, i.e. '14.01'.
   */
  readonly id: string

  /**
   * The level range this mission appears under as a Flashback.
   */
  readonly levelRange?: LevelRangeData

  /**
   * The name as it appears in the Flashback list. Leave undefined if the same as the base mission.
   */
  readonly name?: string

  /**
   * The character moralities that the mission will appear for in the Flashback list. Leave undefined if the same as the base mission.
   */
  readonly morality?: MoralityExtended | MoralityExtended[]

  /**
   * Freeform notes or tips about the Flashback version of the mission.
   */
  readonly notes?: MarkdownString
}
