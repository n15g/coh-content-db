import { defineFixture } from 'efate'
import { ServerGroupData } from './server-group-data'
import { archetypeDataFixture } from './archetype-data.fixture'
import { Change } from './change'
import { badgeDataFixture } from './badge-data.fixture'
import { gameMapDataFixture } from './game-map-data.fixture'

export const serverGroupDataFixture = defineFixture<ServerGroupData>((t) => {
  t.key.as(index => `server-group-${index}`)
  t.name.as(index => `Server Group ${index}`)
  t.description?.asLoremIpsum()
  t.repository?.withValue('https://nouri.org')
  t.servers?.asArray()
  t.archetypes.arrayOfFixture({ fixture: archetypeDataFixture })
  t.maps.arrayOfFixture({ fixture: gameMapDataFixture })
  t.badges.arrayOfFixture({ fixture: badgeDataFixture })
  t.changelog.arrayOfFixture({
    fixture: defineFixture<Change>((t) => {
      t.version.as(index => `${index}`)
      t.date.as(() => new Date())
      t.description?.asLoremIpsum()
    }),
  })
})
