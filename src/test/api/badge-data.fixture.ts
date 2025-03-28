import { defineFixture } from 'efate'
import { ALIGNMENT, BADGE_TYPE, BadgeData } from '../../main'
import { badgeRequirementDataFixture } from './badge-requirement-data.fixture'

export const badgeDataFixture = defineFixture<BadgeData>((t) => {
  t.key.as(index => `badge-${index}`)
  t.type.pickFrom([...BADGE_TYPE])
  t.name.as(index => [{ value: `Badge ${index}` }])
  t.alignment.pickFrom([...ALIGNMENT])
  t.badgeText?.as(index => [{ value: `This is badge ${index}` }])
  t.acquisition?.asLoremIpsum()
  t.icon?.as(() => [{ value: 'https://nouri.org' }])
  t.notes?.asLoremIpsum()
  t.links?.as(() => [{ href: 'https://nouri.org' }])
  t.mapKey?.asString()
  t.loc?.as(index => [index, index, index])
  t.vidiotMapKey?.asString()
  t.setTitle?.as((index) => {
    return { id: index }
  })
  t.effect?.asString()
  t.requirements?.as(() => [[badgeRequirementDataFixture]])
  t.ignoreInTotals?.asBoolean()
})
