import { ContentBundle } from '../api/content-bundle'
import { Change } from '../api/change'
import { Link } from '../api/link'

export class BundleMetadata {
  /**
   * Name of the server group.
   */
  readonly name: string

  /**
   * Description of the server group.
   *
   * Supports {@link https://www.markdownguide.org/|Markdown} format.
   */
  readonly description?: string

  /**
   * Repository where the db content package is maintained.
   */
  readonly repository?: string

  /**
   * List of external links for this Server Group. Wiki, forums, etc.
   */
  readonly links: Link[]

  /**
   * Change log for this data package.
   */
  readonly changelog: Change[]

  constructor(bundle: ContentBundle) {
    this.name = bundle.name
    this.description = bundle.description
    this.repository = bundle.repository
    this.links = bundle.links ?? []
    this.changelog = bundle.changelog ?? []
  }
}
