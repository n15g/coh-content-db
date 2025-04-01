export const ALIGNMENT = ['H', 'V', 'P'] as const
export type Alignment = typeof ALIGNMENT[number]

const ALIGNMENT_ORDER = Object.fromEntries(ALIGNMENT.map((x, index) => [x, index]))

export function compareAlignment(a?: Alignment, b?: Alignment): number {
  const orderA = a ? ALIGNMENT_ORDER[a] : -1
  const orderB = b ? ALIGNMENT_ORDER[b] : -1
  return orderA - orderB
}
