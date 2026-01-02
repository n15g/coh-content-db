import { Sex } from './sex'
import { Morality } from './morality'
import { Alignment } from './alignment'

/**
 * For badges, aspects like the name, icon, or badge text can vary depending on context, such as the alignment or sex of the character.
 */
export interface VariantContext {
  readonly morality?: Morality | Alignment
  readonly sex?: Sex
}
