import { Key } from './key'
import { ArchetypeData } from '../api/archetype-data'

export class Archetype {
  readonly key: string
  readonly name: string
  readonly description?: string

  constructor(data: ArchetypeData) {
    this.key = new Key(data.key).value
    this.name = data.name
    this.description = data.description
  }
}
