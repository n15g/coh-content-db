import { badgeDataFixture } from '../api/badge-data.fixture'
import { Badge, BadgeIndex } from '../../main'
import { badgeRequirementDataFixture } from '../api/badge-requirement-data.fixture'

describe(BadgeIndex.name, () => {
  describe('Constructor', () => {
    test(`should throw an error on duplicate key`, () => {
      const data = [
        new Badge(badgeDataFixture.create({ key: 'foo' })),
        new Badge(badgeDataFixture.create({ key: 'foo' })),
      ]
      expect(() => new BadgeIndex(data)).toThrow('Duplicate badge key [foo]')
    })
  })

  describe('getBadge', () => {
    test(`should retrieve badge from the index`, () => {
      const data = [new Badge(badgeDataFixture.create({ key: 'foo' }))]

      expect(new BadgeIndex(data).getBadge('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown badge`, () => {
      expect(new BadgeIndex([]).getBadge('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      expect(new BadgeIndex([]).getBadge()).toBeUndefined()
    })
  })

  describe('searchBadges', () => {
    test(`should return everything for an empty query`, () => {
      const data = [
        new Badge(badgeDataFixture.create({ key: 'foo-1', acquisition: 'Foo 1' })),
        new Badge(badgeDataFixture.create({ key: 'foo-2', acquisition: 'Foo 2' })),
        new Badge(badgeDataFixture.create({ key: 'bar-1', acquisition: 'Bar 1' })),
      ]

      const result = new BadgeIndex(data).searchBadges()
      const keys = result.items.map(x => x.key)
      expect(keys).toStrictEqual(['foo-1', 'foo-2', 'bar-1'])
      expect(keys).toContain('foo-1')
      expect(keys).toContain('foo-2')
      expect(keys).toContain('bar-1')
    })

    describe('query', () => {
      test(`should match on badge name`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'match-1', name: [{ value: 'Foo 1' }] })),
          new Badge(badgeDataFixture.create({ key: 'match-2', name: [{ value: 'Foo 2' }, { value: 'Bar 2' }] })),
          new Badge(badgeDataFixture.create({ key: 'match-3', name: [{ value: 'Bar 3' }, { value: 'Foo 3' }] })),
          new Badge(badgeDataFixture.create({ key: 'miss-1', name: [{ value: 'Bar 4' }] })),
        ]

        const result = new BadgeIndex(data).searchBadges({ query: { str: 'Foo', on: { name: true } } })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['match-1', 'match-2', 'match-3'])
      })

      test(`should match on badge text`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'match-1', badgeText: [{ value: 'Foo 1' }] })),
          new Badge(badgeDataFixture.create({ key: 'match-2', badgeText: [{ value: 'Foo 2' }, { value: 'Bar 2' }] })),
          new Badge(badgeDataFixture.create({ key: 'match-3', badgeText: [{ value: 'Bar 3' }, { value: 'Foo 3' }] })),
          new Badge(badgeDataFixture.create({ key: 'miss-1', badgeText: [{ value: 'Bar 4' }] })),
          new Badge(badgeDataFixture.create({ key: 'miss-2', badgeText: undefined })),
        ]

        const result = new BadgeIndex(data).searchBadges({ query: { str: 'Foo', on: { badgeText: true } } })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['match-1', 'match-2', 'match-3'])
      })

      test(`should match on acquisition`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'match-1', acquisition: 'Foo 1' })),
          new Badge(badgeDataFixture.create({ key: 'match-2', acquisition: 'Foo 2' })),
          new Badge(badgeDataFixture.create({ key: 'miss-1', acquisition: 'Bar 1' })),
          new Badge(badgeDataFixture.create({ key: 'miss-2', acquisition: undefined })),
        ]

        const result = new BadgeIndex(data).searchBadges({ query: { str: 'Foo', on: { acquisition: true } } })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['match-1', 'match-2'])
      })

      test(`should match on effect`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'match-1', effect: 'Foo 1' })),
          new Badge(badgeDataFixture.create({ key: 'match-2', effect: 'Foo 2' })),
          new Badge(badgeDataFixture.create({ key: 'miss-1', effect: 'Bar 1' })),
          new Badge(badgeDataFixture.create({ key: 'miss-2', effect: undefined })),
        ]

        const result = new BadgeIndex(data).searchBadges({ query: { str: 'Foo', on: { effect: true } } })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['match-1', 'match-2'])
      })

      test(`should match on notes`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'match-1', notes: 'Foo 1' })),
          new Badge(badgeDataFixture.create({ key: 'match-2', notes: 'Foo 2' })),
          new Badge(badgeDataFixture.create({ key: 'miss-1', notes: 'Bar 1' })),
          new Badge(badgeDataFixture.create({ key: 'miss-2', notes: undefined })),
        ]

        const result = new BadgeIndex(data).searchBadges({ query: { str: 'Foo', on: { notes: true } } })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['match-1', 'match-2'])
      })

      test(`should match on setTitle`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'match-1', setTitleId: [123] })),
          new Badge(badgeDataFixture.create({ key: 'match-2', setTitleId: [456, 123] })),
          new Badge(badgeDataFixture.create({ key: 'miss-1', setTitleId: [456] })),
          new Badge(badgeDataFixture.create({ key: 'miss-2', setTitleId: undefined })),
        ]

        const result = new BadgeIndex(data).searchBadges({ query: { str: '123', on: { setTitle: true } } })

        expect(result.items).toHaveLength(2)
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['match-1', 'match-2'])
      })

      test(`should match the start of a string`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'match-1', acquisition: 'Foo 1' })),
          new Badge(badgeDataFixture.create({ key: 'match-2', acquisition: 'Foo 2' })),
          new Badge(badgeDataFixture.create({ key: 'miss-1', acquisition: 'Bar 1' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ query: { str: 'Fo', on: { acquisition: true } } })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['match-1', 'match-2'])
      })

      test(`should be case insensitive`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'match-1', acquisition: 'Foo 1' })),
          new Badge(badgeDataFixture.create({ key: 'match-2', acquisition: 'Foo 2' })),
          new Badge(badgeDataFixture.create({ key: 'miss-1', acquisition: 'Bar 1' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ query: { str: 'foo', on: { acquisition: true } } })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['match-1', 'match-2'])
      })

      test(`should default to querying on name only`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'match-1', name: [{ value: 'Foo 1' }] })),
          new Badge(badgeDataFixture.create({ key: 'miss-1', acquisition: 'Foo 2' })),
          new Badge(badgeDataFixture.create({ key: 'miss-2', name: [{ value: 'Bar 1' }] })),
        ]

        const result = new BadgeIndex(data).searchBadges({ query: { str: 'foo' } })

        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['match-1'])
      })
    })

    describe('filter', () => {
      test(`should filter nothing if not specified`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
          new Badge(badgeDataFixture.create({ key: 'badge-5' })),
          new Badge(badgeDataFixture.create({ key: 'badge-6' })),
        ]

        const result = new BadgeIndex(data).searchBadges()
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-1', 'badge-2', 'badge-3', 'badge-4', 'badge-5', 'badge-6'])
      })

      test(`should filter on badge type`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1', type: 'exploration' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2', type: 'exploration' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3', type: 'history' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4', type: 'history' })),
          new Badge(badgeDataFixture.create({ key: 'badge-5', type: 'accolade' })),
          new Badge(badgeDataFixture.create({ key: 'badge-6', type: 'accolade' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ filter: { type: 'history' } })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-3', 'badge-4'])
      })

      test(`should filter on badge zone`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1', requirements: [{ location: { zoneKey: 'atlas-park' } }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-2', requirements: [{ location: { zoneKey: 'perez-park' } }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-3', requirements: [{ location: { zoneKey: 'abandoned-sewer-network' } }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-4', requirements: [{ location: { zoneKey: 'atlas-park' } }] })),
          new Badge(badgeDataFixture.create({
            key: 'badge-5', requirements: [
              badgeRequirementDataFixture.create({ location: { zoneKey: 'atlas-park' } }),
              badgeRequirementDataFixture.create({ location: { zoneKey: 'perez-park' } }),
            ],
          })),
          new Badge(badgeDataFixture.create({ key: 'badge-6', requirements: [{ location: undefined }] })),
        ]

        const result = new BadgeIndex(data).searchBadges({ filter: { zoneKey: 'perez-park' } })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-2'])
      })

      test(`should filter on alignment`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1', morality: ['hero'] })),
          new Badge(badgeDataFixture.create({ key: 'badge-2', morality: ['villain'] })),
          new Badge(badgeDataFixture.create({ key: 'badge-3', morality: ['loyalist'] })),
          new Badge(badgeDataFixture.create({ key: 'badge-4', morality: ['hero', 'villain'] })),
          new Badge(badgeDataFixture.create({ key: 'badge-5', morality: ['villain', 'loyalist'] })),
          new Badge(badgeDataFixture.create({ key: 'badge-6', morality: ['hero', 'villain', 'loyalist'] })),
        ]

        const result = new BadgeIndex(data).searchBadges({ filter: { morality: 'hero' } })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-1', 'badge-4', 'badge-6'])
      })
    })

    describe('pagination', () => {
      test(`should return all results with no pagination data`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
          new Badge(badgeDataFixture.create({ key: 'badge-5' })),
          new Badge(badgeDataFixture.create({ key: 'badge-6' })),
        ]

        const result = new BadgeIndex(data).searchBadges()
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-1', 'badge-2', 'badge-3', 'badge-4', 'badge-5', 'badge-6'])
      })

      test(`should be 1-based for page number`, () => {
        const result = new BadgeIndex([]).searchBadges()
        expect(result.page).toBe(1)
      })

      test(`should return the requested page size`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
          new Badge(badgeDataFixture.create({ key: 'badge-5' })),
          new Badge(badgeDataFixture.create({ key: 'badge-6' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ pageSize: 2 })
        expect(result.items).toHaveLength(2)
      })

      test(`should return the start of the array with no page specified`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
          new Badge(badgeDataFixture.create({ key: 'badge-5' })),
          new Badge(badgeDataFixture.create({ key: 'badge-6' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ pageSize: 2 })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-1', 'badge-2'])
      })

      test(`should return results from the middle of the array with a page specified`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
          new Badge(badgeDataFixture.create({ key: 'badge-5' })),
          new Badge(badgeDataFixture.create({ key: 'badge-6' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ page: 2, pageSize: 2 })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-3', 'badge-4'])
      })

      test(`should return a partial page if at the end of the array`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
          new Badge(badgeDataFixture.create({ key: 'badge-5' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ page: 3, pageSize: 2 })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-5'])
      })

      test(`should return the correct total entry count`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
          new Badge(badgeDataFixture.create({ key: 'badge-5' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ page: 1, pageSize: 2 })
        expect(result.totalItems).toBe(5)
      })

      test(`should return the page size`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
          new Badge(badgeDataFixture.create({ key: 'badge-5' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ pageSize: 2 })
        expect(result.pageSize).toBe(2)
      })

      test(`should return the correct total page count`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
          new Badge(badgeDataFixture.create({ key: 'badge-5' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ pageSize: 2 })
        expect(result.totalPages).toBe(3)
      })

      test(`should return a total page count of 1 when no page size is provided`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
          new Badge(badgeDataFixture.create({ key: 'badge-5' })),
        ]

        const result = new BadgeIndex(data).searchBadges()
        expect(result.totalPages).toBe(1)
      })

      test(`should return the last page if a page is requested past the max`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
          new Badge(badgeDataFixture.create({ key: 'badge-5' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ pageSize: 2, page: 10 })
        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-5'])
        expect(result.page).toBe(3)
      })

      test(`should return the first page if a page is requested lower than 1`, () => {
        const result = new BadgeIndex([]).searchBadges({ page: -10 })
        expect(result.page).toBe(1)
      })
    })

    describe('sort', () => {
      test(`should not modify sort if not specified`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
        ]

        const result = new BadgeIndex(data).searchBadges()

        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-1', 'badge-2', 'badge-3', 'badge-4'])
      })

      test(`should not modify sort if order is canonical`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ sort: { by: 'canonical' } })

        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-1', 'badge-2', 'badge-3', 'badge-4'])
      })

      test(`should reverse default sort with desc`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1' })),
          new Badge(badgeDataFixture.create({ key: 'badge-2' })),
          new Badge(badgeDataFixture.create({ key: 'badge-3' })),
          new Badge(badgeDataFixture.create({ key: 'badge-4' })),
        ]

        const result = new BadgeIndex(data).searchBadges({ sort: { dir: 'desc' } })

        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-4', 'badge-3', 'badge-2', 'badge-1'])
      })

      test(`should sort by badge name`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1', name: [{ value: 'Abc' }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-2', name: [{ value: 'XYZ' }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-3', name: [{ value: 'AAB' }] })),
        ]

        const result = new BadgeIndex(data).searchBadges({ sort: { by: 'badge-name' } })

        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-3', 'badge-1', 'badge-2'])
      })

      test(`should sort by badge name descending`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1', name: [{ value: 'Abc' }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-2', name: [{ value: 'XYZ' }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-3', name: [{ value: 'AAB' }] })),
        ]

        const result = new BadgeIndex(data).searchBadges({ sort: { by: 'badge-name', dir: 'desc' } })

        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-2', 'badge-1', 'badge-3'])
      })

      test(`should use the default badge name when sorting by name`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1', name: [{ value: 'Abc' }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-2', name: [{ value: 'XYZ' }, { sex: 'F', value: 'AAA' }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-3', name: [{ value: 'AAB' }] })),
        ]

        const result = new BadgeIndex(data).searchBadges({ sort: { by: 'badge-name' } })

        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-3', 'badge-1', 'badge-2'])
      })

      test(`should sort by zone name`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1', requirements: [{ location: { zoneKey: 'atlas-park' } }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-2', requirements: [{ location: { zoneKey: 'perez-park' } }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-3', requirements: [{ location: { zoneKey: 'abandoned-sewer-network' } }] })),
        ]

        const result = new BadgeIndex(data).searchBadges({ sort: { by: 'zone-key' } })

        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-3', 'badge-1', 'badge-2'])
      })

      test(`should sort by zone name descending`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1', requirements: [{ location: { zoneKey: 'atlas-park' } }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-2', requirements: [{ location: { zoneKey: 'perez-park' } }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-3', requirements: [{ location: { zoneKey: 'abandoned-sewer-network' } }] })),
        ]

        const result = new BadgeIndex(data).searchBadges({ sort: { by: 'zone-key', dir: 'desc' } })

        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-2', 'badge-1', 'badge-3'])
      })

      test(`should maintain canonical as secondary sort when sorting by zone name`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1', requirements: [{ location: { zoneKey: 'atlas-park' } }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-2', requirements: [{ location: { zoneKey: 'perez-park' } }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-3', requirements: [{ location: { zoneKey: 'atlas-park' } }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-4', requirements: [{ location: { zoneKey: 'abandoned-sewer-network' } }] })),
        ]

        const result = new BadgeIndex(data).searchBadges({ sort: { by: 'zone-key' } })

        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-4', 'badge-1', 'badge-3', 'badge-2'])
      })

      test(`should sort undefined or multiple zone names to the end`, () => {
        const data = [
          new Badge(badgeDataFixture.create({ key: 'badge-1', requirements: [{ location: { zoneKey: 'atlas-park' } }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-2', requirements: [{ location: undefined }] })),
          new Badge(badgeDataFixture.create({ key: 'badge-3', requirements: [{ location: { zoneKey: 'perez-park' } }] })),
          new Badge(badgeDataFixture.create({
            key: 'badge-4', requirements: [
              badgeRequirementDataFixture.create({ location: { zoneKey: 'atlas-park' } }),
              badgeRequirementDataFixture.create({ location: { zoneKey: 'perez-park' } }),
            ],
          })),
          new Badge(badgeDataFixture.create({ key: 'badge-5', requirements: [{ location: { zoneKey: 'abandoned-sewer-network' } }] })),
        ]

        const result = new BadgeIndex(data).searchBadges({ sort: { by: 'zone-key' } })

        const keys = result.items.map(x => x.key)
        expect(keys).toStrictEqual(['badge-5', 'badge-1', 'badge-3', 'badge-2', 'badge-4'])
      })
    })
  })
})
