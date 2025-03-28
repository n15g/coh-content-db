import { Link } from '../api/link'
import { ZoneData } from '../api/zone-data'
import { Key } from './key'

export class Zone {
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

  constructor(data: ZoneData) {
    this.key = new Key(data.key).value
    this.name = data.name
    this.links = data.links
  }
}
