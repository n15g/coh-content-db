import { VidiotMapPointOfInterestData } from '../api/vidiot-map-point-of-interest-data'
import { MarkdownString } from '../api/markdown-string'

export class VidiotMapPointOfInterest {
  /**
   * The pixel-space position of the PoI on the map graphic.
   *
   * Screen-space, pixels from top-left `[0, 0]`.
   */
  readonly pos?: [number, number]

  /**
   * Freeform notes about the PoI.
   */
  readonly notes?: MarkdownString

  /**
   * If the POI is a zone transfer, the map it transfers to.
   */
  readonly mapKey?: string

  /**
   * If the POI is a badge, the badge.
   */
  readonly badgeKey?: string

  /**
   * If the POI is a partial for a badge, the partial key.
   */
  readonly badgePartialKey?: string

  constructor(data: VidiotMapPointOfInterestData) {
    this.pos = data.pos
    this.notes = data.notes
    this.mapKey = data.mapKey
    this.badgeKey = data.badgeKey
    this.badgePartialKey = data.badgePartialKey
  }
}
