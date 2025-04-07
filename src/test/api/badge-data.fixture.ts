import { defineFixture } from 'efate'
import { BADGE_TYPE, BadgeData, MORALITY } from '../../main'
import { badgeRequirementDataFixture } from './badge-requirement-data.fixture'

export const badgeDataFixture = defineFixture<BadgeData>((t) => {
  t.key.as(index => `badge-${index}`)
  t.type.pickFrom([...BADGE_TYPE])
  t.name.as(index => [{ value: `Badge ${index}` }])
  t.morality?.pickFrom([...MORALITY])
  t.badgeText?.as(index => [{ value: `This is badge ${index}` }])
  t.acquisition?.asLoremIpsum()
  t.icon?.as(() => [{ value: 'https://nouri.org' }])
  t.notes?.asLoremIpsum()
  t.links?.as(() => [{ title: 'foo', href: 'https://nouri.org' }])
  t.vidiotMapKey?.asString()
  t.setTitleId?.as(index => [index, index * 10])
  t.effect?.asString()
  t.requirements?.as(() => [badgeRequirementDataFixture])
  t.ignoreInTotals?.asBoolean()
})
