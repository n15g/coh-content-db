import { SetTitleIds } from '../../main'

describe(SetTitleIds.name, () => {
  describe('Constructor', () => {
    test('should accept both primal and praetorian values', () => {
      const ids = new SetTitleIds([5, 10])
      expect(ids).toBeDefined()
      expect(ids.primal).toEqual(5)
      expect(ids.praetorian).toEqual(10)
    })

    test('should accept primal only', () => {
      const ids = new SetTitleIds([1])
      expect(ids).toBeDefined()
      expect(ids.primal).toEqual(1)
      expect(ids.praetorian).toBeUndefined()
    })
  })
})
