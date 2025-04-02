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
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ type: 'BADGE' }))
      expect(requirement.type).toEqual('BADGE')
    })
  })

  describe('zoneKey', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ zoneKey: 'zone123' }))
      expect(requirement.zoneKey).toEqual('zone123')
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('zoneKey').create())
      expect(requirement.zoneKey).toBeUndefined()
    })
  })

  describe('loc', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ loc: [1, 2, 3] }))
      expect(requirement.loc).toStrictEqual([1, 2, 3])
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('loc').create())
      expect(requirement.loc).toBeUndefined()
    })
  })

  describe('plaqueType', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ plaqueType: 'MONUMENT' }))
      expect(requirement.plaqueType).toEqual('MONUMENT')
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('plaqueType').create())
      expect(requirement.plaqueType).toBeUndefined()
    })
  })

  describe('plaqueInscription', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ plaqueInscription: 'foo' }))
      expect(requirement.plaqueInscription).toEqual('foo')
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('plaqueInscription').create())
      expect(requirement.plaqueInscription).toBeUndefined()
    })
  })

  describe('vidiotMapKey', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ vidiotMapKey: 'A1' }))
      expect(requirement.vidiotMapKey).toEqual('A1')
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('vidiotMapKey').create())
      expect(requirement.vidiotMapKey).toBeUndefined()
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

  describe('missionName', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ missionName: 'foo' }))
      expect(requirement.missionName).toEqual('foo')
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('missionName').create())
      expect(requirement.missionName).toBeUndefined()
    })
  })

  describe('contactKey', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ contactKey: 'foo' }))
      expect(requirement.contactKey).toEqual('foo')
    })

    test('should accept an array', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ contactKey: ['foo', 'bar'] }))
      expect(requirement.contactKey).toStrictEqual(['foo', 'bar'])
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('contactKey').create())
      expect(requirement.contactKey).toBeUndefined()
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
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ inventionTypes: ['ACCURACY', 'CONFUSE'] }))
      expect(requirement.inventionTypes).toStrictEqual(['ACCURACY', 'CONFUSE'])
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('inventionTypes').create())
      expect(requirement.inventionTypes).toBeUndefined()
    })
  })

  describe('inventionCount', () => {
    test('should be set from the data', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.create({ inventionCount: 5 }))
      expect(requirement.inventionCount).toEqual(5)
    })

    test('should be optional', () => {
      const requirement = new BadgeRequirement(badgeRequirementDataFixture.omit('inventionCount').create())
      expect(requirement.inventionCount).toBeUndefined()
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
