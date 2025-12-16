import { Link } from './link'
import { MoralityExtended } from './morality'
import { ZoneType } from './zone-type'
import { MarkdownString } from './markdown-string'
import { LevelRangeData } from './level-range-data'

export interface ZoneData {
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
  readonly morality?: MoralityExtended | MoralityExtended[]

  /**
   * The level range this zone is recommended for.
   */
  readonly levelRange?: LevelRangeData

  /**
   * Freeform notes or tips about the zone.
   */
  readonly notes?: MarkdownString

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links?: Link[]
}
