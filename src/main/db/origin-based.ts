import { OriginBasedData } from '../api/origin-based-data'

export class OriginBased<T> {
  readonly primal: T
  readonly praetorian?: T

  constructor(value: OriginBasedData<T>) {
    if (Array.isArray(value)) {
      this.primal = value[0]
      this.praetorian = value[1]
    } else {
      this.primal = value
      this.praetorian = undefined
    }
  }
}
