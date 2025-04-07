export const BADGE_TYPE = [
  'exploration',
  'history',
  'accomplishment',
  'achievement',
  'accolade',
  'gladiator',
  'veteran',
  'pvp',
  'invention',
  'defeat',
  'event',
  'ouroboros',
  'consignment',
  'day-job',
  'architect-entertainment',
] as const

export type BadgeType = typeof BADGE_TYPE[number]
