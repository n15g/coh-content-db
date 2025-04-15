import { Link } from './link'
import { MarkdownString } from './markdown-string'

/**
 * Metadata about a content bundle.
 */
export interface BundleHeaderData {
  /**
   * Name of the fork this bundle contains data for.
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
   * Version number for this data package.
   */
  readonly version?: string
}
