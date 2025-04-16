import { AbstractIndex } from '../../main/db/abstract-index'

interface TestObject {
  key: string
  otherValue: number
}

describe(AbstractIndex.name, () => {
  describe('Constructor', () => {
    test(`should accept the key field`, () => {
      new AbstractIndex<TestObject>('key', [])
    })

    test(`should throw an error on duplicate key`, () => {
      expect(() => new AbstractIndex<TestObject>('key', [
        { key: '1', otherValue: 1 },
        { key: '1', otherValue: 1 },
      ])).toThrow('Duplicate key [1]')
    })
  })

  describe('value', () => {
    test(`should return the original values`, () => {
      const values = [
        { key: '1', otherValue: 1 },
        { key: '2', otherValue: 2 },
      ]
      const index = new AbstractIndex<TestObject>('key', values)
      expect(index.values).toStrictEqual(values)
    })
  })

  describe('get', () => {
    test(`should return the indexed value on match`, () => {
      const index = new AbstractIndex<TestObject>('key', [
        { key: '1', otherValue: 1 },
        { key: '2', otherValue: 2 },
      ])

      expect(index.get('2')).toStrictEqual({ key: '2', otherValue: 2 })
    })

    test(`should return undefined on no match`, () => {
      const index = new AbstractIndex<TestObject>('key', [])

      expect(index.get('2')).toBeUndefined()
    })

    test(`should return undefined on undefined key`, () => {
      const index = new AbstractIndex<TestObject>('key', [])
      const key = undefined
      expect(index.get(key)).toBeUndefined()
    })
  })
})
