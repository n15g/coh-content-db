import { Alignment } from '../api/alignment'

export class Alignments {
  readonly items: Alignment[]
  readonly hero: boolean
  readonly villain: boolean
  readonly praetorian: boolean
  readonly primal: boolean

  constructor(raw: Alignment[]) {
    this.items = raw
    this.hero = raw.includes('H')
    this.villain = raw.includes('V')
    this.praetorian = raw.includes('P')
    this.primal = !this.praetorian && (this.hero || this.villain)
  }
}
