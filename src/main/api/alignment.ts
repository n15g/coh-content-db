export const ALIGNMENT = ['H', 'V', 'P'] as const

export type Alignment = typeof ALIGNMENT[number]
