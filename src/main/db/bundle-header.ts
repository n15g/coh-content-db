import { Link } from '../api/link'
import { MarkdownString } from '../api/markdown-string'
import { BundleHeaderData } from '../api/bundle-header-data'

export class BundleHeader {
  /**
   * Name of the content bundle.
   */
  readonly name?: string

  /**
   * Description of the fork.
   */
  readonly description?: MarkdownString

  /**
   * Url for the repository where the bundle is maintained.
   */
  readonly repositoryUrl?: string

  /**
   * Url for the location of the changelog.
   */
  readonly changelogUrl?: string

  /**
   * List of external links. Wiki, forums, etc.
   */
  readonly links?: Link[]

  /**
   * The current version of the data package.
   */
  readonly version?: string

  constructor(data: BundleHeaderData | undefined) {
    this.name = data?.name
    this.description = data?.description
    this.repositoryUrl = data?.repositoryUrl
    this.changelogUrl = data?.changelogUrl
    this.links = data?.links ?? []
    this.version = data?.version
  }
}
