import { defineFixture } from 'efate'
import { BADGE_REQUIREMENT_TYPE, BadgeRequirementData, ENHANCEMENT_CATEGORY, PLAQUE_TYPE } from '../../main'

export const badgeRequirementDataFixture = defineFixture<BadgeRequirementData>((t) => {
  t.key.as(index => `badge-requirement-${index}`)
  t.type.pickFrom([...BADGE_REQUIREMENT_TYPE])
  t.mapKey?.asString()
  t.loc?.as(index => [index, index, index])
  t.plaqueType?.pickFrom([...PLAQUE_TYPE])
  t.plaqueInscription?.asLoremIpsum()
  t.vidiotMapKey?.asString()
  t.badgeKey?.as(index => `badge-${index}`)
  t.arcName?.asString()
  t.arcContactName?.asString()
  t.inventionLevel?.asNumber()
  t.inventionTypes?.pickFrom([...ENHANCEMENT_CATEGORY])
  t.inventionCount?.asNumber()
  t.notes?.asLoremIpsum()
})
