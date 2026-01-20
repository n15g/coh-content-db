import { Sex } from './sex'
import { Morality } from './morality'
import { Alignment } from './alignment'
import { CharacterOrigin } from './character-origin'

/**
 * For badges, aspects like the name, icon, or badge text can vary depending on context, such as the alignment or sex of the character.
 */
export interface VariantContext {
  readonly origin?: CharacterOrigin
  readonly morality?: Morality | Alignment
  readonly sex?: Sex
}
