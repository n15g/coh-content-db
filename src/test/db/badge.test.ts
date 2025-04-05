import { Badge, compareByDefaultName, compareByZoneKey } from '../../main'
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
      const badge = new Badge(badgeDataFixture.create({ type: 'ACHIEVEMENT' }))
      expect(badge.type).toEqual('ACHIEVEMENT')
    })
  })

  describe('name', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ name: [{ value: 'foo' }] }))
      expect(badge.name.default).toEqual({ value: 'foo' })
    })
  })

  describe('alignment', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ alignment: ['H', 'V'] }))
      expect(badge.alignment.hero).toBeTruthy()
      expect(badge.alignment.villain).toBeTruthy()
      expect(badge.alignment.praetorian).toBeFalsy()
    })
  })

  describe('badgeText', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ badgeText: [{ value: 'foo' }] }))
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

  describe('zoneKey', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ zoneKey: 'foo' }))
      expect(badge.zoneKey).toEqual('foo')
    })

    test('should be optional', () => {
      const badge = new Badge(badgeDataFixture.omit('zoneKey').create())
      expect(badge.zoneKey).toBeUndefined()
    })
  })

  describe('loc', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ loc: [1, 2, 3] }))
      expect(badge.loc).toStrictEqual([1, 2, 3])
    })

    test('should be optional', () => {
      const badge = new Badge(badgeDataFixture.omit('loc').create())
      expect(badge.loc).toBeUndefined()
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

  describe('vidiotMapKey', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ vidiotMapKey: 'foo' }))
      expect(badge.vidiotMapKey).toEqual('foo')
    })

    test('should be optional', () => {
      const badge = new Badge(badgeDataFixture.omit('vidiotMapKey').create())
      expect(badge.vidiotMapKey).toBeUndefined()
    })
  })

  describe('setTitle', () => {
    test('should be set from the data', () => {
      const badge = new Badge(badgeDataFixture.create({ setTitle: { id: 123, praetorianId: 456 } }))
      expect(badge.setTitle).toStrictEqual({ id: 123, praetorianId: 456 })
    })

    test('should be optional', () => {
      const badge = new Badge(badgeDataFixture.omit('setTitle').create())
      expect(badge.setTitle).toBeUndefined()
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
      expect(() => new Badge(data)).toThrow('Duplicate badge requirement key [badge:foo]')
    })
  })

  describe('getRequirement', () => {
    test(`should retrieve requirement from the index`, () => {
      const data = badgeDataFixture.create({
        requirements: [badgeRequirementDataFixture.create({ key: 'foo' })],
      })

      expect(new Badge(data).getRequirement('foo')).not.toBeUndefined()
    })

    test(`should throw error for unknown requirement`, () => {
      const data = badgeDataFixture.create({
        requirements: [],
      })

      expect(() => new Badge(data).getRequirement('foo')).toThrow('Unknown badge requirement key [foo]')
    })
  })

  describe('compareByName', () => {
    test(`should compare two badges by name`, () => {
      const badgeA = new Badge(badgeDataFixture.create({ name: 'A' }))
      const badgeB = new Badge(badgeDataFixture.create({ name: 'B' }))
      expect(compareByDefaultName(badgeA, badgeB)).toBeLessThan(0)
      expect([badgeB, badgeA].sort(compareByDefaultName)).toStrictEqual([badgeA, badgeB])
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
      expect([badgeA, badgeB].sort(compareByDefaultName)).toStrictEqual([badgeA, badgeB])
      expect([badgeB, badgeA].sort(compareByDefaultName)).toStrictEqual([badgeA, badgeB])
    })
  })

  describe('compareByZoneKey', () => {
    test(`should compare two badges by zoneKey`, () => {
      const badgeA = new Badge(badgeDataFixture.create({ zoneKey: 'A' }))
      const badgeB = new Badge(badgeDataFixture.create({ zoneKey: 'B' }))
      expect(compareByZoneKey(badgeA, badgeB)).toBeLessThan(0)
      expect([badgeB, badgeA].sort(compareByZoneKey)).toStrictEqual([badgeA, badgeB])
    })

    test(`should return 0 for equal zoneKeys`, () => {
      const badgeA = new Badge(badgeDataFixture.create({ zoneKey: 'A' }))
      const badgeB = new Badge(badgeDataFixture.create({ zoneKey: 'A' }))
      expect(compareByZoneKey(badgeA, badgeB)).toEqual(0)
    })

    test(`should compare two undefined values`, () => {
      const badgeA = new Badge(badgeDataFixture.omit('zoneKey').create())
      const badgeB = new Badge(badgeDataFixture.omit('zoneKey').create())
      expect(compareByZoneKey(badgeA, badgeB)).toEqual(0)
    })

    test(`should sort undefined values last`, () => {
      const badgeA = new Badge(badgeDataFixture.create({ zoneKey: 'A' }))
      const badgeB = new Badge(badgeDataFixture.omit('zoneKey').create())
      expect([badgeA, badgeB].sort(compareByZoneKey)).toStrictEqual([badgeA, badgeB])
      expect([badgeB, badgeA].sort(compareByZoneKey)).toStrictEqual([badgeA, badgeB])
    })
  })
})
