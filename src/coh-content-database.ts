import { getOrDefine } from './internal/_common'
import { changelog } from './_changelog'
import { ServerGroup } from './content/server-group'
import { IServerGroupData } from './content/server-group-data'

export class CohContentDatabase {
  private readonly serverGroups: Record<string, ServerGroup> = {}

  /**
   * Load server group data package into the database.
   * @param data The data to load.
   */
  loadServerGroup(data: IServerGroupData) {
    const serverGroup = getOrDefine(data.key, this.serverGroups, key => new ServerGroup(key))
    serverGroup.load(data)
  }

  /**
   * Get all the server groups currently loaded in the database.
   */
  listServerGroups(): ServerGroup[] {
    return Object.values(this.serverGroups)
  }

  /**
   * get a server group by key.
   * @param serverGroupKey The key.
   */
  getServerGroup(serverGroupKey: string): ServerGroup | null {
    return this.serverGroups[serverGroupKey]
  }

  getChangelog(): Record<string, string> {
    return changelog
  }
}
