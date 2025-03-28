import { ZoneData } from '../../main'
import { defineFixture } from 'efate'

export const zoneDataFixture = defineFixture<ZoneData>((t) => {
  t.key.as(index => `zone-${index}`)
  t.name.as(index => `Zone ${index}`)
  t.links?.as(() => [{ href: 'https://nouri.org' }])
})
