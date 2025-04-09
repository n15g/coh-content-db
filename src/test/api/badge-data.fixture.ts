import { defineFixture } from 'efate'
import { BADGE_TYPE, BadgeData } from '../../main'

export const badgeDataFixture = defineFixture<BadgeData>((t) => {
  t.key.as(index => `badge-${index}`)
  t.type.pickFrom([...BADGE_TYPE])
  t.name.as(index => [{ value: `Badge ${index}` }])
})
