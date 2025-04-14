import { AbstractIndex } from '../../main/db/abstract-index'

interface TestObject {
  key: string
  otherValue: number
}

describe(AbstractIndex.name, () => {
  describe('Constructor', () => {
    test(`should accept the key field`, () => {
      new AbstractIndex<TestObject>('key')
    })
  })

  describe('value', () => {
    test(`should return the original values`, () => {
      const values = [
        { key: '1', otherValue: 1 },
        { key: '2', otherValue: 2 },
      ]
      const index = new AbstractIndex<TestObject>('key')
      index.load(values)

      expect(index.values).toStrictEqual(values)
    })
  })

  describe('get', () => {
    test(`should return the indexed value on match`, () => {
      const index = new AbstractIndex<TestObject>('key')
      index.load([
        { key: '1', otherValue: 1 },
        { key: '2', otherValue: 2 },
      ])

      expect(index.get('2')).toStrictEqual({ key: '2', otherValue: 2 })
    })

    test(`should return undefined on no match`, () => {
      const index = new AbstractIndex<TestObject>('key')

      expect(index.get('2')).toBeUndefined()
    })

    test(`should return undefined on undefined key`, () => {
      const index = new AbstractIndex<TestObject>('key')
      const key = undefined
      expect(index.get(key)).toBeUndefined()
    })
  })

  describe('load', () => {
    test(`should reset the index when used`, () => {
      const index = new AbstractIndex<TestObject>('key')
      index.load([
        { key: '1', otherValue: 1 },
        { key: '2', otherValue: 2 },
      ])

      expect(index.get('2')).toStrictEqual({ key: '2', otherValue: 2 })

      index.load([
        { key: '3', otherValue: 3 },
      ])
      expect(index.get('1')).toBeUndefined()
      expect(index.get('2')).toBeUndefined()
      expect(index.get('3')).toStrictEqual({ key: '3', otherValue: 3 })
    })

    test(`should accept an undefined value`, () => {
      const index = new AbstractIndex<TestObject>('key')
      const values = undefined
      index.load(values)

      expect(index.values).toHaveLength(0)
    })

    test(`should throw an error on duplicate key`, () => {
      const index = new AbstractIndex<TestObject>('key')
      expect(() => index.load([
        { key: '1', otherValue: 1 },
        { key: '1', otherValue: 1 },
      ])).toThrow('Duplicate key [1]')
    })
  })
})
