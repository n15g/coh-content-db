/**
 * Create a reference string that can be used in most text strings to display a link to the given badge.
 * @param target The badge or badge key to target.
 */
export function createBadgeReference(target: string | { key: string }): string {
  const key = typeof target === 'string' ? target : target.key
  return `[badge:${key}]`
}

/**
 * Create a reference string that can be used in most text strings to display a link to the given map.
 * @param target The {@link GameMap} or map key to target.
 */
export function createMapReference(target: string | { key: string }): string {
  const key = typeof target === 'string' ? target : target.key
  return `[map:${key}]`
}
