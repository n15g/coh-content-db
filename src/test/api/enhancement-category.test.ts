import { ENHANCEMENT_CATEGORY, EnhancementCategory } from '../../main'

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
      'defense-debuff', 'to-hit-debuff', 'taunt', 'confuse', 'healing', 'defense-buff', 'resist-damage', 'intangibility', 'sleep', 'slow', 'hold', 'stun', 'immobilize',
      'fear', 'endurance-modification', 'endurance-reduction', 'recharge-reduction', 'interrupt-duration', 'accuracy', 'to-hit-buff', 'damage', 'knockback', 'run-speed',
      'jump', 'fly-speed', 'range',
    ]
    for (const category of expected) {
      expect(ENHANCEMENT_CATEGORY).toContain(category)
    }
  })
})

describe('EnhancementCategory', () => {
  test('should be a usable type', () => {
    const field: EnhancementCategory = 'run-speed'
    expect(field).toBe('run-speed')
  })
})
