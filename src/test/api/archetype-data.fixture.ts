import { defineFixture } from 'efate'
import { ArchetypeData } from '../../main'

export const archetypeDataFixture = defineFixture<ArchetypeData>((t) => {
  t.key.as(index => `archetype-${index}`)
  t.name.as(index => `Archetype ${index}`)
  t.description?.asLoremIpsum()
})
