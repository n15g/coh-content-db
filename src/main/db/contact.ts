import { Link } from '../api/link'
import { Key } from './key'
import { MarkdownString } from '../api/markdown-string'
import { ContactData } from '../api/contact-data'
import { Location } from './location'
import { MoralityList } from './morality-list'
import { coalesceToArray } from '../util/coalesce-to-array'
import { LevelRange } from './level-range'

export class Contact {
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
  readonly morality: MoralityList

  /**
   * The location of this contact.
   */
  readonly location?: Location

  /**
   * The level range this contact will offer missions for.
   */
  readonly levelRange?: LevelRange

  /**
   * Freeform notes or tips about the contact.
   */
  readonly notes?: MarkdownString

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links: Link[]

  constructor(data: ContactData) {
    this.key = new Key(data.key).value
    this.name = data.name
    this.title = data.title
    this.morality = new MoralityList(coalesceToArray(data.morality))
    this.location = data.location
    this.levelRange = data.levelRange ? new LevelRange(data.levelRange) : undefined
    this.notes = data.notes
    this.links = data.links ?? []
  }
}
