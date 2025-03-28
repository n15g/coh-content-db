import { Link } from './link'
import { MarkdownString } from './markdown-string'

export interface ContactData {
  /**
   * Unique key used to reference this contact.
   *
   * Keys can only contain lowercase letters, numbers and hyphens (`-`).
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
   * The zone this character is located in.
   */
  readonly zoneKey?: string

  /**
   * The `/loc` coordinates of the contact.
   */
  readonly loc?: [number, number, number]

  /**
   * The level range this contact will offer missions for.
   */
  readonly levelRange: [number, number]

  /**
   * Freeform notes or tips about the contact.
   */
  readonly notes?: MarkdownString

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links?: Link[]
}
