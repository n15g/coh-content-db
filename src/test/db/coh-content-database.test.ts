import { CohContentDatabase } from '../../main'
import { contentBundleFixture } from '../api/content-bundle.fixture'
import { archetypeDataFixture } from '../api/archetype-data.fixture'
import { badgeDataFixture } from '../api/badge-data.fixture'
import { zoneDataFixture } from '../api/zone-data.fixture'
import { contactDataFixture } from '../api/contact-data.fixture'

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

      expect(() => new CohContentDatabase(data).getArchetype('foo')).toThrow(`Unknown archetype key 'foo'`)
    })

    test(`should throw error for undefined key`, () => {
      expect(() => new CohContentDatabase(contentBundleFixture.create()).getArchetype()).toThrow(`No key provided`)
    })
  })

  describe('archetypeExists', () => {
    test(`should return true for an archetype that exists`, () => {
      const data = contentBundleFixture.create({
        archetypes: [archetypeDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).archetypeExists('foo')).toBeTruthy()
    })

    test(`should return false for an archetype that does not exist`, () => {
      const data = contentBundleFixture.create({
        archetypes: [],
      })

      expect(new CohContentDatabase(data).archetypeExists('foo')).toBeFalsy()
    })

    test(`should return false for an undefined key`, () => {
      expect(new CohContentDatabase(contentBundleFixture.create()).archetypeExists()).toBeFalsy()
    })
  })

  describe('getZone', () => {
    test(`should retrieve zone from the index`, () => {
      const data = contentBundleFixture.create({
        zones: [zoneDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).getZone('foo')).not.toBeUndefined()
    })

    test(`should throw error for unknown zone`, () => {
      const data = contentBundleFixture.create({
        zones: [],
      })

      expect(() => new CohContentDatabase(data).getZone('foo')).toThrow(`Unknown zone key 'foo'`)
    })

    test(`should throw error for undefined key`, () => {
      expect(() => new CohContentDatabase(contentBundleFixture.create()).getZone()).toThrow(`No key provided`)
    })
  })

  describe('zoneExists', () => {
    test(`should return true for a zone that exists`, () => {
      const data = contentBundleFixture.create({
        zones: [zoneDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).zoneExists('foo')).toBeTruthy()
    })

    test(`should return false for a zone that does not exist`, () => {
      const data = contentBundleFixture.create({
        zones: [],
      })

      expect(new CohContentDatabase(data).zoneExists('foo')).toBeFalsy()
    })

    test(`should return false for an undefined key`, () => {
      expect(new CohContentDatabase(contentBundleFixture.create()).zoneExists()).toBeFalsy()
    })
  })

  describe('getContact', () => {
    test(`should retrieve contact from the index`, () => {
      const data = contentBundleFixture.create({
        contacts: [contactDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).getContact('foo')).not.toBeUndefined()
    })

    test(`should throw error for unknown contact`, () => {
      const data = contentBundleFixture.create({
        contacts: [],
      })

      expect(() => new CohContentDatabase(data).getContact('foo')).toThrow(`Unknown contact key 'foo'`)
    })

    test(`should throw error for undefined key`, () => {
      expect(() => new CohContentDatabase(contentBundleFixture.create()).getContact()).toThrow(`No key provided`)
    })
  })

  describe('contactExists', () => {
    test(`should return true for a contact that exists`, () => {
      const data = contentBundleFixture.create({
        contacts: [contactDataFixture.create({ key: 'foo' })],
      })

      expect(new CohContentDatabase(data).contactExists('foo')).toBeTruthy()
    })

    test(`should return false for a contact that does not exist`, () => {
      const data = contentBundleFixture.create({
        contacts: [],
      })

      expect(new CohContentDatabase(data).contactExists('foo')).toBeFalsy()
    })

    test(`should return false for an undefined key`, () => {
      expect(new CohContentDatabase(contentBundleFixture.create()).contactExists()).toBeFalsy()
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

    test(`should throw error for undefined key`, () => {
      expect(() => new CohContentDatabase(contentBundleFixture.create()).getBadge()).toThrow(`No key provided`)
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

    test(`should return false for an undefined key`, () => {
      expect(new CohContentDatabase(contentBundleFixture.create()).badgeExists()).toBeFalsy()
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
