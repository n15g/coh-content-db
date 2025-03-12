import { PLAQUE_TYPE, PlaqueType } from '../../main'

describe('PLAQUE_TYPE', () => {
  test('should be an array', () => {
    expect(Array.isArray(PLAQUE_TYPE)).toBeTruthy()
  })

  test('should not be empty', () => {
    expect(PLAQUE_TYPE).not.toHaveLength(0)
  })

  test('should contain only strings', () => {
    for (const entry of PLAQUE_TYPE) {
      expect(typeof entry).toBe('string')
    }
  })

  test('should contain all known plaque types', () => {
    const expected = ['WALL_PLAQUE', 'MONUMENT']
    for (const category of expected) {
      expect(PLAQUE_TYPE).toContain(category)
    }
  })
})

describe('PlaqueType', () => {
  test('should be a usable type', () => {
    const field: PlaqueType = 'WALL_PLAQUE'
    expect(field).toBe('WALL_PLAQUE')
  })
})
