import { LevelRangeData } from '../api/level-range-data'

export class LevelRange {
  readonly min: number
  readonly max?: number

  constructor(value: LevelRangeData) {
    if (Array.isArray(value)) {
      this.min = value[0]
      this.max = value[1] === undefined ? undefined : value[1]
    } else {
      this.min = value
    }
  }
}
