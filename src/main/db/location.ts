import { Coords, LocationData } from '../api/location-data'

export class Location {
  readonly zoneKey: string
  readonly coords?: Coords

  constructor(data: LocationData) {
    this.zoneKey = data.zoneKey
    this.coords = data.coords
  }
}
