import { defineFixture } from 'efate'
import { BadgeData } from './badge-data'
import { BADGE_TYPE } from './badge-type'
import { ALIGNMENT } from './alignment'
import { badgePartialDataFixture } from './badge-partial-data.fixture'

export const badgeDataFixture = defineFixture<BadgeData>((t) => {
  t.key.as(index => `badge-${index}`)
  t.type.pickFrom([...BADGE_TYPE])
  t.name.as(index => [{ value: `Badge ${index}` }])
  t.alignment.pickFrom([...ALIGNMENT])
  t.badgeText?.as(index => [{ value: `This is badge ${index}` }])
  t.acquisition?.asLoremIpsum()
  t.icon?.asArray([{ value: 'https://nouri.org' }])
  t.notes?.asLoremIpsum()
  t.links?.asArray([{ href: 'https://nouri.org' }])
  t.mapKey?.asString()
  t.loc?.asArray()
  t.vidiotMapKey?.asString()
  t.setTitle?.asArray({ length: 2 })
  t.effect?.asString()
  t.partials?.arrayOfFixture({ fixture: badgePartialDataFixture })
  t.ignoreInTotals?.asBoolean()
})
