/**
 * Returns the URI of the given badge that can be used in {@link MarkdownString} links.
 *
 * URI format: `badge://<key>`
 *
 * @param target The badge or badge key to target.
 */
export function badgeUri(target: string | { key: string }): string {
  const key = typeof target === 'string' ? target : target.key
  return `badge://${key}`
}

/**
 * Returns a {@link MarkdownString} link to the given badge.
 *
 * Link format: `[<key>](badge://<key>)`
 *
 * @param target The badge or badge key to target.
 */
export function badgeLink(target: string | { key: string }): string {
  const key = typeof target === 'string' ? target : target.key
  return `[${key}](${badgeUri(target)})`
}

/**
 * Returns the URI of the given map that can be used in {@link MarkdownString} links.
 *
 * URI format: `map://<key>`
 *
 * @param target The {@link GameMap} or map key to target.
 */
export function mapUri(target: string | { key: string }): string {
  const key = typeof target === 'string' ? target : target.key
  return `map://${key}`
}

/**
 * Returns a {@link MarkdownString} link to the given map.
 *
 * Link format: `[<key>](map://<key>)`
 *
 * @param target The map or map key to target.
 */
export function mapLink(target: string | { key: string }): string {
  const key = typeof target === 'string' ? target : target.key
  return `[${key}](${mapUri(target)})`
}
