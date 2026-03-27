/**
 * A pair of values that are different based on the origin of a character, primal or praetorian.
 * Values can be either:
 * - a single value for primal-only
 * - a pair of values: [primal, praetorian]
 */
export type OriginBasedData<T> = T | [T, T?]
