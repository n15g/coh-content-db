import { Sex } from './sex'
import { Alignment } from './alignment'

export interface Alternate<V> {
  readonly sex?: Sex | string
  readonly alignment?: Alignment | string
  readonly value: V
}
