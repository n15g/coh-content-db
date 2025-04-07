import { defineFixture } from 'efate'
import { BADGE_REQUIREMENT_TYPE, BadgeRequirementData, ENHANCEMENT_CATEGORY } from '../../main'
import { locationDataFixture } from './location-data.fixture'

export const badgeRequirementDataFixture = defineFixture<BadgeRequirementData>((t) => {
  t.key.as(index => `badge-requirement-${index}`)
  t.type.pickFrom([...BADGE_REQUIREMENT_TYPE])
  t.location?.fromFixture(locationDataFixture)
  t.badgeKey?.as(index => `badge-${index}`)
  t.missionKey?.as(index => `mission-${index}`)
  t.monumentText?.asLoremIpsum()
  t.inventionLevel?.asNumber()
  t.inventionTypes?.pickFrom([...ENHANCEMENT_CATEGORY])
  t.count?.asNumber()
  t.notes?.asLoremIpsum()
  t.links?.as(() => [{ title: 'foo', href: 'https://nouri.org' }])
})
