import { Location } from '../../main'

describe(Location.name, () => {
  describe('zoneKey', () => {
    test(`should be set from the data`, () => {
      const location = new Location({ zoneKey: 'foo' })
      expect(location.zoneKey).toEqual('foo')
    })

    test(`should be optional`, () => {
      const location = new Location({})
      expect(location.zoneKey).toBeUndefined()
    })
  })

  describe('coords', () => {
    test(`should be set from the data`, () => {
      const location = new Location({ coords: [1, 2, 3] })
      expect(location.coords).toStrictEqual([1, 2, 3])
    })

    test(`should be optional`, () => {
      const location = new Location({})
      expect(location.coords).toBeUndefined()
    })
  })

  describe('icon', () => {
    test(`should be set from the data`, () => {
      const location = new Location({ icon: 'plaque' })
      expect(location.icon).toBe('plaque')
    })

    test(`should be optional`, () => {
      const location = new Location({})
      expect(location.icon).toBeUndefined()
    })
  })

  describe('iconText', () => {
    test(`should be set from the data`, () => {
      const location = new Location({ iconText: '1' })
      expect(location.iconText).toBe('1')
    })

    test(`should be optional`, () => {
      const location = new Location({})
      expect(location.iconText).toBeUndefined()
    })
  })
})
