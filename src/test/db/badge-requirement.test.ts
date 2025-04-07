import { BadgeRequirement } from '../../main'
import { badgeRequirementDataFixture } from '../api/badge-requirement-data.fixture'

describe(BadgeRequirement.name, () => {
  describe('Constructor', () => {
    test('should accept the test fixture', () => {
      new BadgeRequirement(badgeRequirementDataFixture.create())
    })
  })

  describe('key', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ key: 'foo' }))
      expect(requirement.key).toEqual('foo')
    })
  })

  describe('type', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ type: 'badge' }))
      expect(requirement.type).toEqual('badge')
    })
  })

  describe('location', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ location: { zoneKey: 'foo', coords: [1, 2, 3] } }))
      expect(requirement.location).toStrictEqual({ zoneKey: 'foo', coords: [1, 2, 3] })
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('location').create())
      expect(requirement.location).toBeUndefined()
    })
  })

  describe('badgeKey', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ badgeKey: 'foo' }))
      expect(requirement.badgeKey).toEqual('foo')
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('badgeKey').create())
      expect(requirement.badgeKey).toBeUndefined()
    })
  })

  describe('missionKey', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ missionKey: 'foo' }))
      expect(requirement.missionKey).toEqual('foo')
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('missionKey').create())
      expect(requirement.missionKey).toBeUndefined()
    })
  })

  describe('monumentText', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ monumentText: 'foo' }))
      expect(requirement.monumentText).toEqual('foo')
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('monumentText').create())
      expect(requirement.monumentText).toBeUndefined()
    })
  })

  describe('inventionLevel', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ inventionLevel: 10 }))
      expect(requirement.inventionLevel).toEqual(10)
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('inventionLevel').create())
      expect(requirement.inventionLevel).toBeUndefined()
    })
  })

  describe('inventionTypes', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ inventionTypes: ['accuracy', 'confuse'] }))
      expect(requirement.inventionTypes).toStrictEqual(['accuracy', 'confuse'])
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('inventionTypes').create())
      expect(requirement.inventionTypes).toBeUndefined()
    })
  })

  describe('count', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ count: 5 }))
      expect(requirement.count).toEqual(5)
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('count').create())
      expect(requirement.count).toBeUndefined()
    })
  })

  describe('notes', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ notes: 'some notes' }))
      expect(requirement.notes).toEqual('some notes')
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('notes').create())
      expect(requirement.notes).toBeUndefined()
    })
  })

  describe('links', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ links: [{ title: 'foo', href: 'bar' }] }))
      expect(requirement.links).toStrictEqual([{ title: 'foo', href: 'bar' }])
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('links').create())
      expect(requirement.links).toHaveLength(0)
    })
  })
})
