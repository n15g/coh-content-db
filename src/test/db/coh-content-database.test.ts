import { CohContentDatabase } from '../../main'
import { contentBundleFixture } from '../api/content-bundle.fixture'
import { archetypeDataFixture } from '../api/archetype-data.fixture'
import { badgeDataFixture } from '../api/badge-data.fixture'
import { gameMapDataFixture } from '../api/game-map-data.fixture'

describe(CohContentDatabase.name, () => {
  test('should load a basic bundle', () => {
    new CohContentDatabase(contentBundleFixture.create())
  })

  describe('servers', () => {
    test(`should accept an undefined field`, () => {
      const data = contentBundleFixture
        .omit('servers')
        .create()
      expect(() => new CohContentDatabase(data).archetypes).toHaveLength(0)
    })

    test(`should load values from bundle`, () => {
      const data = contentBundleFixture
        .create({ servers: ['Foo', 'Bar'] })
      expect(new CohContentDatabase(data).servers).toStrictEqual(['Foo', 'Bar'])
    })
  })

  describe('archetypes', () => {
    test(`should throw an error on duplicate key`, () => {
      const data = contentBundleFixture.create({
        archetypes: [
          archetypeDataFixture.create({ key: 'foo' }),
          archetypeDataFixture.create({ key: 'foo' }),
        ],
      })
      expect(() => new CohContentDatabase(data)).toThrow('Duplicate archetype key [foo]')
    })

    test(`should accept an undefined field`, () => {
      const data = contentBundleFixture
        .omit('archetypes')
        .create()
      expect(() => new CohContentDatabase(data).archetypes).toHaveLength(0)
    })

    test(`should load data from bundle`, () => {
      const data = contentBundleFixture
        .create({ archetypes: [archetypeDataFixture.create({ key: 'foo' })] })
      expect(() => new CohContentDatabase(data).getArchetype('foo')).not.toBeUndefined()
    })
  })

  describe('badges', () => {
    test(`should throw an error on duplicate key`, () => {
      const data = contentBundleFixture.create({
        badges: [
          badgeDataFixture.create({ key: 'foo' }),
          badgeDataFixture.create({ key: 'foo' }),
        ],
      })
      expect(() => new CohContentDatabase(data)).toThrow('Duplicate badge key [foo]')
    })

    test(`should accept an undefined field`, () => {
      const data = contentBundleFixture
        .omit('badges')
        .create()
      expect(() => new CohContentDatabase(data).badges).toHaveLength(0)
    })
  })

  describe('maps', () => {
    test(`should throw an error on duplicate map`, () => {
      const data = contentBundleFixture.create({
        maps: [
          gameMapDataFixture.create({ key: 'foo' }),
          gameMapDataFixture.create({ key: 'foo' }),
        ],
      })
      expect(() => new CohContentDatabase(data)).toThrow('Duplicate map key [foo]')
    })

    test(`should accept an undefined field`, () => {
      const data = contentBundleFixture
        .omit('maps')
        .create()
      expect(() => new CohContentDatabase(data).maps).toHaveLength(0)
    })
  })

  describe('getArchetype', () => {
    test(`should retrieve archetype from the index`, () => {
      const data = contentBundleFixture.create({
        archetypes: [archetypeDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).getArchetype('foo')).not.toBeUndefined()
    })

    test(`should throw error for unknown archetype`, () => {
      const data = contentBundleFixture.create({
        archetypes: [],
      })

      expect(() => new CohContentDatabase(data).getArchetype('foo')).toThrow('Unknown archetype key [foo]')
    })
  })

  describe('getMap', () => {
    test(`should retrieve map from the index`, () => {
      const data = contentBundleFixture.create({
        maps: [gameMapDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).getMap('foo')).not.toBeUndefined()
    })

    test(`should throw error for unknown map`, () => {
      const data = contentBundleFixture.create({
        maps: [],
      })

      expect(() => new CohContentDatabase(data).getMap('foo')).toThrow('Unknown map key [foo]')
    })
  })

  describe('mapExists', () => {
    test(`should return true for a map that exists`, () => {
      const data = contentBundleFixture.create({
        maps: [gameMapDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).mapExists('foo')).toBeTruthy()
    })

    test(`should return false for a map that does not exist`, () => {
      const data = contentBundleFixture.create({
        maps: [],
      })

      expect(new CohContentDatabase(data).mapExists('foo')).toBeFalsy()
    })
  })

  describe('getBadge', () => {
    test(`should retrieve badge from the index`, () => {
      const data = contentBundleFixture.create({
        badges: [badgeDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).getBadge('foo')).not.toBeUndefined()
    })

    test(`should throw error for unknown badge`, () => {
      const data = contentBundleFixture.create({
        badges: [],
      })

      expect(() => new CohContentDatabase(data).getBadge('foo')).toThrow('Unknown badge key [foo]')
    })
  })

  describe('badgeExists', () => {
    test(`should return true for a badge that exists`, () => {
      const data = contentBundleFixture.create({
        badges: [badgeDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).badgeExists('foo')).toBeTruthy()
    })

    test(`should return false for a badge that does not exist`, () => {
      const data = contentBundleFixture.create({
        badges: [],
      })

      expect(new CohContentDatabase(data).badgeExists('foo')).toBeFalsy()
    })
  })

  describe('searchBadges', () => {
    test(`should search the badge list`, () => {
      const data = contentBundleFixture.create({
        badges: [
          badgeDataFixture.create({ key: 'foo', name: [{ value: 'Foo' }] }),
          badgeDataFixture.create({ key: 'bar', name: [{ value: 'Bar' }] }),
        ],
      })

      const result = new CohContentDatabase(data).searchBadges({ query: { str: 'oo' } })
      expect(result.totalItems).toBe(1)
      expect(result.items.map(x => x.key)).toStrictEqual(['foo'])
    })
  })
})
