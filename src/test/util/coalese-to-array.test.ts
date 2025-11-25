import { coalesceToArray } from '../../main/util/coalesce-to-array'

describe(coalesceToArray.name, () => {
  test('should return an array unmodified', () => {
    expect(coalesceToArray(['a', 'b'])).toStrictEqual(['a', 'b'])
    expect(coalesceToArray([1, 2])).toStrictEqual([1, 2])
  })

  test('should return a single value as a single-value array', () => {
    expect(coalesceToArray('a')).toStrictEqual(['a'])
    expect(coalesceToArray(1)).toStrictEqual([1])
  })

  test('should return undefined value as undefined', () => {
    expect(coalesceToArray()).toBeUndefined()
  })
})
