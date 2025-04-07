import { BADGE_REQUIREMENT_TYPE, BadgeRequirementType } from '../../main'

describe('BADGE_REQUIREMENT_TYPE', () => {
  test('should be an array', () => {
    expect(Array.isArray(BADGE_REQUIREMENT_TYPE)).toBeTruthy()
  })

  test('should not be empty', () => {
    expect(BADGE_REQUIREMENT_TYPE).not.toHaveLength(0)
  })

  test('should contain only strings', () => {
    for (const entry of BADGE_REQUIREMENT_TYPE) {
      expect(typeof entry).toBe('string')
    }
  })

  test('should contain all known badge requirement types', () => {
    const expected = ['plaque', 'badge', 'invention', 'invention-plus-one']
    for (const category of expected) {
      expect(BADGE_REQUIREMENT_TYPE).toContain(category)
    }
  })
})

describe('BadgeRequirementType', () => {
  test('should be a usable type', () => {
    const field: BadgeRequirementType = 'plaque'
    expect(field).toBe('plaque')
  })
})
