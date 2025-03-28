import { defineFixture } from 'efate'
import { VidiotMapPointOfInterest } from '../../main'

export const vidiotMapPointOfInterestFixture = defineFixture<VidiotMapPointOfInterest>((t) => {
  t.pos?.as(index => [index, index])
  t.notes?.asLoremIpsum()
  t.mapKey?.as(index => `map-${index}`)
  t.badgeKey?.as(index => `badge-${index}`)
  t.badgeRequirementKey?.as(index => `requirement-${index}`)
})
