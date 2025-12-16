import { Link } from '../api/link'
import { ZoneData } from '../api/zone-data'
import { Key } from './key'
import { MoralityList } from './morality-list'
import { coalesceToArray } from '../util/coalesce-to-array'
import { ZoneType } from '../api/zone-type'
import { MarkdownString } from '../api/markdown-string'
import { LevelRange } from './level-range'

export class Zone {
  /**
   * Unique key used to reference this zone.
   *
   * Keys must be unique and can only contain lowercase letters, numbers and hyphens (`-`).
   */
  readonly key: string

  /**
   * The name of the zone as it appears in-game.
   */
  readonly name: string

  /**
   * The type of zone.
   */
  readonly type: ZoneType

  /**
   * The character moralities that this zone is accessible by.
   */
  readonly morality: MoralityList

  /**
   * The level range this zone is recommended for.
   */
  readonly levelRange?: LevelRange

  /**
   * Freeform notes or tips about the zone.
   */
  readonly notes?: MarkdownString

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links: Link[]

  constructor(data: ZoneData) {
    this.key = new Key(data.key).value
    this.name = data.name
    this.type = data.type
    this.morality = new MoralityList(coalesceToArray(data.morality))
    this.levelRange = data.levelRange ? new LevelRange(data.levelRange) : undefined
    this.notes = data.notes
    this.links = data.links ?? []
  }
}
