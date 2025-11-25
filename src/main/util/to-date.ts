/**
 * Converts an iso string to a Date object, throwing an error if the iso string is invalid.
 * @param iso ISO-8601 Date string
 */
export function toDate(iso: string): Date {
  const date = new Date(iso)
  if (!date || Number.isNaN(date.getTime())) throw new Error(`Invalid date format: [${iso}]`)
  return date
}
