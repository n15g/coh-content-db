import { defineFixture } from 'efate'
import { ArchetypeData } from './archetype-data'

export const archetypeDataFixtureMinimal = defineFixture<ArchetypeData>((t) => {
  t.key.as(index => `archetype-${index}`)
  t.name.as(index => `Archetype ${index}`)
})

export const archetypeDataFixture = defineFixture<ArchetypeData>((t) => {
  t.extends(archetypeDataFixtureMinimal)
  t.description?.asLoremIpsum()
})
