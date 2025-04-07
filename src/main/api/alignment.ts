export const ALIGNMENT = ['hero', 'villain', 'praetorian'] as const
export type Alignment = typeof ALIGNMENT[number]
export type AlignmentExtended = Alignment
  /**
   * The alignments available for Primal Earth characters - Hero and Villain.
   */
  | 'primal'
  /**
   * All the alignments.
   */
  | 'all'

const ALIGNMENT_ORDER = Object.fromEntries(ALIGNMENT.map((x, index) => [x, index]))

export function compareAlignment(a?: Alignment, b?: Alignment): number {
  const orderA = a ? ALIGNMENT_ORDER[a] : -1
  const orderB = b ? ALIGNMENT_ORDER[b] : -1
  return orderA - orderB
}
