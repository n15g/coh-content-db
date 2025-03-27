import { BadgePartialData } from '../api/badge-partial-data'
import { PlaqueType } from '../api/plaque-type'
import { BadgePartialType } from '../api/badge-partial-type'
import { EnhancementCategory } from '../api/enhancement-category'
import { Key } from './key'
import { MarkdownString } from '../api/markdown-string'

export class BadgePartial {
  readonly key: string
  readonly type: BadgePartialType
  readonly mapKey?: string
  readonly loc?: number[]
  readonly plaqueType?: PlaqueType
  readonly inscription?: string
  readonly vidiotMapKey?: string
  readonly badgeKey?: string
  readonly inventionLevel?: number
  readonly inventionTypes?: EnhancementCategory[]
  readonly inventionCount?: number
  readonly notes?: MarkdownString

  constructor(data: BadgePartialData) {
    this.key = new Key(data.key).value
    this.type = data.type
    this.mapKey = data.mapKey
    this.loc = data.loc
    this.plaqueType = data.plaqueType
    this.inscription = data.inscription
    this.vidiotMapKey = data.vidiotMapKey
    this.badgeKey = data.badgeKey
    this.inventionLevel = data.inventionLevel
    this.inventionTypes = data.inventionTypes
    this.inventionCount = data.inventionCount
    this.notes = data.notes
  }
}
