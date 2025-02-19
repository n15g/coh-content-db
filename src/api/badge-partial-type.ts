export const BADGE_PARTIAL_TYPE = [
  'PLAQUE',
  'BADGE',
  'INVENTION',
  'INVENTION_PLUS_ONE', // Some invention badges require you to build x of two different invention levels, 'plus one of either level'.
] as const

export type BadgePartialType = typeof BADGE_PARTIAL_TYPE[number]
