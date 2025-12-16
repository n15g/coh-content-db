import { SetTitleData } from '../api/set-title-data'

export class SetTitleIds {
  readonly primal: number
  readonly praetorian?: number

  constructor(value: SetTitleData) {
    [this.primal, this.praetorian] = value
  }
}
