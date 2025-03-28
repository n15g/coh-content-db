import { Badge } from '../../main'
import { badgeDataFixture } from '../api/badge-data.fixture'
import { badgeRequirementDataFixture } from '../api/badge-requirement-data.fixture'

describe(Badge.name, () => {
  describe('Constructor', () => {
    test(`should accept the test fixture`, () => {
      new Badge(badgeDataFixture.create())
    })
  })

  describe('requirements', () => {
    test(`should throw an error on duplicate key in same group`, () => {
      const data = badgeDataFixture.create({
        key: 'badge',
        requirements: [[
          badgeRequirementDataFixture.create({ key: 'foo' }),
          badgeRequirementDataFixture.create({ key: 'foo' }),
        ]],
      })
      expect(() => new Badge(data)).toThrow('Duplicate badge requirement key [badge:foo] in group [1]')
    })

    test(`should not throw an error on duplicate key in different group`, () => {
      const data = badgeDataFixture.create({
        key: 'badge',
        requirements: [[
          badgeRequirementDataFixture.create({ key: 'foo' }),
        ], [
          badgeRequirementDataFixture.create({ key: 'foo' }),
        ]],
      })
      new Badge(data)
    })
  })

  describe('getRequirement', () => {
    test(`should retrieve requirement from the index`, () => {
      const data = badgeDataFixture.create({
        requirements: [[badgeRequirementDataFixture.create({ key: 'foo' })]],
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
})
