import { BADGE_TYPE, BadgeType } from '../../main'

describe('BADGE_TYPE', () => {
  test('should be an array', () => {
    expect(Array.isArray(BADGE_TYPE)).toBeTruthy()
  })

  test('should not be empty', () => {
    expect(BADGE_TYPE).not.toHaveLength(0)
  })

  test('should contain only strings', () => {
    for (const entry of BADGE_TYPE) {
      expect(typeof entry).toBe('string')
    }
  })

  test('should contain all known basic badge types', () => {
    const expected = [
      'exploration', 'history', 'accomplishment', 'achievement', 'accolade',
      'gladiator', 'veteran', 'pvp', 'invention', 'defeat',
      'event', 'ouroboros', 'consignment', 'day-job', 'architect-entertainment',
    ]
    for (const category of expected) {
      expect(BADGE_TYPE).toContain(category)
    }
  })
})

describe('BadgeType', () => {
  test('should be a usable type', () => {
    const field: BadgeType = 'exploration'
    expect(field).toBe('exploration')
  })
})
