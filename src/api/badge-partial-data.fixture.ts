import { defineFixture } from 'efate'
import { BadgePartialData } from './badge-partial-data'
import { ENHANCEMENT_CATEGORY } from './enhancement-category'
import { BADGE_PARTIAL_TYPE } from './badge-partial-type'
import { PLAQUE_TYPE } from './plaque-type'

export const badgePartialDataFixture = defineFixture<BadgePartialData>((t) => {
  t.key.as(index => `badge-partial-${index}`)
  t.type.pickFrom([...BADGE_PARTIAL_TYPE])
  t.mapKey?.asString()
  t.location?.asArray()
  t.plaqueType?.pickFrom([...PLAQUE_TYPE])
  t.inscription?.asLoremIpsum()
  t.vidiotMapKey?.asString()
  t.badgeKey?.as(index => `badge-${index}`)
  t.inventionLevel?.asNumber()
  t.inventionTypes?.pickFrom([...ENHANCEMENT_CATEGORY])
  t.inventionCount?.asNumber()
  t.notes?.asLoremIpsum()
})
