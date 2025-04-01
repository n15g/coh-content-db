import { Alignment, ALIGNMENT, compareAlignment } from '../../main'

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

describe('compareAlignment', () => {
  test('should return <0 if first argument comes first', () => {
    expect(compareAlignment('H', 'V')).toBeLessThan(0)
    expect(compareAlignment('H', 'P')).toBeLessThan(0)
  })

  test('should return >0 if second argument comes first', () => {
    expect(compareAlignment('V', 'H')).toBeGreaterThan(0)
    expect(compareAlignment('P', 'H')).toBeGreaterThan(0)
  })

  test('should return 0 if arguments match', () => {
    expect(compareAlignment('H', 'H')).toBe(0)
  })

  test('should return 0 if both arguments are undefined', () => {
    expect(compareAlignment()).toBe(0)
  })

  test('should work as a compare function', () => {
    const unsorted: (Alignment | undefined)[] = [undefined, 'H', 'V', 'P', undefined, 'V', 'P']
    const sorted = unsorted.sort(compareAlignment)

    expect(sorted).toStrictEqual(['H', 'V', 'V', 'P', 'P', undefined, undefined])
  })

  test('should sort against undefined', () => {
    const unsorted: (Alignment | undefined)[] = [undefined, 'H']
    const sorted = unsorted.sort(compareAlignment)

    expect(sorted).toStrictEqual(['H', undefined])
  })
})
