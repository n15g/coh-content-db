import { toDate } from '../../main/util/to-date'

describe(toDate.name, () => {
  test('should return a valid date', () => {
    expect(toDate('2025-02-01')).toStrictEqual(new Date('2025-02-01'))
  })

  test('should return a valid time', () => {
    expect(toDate('2025-04-21T02:57:52.402Z')).toStrictEqual(new Date('2025-04-21T02:57:52.402Z'))
  })

  test('should throw on invalid ISO string', () => {
    expect(() => toDate('foo')).toThrow('Invalid date')
  })
})
