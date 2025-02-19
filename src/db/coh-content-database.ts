import { ServerGroup } from './server-group'
import { ServerGroupData } from '../api/server-group-data'

export class CohContentDatabase {
  readonly #serverGroups: Record<string, ServerGroup> = {}

  /**
   * Load a server group data package into the database.
   * @param data The data to load.
   */
  loadServerGroupData(data: ServerGroupData) {
    this.#serverGroups[data.key] = new ServerGroup(data)
  }

  /**
   * Get all the server groups currently loaded in the database.
   */
  listServerGroups(): ServerGroup[] {
    return Object.values(this.#serverGroups)
  }

  /**
   * get a server group by key.
   * @param serverGroupKey The key.
   */
  getServerGroup(serverGroupKey: string): ServerGroup | null {
    return this.#serverGroups[serverGroupKey]
  }
}
