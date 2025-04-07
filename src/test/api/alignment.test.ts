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
    const expected = ['hero', 'villain', 'praetorian']
    for (const category of expected) {
      expect(ALIGNMENT).toContain(category)
    }
  })
})

describe('Alignment', () => {
  test('should be a usable type', () => {
    const field: Alignment = 'hero'
    expect(field).toBe('hero')
  })
})

describe('compareAlignment', () => {
  test('should return <0 if first argument comes first', () => {
    expect(compareAlignment('hero', 'villain')).toBeLessThan(0)
    expect(compareAlignment('hero', 'praetorian')).toBeLessThan(0)
  })

  test('should return >0 if second argument comes first', () => {
    expect(compareAlignment('villain', 'hero')).toBeGreaterThan(0)
    expect(compareAlignment('praetorian', 'hero')).toBeGreaterThan(0)
  })

  test('should return 0 if arguments match', () => {
    expect(compareAlignment('hero', 'hero')).toBe(0)
  })

  test('should return 0 if both arguments are undefined', () => {
    expect(compareAlignment()).toBe(0)
  })

  test('should work as a compare function', () => {
    const unsorted: (Alignment | undefined)[] = [undefined, 'hero', 'villain', 'praetorian', undefined, 'villain', 'praetorian']
    const sorted = unsorted.sort(compareAlignment)

    expect(sorted).toStrictEqual(['hero', 'villain', 'villain', 'praetorian', 'praetorian', undefined, undefined])
  })

  test('should sort against undefined', () => {
    const unsorted: (Alignment | undefined)[] = [undefined, 'hero']
    const sorted = unsorted.sort(compareAlignment)

    expect(sorted).toStrictEqual(['hero', undefined])
  })
})
