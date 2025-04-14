import { CohContentDatabase } from '../../main'
import { contentBundleFixture } from '../api/content-bundle.fixture'
import { archetypeDataFixture } from '../api/archetype-data.fixture'
import { badgeDataFixture } from '../api/badge-data.fixture'
import { zoneDataFixture } from '../api/zone-data.fixture'
import { contactDataFixture } from '../api/contact-data.fixture'
import { missionDataFixture } from '../api/mission-data.fixture'

describe(CohContentDatabase.name, () => {
  describe('load', () => {
    test('should load a basic bundle', () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create())
    })

    test('should reset the database if load is called again', () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({
        name: 'Metadata',
        servers: ['Test'],
        archetypes: [archetypeDataFixture.create()],
        zones: [zoneDataFixture.create()],
        contacts: [contactDataFixture.create()],
        missions: [missionDataFixture.create()],
        badges: [badgeDataFixture.create()],
      }))

      expect(database.metadata?.name).toEqual('Metadata')
      expect(database.servers).toHaveLength(1)
      expect(database.archetypes).toHaveLength(1)
      expect(database.zones).toHaveLength(1)
      expect(database.contacts).toHaveLength(1)
      expect(database.missions).toHaveLength(1)
      expect(database.badges).toHaveLength(1)

      database.load(contentBundleFixture.create({ name: 'Reset' }))
      expect(database.metadata?.name).toEqual('Reset')
      expect(database.servers).toHaveLength(0)
      expect(database.archetypes).toHaveLength(0)
      expect(database.zones).toHaveLength(0)
      expect(database.contacts).toHaveLength(0)
      expect(database.missions).toHaveLength(0)
      expect(database.badges).toHaveLength(0)
    })
  })

  describe('metadata', () => {
    test(`should hby undefined if not initialized`, () => {
      const database = new CohContentDatabase()
      expect(database.metadata).toBeUndefined()
    })

    test(`should load values from bundle`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture
        .create({ name: 'Metadata' }))

      expect(database.metadata?.name).toBe('Metadata')
    })
  })

  describe('servers', () => {
    test(`should accept an undefined field`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture
        .omit('servers')
        .create())

      expect(database.servers).toHaveLength(0)
    })

    test(`should be empty if uninitialized`, () => {
      const database = new CohContentDatabase()
      expect(database.servers).toHaveLength(0)
    })

    test(`should load values from bundle`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture
        .create({ servers: ['Foo', 'Bar'] }))

      expect(database.servers).toStrictEqual(['Foo', 'Bar'])
    })
  })

  describe('archetypes', () => {
    test(`should throw an error on duplicate key`, () => {
      const database = new CohContentDatabase()
      expect(() => database.load(contentBundleFixture.create({
        archetypes: [
          archetypeDataFixture.create({ key: 'foo' }),
          archetypeDataFixture.create({ key: 'foo' }),
        ],
      }))).toThrow(`Duplicate key [foo]`)
    })

    test(`should accept an undefined field`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture
        .omit('archetypes')
        .create())
      expect(database.archetypes).toHaveLength(0)
    })

    test(`should load data from bundle`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture
        .create({ archetypes: [archetypeDataFixture.create({ key: 'foo' })] }))
      expect(database.getArchetype('foo')).not.toBeUndefined()
    })
  })

  describe('badges', () => {
    test(`should throw an error on duplicate key`, () => {
      const database = new CohContentDatabase()
      expect(() => database.load(contentBundleFixture.create({
        badges: [
          badgeDataFixture.create({ key: 'foo' }),
          badgeDataFixture.create({ key: 'foo' }),
        ],
      }))).toThrow('Duplicate key [foo]')
    })

    test(`should accept an undefined field`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture
        .omit('badges')
        .create())
      expect(database.badges).toHaveLength(0)
    })
  })

  describe('zones', () => {
    test(`should throw an error on duplicate zone`, () => {
      const database = new CohContentDatabase()
      expect(() => database.load(contentBundleFixture.create({
        zones: [
          zoneDataFixture.create({ key: 'foo' }),
          zoneDataFixture.create({ key: 'foo' }),
        ],
      }))).toThrow(`Duplicate key [foo]`)
    })

    test(`should accept an undefined field`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture
        .omit('zones')
        .create())
      expect(database.zones).toHaveLength(0)
    })
  })

  describe('contacts', () => {
    test(`should throw an error on duplicate contact`, () => {
      const database = new CohContentDatabase()
      expect(() => database.load(contentBundleFixture.create({
        contacts: [
          contactDataFixture.create({ key: 'foo' }),
          contactDataFixture.create({ key: 'foo' }),
        ],
      }))).toThrow(`Duplicate key [foo]`)
    })

    test(`should accept an undefined field`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture
        .omit('contacts')
        .create())
      expect(database.contacts).toHaveLength(0)
    })
  })

  describe('missions', () => {
    test(`should throw an error on duplicate mission`, () => {
      const database = new CohContentDatabase()
      expect(() => database.load(contentBundleFixture.create({
        missions: [
          missionDataFixture.create({ key: 'foo' }),
          missionDataFixture.create({ key: 'foo' }),
        ],
      }))).toThrow(`Duplicate key [foo]`)
    })

    test(`should accept an undefined field`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture
        .omit('missions')
        .create())
      expect(database.missions).toHaveLength(0)
    })
  })

  describe('getArchetype', () => {
    test(`should retrieve archetype from the index`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({
        archetypes: [archetypeDataFixture.create({ key: 'foo' })],
      }))
      expect(database.getArchetype('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown archetype`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({ archetypes: [] }))
      expect(database.getArchetype('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({ archetypes: [] }))
      const key = undefined
      expect(database.getArchetype(key)).toBeUndefined()
    })
  })

  describe('getZone', () => {
    test(`should retrieve zone from the index`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({
        zones: [zoneDataFixture.create({ key: 'foo' })],
      }))

      expect(database.getZone('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown zone`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({ zones: [] }))
      expect(database.getZone('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({ zones: [] }))
      const key = undefined
      expect(database.getZone(key)).toBeUndefined()
    })
  })

  describe('getContact', () => {
    test(`should retrieve contact from the index`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({
        contacts: [contactDataFixture.create({ key: 'foo' })],
      }))
      expect(database.getContact('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown contact`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({ contacts: [] }))
      expect(database.getContact('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({ contacts: [] }))
      const key = undefined
      expect(database.getContact(key)).toBeUndefined()
    })
  })

  describe('getMission', () => {
    test(`should retrieve mission from the index`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({
        missions: [missionDataFixture.create({ key: 'foo' })],
      }))
      expect(database.getMission('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown mission`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({ missions: [] }))
      expect(database.getMission('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({ missions: [] }))
      const key = undefined
      expect(database.getMission(key)).toBeUndefined()
    })
  })

  describe('getBadge', () => {
    test(`should retrieve badge from the index`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({
        badges: [badgeDataFixture.create({ key: 'foo' })],
      }))
      expect(database.getBadge('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown badge`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({ badges: [] }))
      expect(database.getBadge('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({ badges: [] }))
      const key = undefined
      expect(database.getBadge(key)).toBeUndefined()
    })
  })

  describe('searchBadges', () => {
    test(`should search the badge list`, () => {
      const database = new CohContentDatabase()
      database.load(contentBundleFixture.create({
        badges: [
          badgeDataFixture.create({ key: 'foo', name: [{ value: 'Foo' }] }),
          badgeDataFixture.create({ key: 'bar', name: [{ value: 'Bar' }] }),
        ],
      }))

      const result = database.searchBadges({ query: { str: 'oo' } })
      expect(result.totalItems).toBe(1)
      expect(result.items.map(x => x.key)).toStrictEqual(['foo'])
    })
  })
})
