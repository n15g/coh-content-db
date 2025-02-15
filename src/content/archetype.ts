import { ArchetypeData } from './archetype-data'
import { Content } from './content'

export class Archetype extends Content {
  readonly name: string
  readonly description: string | null

  constructor(data: ArchetypeData) {
    super(data.key)
    this.name = data.name
    this.description = data.description ?? null
  }
}
