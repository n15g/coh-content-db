import { Link } from '../api/link'
import { MarkdownString } from '../api/markdown-string'
import { BundleHeaderData } from '../api/bundle-header-data'
import { toDate } from '../to-date'

export class BundleHeader {
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
   */
  readonly lastUpdateTime: Date

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

  constructor(data: BundleHeaderData) {
    if (!data) throw new Error('Missing header data')
    this.name = data.name
    this.version = data.version
    this.lastUpdateTime = toDate(data.lastUpdateTime)
    this.description = data?.description
    this.repositoryUrl = data?.repositoryUrl
    this.changelogUrl = data?.changelogUrl
    this.links = data?.links ?? []
  }
}
