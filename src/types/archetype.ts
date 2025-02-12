import { IServerGroup } from './server-group'

export interface IArchetypeData {
  readonly key: string
  readonly name?: string
  readonly description?: string
}

export interface IArchetype extends IArchetypeData {
  readonly serverGroup: IServerGroup
}
