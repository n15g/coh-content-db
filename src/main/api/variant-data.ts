import { Sex } from './sex'
import { Alignment } from './alignment'

/**
 * Some badge values differ based on the alignment or sex of a character.
 */
export interface VariantData<V> {
  /**
   * The character alignment this variant applies to.
   */
  readonly alignment?: Alignment

  /**
   * The character sex this variant applies to.
   */
  readonly sex?: Sex

  /**
   * The value for this combination.
   */
  readonly value: V
}
