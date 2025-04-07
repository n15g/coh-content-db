import { MORALITY, Morality, MoralityExtended } from '../api/morality'

export class MoralityList {
  readonly #items: Set<Morality>

  readonly hero: boolean
  readonly vigilante: boolean
  readonly villain: boolean
  readonly rogue: boolean
  readonly resistance: boolean
  readonly loyalist: boolean

  readonly primal: boolean
  readonly praetorian: boolean
  readonly heroic: boolean
  readonly villainous: boolean
  readonly paragonCityAccess: boolean
  readonly rogueIslesAccess: boolean

  readonly all: boolean

  constructor(items?: MoralityExtended[]) {
    const set = new Set(items ?? [...MORALITY])
    this.hero = set.has('hero') || set.has('primal') || set.has('heroic') || set.has('paragon-city-access') || set.has('all')
    this.vigilante = set.has('vigilante') || set.has('primal') || set.has('heroic') || set.has('paragon-city-access') || set.has('rogue-isles-access') || set.has('all')
    this.villain = set.has('villain') || set.has('primal') || set.has('villainous') || set.has('rogue-isles-access') || set.has('all')
    this.rogue = set.has('rogue') || set.has('primal') || set.has('villainous') || set.has('paragon-city-access') || set.has('rogue-isles-access') || set.has('all')
    this.resistance = set.has('resistance') || set.has('praetorian') || set.has('all')
    this.loyalist = set.has('loyalist') || set.has('praetorian') || set.has('all')

    this.primal = this.hero && this.vigilante && this.villain && this.rogue
    this.praetorian = this.loyalist && this.resistance
    this.heroic = this.hero && this.vigilante
    this.villainous = this.villain && this.rogue
    this.paragonCityAccess = this.heroic && this.rogue
    this.rogueIslesAccess = this.villainous && this.vigilante

    this.all = this.primal && this.praetorian

    this.#items = new Set()
    if (this.hero) this.#items.add('hero')
    if (this.vigilante) this.#items.add('vigilante')
    if (this.villain) this.#items.add('villain')
    if (this.rogue) this.#items.add('rogue')
    if (this.resistance) this.#items.add('resistance')
    if (this.loyalist) this.#items.add('loyalist')
  }

  get items(): Morality[] {
    return [...this.#items]
  }

  has(morality?: MoralityExtended): boolean {
    switch (morality) {
      case 'hero': {
        return this.hero
      }
      case 'vigilante': {
        return this.vigilante
      }
      case 'villain': {
        return this.villain
      }
      case 'rogue': {
        return this.rogue
      }
      case 'resistance': {
        return this.resistance
      }
      case 'loyalist': {
        return this.loyalist
      }
      case 'primal' : {
        return this.primal
      }
      case 'praetorian': {
        return this.praetorian
      }
      case 'heroic': {
        return this.hero
      }
      case 'paragon-city-access': {
        return this.paragonCityAccess
      }
      case 'rogue-isles-access': {
        return this.rogueIslesAccess
      }
      case 'villainous': {
        return this.villainous
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
