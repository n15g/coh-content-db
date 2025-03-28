import { BadgeData } from './api/badge-data'
import { Badge } from './db/badge'
import { ZoneData } from './api/zone-data'
import { Zone } from './db/zone'

/**
 * Returns the URI of the given badge that can be used in {@link MarkdownString} links.
 *
 * URI format: `badge://<key>`
 *
 * @param target The badge or badge key to target.
 */
export function badgeUri(target: string | Badge | BadgeData): string {
  const key = typeof target === 'string' ? target : target.key
  return `badge://${key}`
}

/**
 * Returns a {@link MarkdownString} link to the given badge.
 *
 * Link format: `[<key>](badge://<key>)`
 *
 * @param target The {@link Badge} or badge key to target.
 */
export function badgeLink(target: string | Badge | BadgeData): string {
  const key = typeof target === 'string' ? target : target.key
  return `[${key}](${badgeUri(target)})`
}

/**
 * Returns the URI of the given zone that can be used in {@link MarkdownString} links.
 *
 * URI format: `zone://<key>`
 *
 * @param target The {@link Zone} or zone key to target.
 */
export function zoneUri(target: string | Zone | ZoneData): string {
  const key = typeof target === 'string' ? target : target.key
  return `zone://${key}`
}

/**
 * Returns a {@link MarkdownString} link to the given zone.
 *
 * Link format: `[<key>](zone://<key>)`
 *
 * @param target The {@link Zone} or zone key to target.
 */
export function zoneLink(target: string | Zone | ZoneData): string {
  const key = typeof target === 'string' ? target : target.key
  return `[${key}](${zoneUri(target)})`
}
