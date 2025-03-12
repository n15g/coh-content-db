import { Link } from './link'
import { VidiotMapData } from './vidiot-map-data'

export interface GameMapData {
  /**
   * Unique key used to reference this badge.
   *
   * Keys can only contain lowercase letters, numbers and hyphens (`-`).
   */
  readonly key: string

  /**
   * The name of the map as it appears in-game.
   */
  readonly name: string

  /**
   * List of external links for this Map. Wiki, forums, etc.
   */
  readonly links?: Link[]

  /**
   * List of Vidiot Map assets for this map.
   */
  readonly vidiotMaps?: VidiotMapData[]
}
