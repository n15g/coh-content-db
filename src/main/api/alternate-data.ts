import { Sex } from './sex'
import { Alignment } from './alignment'

/**
 * Some badge values differ based on the alignment or sex of the character.
 */
export interface AlternateData<V> {
  /**
   * The character alignment this alternate applies to.
   */
  readonly alignment?: Alignment

  /**
   * The character sex this alternate applies to.
   */
  readonly sex?: Sex

  /**
   * The value for this combination.
   */
  readonly value: V
}
