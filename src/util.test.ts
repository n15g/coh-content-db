import { createBadgeReference, createMapReference } from './util'
import { Badge } from './db/badge'
import { badgeDataFixture } from './api/badge-data.fixture'
import { GameMap } from './db/game-map'
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
    expect(createMapReference({ key: 'foo', name: 'Foo' })).toBe('[map:foo]')
    expect(createMapReference({ key: 'bar', name: 'Bar' })).toBe('[map:bar]')
    expect(createMapReference({ key: 'foo-bar', name: 'Foo Bar' })).toBe('[map:foo-bar]')
  })

  test('should accept a GameMap object', () => {
    const map = new GameMap(gameMapDataFixture.create({ key: 'foo' }))
    expect(createMapReference(map)).toBe('[map:foo]')
  })
})
