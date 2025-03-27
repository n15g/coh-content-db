import { Badge, badgeLink, badgeUri, GameMap, mapLink, mapUri } from '../main'
import { badgeDataFixture } from './api/badge-data.fixture'
import { gameMapDataFixture } from './api/game-map-data.fixture'

describe(badgeUri.name, () => {
  test('should return the expected pattern', () => {
    expect(badgeUri('foo')).toBe('badge://foo')
    expect(badgeUri('bar')).toBe('badge://bar')
    expect(badgeUri('foo-bar')).toBe('badge://foo-bar')
  })

  test('should accept a Badge object', () => {
    const badge = new Badge(badgeDataFixture.create({ key: 'foo' }))
    expect(badgeUri(badge)).toBe('badge://foo')
  })

  test('should accept a BadgeData object', () => {
    const badge = badgeDataFixture.create({ key: 'foo' })
    expect(badgeUri(badge)).toBe('badge://foo')
  })
})

describe(badgeLink.name, () => {
  test('should return the expected pattern', () => {
    expect(badgeLink('foo')).toBe('[foo](badge://foo)')
    expect(badgeLink('bar')).toBe('[bar](badge://bar)')
    expect(badgeLink('foo-bar')).toBe('[foo-bar](badge://foo-bar)')
  })

  test('should accept a Badge object', () => {
    const badge = new Badge(badgeDataFixture.create({ key: 'foo' }))
    expect(badgeLink(badge)).toBe('[foo](badge://foo)')
  })

  test('should accept a BadgeData object', () => {
    const badge = badgeDataFixture.create({ key: 'foo' })
    expect(badgeLink(badge)).toBe('[foo](badge://foo)')
  })
})

describe(mapUri.name, () => {
  test('should return the expected pattern', () => {
    expect(mapUri('foo')).toBe('map://foo')
    expect(mapUri('bar')).toBe('map://bar')
    expect(mapUri('foo-bar')).toBe('map://foo-bar')
  })

  test('should accept a GameMap object', () => {
    const map = new GameMap(gameMapDataFixture.create({ key: 'foo' }))
    expect(mapUri(map)).toBe('map://foo')
  })

  test('should accept a GameMapData object', () => {
    const map = gameMapDataFixture.create({ key: 'foo' })
    expect(mapUri(map)).toBe('map://foo')
  })
})

describe(mapLink.name, () => {
  test('should return the expected pattern', () => {
    expect(mapLink('foo')).toBe('[foo](map://foo)')
    expect(mapLink('bar')).toBe('[bar](map://bar)')
    expect(mapLink('foo-bar')).toBe('[foo-bar](map://foo-bar)')
  })

  test('should accept a GameMap object', () => {
    const map = new GameMap(gameMapDataFixture.create({ key: 'foo' }))
    expect(mapLink(map)).toBe('[foo](map://foo)')
  })

  test('should accept a GameMapData object', () => {
    const map = gameMapDataFixture.create({ key: 'foo' })
    expect(mapLink(map)).toBe('[foo](map://foo)')
  })
})
