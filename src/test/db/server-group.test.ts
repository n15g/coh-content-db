import { ServerGroup } from '../../main'
import { serverGroupDataFixture } from '../api/server-group-data.fixture'
import { badgeDataFixture } from '../api/badge-data.fixture'
import { gameMapDataFixture } from '../api/game-map-data.fixture'
import { archetypeDataFixture } from '../api/archetype-data.fixture'

describe(ServerGroup.name, () => {
  describe('Constructor', () => {
    test(`should accept the test fixture`, () => {
      new ServerGroup(serverGroupDataFixture.create())
    })
  })

  describe('archetypes', () => {
    test(`should throw an error on duplicate key`, () => {
      const data = serverGroupDataFixture.create({
        archetypes: [
          archetypeDataFixture.create({ key: 'foo' }),
          archetypeDataFixture.create({ key: 'foo' }),
        ],
      })
      expect(() => new ServerGroup(data)).toThrow('Duplicate archetype key [foo]')
    })
  })

  describe('badges', () => {
    test(`should throw an error on duplicate key`, () => {
      const data = serverGroupDataFixture.create({
        badges: [
          badgeDataFixture.create({ key: 'foo' }),
          badgeDataFixture.create({ key: 'foo' }),
        ],
      })
      expect(() => new ServerGroup(data)).toThrow('Duplicate badge key [foo]')
    })
  })

  describe('maps', () => {
    test(`should throw an error on duplicate map`, () => {
      const data = serverGroupDataFixture.create({
        maps: [
          gameMapDataFixture.create({ key: 'foo' }),
          gameMapDataFixture.create({ key: 'foo' }),
        ],
      })
      expect(() => new ServerGroup(data)).toThrow('Duplicate map key [foo]')
    })
  })

  describe('getArchetype', () => {
    test(`should retrieve archetype from the index`, () => {
      const data = serverGroupDataFixture.create({
        archetypes: [archetypeDataFixture.create({ key: 'foo' })],
      })

      expect(new ServerGroup(data).getArchetype('foo')).not.toBeNull()
    })

    test(`should throw error for unknown archetype`, () => {
      const data = serverGroupDataFixture.create({
        archetypes: [],
      })

      expect(() => new ServerGroup(data).getArchetype('foo')).toThrow('Unknown archetype key [foo]')
    })
  })

  describe('getMap', () => {
    test(`should retrieve map from the index`, () => {
      const data = serverGroupDataFixture.create({
        maps: [gameMapDataFixture.create({ key: 'foo' })],
      })

      expect(new ServerGroup(data).getMap('foo')).not.toBeNull()
    })

    test(`should throw error for unknown map`, () => {
      const data = serverGroupDataFixture.create({
        maps: [],
      })

      expect(() => new ServerGroup(data).getMap('foo')).toThrow('Unknown map key [foo]')
    })
  })

  describe('getBadge', () => {
    test(`should retrieve badge from the index`, () => {
      const data = serverGroupDataFixture.create({
        badges: [badgeDataFixture.create({ key: 'foo' })],
      })

      expect(new ServerGroup(data).getBadge('foo')).not.toBeNull()
    })

    test(`should throw error for unknown badge`, () => {
      const data = serverGroupDataFixture.create({
        badges: [],
      })

      expect(() => new ServerGroup(data).getBadge('foo')).toThrow('Unknown badge key [foo]')
    })
  })
})
