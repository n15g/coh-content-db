import { Badge } from '../../main'
import { badgeDataFixture } from '../api/badge-data.fixture'
import { badgePartialDataFixture } from '../api/badge-partial-data.fixture'

describe(Badge.name, () => {
  describe('Constructor', () => {
    test(`should accept the test fixture`, () => {
      new Badge(badgeDataFixture.create())
    })
  })

  describe('partials', () => {
    test(`should throw an error on duplicate key`, () => {
      const data = badgeDataFixture.create({
        partials: [
          badgePartialDataFixture.create({ key: 'foo' }),
          badgePartialDataFixture.create({ key: 'foo' }),
        ],
      })
      expect(() => new Badge(data)).toThrow('Duplicate badge partial key [foo]')
    })
  })

  describe('getBadgePartial', () => {
    test(`should retrieve partial from the index`, () => {
      const data = badgeDataFixture.create({
        partials: [badgePartialDataFixture.create({ key: 'foo' })],
      })

      expect(new Badge(data).getPartial('foo')).not.toBeUndefined()
    })

    test(`should throw error for unknown partial`, () => {
      const data = badgeDataFixture.create({
        partials: [],
      })

      expect(() => new Badge(data).getPartial('foo')).toThrow('Unknown badge partial key [foo]')
    })
  })
})
