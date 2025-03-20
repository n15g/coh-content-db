import { CohContentDatabase } from '../../main'
import { contentBundleFixture } from '../api/content-bundle.fixture'
import { badgeDataFixture } from '../api/badge-data.fixture'

describe(CohContentDatabase.name, () => {
  describe('searchBadges', () => {
    test(`should match on badge name`, () => {
      const data = contentBundleFixture.create({
        badges: [
          badgeDataFixture.create({ key: 'match-1', name: [{ value: 'Foo 1' }] }),
          badgeDataFixture.create({ key: 'match-2', name: [{ value: 'Foo 2' }, { value: 'Bar 2' }] }),
          badgeDataFixture.create({ key: 'match-3', name: [{ value: 'Bar 3' }, { value: 'Foo 3' }] }),
          badgeDataFixture.create({ key: 'miss-1', name: [{ value: 'Bar 4' }] }),
        ],
      })

      const result = new CohContentDatabase(data).searchBadges('Foo')

      expect(result).toHaveLength(3)
      const keys = result.map(x => x.key)
      expect(keys).toContain('match-1')
      expect(keys).toContain('match-2')
      expect(keys).toContain('match-3')
      expect(keys).not.toContainEqual(['miss-1'])
    })

    test(`should match on badge text`, () => {
      const data = contentBundleFixture.create({
        badges: [
          badgeDataFixture.create({ key: 'match-1', badgeText: [{ value: 'Foo 1' }] }),
          badgeDataFixture.create({ key: 'match-2', badgeText: [{ value: 'Foo 2' }, { value: 'Bar 2' }] }),
          badgeDataFixture.create({ key: 'match-3', badgeText: [{ value: 'Bar 3' }, { value: 'Foo 3' }] }),
          badgeDataFixture.create({ key: 'miss-1', badgeText: [{ value: 'Bar 4' }] }),
        ],
      })

      const result = new CohContentDatabase(data).searchBadges('Foo')

      expect(result).toHaveLength(3)
      const keys = result.map(x => x.key)
      expect(keys).toContain('match-1')
      expect(keys).toContain('match-2')
      expect(keys).toContain('match-3')
      expect(keys).not.toContainEqual(['miss-1'])
    })
  })

  test(`should match on acquisition`, () => {
    const data = contentBundleFixture.create({
      badges: [
        badgeDataFixture.create({ key: 'match-1', acquisition: 'Foo 1' }),
        badgeDataFixture.create({ key: 'match-2', acquisition: 'Foo 2' }),
        badgeDataFixture.create({ key: 'miss-1', acquisition: 'Bar 1' }),
      ],
    })

    const result = new CohContentDatabase(data).searchBadges('Foo')

    expect(result).toHaveLength(2)
    const keys = result.map(x => x.key)
    expect(keys).toContain('match-1')
    expect(keys).toContain('match-2')
    expect(keys).not.toContainEqual(['miss-1'])
  })

  test(`should match the start of a string`, () => {
    const data = contentBundleFixture.create({
      badges: [
        badgeDataFixture.create({ key: 'match-1', acquisition: 'Foo 1' }),
        badgeDataFixture.create({ key: 'match-2', acquisition: 'Foo 2' }),
        badgeDataFixture.create({ key: 'miss-1', acquisition: 'Bar 1' }),
      ],
    })

    const result = new CohContentDatabase(data).searchBadges('Fo')

    expect(result).toHaveLength(2)
    const keys = result.map(x => x.key)
    expect(keys).toContain('match-1')
    expect(keys).toContain('match-2')
    expect(keys).not.toContainEqual(['miss-1'])
  })

  test(`should return everything for an empty query`, () => {
    const data = contentBundleFixture.create({
      badges: [
        badgeDataFixture.create({ key: 'foo-1', acquisition: 'Foo 1' }),
        badgeDataFixture.create({ key: 'foo-2', acquisition: 'Foo 2' }),
        badgeDataFixture.create({ key: 'bar-1', acquisition: 'Bar 1' }),
      ],
    })

    const result = new CohContentDatabase(data).searchBadges()

    expect(result).toHaveLength(3)
    const keys = result.map(x => x.key)
    expect(keys).toContain('foo-1')
    expect(keys).toContain('foo-2')
    expect(keys).toContain('bar-1')
  })

  test(`should be case insensitive`, () => {
    const data = contentBundleFixture.create({
      badges: [
        badgeDataFixture.create({ key: 'match-1', acquisition: 'Foo 1' }),
        badgeDataFixture.create({ key: 'match-2', acquisition: 'Foo 2' }),
        badgeDataFixture.create({ key: 'miss-1', acquisition: 'Bar 1' }),
      ],
    })

    const result = new CohContentDatabase(data).searchBadges('foo')

    expect(result).toHaveLength(2)
    const keys = result.map(x => x.key)
    expect(keys).toContain('match-1')
    expect(keys).toContain('match-2')
    expect(keys).not.toContain('miss-1')
  })
})
