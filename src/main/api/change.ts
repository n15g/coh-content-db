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
   * Description of the change in {@link https://www.markdownguide.org/|Markdown} format.
   */
  description: string
}
