import { Key } from './key'

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
      expect(() => new Key('ABC')).toThrow('Bad key')
      expect(() => new Key('abC')).toThrow('Bad key')
      expect(() => new Key('abc%')).toThrow('Bad key')
      expect(() => new Key('abc 123')).toThrow('Bad key')
    })
  })
})
