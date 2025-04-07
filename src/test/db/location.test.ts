import { Location } from '../../main'
import { locationDataFixture } from '../api/location-data.fixture'

describe(Location.name, () => {
  describe('Constructor', () => {
    test(`should accept the test fixture`, () => {
      new Location(locationDataFixture.create())
    })
  })

  describe('zoneKey', () => {
    test(`should be set from the data`, () => {
      const location = new Location(locationDataFixture.create({ zoneKey: 'foo' }))
      expect(location.zoneKey).toEqual('foo')
    })
  })

  describe('coords', () => {
    test(`should be set from the data`, () => {
      const location = new Location(locationDataFixture.create({ coords: [1, 2, 3] }))
      expect(location.coords).toStrictEqual([1, 2, 3])
    })

    test(`should be optional`, () => {
      const location = new Location(locationDataFixture.omit('coords').create())
      expect(location.coords).toBeUndefined()
    })
  })
})
