import { MarkdownString } from './markdown-string'

export interface Change {
  /**
   * The version number in {@link http://semver.org|semver} format.
   */
  version: string
  /**
   * Date of the change.
   */
  date: Date

  /**
   * Description of the change.
   */
  description: MarkdownString
}
