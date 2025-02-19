import { Alignment, ALIGNMENT } from './alignment'

describe('ALIGNMENT', () => {
  test('should be an array', () => {
    expect(Array.isArray(ALIGNMENT)).toBeTruthy()
  })

  test('should not be empty', () => {
    expect(ALIGNMENT).not.toHaveLength(0)
  })

  test('should contain only strings', () => {
    for (const entry of ALIGNMENT) {
      expect(typeof entry).toBe('string')
    }
  })

  test('should contain all known alignments', () => {
    const expected = ['H', 'V', 'P']
    for (const category of expected) {
      expect(ALIGNMENT).toContain(category)
    }
  })
})

describe('Alignment', () => {
  test('should be a usable type', () => {
    const field: Alignment = 'H'
    expect(field).toBe('H')
  })
})
