export const BADGE_REQUIREMENT_TYPE = [
  'PLAQUE',
  'BADGE',
  'INVENTION',
  'ARC', // Complete a story arc
  'TASK_FORCE', // Complete a task force
  'INVENTION_PLUS_ONE', // Some invention badges require you to build x of two different invention levels, 'plus one of either level'.
] as const

export type BadgeRequirementType = typeof BADGE_REQUIREMENT_TYPE[number]
