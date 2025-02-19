export const SEX = ['M', 'F'] as const

export type Sex = typeof SEX[number]
