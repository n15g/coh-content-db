import { Badge } from '../../main'
import { badgeDataFixture } from '../api/badge-data.fixture'
import { BadgeSearchDocument } from '../../main/db/badge-search-document'

describe(Badge.name, () => {
  test(`should set the id from the badge key`, () => {
    expect(new BadgeSearchDocument(new Badge(badgeDataFixture.create({ key: 'foo' }))).id).toBe('foo')
  })

  test(`should set the key from the badge`, () => {
    expect(new BadgeSearchDocument(new Badge(badgeDataFixture.create({ key: 'foo' }))).key).toBe('foo')
  })

  test(`should set the name from the badge names`, () => {
    expect(new BadgeSearchDocument(new Badge(badgeDataFixture.create({
      name: [
        { value: 'foo' },
        { alignment: 'H', value: 'bar' },
      ],
    }))).name).toBe('foo, bar')
  })

  test(`should set the badge text`, () => {
    expect(new BadgeSearchDocument(new Badge(badgeDataFixture.create({
      badgeText: [
        { value: 'foo' },
        { alignment: 'H', value: 'bar' },
      ],
    }))).badgeText).toBe('foo, bar')
  })

  test(`should set the acquisition`, () => {
    expect(new BadgeSearchDocument(new Badge(badgeDataFixture.create({ acquisition: 'foo' }))).acquisition).toBe('foo')
  })
})
