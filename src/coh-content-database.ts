import { IServerGroup, IServerGroupData } from './types/server-group'
import { getOrDefine } from './internal/_common'
import { ServerGroup } from './internal/server-group'
import { changelog } from './_changelog'

export class CohContentDatabase {
  private readonly serverGroups: { [id: string]: ServerGroup } = {}

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
  listServerGroups(): IServerGroup[] {
    return Object.values(this.serverGroups)
  }

  /**
   * get a server group by key.
   * @param serverGroupKey The key.
   */
  getServerGroup(serverGroupKey: string): IServerGroup | null {
    return this.serverGroups[serverGroupKey]
  }

  getChangelog(): Record<string, string> {
    return changelog
  }
}
