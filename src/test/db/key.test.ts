import { Key } from '../../main'

describe(Key.name, () => {
  describe('Constructor', () => {
    test('should set the value field', () => {
      const key = new Key('foo')
      expect(key.value).toBe('foo')
    })
    test('should accept valid keys', () => {
      new Key('abc')
      new Key('123')
      new Key('abc-123')
    })

    test('should reject invalid keys', () => {
      expect(() => new Key('ABC')).toThrow('Invalid key')
      expect(() => new Key('abC')).toThrow('Invalid key')
      expect(() => new Key('abc%')).toThrow('Invalid key')
      expect(() => new Key('abc 123')).toThrow('Invalid key')
    })
  })
})
