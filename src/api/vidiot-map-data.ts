import { VidiotMapPointOfInterestData } from './vidiot-map-point-of-interest-data'

export interface VidiotMapData {
  /**
   * URL of the map image.
   */
  readonly imageUrl: string

  /**
   * Name to display for the Vidiot map.
   */
  readonly name?: string

  /**
   * List of Points of Interest labelled on the image.
   */
  readonly pointsOfInterest?: VidiotMapPointOfInterestData[]
}
