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

  describe('type', () => {
    test(`should be set from the data`, () => {
      const zone = new Zone(zoneDataFixture.create({ type: 'city' }))
      expect(zone.type).toEqual('city')
    })
  })

  describe('morality', () => {
    test(`should be set from the data`, () => {
      const zone = new Zone(zoneDataFixture.create({ morality: ['hero'] }))
      expect(zone.morality?.hero).toBeTruthy()
      expect(zone.morality?.vigilante).toBeFalsy()
    })

    test(`should be optional`, () => {
      const zone = new Zone(zoneDataFixture.omit('morality').create())
      expect(zone.morality?.all).toBeTruthy()
    })
  })

  describe('levelRange', () => {
    test(`should be set from the data`, () => {
      const zone = new Zone(zoneDataFixture.create({ levelRange: [10] }))
      expect(zone.levelRange?.min).toEqual(10)
      expect(zone.levelRange?.max).toBeUndefined()
    })

    test(`should be optional`, () => {
      const zone = new Zone(zoneDataFixture.omit('levelRange').create())
      expect(zone.levelRange).toBeUndefined()
    })
  })

  describe('notes', () => {
    test(`should be set from the data`, () => {
      const zone = new Zone(zoneDataFixture.create({ notes: 'foo' }))
      expect(zone.notes).toEqual('foo')
    })

    test(`should be optional`, () => {
      const zone = new Zone(zoneDataFixture.omit('notes').create())
      expect(zone.notes).toBeUndefined()
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
