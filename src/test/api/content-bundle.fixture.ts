import { defineFixture } from 'efate'
import { Change, ContentBundle } from '../../main'
import { archetypeDataFixture } from './archetype-data.fixture'
import { gameMapDataFixture } from './game-map-data.fixture'
import { badgeDataFixture } from './badge-data.fixture'

export const contentBundleFixture = defineFixture<ContentBundle>((t) => {
  t.name.as(index => `Bundle ${index}`)
  t.description?.asLoremIpsum()
  t.repository?.as(index => `https://nouri.org?id=${index}`)
  t.servers?.asArray()
  t.archetypes?.arrayOfFixture({ fixture: archetypeDataFixture })
  t.maps?.arrayOfFixture({ fixture: gameMapDataFixture })
  t.badges?.arrayOfFixture({ fixture: badgeDataFixture })
  t.changelog?.arrayOfFixture({
    fixture: defineFixture<Change>((t) => {
      t.version.as(index => `${index}`)
      t.date.as(() => new Date())
      t.description?.asLoremIpsum()
    }),
  })
})
