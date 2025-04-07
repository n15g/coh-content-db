import { LocationData } from '../../main'
import { defineFixture } from 'efate'

export const locationDataFixture = defineFixture<LocationData>((t) => {
  t.zoneKey.as(index => `zone-${index}`)
})
