import { VidiotMapData } from '../api/vidiot-map-data'
import { VidiotMapPointOfInterest } from './vidiot-map-point-of-interest'

export class VidiotMap {
  /**
   * URL of the map image.
   */
  readonly imageUrl: string

  /**
   * Name to display for the Vidiot Map.
   */
  readonly name?: string

  /**
   * List of Points of Interest labelled on the image.
   */
  readonly pointsOfInterest?: VidiotMapPointOfInterest[]

  constructor(data: VidiotMapData) {
    this.imageUrl = data.imageUrl
    this.name = data.name
    this.pointsOfInterest = data.pointsOfInterest?.map(data => new VidiotMapPointOfInterest(data))
  }
}
