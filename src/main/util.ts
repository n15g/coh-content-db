import { BadgeData } from './api/badge-data'
import { Badge } from './db/badge'
import { ZoneData } from './api/zone-data'
import { Zone } from './db/zone'
import { Contact } from './db/contact'
import { ContactData } from './api/contact-data'
import { Mission } from './db/mission'
import { MissionData } from './api/mission-data'

/**
 * Returns the URI of the given badge that can be used in {@link MarkdownString} fields.
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
 * Returns the URI of the given contact that can be used in {@link MarkdownString} fields.
 *
 * URI format: `contact://<key>`
 *
 * @param target The {@link Contact} or contact key to target.
 */
export function contactUri(target: string | Contact | ContactData): string {
  const key = typeof target === 'string' ? target : target.key
  return `contact://${key}`
}

/**
 * Returns a {@link MarkdownString} link to the given contact.
 *
 * Link format: `[<key>](contact://<key>)`
 *
 * @param target The {@link Contact} or contact key to target.
 */
export function contactLink(target: string | Contact | ContactData): string {
  const key = typeof target === 'string' ? target : target.key
  return `[${key}](${contactUri(target)})`
}

/**
 * Returns the URI of the given mission that can be used in {@link MarkdownString} fields.
 *
 * URI format: `mission://<key>`
 *
 * @param target The {@link Mission} or mission key to target.
 */
export function missionUri(target: string | Mission | MissionData): string {
  const key = typeof target === 'string' ? target : target.key
  return `mission://${key}`
}

/**
 * Returns a {@link MarkdownString} link to the given mission.
 *
 * Link format: `[<key>](mission://<key>)`
 *
 * @param target The {@link Mission} or mission key to target.
 */
export function missionLink(target: string | Mission | MissionData): string {
  const key = typeof target === 'string' ? target : target.key
  return `[${key}](${missionUri(target)})`
}

/**
 * Returns the URI of the given zone that can be used in {@link MarkdownString} fields.
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

/**
 * For fields that accept either an array of values or a single value, coalesces the value to an array.
 *
 * Arrays are returned as-is.
 * Single values are returned as a single-value array.
 * Undefined values are returned as an empty array.
 *
 * @param value The value to coalesce.
 */
export function coalesceToArray<T>(value?: T | T[]): T[] | undefined {
  if (!value) return undefined
  return Array.isArray(value) ? value as T[] : [value]
}
