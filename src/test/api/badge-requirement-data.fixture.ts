import { defineFixture } from 'efate'
import { BADGE_REQUIREMENT_TYPE, BadgeRequirementData } from '../../main'

export const badgeRequirementDataFixture = defineFixture<BadgeRequirementData>((t) => {
  t.key.as(index => `badge-requirement-${index}`)
  t.type.pickFrom([...BADGE_REQUIREMENT_TYPE])
})
