import { Alternates } from '../../main'

describe(Alternates.name, () => {
  describe('Constructor', () => {
    test('should accept a list of alternate values', () => {
      new Alternates([
        { value: 'Default' },
        { sex: 'M', value: 'Male' },
        { alignment: 'hero', value: 'Hero' },
        { alignment: 'villain', sex: 'M', value: 'Male Villain' },
        { alignment: 'praetorian', sex: 'F', value: 'Praetorian Female' },
      ])
    })

    test('should accept a single value', () => {
      expect(new Alternates('foo').default?.value).toBe('foo')
    })
  })

  describe('getValue', () => {
    test('should return undefined if there are no values', () => {
      expect(new Alternates([]).getValue()).toBeUndefined()
    })

    test('should return the least-specific value when no classifiers are provided', () => {
      expect(new Alternates([
        { value: 'Default' },
        { sex: 'M', value: 'Male' },
        { alignment: 'hero', value: 'Hero' },
        { alignment: 'villain', sex: 'M', value: 'Male Villain' },
        { alignment: 'praetorian', sex: 'F', value: 'Praetorian Female' },
      ]).getValue()).toBe('Default')
    })

    test('should return the least-specific value when no classifiers are provided, regardless of insert order', () => {
      expect(new Alternates([
        { alignment: 'villain', sex: 'M', value: 'Male Villain' },
        { alignment: 'hero', value: 'Hero' },
        { value: 'Default' },
        { sex: 'M', value: 'Male' },
        { alignment: 'praetorian', sex: 'F', value: 'Praetorian Female' },
      ]).getValue()).toBe('Default')
    })

    test('should return the most specific match', () => {
      expect(new Alternates([
        { value: 'Default' },
        { sex: 'M', value: 'Male' },
        { alignment: 'hero', value: 'Hero' },
        { alignment: 'villain', sex: 'M', value: 'Male Villain' },
        { alignment: 'praetorian', sex: 'F', value: 'Praetorian Female' },
      ]).getValue('villain', 'M')).toBe('Male Villain')
    })

    test('should return the most specific match, regardless of insert order', () => {
      expect(new Alternates([
        { alignment: 'praetorian', sex: 'F', value: 'Praetorian Female' },
        { sex: 'M', value: 'Male' },
        { alignment: 'hero', value: 'Hero' },
        { alignment: 'villain', sex: 'M', value: 'Male Villain' },
        { value: 'Default' },
      ]).getValue('villain', 'M')).toBe('Male Villain')
    })

    test('should return the lowest canonical value if there is no default', () => {
      expect(new Alternates([
        { alignment: 'hero', value: 'Hero' },
        { sex: 'M', value: 'Male' },
        { alignment: 'praetorian', sex: 'F', value: 'Praetorian Female' },
        { alignment: 'villain', sex: 'M', value: 'Male Villain' },
      ]).getValue()).toBe('Male')
    })

    test('should return the lowest canonical value if a specific is requested that does not exist', () => {
      expect(new Alternates([
        { alignment: 'hero', value: 'Hero' },
        { alignment: 'villain', value: 'Villain' },
        { alignment: 'villain', sex: 'M', value: 'Male Villain' },
        { alignment: 'praetorian', sex: 'F', value: 'Praetorian Female' },
      ]).getValue(undefined, 'F')).toBe('Hero')
    })
  })

  describe('default', () => {
    test('should return undefined if there are no values', () => {
      expect(new Alternates([]).default).toBeUndefined()
    })

    test('should return the lowest priority value', () => {
      expect(new Alternates([
        { value: 'Default' },
        { sex: 'M', value: 'Male' },
        { alignment: 'hero', value: 'Hero' },
        { alignment: 'villain', sex: 'M', value: 'Male Villain' },
        { alignment: 'praetorian', sex: 'F', value: 'Praetorian Female' },
      ]).default?.value).toBe('Default')

      expect(new Alternates([
        { alignment: 'villain', sex: 'M', value: 'Male Villain' },
        { alignment: 'praetorian', sex: 'F', value: 'Praetorian Female' },
        { sex: 'M', value: 'Male' },
        { value: 'Default' },
        { alignment: 'hero', value: 'Hero' },
      ]).default?.value).toBe('Default')

      expect(new Alternates([
        { alignment: 'villain', sex: 'M', value: 'Male Villain' },
        { alignment: 'praetorian', sex: 'F', value: 'Praetorian Female' },
        { sex: 'M', value: 'Male' },
        { alignment: 'hero', value: 'Hero' },
      ]).default?.value).toBe('Male')
    })
  })

  describe('canonical', () => {
    test('should be empty if there are no values', () => {
      expect(new Alternates([]).canonical).toHaveLength(0)
    })

    test('should return values sorted in canonical order', () => {
      const result = new Alternates([
        { alignment: 'hero', sex: 'F', value: 'Female Hero' },
        { alignment: 'praetorian', value: 'Praetorian' },
        { sex: 'F', value: 'Female' },
        { alignment: 'villain', sex: 'M', value: 'Male Villain' },
        { alignment: 'praetorian', sex: 'M', value: 'Male Praetorian' },
        { alignment: 'hero', value: 'Hero' },
        { alignment: 'hero', sex: 'M', value: 'Male Hero' },
        { sex: 'M', value: 'Male' },
        { alignment: 'villain', value: 'Villain' },
        { alignment: 'villain', sex: 'F', value: 'Female Villain' },
        { alignment: 'praetorian', sex: 'F', value: 'Female Praetorian' },
        { value: 'Default' },
      ]).canonical

      expect(result).toStrictEqual([
        { value: 'Default' },
        { sex: 'M', value: 'Male' },
        { sex: 'F', value: 'Female' },
        { alignment: 'hero', value: 'Hero' },
        { alignment: 'villain', value: 'Villain' },
        { alignment: 'praetorian', value: 'Praetorian' },
        { alignment: 'hero', sex: 'M', value: 'Male Hero' },
        { alignment: 'hero', sex: 'F', value: 'Female Hero' },
        { alignment: 'villain', sex: 'M', value: 'Male Villain' },
        { alignment: 'villain', sex: 'F', value: 'Female Villain' },
        { alignment: 'praetorian', sex: 'M', value: 'Male Praetorian' },
        { alignment: 'praetorian', sex: 'F', value: 'Female Praetorian' },
      ])
    })

    test('should sort unspecified values by alpha', () => {
      expect(new Alternates([
        { value: 'A' },
        { value: 'C' },
        { value: 'B' },
      ]).canonical).toStrictEqual([
        { value: 'A' },
        { value: 'B' },
        { value: 'C' },
      ])
    })

    test('should sort identical values by value alpha', () => {
      expect(new Alternates([
        { alignment: 'villain', value: 'B' },
        { sex: 'M', value: 'D' },
        { alignment: 'villain', value: 'A' },
        { sex: 'M', value: 'C' },
      ]).canonical).toStrictEqual([
        { sex: 'M', value: 'C' },
        { sex: 'M', value: 'D' },
        { alignment: 'villain', value: 'A' },
        { alignment: 'villain', value: 'B' },
      ])
    })
  })

  describe('toString', () => {
    test('should create a string separated by the separator', () => {
      expect(new Alternates([
        { sex: 'M', value: 'A' },
        { sex: 'F', value: 'B' },
        { alignment: 'hero', value: 'C' },
      ]).toString(', ')).toBe('A, B, C')
    })
  })
})
