import { compareSex, Sex, SEX } from '../../main'

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

describe('compareSex', () => {
  test('should return <0 if first argument comes first', () => {
    expect(compareSex('M', 'F')).toBeLessThan(0)
  })

  test('should return >0 if second argument comes first', () => {
    expect(compareSex('F', 'M')).toBeGreaterThan(0)
  })

  test('should return 0 if arguments match', () => {
    expect(compareSex('F', 'F')).toBe(0)
  })

  test('should return 0 if both arguments are undefined', () => {
    expect(compareSex()).toBe(0)
  })

  test('should work as a compare function', () => {
    const unsorted: (Sex | undefined)[] = [undefined, 'M', 'F', 'M', undefined, 'F', 'M']
    const sorted = unsorted.sort(compareSex)

    expect(sorted).toStrictEqual(['M', 'M', 'M', 'F', 'F', undefined, undefined])
  })

  test('should sort against undefined', () => {
    const unsorted: (Sex | undefined)[] = [undefined, 'M']
    const sorted = unsorted.sort(compareSex)

    expect(sorted).toStrictEqual(['M', undefined])
  })
})
