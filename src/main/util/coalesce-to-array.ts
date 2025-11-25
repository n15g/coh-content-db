/**
 * For fields that accept either an array of values or a single value, coalesces the value to an array.
 *
 * Arrays are returned as-is.
 * Single values are returned as a single-value array.
 * Undefined values are returned as undefined.
 *
 * @param value The value to coalesce.
 */
export function coalesceToArray<T>(value?: T | T[]): T[] | undefined {
  if (!value) return undefined
  return Array.isArray(value) ? value as T[] : [value]
}
