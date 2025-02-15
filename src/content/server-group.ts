import { IBadge, IGameMap, IServerData, IServerGroup, IServerGroupData, ServerGroupStatus, validateKey } from '..'
import { IArchetype } from '../types/archetype'
import { Archetype } from './archetype'
import { GameMap } from './game-map'
import { Badge } from './badge'
import { getOrDefine } from './_common'

export class ServerGroup implements IServerGroup {
  public readonly key: string
  public name?: string
  public description?: string
  public status?: ServerGroupStatus[]
  public repository?: string
  public servers?: IServerData[]
  public archetypes: IArchetype[] = []
  public maps: IGameMap[] = []
  public badges: IBadge[] = []
  public changelog: { [id: string]: string } = {}

  private archetypeCache: { [id: string]: Archetype } = {}
  private mapCache: { [id: string]: GameMap } = {}
  private badgeCache: { [id: string]: Badge } = {}

  public constructor(key: string) {
    validateKey(key)

    this.key = key
  }

  public load(data: IServerGroupData) {
    if (data.name != undefined) this.name = data.name
    if (data.description != undefined) this.description = data.description
    if (data.status != undefined) this.status = data.status
    if (data.repository != undefined) this.repository = data.repository
    if (data.servers != undefined) this.servers = data.servers

    if (data.archetypes != undefined) {
      for (const archetype of data.archetypes) {
        getOrDefine(archetype.key, this.archetypeCache, key => new Archetype(this, key))
          .load(archetype)
      }
      this.archetypes = Object.values(this.archetypeCache)
    }

    if (data.maps != undefined) {
      for (const map of data.maps) {
        getOrDefine(map.key, this.mapCache, key => new GameMap(this, key))
          .load(map)
      }
      this.maps = Object.values(this.mapCache)
    }

    if (data.badges != undefined) {
      for (const badge of data.badges) {
        getOrDefine(badge.key, this.badgeCache, key => new Badge(this, key))
          .load(badge)
      }
      this.badges = Object.values(this.badgeCache)
    }

    if (data.changelog) {
      this.changelog = data.changelog
    }
  }

  public getArchetype(key: string): IArchetype | null {
    return this.archetypeCache[key]
  }

  public getMap(key: string): IGameMap | null {
    return this.mapCache[key]
  }

  public getBadge(key: string): IBadge | null {
    return this.badgeCache[key]
  }
}
