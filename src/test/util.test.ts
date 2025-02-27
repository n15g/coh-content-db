import { Badge, createBadgeReference, createMapReference, GameMap } from '../main'
import { badgeDataFixture } from './api/badge-data.fixture'
import { gameMapDataFixture } from './api/game-map-data.fixture'

describe(createBadgeReference.name, () => {
  test('should return the expected pattern', () => {
    expect(createBadgeReference('foo')).toBe('[badge:foo]')
    expect(createBadgeReference('bar')).toBe('[badge:bar]')
    expect(createBadgeReference('foo-bar')).toBe('[badge:foo-bar]')
  })

  test('should accept a Badge object', () => {
    const badge = new Badge(badgeDataFixture.create({ key: 'foo' }))
    expect(createBadgeReference(badge)).toBe('[badge:foo]')
  })
})

describe(createMapReference.name, () => {
  test('should return the expected pattern', () => {
    expect(createMapReference('foo')).toBe('[map:foo]')
    expect(createMapReference('bar')).toBe('[map:bar]')
    expect(createMapReference('foo-bar')).toBe('[map:foo-bar]')
  })

  test('should accept a GameMap object', () => {
    const map = new GameMap(gameMapDataFixture.create({ key: 'foo' }))
    expect(createMapReference(map)).toBe('[map:foo]')
  })
})
