import { BADGE_PARTIAL_TYPE, BadgePartialType } from '../../main'

describe('BADGE_PARTIAL_TYPE', () => {
  test('should be an array', () => {
    expect(Array.isArray(BADGE_PARTIAL_TYPE)).toBeTruthy()
  })

  test('should not be empty', () => {
    expect(BADGE_PARTIAL_TYPE).not.toHaveLength(0)
  })

  test('should contain only strings', () => {
    for (const entry of BADGE_PARTIAL_TYPE) {
      expect(typeof entry).toBe('string')
    }
  })

  test('should contain all known badge partial types', () => {
    const expected = ['PLAQUE', 'BADGE', 'INVENTION', 'INVENTION_PLUS_ONE']
    for (const category of expected) {
      expect(BADGE_PARTIAL_TYPE).toContain(category)
    }
  })
})

describe('BadgePartialType', () => {
  test('should be a usable type', () => {
    const field: BadgePartialType = 'PLAQUE'
    expect(field).toBe('PLAQUE')
  })
})
