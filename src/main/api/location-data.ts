export interface LocationData {
  /**
   * Key of the {@link Zone} that the location references.
   */
  readonly zoneKey?: string

  /**
   * In-game `/loc` coordinates of the location.
   */
  readonly coords?: Coords

  /**
   * The type of icon to use if the location appears on a map. (Typically the Vidiot map icon).
   */
  readonly icon?: LocationIcon

  /**
   * The text that should appear in the location icon. (Typically a number or symbol from the Vidiot map).
   */
  readonly iconText?: string
}

/**
 * Coordinates as they appear using the in-game `/loc` command.
 */
export type Coords = [number, number, number]

export type LocationIcon = 'badge' | 'plaque' | 'pedestal' | 'object'
