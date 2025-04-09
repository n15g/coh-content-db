import { MissionType } from '../api/mission-type'
import { MarkdownString } from '../api/markdown-string'
import { Link } from '../api/link'
import { MissionData } from '../api/mission-data'
import { Key } from './key'
import { coalesceToArray } from '../util'
import { MoralityList } from './morality-list'

export class Mission {
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
  readonly morality: MoralityList

  /**
   * The keys of any contacts that provide this mission.
   */
  readonly contactKeys?: string[]

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
  readonly links: Link[]

  /**
   * If the mission is available in Ouroboros as a Flashback.
   */
  readonly flashback?: {

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
    readonly morality?: MoralityList

    /**
     * The contact for the mission during the Flashback.
     */
    readonly contactKey?: string

    /**
     * Freeform notes or tips about the Flashback version of the mission.
     */
    readonly notes?: MarkdownString
  }

  constructor(data: MissionData) {
    this.key = new Key(data.key).value
    this.name = data.name
    this.type = data.type
    this.morality = new MoralityList(coalesceToArray(data.morality))
    this.contactKeys = coalesceToArray(data.contactKeys)
    this.levelRange = data.levelRange
    this.notes = data.notes
    this.links = data.links ?? []
    this.flashback = createFlashback(data)
  }
}

function createFlashback(data: MissionData): Mission['flashback'] {
  if (!data.flashback) return undefined
  return {
    id: data.flashback.id,
    levelRange: data.flashback.levelRange ?? data.levelRange,
    name: data.flashback.name ?? data.name,
    morality: new MoralityList(coalesceToArray(data.flashback.morality ?? data.morality)),
    contactKey: data.flashback.contactKey,
    notes: data.flashback.notes,
  }
}
