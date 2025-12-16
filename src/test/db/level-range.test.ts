import { LevelRange } from '../../main'

describe(LevelRange.name, () => {
  describe('Constructor', () => {
    test('should accept a full array (5-10)', () => {
      const range = new LevelRange([5, 10])
      expect(range).toBeDefined()
      expect(range.min).toEqual(5)
      expect(range.max).toEqual(10)
    })

    test('should accept a partial array (15+)', () => {
      const range = new LevelRange([15])
      expect(range).toBeDefined()
      expect(range.min).toEqual(15)
      expect(range.max).toBeUndefined()
    })

    test('should not coalesce a explicit max of 50 (20-50)', () => {
      const range = new LevelRange([20, 50])
      expect(range).toBeDefined()
      expect(range.min).toEqual(20)
      expect(range.max).toEqual(50)
    })

    test('should accept a single-level range (1-1)', () => {
      const range = new LevelRange([1, 1])
      expect(range).toBeDefined()
      expect(range.min).toEqual(1)
      expect(range.max).toEqual(1)
    })

    test('should accept a zero value (0-0)', () => {
      const range = new LevelRange([0, 0])
      expect(range).toBeDefined()
      expect(range.min).toEqual(0)
      expect(range.max).toEqual(0)
    })

    test('should accept a number (5+)', () => {
      const range = new LevelRange(5)
      expect(range).toBeDefined()
      expect(range.min).toEqual(5)
      expect(range.max).toBeUndefined()
    })
  })
})
