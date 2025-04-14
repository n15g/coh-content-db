import { ContentBundle } from '../api/content-bundle'
import { Change } from '../api/change'
import { Link } from '../api/link'
import { MarkdownString } from '../api/markdown-string'

export class BundleMetadata {
  /**
   * Name of the content bundle.
   */
  readonly name: string

  /**
   * Description of the fork.
   */
  readonly description?: MarkdownString

  /**
   * Repository where the db content package is maintained.
   */
  readonly repository?: string

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links?: Link[]

  /**
   * Change log for this data package.
   */
  readonly changelog?: Change[]

  /**
   * The current version of the data package.
   */
  readonly version?: string

  constructor(bundle: ContentBundle) {
    this.name = bundle.name
    this.description = bundle.description
    this.repository = bundle.repository
    this.links = bundle.links ?? []
    this.changelog = bundle.changelog ?? []
    this.version = this.changelog?.at(-1)?.version
  }
}
