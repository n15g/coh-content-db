import { Link } from '../api/link'
import { Key } from './key'
import { MarkdownString } from '../api/markdown-string'
import { ContactData } from '../api/contact-data'
import { Location } from './location'

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
   * The location of this contact.
   */
  readonly location?: Location

  /**
   * The level range this contact will offer missions for.
   */
  readonly levelRange?: [number, number?]

  /**
   * Freeform notes or tips about the contact.
   */
  readonly notes?: MarkdownString

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links: Link[]

  constructor(contactData: ContactData) {
    this.key = new Key(contactData.key).value
    this.name = contactData.name
    this.title = contactData.title
    this.location = contactData.location
    this.levelRange = contactData.levelRange
    this.notes = contactData.notes
    this.links = contactData.links ?? []
  }
}
