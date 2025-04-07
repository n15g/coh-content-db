import { CohContentDatabase } from '../../main'
import { contentBundleFixture } from '../api/content-bundle.fixture'
import { archetypeDataFixture } from '../api/archetype-data.fixture'
import { badgeDataFixture } from '../api/badge-data.fixture'
import { zoneDataFixture } from '../api/zone-data.fixture'
import { contactDataFixture } from '../api/contact-data.fixture'
import { missionDataFixture } from '../api/mission-data.fixture'

describe(CohContentDatabase.name, () => {
  test('should load a basic bundle', () => {
    new CohContentDatabase(contentBundleFixture.create())
  })

  describe('servers', () => {
    test(`should accept an undefined field`, () => {
      const data = contentBundleFixture
        .omit('servers')
        .create()
      expect(new CohContentDatabase(data).servers).toHaveLength(0)
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
      expect(() => new CohContentDatabase(data)).toThrow(`Duplicate archetype key 'foo'`)
    })

    test(`should accept an undefined field`, () => {
      const data = contentBundleFixture
        .omit('archetypes')
        .create()
      expect(new CohContentDatabase(data).archetypes).toHaveLength(0)
    })

    test(`should load data from bundle`, () => {
      const data = contentBundleFixture
        .create({ archetypes: [archetypeDataFixture.create({ key: 'foo' })] })
      expect(new CohContentDatabase(data).getArchetype('foo')).not.toBeUndefined()
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
      expect(new CohContentDatabase(data).badges).toHaveLength(0)
    })
  })

  describe('zones', () => {
    test(`should throw an error on duplicate zone`, () => {
      const data = contentBundleFixture.create({
        zones: [
          zoneDataFixture.create({ key: 'foo' }),
          zoneDataFixture.create({ key: 'foo' }),
        ],
      })
      expect(() => new CohContentDatabase(data)).toThrow(`Duplicate zone key 'foo'`)
    })

    test(`should accept an undefined field`, () => {
      const data = contentBundleFixture
        .omit('zones')
        .create()
      expect(new CohContentDatabase(data).zones).toHaveLength(0)
    })
  })

  describe('contacts', () => {
    test(`should throw an error on duplicate contact`, () => {
      const data = contentBundleFixture.create({
        contacts: [
          contactDataFixture.create({ key: 'foo' }),
          contactDataFixture.create({ key: 'foo' }),
        ],
      })
      expect(() => new CohContentDatabase(data)).toThrow(`Duplicate contact key 'foo'`)
    })

    test(`should accept an undefined field`, () => {
      const data = contentBundleFixture
        .omit('contacts')
        .create()
      expect(new CohContentDatabase(data).contacts).toHaveLength(0)
    })
  })

  describe('missions', () => {
    test(`should throw an error on duplicate mission`, () => {
      const data = contentBundleFixture.create({
        missions: [
          missionDataFixture.create({ key: 'foo' }),
          missionDataFixture.create({ key: 'foo' }),
        ],
      })
      expect(() => new CohContentDatabase(data)).toThrow(`Duplicate mission key 'foo'`)
    })

    test(`should accept an undefined field`, () => {
      const data = contentBundleFixture
        .omit('missions')
        .create()
      expect(new CohContentDatabase(data).missions).toHaveLength(0)
    })
  })

  describe('getArchetype', () => {
    test(`should retrieve archetype from the index`, () => {
      const data = contentBundleFixture.create({
        archetypes: [archetypeDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).getArchetype('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown archetype`, () => {
      const data = contentBundleFixture.create({ archetypes: [] })
      expect(new CohContentDatabase(data).getArchetype('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      expect(new CohContentDatabase(contentBundleFixture.create({ archetypes: [] })).getArchetype()).toBeUndefined()
    })
  })

  describe('getZone', () => {
    test(`should retrieve zone from the index`, () => {
      const data = contentBundleFixture.create({
        zones: [zoneDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).getZone('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown zone`, () => {
      const data = contentBundleFixture.create({ zones: [] })
      expect(new CohContentDatabase(data).getZone('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      expect(new CohContentDatabase(contentBundleFixture.create({ zones: [] })).getZone()).toBeUndefined()
    })
  })

  describe('getContact', () => {
    test(`should retrieve contact from the index`, () => {
      const data = contentBundleFixture.create({
        contacts: [contactDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).getContact('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown contact`, () => {
      const data = contentBundleFixture.create({ contacts: [] })
      expect(new CohContentDatabase(data).getContact('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      expect(new CohContentDatabase(contentBundleFixture.create({ contacts: [] })).getContact()).toBeUndefined()
    })
  })

  describe('getMission', () => {
    test(`should retrieve mission from the index`, () => {
      const data = contentBundleFixture.create({
        missions: [missionDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).getMission('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown mission`, () => {
      const data = contentBundleFixture.create({ missions: [] })
      expect(new CohContentDatabase(data).getMission('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      expect(new CohContentDatabase(contentBundleFixture.create({ missions: [] })).getMission()).toBeUndefined()
    })
  })

  describe('getBadge', () => {
    test(`should retrieve badge from the index`, () => {
      const data = contentBundleFixture.create({
        badges: [badgeDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).getBadge('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown badge`, () => {
      const data = contentBundleFixture.create({ badges: [] })
      expect(new CohContentDatabase(data).getBadge('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      expect(new CohContentDatabase(contentBundleFixture.create({ badges: [] })).getBadge()).toBeUndefined()
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
