import { IArchetype, IArchetypeData } from '../types/archetype'
import { validateKey } from './_common'
import { ServerGroup } from './server-group'

export class Archetype implements IArchetype {
  public readonly serverGroup: ServerGroup
  public readonly key: string
  public name?: string
  public description?: string

  constructor(serverGroup: ServerGroup, key: string) {
    validateKey(key)

    this.serverGroup = serverGroup
    this.key = key
  }

  public load(data: IArchetypeData) {
    if (data.name != undefined) this.name = data.name
    if (data.description != undefined) this.description = data.description
  }
}
