export const MORALITY = ['hero', 'vigilante', 'villain', 'rogue', 'resistance', 'loyalist'] as const
export type Morality = typeof MORALITY[number]
export type MoralityExtended = Morality
  /**
   * Any of the Primal Earth moralities - Hero, Vigilante, Villain, Rogue.
   */
  | 'primal'
  /**
   * Either of the Praetorian Earth moralities - Resistance or Loyalist.
   */
  | 'praetorian'
  /**
   * The moralities that roll up to the Hero {@link Alignment} - Hero and Vigilante.
   */
  | 'heroic'
  /**
   * The moralities that roll up to the Villain {@link Alignment} - Villain and Rogue.
   */
  | 'villainous'
  /**
   * Moralities with access to Paragon City - Hero, Vigilante and Rogue.
   */
  | 'paragon-city-access'
  /**
   * Moralities with access to the Rogue Isles - Villain, Rogue and Vigilante.
   */
  | 'rogue-isles-access'
  /**
   * All the moralities.
   */
  | 'all'
