import { BadgePartialData } from '../api/badge-partial-data'
import { PlaqueType } from '../api/plaque-type'
import { BadgePartialType } from '../api/badge-partial-type'
import { EnhancementCategory } from '../api/enhancement-category'
import { Key } from './key'

export class BadgePartial {
  readonly key: string
  readonly type: BadgePartialType | string
  readonly mapKey?: string
  readonly loc?: number[]
  readonly plaqueType?: PlaqueType | string
  readonly inscription?: string
  readonly vidiotMapKey?: string
  readonly badgeKey?: string
  readonly inventionLevel?: number
  readonly inventionTypes?: (EnhancementCategory | string)[]
  readonly inventionCount?: number
  readonly notes?: string

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
