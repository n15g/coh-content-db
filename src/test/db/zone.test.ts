import { Zone } from '../../main'
import { zoneDataFixture } from '../api/zone-data.fixture'

describe(Zone.name, () => {
  describe('Constructor', () => {
    test(`should accept the test fixture`, () => {
      new Zone(zoneDataFixture.create())
    })
  })

  describe('key', () => {
    test(`should be set from the data`, () => {
      const zone = new Zone(zoneDataFixture.create({ key: 'foo' }))
      expect(zone.key).toEqual('foo')
    })
  })

  describe('name', () => {
    test(`should be set from the data`, () => {
      const zone = new Zone(zoneDataFixture.create({ name: 'foo' }))
      expect(zone.name).toEqual('foo')
    })
  })

  describe('links', () => {
    test(`should be set from the data`, () => {
      const zone = new Zone(zoneDataFixture.create({ links: [{ title: 'foo', href: 'bar' }] }))
      expect(zone.links).toStrictEqual([{ title: 'foo', href: 'bar' }])
    })

    test(`should be optional`, () => {
      const zone = new Zone(zoneDataFixture.omit('links').create())
      expect(zone.links).toHaveLength(0)
    })
  })
})
