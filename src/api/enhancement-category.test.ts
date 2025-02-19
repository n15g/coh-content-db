import { ENHANCEMENT_CATEGORY, EnhancementCategory } from './enhancement-category'

describe('ENHANCEMENT_CATEGORY', () => {
  test('should be an array', () => {
    expect(Array.isArray(ENHANCEMENT_CATEGORY)).toBeTruthy()
  })

  test('should not be empty', () => {
    expect(ENHANCEMENT_CATEGORY).not.toHaveLength(0)
  })

  test('should contain only strings', () => {
    for (const entry of ENHANCEMENT_CATEGORY) {
      expect(typeof entry).toBe('string')
    }
  })

  test('should contain all known default enhancement categories', () => {
    const expected = [
      'DEFENSE_DEBUFF', 'TO_HIT_DEBUFF', 'TAUNT', 'CONFUSE', 'HEALING', 'DEFENSE_BUFF', 'RESIST_DAMAGE', 'INTANGIBILITY', 'SLEEP', 'SLOW', 'HOLD', 'STUN', 'IMMOBILIZE',
      'FEAR', 'ENDURANCE_MODIFICATION', 'ENDURANCE_REDUCTION', 'RECHARGE_REDUCTION', 'INTERRUPT_DURATION', 'ACCURACY', 'TO_HIT_BUFF', 'DAMAGE', 'KNOCKBACK', 'RUN_SPEED',
      'JUMP', 'FLY_SPEED', 'RANGE',
    ]
    for (const category of expected) {
      expect(ENHANCEMENT_CATEGORY).toContain(category)
    }
  })
})

describe('EnhancementCategory', () => {
  test('should be a usable type', () => {
    const field: EnhancementCategory = 'RUN_SPEED'
    expect(field).toBe('RUN_SPEED')
  })
})
