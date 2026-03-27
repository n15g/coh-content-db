import { OriginBased } from '../../main'

describe(OriginBased.name, () => {
  describe('Constructor', () => {
    test('should accept both primal and praetorian values', () => {
      const ids = new OriginBased([5, 10])
      expect(ids).toBeDefined()
      expect(ids.primal).toEqual(5)
      expect(ids.praetorian).toEqual(10)
    })

    test('should accept primal only', () => {
      const ids = new OriginBased([1])
      expect(ids).toBeDefined()
      expect(ids.primal).toEqual(1)
      expect(ids.praetorian).toBeUndefined()
    })

    test('should accept direct value', () => {
      const ids = new OriginBased(1)
      expect(ids).toBeDefined()
      expect(ids.primal).toEqual(1)
      expect(ids.praetorian).toBeUndefined()
    })
  })
})
