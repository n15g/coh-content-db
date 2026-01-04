import { CohContentDatabase } from '../../main'
import { archetypeDataFixture } from '../api/archetype-data.fixture'
import { badgeDataFixture } from '../api/badge-data.fixture'
import { zoneDataFixture } from '../api/zone-data.fixture'
import { contactDataFixture } from '../api/contact-data.fixture'
import { missionDataFixture } from '../api/mission-data.fixture'
import { bundleDataFixture } from '../api/bundle-data.fixture'

describe(CohContentDatabase.name, () => {
  describe('Constructor', () => {
    test('should load a basic bundle', () => {
      new CohContentDatabase(bundleDataFixture.create())
    })
  })

  describe('header', () => {
    test(`should not accept an undefined field`, () => {
      expect(() =>
        new CohContentDatabase(
          bundleDataFixture.omit('header').create(),
        ),
      ).toThrow('Missing header data')
    })

    test(`should load values from bundle`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create(
          { header: { name: 'Homecoming' } },
        ),
      )

      expect(database.header?.name).toBe('Homecoming')
    })
  })

  describe('servers', () => {
    test(`should accept an undefined field`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.omit('servers').create(),
      )
      expect(database.servers).toHaveLength(0)
    })

    test(`should load values from bundle`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture
          .create({ servers: ['Foo', 'Bar'] }),
      )
      expect(database.servers).toStrictEqual(['Foo', 'Bar'])
    })
  })

  describe('archetypes', () => {
    test(`should accept an undefined field`, () => {
      const database = new CohContentDatabase(bundleDataFixture
        .omit('archetypes')
        .create())
      expect(database.archetypes).toHaveLength(0)
    })

    test(`should load data from bundle`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture
          .create({ archetypes: [archetypeDataFixture.create({ key: 'foo' })] }),
      )
      expect(database.getArchetype('foo')).not.toBeUndefined()
    })
  })

  describe('badges', () => {
    test(`should accept an undefined field`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.omit('badges').create(),
      )
      expect(database.badges).toHaveLength(0)
    })

    test(`should load data from bundle`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture
          .create({ badges: [badgeDataFixture.create({ key: 'foo' })] }),
      )
      expect(database.getBadge('foo')).not.toBeUndefined()
    })
  })

  describe('zones', () => {
    test(`should accept an undefined field`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.omit('zones').create(),
      )
      expect(database.zones).toHaveLength(0)
    })

    test(`should load data from bundle`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture
          .create({ zones: [zoneDataFixture.create({ key: 'foo' })] }),
      )
      expect(database.getZone('foo')).not.toBeUndefined()
    })
  })

  describe('contacts', () => {
    test(`should accept an undefined field`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.omit('contacts').create(),
      )
      expect(database.contacts).toHaveLength(0)
    })

    test(`should load data from bundle`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture
          .create({ contacts: [contactDataFixture.create({ key: 'foo' })] }),
      )
      expect(database.getContact('foo')).not.toBeUndefined()
    })
  })

  describe('missions', () => {
    test(`should accept an undefined field`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.omit('missions').create(),
      )
      expect(database.missions).toHaveLength(0)
    })

    test(`should load data from bundle`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture
          .create({ missions: [missionDataFixture.create({ key: 'foo' })] }),
      )
      expect(database.getMission('foo')).not.toBeUndefined()
    })
  })

  describe('getArchetype', () => {
    test(`should retrieve archetype from the index`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({
          archetypes: [archetypeDataFixture.create({ key: 'foo' })],
        }),
      )
      expect(database.getArchetype('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown archetype`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({ archetypes: [] }),
      )
      expect(database.getArchetype('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({ archetypes: [] }),
      )
      const key = undefined
      expect(database.getArchetype(key)).toBeUndefined()
    })
  })

  describe('getZone', () => {
    test(`should retrieve zone from the index`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({
          zones: [zoneDataFixture.create({ key: 'foo' })],
        }),
      )
      expect(database.getZone('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown zone`, () => {
      const database = new CohContentDatabase(bundleDataFixture.create({ zones: [] }))
      expect(database.getZone('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({ zones: [] }),
      )
      const key = undefined
      expect(database.getZone(key)).toBeUndefined()
    })
  })

  describe('getContact', () => {
    test(`should retrieve contact from the index`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({
          contacts: [contactDataFixture.create({ key: 'foo' })],
        }),
      )
      expect(database.getContact('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown contact`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({ contacts: [] }),
      )
      expect(database.getContact('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({ contacts: [] }),
      )
      const key = undefined
      expect(database.getContact(key)).toBeUndefined()
    })
  })

  describe('getMission', () => {
    test(`should retrieve mission from the index`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({
          missions: [missionDataFixture.create({ key: 'foo' })],
        }),
      )
      expect(database.getMission('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown mission`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({ missions: [] }),
      )
      expect(database.getMission('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({ missions: [] }),
      )
      const key = undefined
      expect(database.getMission(key)).toBeUndefined()
    })
  })

  describe('getBadge', () => {
    test(`should retrieve badge from the index`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({
          badges: [badgeDataFixture.create({ key: 'foo' })],
        }),
      )
      expect(database.getBadge('foo')).not.toBeUndefined()
    })

    test(`should return undefined for unknown badge`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({ badges: [] }),
      )
      expect(database.getBadge('foo')).toBeUndefined()
    })

    test(`should return undefined for undefined key`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({ badges: [] }),
      )
      const key = undefined
      expect(database.getBadge(key)).toBeUndefined()
    })
  })

  describe('searchBadges', () => {
    test(`should search the badge list`, () => {
      const database = new CohContentDatabase(
        bundleDataFixture.create({
          badges: [
            badgeDataFixture.create({ key: 'foo', name: [{ value: 'Foo' }] }),
            badgeDataFixture.create({ key: 'bar', name: [{ value: 'Bar' }] }),
          ],
        }),
      )

      const result = database.searchBadges({ query: { str: 'oo', fields: ['name'] } })
      expect(result.matchedItemCount).toBe(1)
      expect(result.totalItemCount).toBe(2)
      expect(result.items.map(x => x.key)).toStrictEqual(['foo'])
    })
  })
})
