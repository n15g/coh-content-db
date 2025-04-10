export const BADGE_REQUIREMENT_TYPE = [
  /**
   * Collect a badge.
   */
  'badge',
  /**
   * Craft an invention.
   */
  'invention',
  /**
   * Some invention badges require you to build x of two different invention levels, 'plus one of either level'.
   */
  'invention-plus-one',
  /**
   * Visit a location.
   */
  'location',
  /**
   * Click on a monument.
   */
  'monument',
  /**
   * Complete a mission.
   */
  'mission',
  /**
   * Complete an arbitrary task.
   */
  'task',
] as const

export type BadgeRequirementType = typeof BADGE_REQUIREMENT_TYPE[number]
