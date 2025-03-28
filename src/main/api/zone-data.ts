import { Link } from './link'
import { VidiotMapData } from './vidiot-map-data'

export interface ZoneData {
  /**
   * Unique key used to reference this zone.
   *
   * Keys can only contain lowercase letters, numbers and hyphens (`-`).
   */
  readonly key: string

  /**
   * The name of the zone as it appears in-game.
   */
  readonly name: string

  /**
   * List of external links for this Zone. Wiki, forums, etc.
   */
  readonly links?: Link[]

  /**
   * List of Vidiot Map assets for this zone.
   */
  readonly vidiotMaps?: VidiotMapData[]
}
