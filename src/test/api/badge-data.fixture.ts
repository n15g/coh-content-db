import { defineFixture } from 'efate'
import { BADGE_TYPE, BadgeData } from '../../main'

export const badgeDataFixture = defineFixture<BadgeData>((t) => {
  t.key.as(index => `badge-${index}`)
  t.gameId.as(index => `Badge${index}`)
  t.type.pickFrom([...BADGE_TYPE])
  t.name.as(index => [{ value: `Badge ${index}` }])
  t.releaseDate.as(() => '2025-02-03')
})

// If you change this fixture, update the example in the README as well
export const TEST_BADGE: BadgeData = {
  key: 'test-badge',
  gameId: 'TestBadge',
  type: 'achievement',
  name: [{ value: 'Test Badge' }, { alignment: 'praetorian', value: 'My Badge for Praetorians' }],
  releaseDate: '2020-03-01',
  morality: ['hero', 'praetorian'],
}
