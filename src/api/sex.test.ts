import { Sex, SEX } from './sex'

describe('SEX', () => {
  test('should be an array', () => {
    expect(Array.isArray(SEX)).toBeTruthy()
  })

  test('should not be empty', () => {
    expect(SEX).not.toHaveLength(0)
  })

  test('should contain only strings', () => {
    for (const entry of SEX) {
      expect(typeof entry).toBe('string')
    }
  })

  test('should contain all known sexes', () => {
    const expected = ['M', 'F']
    for (const category of expected) {
      expect(SEX).toContain(category)
    }
  })
})

describe('Sex', () => {
  test('should be a usable type', () => {
    const field: Sex = 'M'
    expect(field).toBe('M')
  })
})
