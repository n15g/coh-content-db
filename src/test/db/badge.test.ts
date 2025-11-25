import { Badge, compareByDefaultName, compareByReleaseDate, compareByZoneKey } from '../../main'
import { badgeDataFixture } from '../api/badge-data.fixture'
import { badgeRequirementDataFixture } from '../api/badge-requirement-data.fixture'

describe(Badge.name, () => {
  describe('Constructor', () => {
    test(`should accept the test fixture`, () => {
      new Badge(badgeDataFixture.create())
    })
  })

  describe('key', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ key: 'badge123' }))
      expect(badge.key).toEqual('badge123')
    })
  })

  describe('type', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ type: 'achievement' }))
      expect(badge.type).toEqual('achievement')
    })
  })

  describe('name', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ name: [{ value: 'foo' }] }))
      expect(badge.name.default).toEqual({ value: 'foo' })
    })

    test('should accept a string', () => {
      const badge = new Badge(badgeDataFixture.create({ name: 'foo' }))
      expect(badge.name.default).toEqual({ value: 'foo' })
    })
  })

  describe('releaseDate', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ releaseDate: '2025-08-08' }))
      expect(badge.releaseDate).toEqual(new Date('2025-08-08'))
    })

    test('should not accept an invalid date', () => {
      expect(() =>
        new Badge(badgeDataFixture.create({ releaseDate: '2025-??-08' })),
      ).toThrow('Invalid date')
    })
  })

  describe('morality', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ morality: ['hero', 'villain'] }))
      expect(badge.morality.hero).toBeTruthy()
      expect(badge.morality.villain).toBeTruthy()
    })

    test('should accept a single string', () => {
      const badge = new Badge(badgeDataFixture.create({ morality: 'hero' }))
      expect(badge.morality.hero).toBeTruthy()
      expect(badge.morality.villain).toBeFalsy()
    })

    test('should be optional, defaulting to all', () => {
      const badge = new Badge(badgeDataFixture.omit('morality').create())
      expect(badge.morality.all).toBeTruthy()
    })
  })

  describe('badgeText', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ badgeText: [{ value: 'foo' }] }))
      expect(badge.badgeText.default).toEqual({ value: 'foo' })
    })

    test('should accept a string', () => {
      const badge = new Badge(badgeDataFixture.create({ badgeText: 'foo' }))
      expect(badge.badgeText.default).toEqual({ value: 'foo' })
    })

    test('should be optional', () => {
      const badge = new Badge(badgeDataFixture.omit('badgeText').create())
      expect(badge.badgeText.default).toBeUndefined()
    })
  })

  describe('acquisition', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ acquisition: 'Quest Reward' }))
      expect(badge.acquisition).toEqual('Quest Reward')
    })

    test('should be optional', () => {
      const badge = new Badge(badgeDataFixture.omit('acquisition').create())
      expect(badge.acquisition).toBeUndefined()
    })
  })

  describe('icon', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ icon: [{ value: 'foo' }] }))
      expect(badge.icon.default).toEqual({ value: 'foo' })
    })

    test('should accept a string', () => {
      const badge = new Badge(badgeDataFixture.create({ icon: 'foo' }))
      expect(badge.icon.default).toEqual({ value: 'foo' })
    })

    test('should be optional', () => {
      const badge = new Badge(badgeDataFixture.omit('icon').create())
      expect(badge.icon.default).toBeUndefined()
    })
  })

  describe('notes', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ notes: 'foo' }))
      expect(badge.notes).toEqual('foo')
    })

    test('should be optional', () => {
      const badge = new Badge(badgeDataFixture.omit('notes').create())
      expect(badge.notes).toBeUndefined()
    })
  })

  describe('links', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ links: [{ title: 'foo', href: 'bar' }] }))
      expect(badge.links).toStrictEqual([{ title: 'foo', href: 'bar' }])
    })

    test('should be optional', () => {
      const badge = new Badge(badgeDataFixture.omit('links').create())
      expect(badge.links).toHaveLength(0)
    })
  })

  describe('effect', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ effect: 'foo' }))
      expect(badge.effect).toEqual('foo')
    })

    test('should be optional', () => {
      const badge = new Badge(badgeDataFixture.omit('effect').create())
      expect(badge.effect).toBeUndefined()
    })
  })

  describe('setTitle', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ setTitleId: [123, 456] }))
      expect(badge.setTitleId).toStrictEqual([123, 456])
    })

    test('should treat the praetorian id as optional', () => {
      const badge = new Badge(badgeDataFixture.create({ setTitleId: [123] }))
      expect(badge.setTitleId).toStrictEqual([123])
    })

    test('should be optional', () => {
      const badge = new Badge(badgeDataFixture.omit('setTitleId').create())
      expect(badge.setTitleId).toBeUndefined()
    })
  })

  describe('ignoreInTotals', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ ignoreInTotals: true }))
      expect(badge.ignoreInTotals).toEqual(true)
    })

    test('should default to false', () => {
      const badge = new Badge(badgeDataFixture.omit('ignoreInTotals').create())
      expect(badge.ignoreInTotals).toEqual(false)
    })
  })

  describe('requirements', () => {
    test(`should throw an error on duplicate key`, () => {
      const data = badgeDataFixture.create({
        key: 'badge',
        requirements: [
          badgeRequirementDataFixture.create({ key: 'foo' }),
          badgeRequirementDataFixture.create({ key: 'foo' }),
        ],
      })
      expect(() => new Badge(data)).toThrow('Duplicate key [foo]')
    })

    test(`should return requirement list`, () => {
      const data = badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.create({ key: 'foo' }),
          badgeRequirementDataFixture.create({ key: 'bar' }),
        ],
      })
      const badge = new Badge(data)

      expect(badge.requirements.map(x => x.key)).toStrictEqual(['foo', 'bar'])
    })
  })

  describe('getRequirement', () => {
    test(`should retrieve requirement from the index`, () => {
      const data = badgeDataFixture.create({
        requirements: [badgeRequirementDataFixture.create({ key: 'foo' })],
      })

      expect(new Badge(data).getRequirement('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown requirement`, () => {
      const data = badgeDataFixture.create({
        requirements: [],
      })

      expect(new Badge(data).getRequirement('foo')).toBeUndefined()
    })
  })

  describe('zoneKeys', () => {
    test(`should return the list of keys`, () => {
      const badge = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.create({ location: { zoneKey: 'a' } }),
          badgeRequirementDataFixture.create({ location: { zoneKey: 'c' } }),
          badgeRequirementDataFixture.create({ location: { zoneKey: 'b' } }),
          badgeRequirementDataFixture.create({ location: { zoneKey: 'c' } }),
        ],
      }))
      expect(badge.zoneKeys).toStrictEqual(['a', 'c', 'b'])
    })

    test(`should return undefined if there no zones`, () => {
      const badge = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.omit('location').create(),
        ],
      }))
      expect(badge.zoneKey).toBeUndefined()
    })

    test(`should ignore requirements with no location`, () => {
      const badge = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.create({ location: { zoneKey: 'a' } }),
          badgeRequirementDataFixture.create({ location: { zoneKey: 'c' } }),
          badgeRequirementDataFixture.omit('location').create(),
          badgeRequirementDataFixture.create({ location: { zoneKey: 'c' } }),
        ],
      }))
      expect(badge.zoneKeys).toStrictEqual(['a', 'c'])
    })

    test(`should ignore locations with no zone key`, () => {
      const badge = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.create({ location: { zoneKey: 'a' } }),
          badgeRequirementDataFixture.create({ location: { coords: [1, 2, 3] } }),
          badgeRequirementDataFixture.create({ location: { zoneKey: 'c' } }),
        ],
      }))
      expect(badge.zoneKeys).toStrictEqual(['a', 'c'])
    })
  })

  describe('zoneKey', () => {
    test(`should return the key for a single zone`, () => {
      const badge = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.create({ location: { zoneKey: 'a' } }),
        ],
      }))
      expect(badge.zoneKey).toBe('a')
    })

    test(`should return undefined if there no zones`, () => {
      const badge = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.omit('location').create(),
        ],
      }))
      expect(badge.zoneKey).toBeUndefined()
    })

    test(`should return undefined if there are multiple zones`, () => {
      const badge = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.create({ location: { zoneKey: 'a' } }),
          badgeRequirementDataFixture.create({ location: { zoneKey: 'c' } }),
        ],
      }))
      expect(badge.zoneKey).toBeUndefined()
    })
  })

  describe(compareByDefaultName.name, () => {
    test(`should compare two badges by name`, () => {
      const badgeA = new Badge(badgeDataFixture.create({ name: 'A' }))
      const badgeB = new Badge(badgeDataFixture.create({ name: 'B' }))
      expect(compareByDefaultName(badgeA, badgeB)).toBeLessThan(0)
      expect([badgeB, badgeA].toSorted(compareByDefaultName)).toStrictEqual([badgeA, badgeB])
    })

    test(`should return 0 for equal names`, () => {
      const badgeA = new Badge(badgeDataFixture.create({ name: 'A' }))
      const badgeB = new Badge(badgeDataFixture.create({ name: 'A' }))
      expect(compareByDefaultName(badgeA, badgeB)).toEqual(0)
    })

    test(`should compare two undefined values`, () => {
      const badgeA = new Badge(badgeDataFixture.create({ name: [] }))
      const badgeB = new Badge(badgeDataFixture.create({ name: [] }))
      expect(compareByDefaultName(badgeA, badgeB)).toEqual(0)
    })

    test(`should sort undefined values last`, () => {
      const badgeA = new Badge(badgeDataFixture.create({ name: 'A' }))
      const badgeB = new Badge(badgeDataFixture.create({ name: [] }))
      expect([badgeA, badgeB].toSorted(compareByDefaultName)).toStrictEqual([badgeA, badgeB])
      expect([badgeB, badgeA].toSorted(compareByDefaultName)).toStrictEqual([badgeA, badgeB])
    })
  })

  describe(compareByZoneKey.name, () => {
    test(`should compare two badges by zoneKey`, () => {
      const badgeA = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.create({ location: { zoneKey: 'a' } }),
        ],
      }))
      const badgeB = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.create({ location: { zoneKey: 'b' } }),
        ],
      }))
      expect(compareByZoneKey(badgeA, badgeB)).toBeLessThan(0)
      expect([badgeB, badgeA].toSorted(compareByZoneKey)).toStrictEqual([badgeA, badgeB])
    })

    test(`should return 0 for equal zoneKeys`, () => {
      const badgeA = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.create({ location: { zoneKey: 'a' } }),
        ],
      }))
      const badgeB = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.create({ location: { zoneKey: 'a' } }),
        ],
      }))
      expect(compareByZoneKey(badgeA, badgeB)).toEqual(0)
    })

    test(`should equate two undefined values`, () => {
      const badgeA = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.omit('location').create(),
        ],
      }))
      const badgeB = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.omit('location').create(),
        ],
      }))
      expect(compareByZoneKey(badgeA, badgeB)).toEqual(0)
    })

    test(`should sort badges with multiple values last`, () => {
      const badgeA = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.create({ location: { zoneKey: 'a' } }),
        ],
      }))
      const badgeB = new Badge(badgeDataFixture.create({
        requirements: [
          badgeRequirementDataFixture.create({ location: { zoneKey: 'b' } }),
          badgeRequirementDataFixture.create({ location: { zoneKey: 'c' } }),
        ],
      }))
      expect([badgeA, badgeB].toSorted(compareByZoneKey)).toStrictEqual([badgeA, badgeB])
      expect([badgeB, badgeA].toSorted(compareByZoneKey)).toStrictEqual([badgeA, badgeB])
    })
  })

  describe(compareByReleaseDate.name, () => {
    test(`should compare two badges by releaseDate`, () => {
      const badgeA = new Badge(badgeDataFixture.create({ releaseDate: '2024-01-01' }))
      const badgeB = new Badge(badgeDataFixture.create({ releaseDate: '2025-01-01' }))
      expect(compareByReleaseDate(badgeA, badgeB)).toBeLessThan(0)
      expect([badgeB, badgeA].toSorted(compareByReleaseDate)).toStrictEqual([badgeA, badgeB])
    })

    test(`should return 0 for equal releaseDates`, () => {
      const badgeA = new Badge(badgeDataFixture.create({ releaseDate: '2025-01-01' }))
      const badgeB = new Badge(badgeDataFixture.create({ releaseDate: '2025-01-01' }))
      expect(compareByReleaseDate(badgeA, badgeB)).toEqual(0)
    })

    test(`should equate two undefined values`, () => {
      const badgeA = undefined
      const badgeB = undefined
      expect(compareByReleaseDate(badgeA, badgeB)).toEqual(0)
    })

    test(`should compare undefined value as higher`, () => {
      const badgeA = undefined
      const badgeB = new Badge(badgeDataFixture.create({ releaseDate: '2025-01-01' }))
      expect(compareByReleaseDate(badgeA, badgeB)).toBeGreaterThan(0)
      expect([badgeA, badgeB].toSorted(compareByReleaseDate)).toStrictEqual([badgeB, badgeA])

      expect(compareByReleaseDate(badgeB, badgeA)).toBeLessThan(0)
      expect([badgeB, badgeA].toSorted(compareByReleaseDate)).toStrictEqual([badgeB, badgeA])
    })
  })
})
