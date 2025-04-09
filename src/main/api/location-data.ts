export interface LocationData {
  readonly zoneKey?: string
  readonly coords?: Coords
}

/**
 * Coordinates as they appear using the in-game `/loc` command.
 */
export type Coords = [number, number, number]
