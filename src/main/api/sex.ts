export const SEX = ['M', 'F'] as const
export type Sex = typeof SEX[number]

const SEX_ORDER = Object.fromEntries(SEX.map((x, index) => [x, index]))

export function compareSex(a?: Sex, b?: Sex): number {
  const orderA = a ? SEX_ORDER[a] : -1
  const orderB = b ? SEX_ORDER[b] : -1
  return orderA - orderB
}
