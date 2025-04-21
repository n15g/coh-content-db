import { Link } from './link'
import { MarkdownString } from './markdown-string'

/**
 * Metadata about a content bundle.
 */
export interface BundleHeaderData {
  /**
   * Name of the fork this bundle contains data for.
   */
  readonly name: string

  /**
   * Version number for this data package.
   */
  readonly version: string

  /**
   * The time this bundle was last updated.
   *
   * Must be an ISO-8601 string in UTC.
   */
  readonly lastUpdateTime: string

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
}
