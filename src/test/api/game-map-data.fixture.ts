import { GameMapData } from '../../main'
import { defineFixture } from 'efate'

export const gameMapDataFixture = defineFixture<GameMapData>((t) => {
  t.key.as(index => `map-${index}`)
  t.name.as(index => `Map ${index}`)
  t.links?.asArray([{ href: 'https://nouri.org' }])
  t.vidiotMaps?.asArray()
})
