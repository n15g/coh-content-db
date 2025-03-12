import { defineFixture } from 'efate'
import { BADGE_PARTIAL_TYPE, BadgePartialData, ENHANCEMENT_CATEGORY, PLAQUE_TYPE } from '../../main'

export const badgePartialDataFixture = defineFixture<BadgePartialData>((t) => {
  t.key.as(index => `badge-partial-${index}`)
  t.type.pickFrom([...BADGE_PARTIAL_TYPE])
  t.mapKey?.asString()
  t.loc?.asArray()
  t.plaqueType?.pickFrom([...PLAQUE_TYPE])
  t.inscription?.asLoremIpsum()
  t.vidiotMapKey?.asString()
  t.badgeKey?.as(index => `badge-${index}`)
  t.inventionLevel?.asNumber()
  t.inventionTypes?.pickFrom([...ENHANCEMENT_CATEGORY])
  t.inventionCount?.asNumber()
  t.notes?.asLoremIpsum()
})
