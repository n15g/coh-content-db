import { ZoneData } from '../../main'
import { defineFixture } from 'efate'

export const zoneDataFixture = defineFixture<ZoneData>((t) => {
  t.key.as(index => `zone-${index}`)
  t.name.as(index => `Zone ${index}`)
  t.type.withValue('city')
  t.links?.as(() => [{ title: 'foo', href: 'https://nouri.org' }])
})
