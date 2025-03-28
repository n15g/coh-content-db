import { Badge, badgeLink, badgeUri, Contact, contactLink, contactUri, Zone, zoneLink, zoneUri } from '../main'
import { badgeDataFixture } from './api/badge-data.fixture'
import { zoneDataFixture } from './api/zone-data.fixture'
import { contactDataFixture } from './api/contact-data.fixture'

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

describe(contactUri.name, () => {
  test('should return the expected pattern', () => {
    expect(contactUri('foo')).toBe('contact://foo')
    expect(contactUri('bar')).toBe('contact://bar')
    expect(contactUri('foo-bar')).toBe('contact://foo-bar')
  })

  test('should accept a Contact object', () => {
    const contact = new Contact(contactDataFixture.create({ key: 'foo' }))
    expect(contactUri(contact)).toBe('contact://foo')
  })

  test('should accept a ContactData object', () => {
    const contact = contactDataFixture.create({ key: 'foo' })
    expect(contactUri(contact)).toBe('contact://foo')
  })
})

describe(contactLink.name, () => {
  test('should return the expected pattern', () => {
    expect(contactLink('foo')).toBe('[foo](contact://foo)')
    expect(contactLink('bar')).toBe('[bar](contact://bar)')
    expect(contactLink('foo-bar')).toBe('[foo-bar](contact://foo-bar)')
  })

  test('should accept a Contact object', () => {
    const contact = new Contact(contactDataFixture.create({ key: 'foo' }))
    expect(contactLink(contact)).toBe('[foo](contact://foo)')
  })

  test('should accept a ContactData object', () => {
    const contact = contactDataFixture.create({ key: 'foo' })
    expect(contactLink(contact)).toBe('[foo](contact://foo)')
  })
})

describe(zoneUri.name, () => {
  test('should return the expected pattern', () => {
    expect(zoneUri('foo')).toBe('zone://foo')
    expect(zoneUri('bar')).toBe('zone://bar')
    expect(zoneUri('foo-bar')).toBe('zone://foo-bar')
  })

  test('should accept a Zone object', () => {
    const zone = new Zone(zoneDataFixture.create({ key: 'foo' }))
    expect(zoneUri(zone)).toBe('zone://foo')
  })

  test('should accept a ZoneData object', () => {
    const zone = zoneDataFixture.create({ key: 'foo' })
    expect(zoneUri(zone)).toBe('zone://foo')
  })
})

describe(zoneLink.name, () => {
  test('should return the expected pattern', () => {
    expect(zoneLink('foo')).toBe('[foo](zone://foo)')
    expect(zoneLink('bar')).toBe('[bar](zone://bar)')
    expect(zoneLink('foo-bar')).toBe('[foo-bar](zone://foo-bar)')
  })

  test('should accept a Zone object', () => {
    const zone = new Zone(zoneDataFixture.create({ key: 'foo' }))
    expect(zoneLink(zone)).toBe('[foo](zone://foo)')
  })

  test('should accept a ZoneData object', () => {
    const zone = zoneDataFixture.create({ key: 'foo' })
    expect(zoneLink(zone)).toBe('[foo](zone://foo)')
  })
})
