import { Link } from './link'
import { MarkdownString } from './markdown-string'
import { LocationData } from './location-data'
import { MoralityExtended } from './morality'
import { LevelRangeData } from './level-range-data'

export interface ContactData {
  /**
   * Unique key used to reference this contact.
   *
   * Keys must be unique and can only contain lowercase letters, numbers and hyphens (`-`).
   */
  readonly key: string

  /**
   * The name of this contact.
   */
  readonly name: string

  /**
   * The contact's title.
   */
  readonly title?: string

  /**
   * The character moralities that this contact will interact with.
   */
  readonly morality?: MoralityExtended | MoralityExtended[]

  /**
   * The location of this contact.
   */
  readonly location?: LocationData

  /**
   * The level range this contact will offer missions for.
   */
  readonly levelRange?: LevelRangeData

  /**
   * Freeform notes or tips about the contact.
   */
  readonly notes?: MarkdownString

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links?: Link[]
}
