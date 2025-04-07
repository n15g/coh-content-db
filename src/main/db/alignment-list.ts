import { ALIGNMENT, Alignment, AlignmentExtended } from '../api/alignment'

export class AlignmentList {
  readonly #items: Set<Alignment>

  readonly hero: boolean
  readonly villain: boolean
  readonly praetorian: boolean

  readonly primal: boolean
  readonly all: boolean

  constructor(items?: AlignmentExtended[]) {
    const set = new Set(items ?? [...ALIGNMENT])
    this.hero = set.has('hero') || set.has('primal') || set.has('all')
    this.villain = set.has('villain') || set.has('primal') || set.has('all')
    this.praetorian = set.has('praetorian') || set.has('all')

    this.primal = this.hero && this.villain
    this.all = this.hero && this.villain && this.praetorian

    this.#items = new Set()
    if (this.hero) this.#items.add('hero')
    if (this.villain) this.#items.add('villain')
    if (this.praetorian) this.#items.add('praetorian')
  }

  get items(): Alignment[] {
    return [...this.#items]
  }

  has(alignment?: AlignmentExtended): boolean {
    switch (alignment) {
      case 'hero': {
        return this.hero
      }
      case 'villain': {
        return this.villain
      }
      case 'praetorian': {
        return this.praetorian
      }
      case 'primal' : {
        return this.primal
      }
      case 'all': {
        return this.all
      }
      default: {
        return false
      }
    }
  }
}
