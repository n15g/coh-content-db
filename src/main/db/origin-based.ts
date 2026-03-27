import { OriginBasedData } from '../api/origin-based-data'

export class OriginBased<T> {
  readonly primal: T
  readonly praetorian?: T

  constructor(value: OriginBasedData<T>) {
    if (Array.isArray(value)) {
      [this.primal, this.praetorian] = value
    } else {
      this.primal = value
      this.praetorian = undefined
    }
  }
}
