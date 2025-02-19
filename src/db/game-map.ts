import { VidiotMap } from './vidiot-map'
import { Link } from '../api/link'
import { GameMapData } from '../api/game-map-data'
import { Key } from './key'

export class GameMap {
  /**
   * The database key for this map.
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
  readonly vidiotMaps?: VidiotMap[]

  constructor(data: GameMapData) {
    this.key = new Key(data.key).value
    this.name = data.name
    this.links = data.links
    this.vidiotMaps = data.vidiotMaps?.map(data => new VidiotMap(data))
  }
}
