import { badgeDataFixture } from '../api/badge-data.fixture'
import { BadgeIndex } from '../../main/db/badge-index'
import { Badge } from '../../main'

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

    test(`should throw error for unknown badge`, () => {
      expect(() => new BadgeIndex([]).getBadge('foo')).toThrow('Unknown badge key [foo]')
    })
  })

  describe('searchBadges', () => {
    test(`should match on badge name`, () => {
      const data = [
        new Badge(badgeDataFixture.create({ key: 'match-1', name: [{ value: 'Foo 1' }] })),
        new Badge(badgeDataFixture.create({ key: 'match-2', name: [{ value: 'Foo 2' }, { value: 'Bar 2' }] })),
        new Badge(badgeDataFixture.create({ key: 'match-3', name: [{ value: 'Bar 3' }, { value: 'Foo 3' }] })),
        new Badge(badgeDataFixture.create({ key: 'miss-1', name: [{ value: 'Bar 4' }] })),
      ]

      const result = new BadgeIndex(data).searchBadges({ query: { str: 'Foo', on: { name: true } } })

      expect(result.value).toHaveLength(3)
      const keys = result.value.map(x => x.key)
      expect(keys).toContain('match-1')
      expect(keys).toContain('match-2')
      expect(keys).toContain('match-3')
      expect(keys).not.toContainEqual(['miss-1'])
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

      expect(result.value).toHaveLength(3)
      const keys = result.value.map(x => x.key)
      expect(keys).toContain('match-1')
      expect(keys).toContain('match-2')
      expect(keys).toContain('match-3')
      expect(keys).not.toContain('miss-1')
      expect(keys).not.toContain('miss-2')
    })

    test(`should match on acquisition`, () => {
      const data = [
        new Badge(badgeDataFixture.create({ key: 'match-1', acquisition: 'Foo 1' })),
        new Badge(badgeDataFixture.create({ key: 'match-2', acquisition: 'Foo 2' })),
        new Badge(badgeDataFixture.create({ key: 'miss-1', acquisition: 'Bar 1' })),
        new Badge(badgeDataFixture.create({ key: 'miss-2', acquisition: undefined })),
      ]

      const result = new BadgeIndex(data).searchBadges({ query: { str: 'Foo', on: { acquisition: true } } })

      expect(result.value).toHaveLength(2)
      const keys = result.value.map(x => x.key)
      expect(keys).toContain('match-1')
      expect(keys).toContain('match-2')
      expect(keys).not.toContain('miss-1')
      expect(keys).not.toContain('miss-2')
    })

    test(`should match on effect`, () => {
      const data = [
        new Badge(badgeDataFixture.create({ key: 'match-1', effect: 'Foo 1' })),
        new Badge(badgeDataFixture.create({ key: 'match-2', effect: 'Foo 2' })),
        new Badge(badgeDataFixture.create({ key: 'miss-1', effect: 'Bar 1' })),
        new Badge(badgeDataFixture.create({ key: 'miss-2', effect: undefined })),
      ]

      const result = new BadgeIndex(data).searchBadges({ query: { str: 'Foo', on: { effect: true } } })

      expect(result.value).toHaveLength(2)
      const keys = result.value.map(x => x.key)
      expect(keys).toContain('match-1')
      expect(keys).toContain('match-2')
      expect(keys).not.toContain('miss-1')
      expect(keys).not.toContain('miss-2')
    })

    test(`should match on notes`, () => {
      const data = [
        new Badge(badgeDataFixture.create({ key: 'match-1', notes: 'Foo 1' })),
        new Badge(badgeDataFixture.create({ key: 'match-2', notes: 'Foo 2' })),
        new Badge(badgeDataFixture.create({ key: 'miss-1', notes: 'Bar 1' })),
        new Badge(badgeDataFixture.create({ key: 'miss-2', notes: undefined })),
      ]

      const result = new BadgeIndex(data).searchBadges({ query: { str: 'Foo', on: { notes: true } } })

      expect(result.value).toHaveLength(2)
      const keys = result.value.map(x => x.key)
      expect(keys).toContain('match-1')
      expect(keys).toContain('match-2')
      expect(keys).not.toContain('miss-1')
      expect(keys).not.toContain('miss-2')
    })

    test(`should match on setTitle`, () => {
      const data = [
        new Badge(badgeDataFixture.create({ key: 'match-1', setTitle: { id: 123 } })),
        new Badge(badgeDataFixture.create({ key: 'match-2', setTitle: { id: 456, praetorianId: 123 } })),
        new Badge(badgeDataFixture.create({ key: 'miss-1', setTitle: { id: 456 } })),
        new Badge(badgeDataFixture.create({ key: 'miss-2', setTitle: undefined })),
      ]

      const result = new BadgeIndex(data).searchBadges({ query: { str: '123', on: { setTitle: true } } })

      expect(result.value).toHaveLength(2)
      const keys = result.value.map(x => x.key)
      expect(keys).toContain('match-1')
      expect(keys).toContain('match-2')
      expect(keys).not.toContain('miss-1')
      expect(keys).not.toContain('miss-2')
    })

    test(`should match the start of a string`, () => {
      const data = [
        new Badge(badgeDataFixture.create({ key: 'match-1', acquisition: 'Foo 1' })),
        new Badge(badgeDataFixture.create({ key: 'match-2', acquisition: 'Foo 2' })),
        new Badge(badgeDataFixture.create({ key: 'miss-1', acquisition: 'Bar 1' })),
      ]

      const result = new BadgeIndex(data).searchBadges({ query: { str: 'Fo', on: { acquisition: true } } })

      expect(result.value).toHaveLength(2)
      const keys = result.value.map(x => x.key)
      expect(keys).toContain('match-1')
      expect(keys).toContain('match-2')
      expect(keys).not.toContainEqual(['miss-1'])
    })

    test(`should return everything for an empty query`, () => {
      const data = [
        new Badge(badgeDataFixture.create({ key: 'foo-1', acquisition: 'Foo 1' })),
        new Badge(badgeDataFixture.create({ key: 'foo-2', acquisition: 'Foo 2' })),
        new Badge(badgeDataFixture.create({ key: 'bar-1', acquisition: 'Bar 1' })),
      ]

      const result = new BadgeIndex(data).searchBadges()

      expect(result.value).toHaveLength(3)
      const keys = result.value.map(x => x.key)
      expect(keys).toContain('foo-1')
      expect(keys).toContain('foo-2')
      expect(keys).toContain('bar-1')
    })

    test(`should be case insensitive`, () => {
      const data = [
        new Badge(badgeDataFixture.create({ key: 'match-1', acquisition: 'Foo 1' })),
        new Badge(badgeDataFixture.create({ key: 'match-2', acquisition: 'Foo 2' })),
        new Badge(badgeDataFixture.create({ key: 'miss-1', acquisition: 'Bar 1' })),
      ]

      const result = new BadgeIndex(data).searchBadges({ query: { str: 'foo', on: { acquisition: true } } })

      expect(result.value).toHaveLength(2)
      const keys = result.value.map(x => x.key)
      expect(keys).toContain('match-1')
      expect(keys).toContain('match-2')
      expect(keys).not.toContain('miss-1')
    })

    test(`should default to querying on name only`, () => {
      const data = [
        new Badge(badgeDataFixture.create({ key: 'match-1', name: [{ value: 'Foo 1' }] })),
        new Badge(badgeDataFixture.create({ key: 'miss-1', acquisition: 'Foo 2' })),
        new Badge(badgeDataFixture.create({ key: 'miss-2', name: [{ value: 'Bar 1' }] })),
      ]

      const result = new BadgeIndex(data).searchBadges({ query: { str: 'foo' } })

      expect(result.value).toHaveLength(1)
      const keys = result.value.map(x => x.key)
      expect(keys).toContain('match-1')
      expect(keys).not.toContain('miss-1')
      expect(keys).not.toContain('miss-2')
    })
  })
})
