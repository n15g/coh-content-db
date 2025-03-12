import { defineFixture } from 'efate'
import { VidiotMap } from '../../main'
import { vidiotMapPointOfInterestFixture } from './vidiot-map-point-of-interest.fixture'

export const vidiotMapFixture = defineFixture<VidiotMap>((t) => {
  t.imageUrl.as(index => `https://nouri.org?id=${index}`)
  t.name?.as(index => `Vidiot Map ${index}`)
  t.pointsOfInterest?.arrayOfFixture({ fixture: vidiotMapPointOfInterestFixture })
})
