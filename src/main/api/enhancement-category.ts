export const ENHANCEMENT_CATEGORY = [
  'DEFENSE_DEBUFF',
  'TO_HIT_DEBUFF',
  'TAUNT',
  'CONFUSE',
  'HEALING',
  'DEFENSE_BUFF',
  'RESIST_DAMAGE',
  'INTANGIBILITY',
  'SLEEP',
  'SLOW',
  'HOLD',
  'STUN',
  'IMMOBILIZE',
  'FEAR',
  'ENDURANCE_MODIFICATION',
  'ENDURANCE_REDUCTION',
  'RECHARGE_REDUCTION',
  'INTERRUPT_DURATION',
  'ACCURACY',
  'TO_HIT_BUFF',
  'DAMAGE',
  'KNOCKBACK',
  'RUN_SPEED',
  'JUMP',
  'FLY_SPEED',
  'RANGE',
] as const

export type EnhancementCategory = typeof ENHANCEMENT_CATEGORY[number]
