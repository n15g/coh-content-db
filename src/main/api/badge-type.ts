export const BADGE_TYPE = [
  'EXPLORATION',
  'HISTORY',
  'ACCOMPLISHMENT',
  'ACHIEVEMENT',
  'ACCOLADE',
  'GLADIATOR',
  'VETERAN',
  'PVP',
  'INVENTION',
  'DEFEAT',
  'EVENT',
  'OUROBOROS',
  'CONSIGNMENT',
  'DAY_JOB',
  'AE',
] as const

export type BadgeType = typeof BADGE_TYPE[number]
