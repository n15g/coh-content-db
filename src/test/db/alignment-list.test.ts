import { AlignmentList } from '../../main'

describe(AlignmentList.name, () => {
  describe('items', () => {
    test('should return the basic set', () => {
      expect(new AlignmentList(['hero', 'villain']).items).toStrictEqual(['hero', 'villain'])
    })

    test('should collapse extended values', () => {
      expect(new AlignmentList(['primal']).items).toStrictEqual(['hero', 'villain'])
    })

    test('should not duplicate overlaps', () => {
      expect(new AlignmentList(['primal', 'all', 'hero']).items).toStrictEqual(['hero', 'villain', 'praetorian'])
    })

    test('should have deterministic order', () => {
      expect(new AlignmentList(['hero', 'villain']).items).toStrictEqual(['hero', 'villain'])
      expect(new AlignmentList(['villain', 'hero']).items).toStrictEqual(['hero', 'villain'])
      expect(new AlignmentList(['primal', 'all', 'hero']).items).toStrictEqual(['hero', 'villain', 'praetorian'])
      expect(new AlignmentList(['hero', 'primal', 'all']).items).toStrictEqual(['hero', 'villain', 'praetorian'])
      expect(new AlignmentList(['all', 'hero', 'primal']).items).toStrictEqual(['hero', 'villain', 'praetorian'])
    })

    test('should treat undefined as all values', () => {
      expect(new AlignmentList().items).toStrictEqual(['hero', 'villain', 'praetorian'])
    })

    test('should treat empty as no values', () => {
      expect(new AlignmentList([]).items).toStrictEqual([])
    })
  })

  describe('values', () => {
    test('should all be true when undefined', () => {
      const alignments = new AlignmentList()
      expect(alignments.hero).toBeTruthy()
      expect(alignments.villain).toBeTruthy()
      expect(alignments.praetorian).toBeTruthy()
      expect(alignments.primal).toBeTruthy()
      expect(alignments.all).toBeTruthy()
    })

    test('should all be false when empty', () => {
      const alignments = new AlignmentList([])
      expect(alignments.hero).toBeFalsy()
      expect(alignments.villain).toBeFalsy()
      expect(alignments.praetorian).toBeFalsy()
      expect(alignments.primal).toBeFalsy()
      expect(alignments.all).toBeFalsy()
    })
  })

  describe('hero', () => {
    test('should detect a hero', () => {
      expect(new AlignmentList(['hero', 'villain']).hero).toBeTruthy()
    })

    test('should detect primal', () => {
      expect(new AlignmentList(['primal']).hero).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new AlignmentList(['all']).hero).toBeTruthy()
    })

    test('should not falsely detect a hero', () => {
      expect(new AlignmentList(['villain']).hero).toBeFalsy()
    })
  })

  describe('villain', () => {
    test('should detect a villain', () => {
      expect(new AlignmentList(['hero', 'villain']).villain).toBeTruthy()
    })

    test('should detect primal', () => {
      expect(new AlignmentList(['primal']).villain).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new AlignmentList(['all']).villain).toBeTruthy()
    })

    test('should not falsely detect a villain', () => {
      expect(new AlignmentList(['hero']).villain).toBeFalsy()
    })
  })

  describe('praetorian', () => {
    test('should detect a praetorian', () => {
      expect(new AlignmentList(['hero', 'praetorian']).praetorian).toBeTruthy()
    })

    test('should not detect primal', () => {
      expect(new AlignmentList(['primal']).praetorian).toBeFalsy()
    })

    test('should detect all', () => {
      expect(new AlignmentList(['all']).praetorian).toBeTruthy()
    })

    test('should not falsely detect a praetorian', () => {
      expect(new AlignmentList(['villain']).praetorian).toBeFalsy()
    })
  })

  describe('primal', () => {
    test('should detect hero and villain', () => {
      expect(new AlignmentList(['hero', 'villain']).primal).toBeTruthy()
    })

    test('should detect primal', () => {
      expect(new AlignmentList(['primal']).primal).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new AlignmentList(['all']).primal).toBeTruthy()
    })

    test('should not falsely detect a primal', () => {
      expect(new AlignmentList(['villain']).primal).toBeFalsy()
      expect(new AlignmentList(['praetorian']).primal).toBeFalsy()
    })
  })

  describe('all', () => {
    test('should detect when all are present', () => {
      expect(new AlignmentList(['hero', 'villain', 'praetorian']).all).toBeTruthy()
    })

    test('should detect primal and praetorian', () => {
      expect(new AlignmentList(['primal', 'praetorian']).all).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new AlignmentList(['all']).all).toBeTruthy()
    })

    test('should not falsely detect all', () => {
      expect(new AlignmentList(['villain']).all).toBeFalsy()
      expect(new AlignmentList(['praetorian']).all).toBeFalsy()
      expect(new AlignmentList(['primal']).all).toBeFalsy()
    })
  })

  describe('has', () => {
    test('should return true if present', () => {
      expect(new AlignmentList(['villain']).has('villain')).toBeTruthy()
    })

    test('should return false if absent', () => {
      expect(new AlignmentList(['hero']).has('villain')).toBeFalsy()
      expect(new AlignmentList(['hero', 'praetorian']).has('primal')).toBeFalsy()
    })

    test('should return false if undefined', () => {
      expect(new AlignmentList(['hero']).has()).toBeFalsy()
    })

    test('should test hero correctly', () => {
      expect(new AlignmentList(['hero']).has('hero')).toBeTruthy()
      expect(new AlignmentList(['primal']).has('hero')).toBeTruthy()
      expect(new AlignmentList(['all']).has('hero')).toBeTruthy()

      expect(new AlignmentList(['villain']).has('hero')).toBeFalsy()
    })

    test('should test villain correctly', () => {
      expect(new AlignmentList(['villain']).has('villain')).toBeTruthy()
      expect(new AlignmentList(['primal']).has('villain')).toBeTruthy()
      expect(new AlignmentList(['all']).has('villain')).toBeTruthy()

      expect(new AlignmentList(['hero']).has('villain')).toBeFalsy()
    })

    test('should test praetorian correctly', () => {
      expect(new AlignmentList(['praetorian']).has('praetorian')).toBeTruthy()
      expect(new AlignmentList(['all']).has('praetorian')).toBeTruthy()

      expect(new AlignmentList(['villain']).has('praetorian')).toBeFalsy()
    })

    test('should test primal correctly', () => {
      expect(new AlignmentList(['hero', 'villain']).has('primal')).toBeTruthy()
      expect(new AlignmentList(['primal']).has('primal')).toBeTruthy()
      expect(new AlignmentList(['all']).has('primal')).toBeTruthy()

      expect(new AlignmentList(['praetorian']).has('primal')).toBeFalsy()
    })

    test('should test all correctly', () => {
      expect(new AlignmentList(['hero', 'villain', 'praetorian']).has('all')).toBeTruthy()
      expect(new AlignmentList(['primal', 'praetorian']).has('all')).toBeTruthy()
      expect(new AlignmentList(['all']).has('all')).toBeTruthy()

      expect(new AlignmentList([]).has('all')).toBeFalsy()
    })
  })
})
