import { MarkdownString } from './markdown-string'

export interface VidiotMapPointOfInterestData {
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
   * If the POI is a zone transfer, the zone it transfers to.
   */
  readonly zoneKey?: string

  /**
   * If the POI is a badge, the badge.
   */
  readonly badgeKey?: string

  /**
   * If the POI is a requirement for a badge, the requirement key.
   */
  readonly badgeRequirementKey?: string
}
