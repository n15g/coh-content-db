import { Alternates } from '../../main'

describe(Alternates.name, () => {
  describe('Constructor', () => {
    test('should accept a list of alternate values', () => {
      new Alternates([
        { value: 'Default' },
        { sex: 'M', value: 'Male' },
        { alignment: 'H', value: 'Hero' },
        { alignment: 'V', sex: 'M', value: 'Male Villain' },
        { alignment: 'P', sex: 'F', value: 'Praetorian Female' },
      ])
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
        { alignment: 'H', value: 'Hero' },
        { alignment: 'V', sex: 'M', value: 'Male Villain' },
        { alignment: 'P', sex: 'F', value: 'Praetorian Female' },
      ]).getValue()).toBe('Default')
    })

    test('should return the least-specific value when no classifiers are provided, regardless of insert order', () => {
      expect(new Alternates([
        { alignment: 'V', sex: 'M', value: 'Male Villain' },
        { alignment: 'H', value: 'Hero' },
        { value: 'Default' },
        { sex: 'M', value: 'Male' },
        { alignment: 'P', sex: 'F', value: 'Praetorian Female' },
      ]).getValue()).toBe('Default')
    })

    test('should return the most specific match', () => {
      expect(new Alternates([
        { value: 'Default' },
        { sex: 'M', value: 'Male' },
        { alignment: 'H', value: 'Hero' },
        { alignment: 'V', sex: 'M', value: 'Male Villain' },
        { alignment: 'P', sex: 'F', value: 'Praetorian Female' },
      ]).getValue('V', 'M')).toBe('Male Villain')
    })

    test('should return the most specific match, regardless of insert order', () => {
      expect(new Alternates([
        { alignment: 'P', sex: 'F', value: 'Praetorian Female' },
        { sex: 'M', value: 'Male' },
        { alignment: 'H', value: 'Hero' },
        { alignment: 'V', sex: 'M', value: 'Male Villain' },
        { value: 'Default' },
      ]).getValue('V', 'M')).toBe('Male Villain')
    })

    test('should return the lowest canonical value if there is no default', () => {
      expect(new Alternates([
        { alignment: 'H', value: 'Hero' },
        { sex: 'M', value: 'Male' },
        { alignment: 'P', sex: 'F', value: 'Praetorian Female' },
        { alignment: 'V', sex: 'M', value: 'Male Villain' },
      ]).getValue()).toBe('Male')
    })

    test('should return the lowest canonical value if a specific is requested that does not exist', () => {
      expect(new Alternates([
        { alignment: 'H', value: 'Hero' },
        { alignment: 'V', value: 'Villain' },
        { alignment: 'V', sex: 'M', value: 'Male Villain' },
        { alignment: 'P', sex: 'F', value: 'Praetorian Female' },
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
        { alignment: 'H', value: 'Hero' },
        { alignment: 'V', sex: 'M', value: 'Male Villain' },
        { alignment: 'P', sex: 'F', value: 'Praetorian Female' },
      ]).default?.value).toBe('Default')

      expect(new Alternates([
        { alignment: 'V', sex: 'M', value: 'Male Villain' },
        { alignment: 'P', sex: 'F', value: 'Praetorian Female' },
        { sex: 'M', value: 'Male' },
        { value: 'Default' },
        { alignment: 'H', value: 'Hero' },
      ]).default?.value).toBe('Default')

      expect(new Alternates([
        { alignment: 'V', sex: 'M', value: 'Male Villain' },
        { alignment: 'P', sex: 'F', value: 'Praetorian Female' },
        { sex: 'M', value: 'Male' },
        { alignment: 'H', value: 'Hero' },
      ]).default?.value).toBe('Male')
    })
  })

  describe('canonical', () => {
    test('should be empty if there are no values', () => {
      expect(new Alternates([]).canonical).toHaveLength(0)
    })

    test('should return values sorted in canonical order', () => {
      const result = new Alternates([
        { alignment: 'H', sex: 'F', value: 'Female Hero' },
        { alignment: 'P', value: 'Praetorian' },
        { sex: 'F', value: 'Female' },
        { alignment: 'V', sex: 'M', value: 'Male Villain' },
        { alignment: 'P', sex: 'M', value: 'Male Praetorian' },
        { alignment: 'H', value: 'Hero' },
        { alignment: 'H', sex: 'M', value: 'Male Hero' },
        { sex: 'M', value: 'Male' },
        { alignment: 'V', value: 'Villain' },
        { alignment: 'V', sex: 'F', value: 'Female Villain' },
        { alignment: 'P', sex: 'F', value: 'Female Praetorian' },
        { value: 'Default' },
      ]).canonical

      expect(result).toStrictEqual([
        { value: 'Default' },
        { sex: 'M', value: 'Male' },
        { sex: 'F', value: 'Female' },
        { alignment: 'H', value: 'Hero' },
        { alignment: 'V', value: 'Villain' },
        { alignment: 'P', value: 'Praetorian' },
        { alignment: 'H', sex: 'M', value: 'Male Hero' },
        { alignment: 'H', sex: 'F', value: 'Female Hero' },
        { alignment: 'V', sex: 'M', value: 'Male Villain' },
        { alignment: 'V', sex: 'F', value: 'Female Villain' },
        { alignment: 'P', sex: 'M', value: 'Male Praetorian' },
        { alignment: 'P', sex: 'F', value: 'Female Praetorian' },
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

    test('should sort identical values similarly', () => {
      expect(new Alternates([
        { value: 'A' },
        { value: 'B' },
        { value: 'C' },
        { value: 'B' },
      ]).canonical).toStrictEqual([
        { value: 'A' },
        { value: 'B' },
        { value: 'B' },
        { value: 'C' },
      ])
    })
  })

  describe('toString', () => {
    test('should create a string separated by the separator', () => {
      expect(new Alternates([
        { sex: 'M', value: 'A' },
        { sex: 'F', value: 'B' },
        { alignment: 'H', value: 'C' },
      ]).toString(', ')).toBe('A, B, C')
    })
  })
})
