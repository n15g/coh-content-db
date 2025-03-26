import { AlternateData } from '../api/alternate-data'
import { Sex } from '../api/sex'
import { Alignment } from '../api/alignment'

const ALIGNMENT_SORT: Record<string, number> = { H: 2, V: 1, P: 0 }
const SEX_SORT: Record<string, number> = { M: 1, F: 0 }

export class Alternates<T> {
  readonly #sortedValues: AlternateData<T>[] = []

  constructor(values: AlternateData<T>[]) {
    this.#sortedValues = values.sort()
    this.#sortedValues.sort((a, b) => this.#compareAlternates(a, b))
  }

  getValue(alignment?: Alignment | string, sex?: Sex | string): T | undefined {
    for (let index = this.#sortedValues.length; index--;) {
      const entry = this.#sortedValues[index]
      if ((entry.alignment === undefined || entry.alignment === alignment)
        && (entry.sex === undefined || entry.sex === sex)
      ) return entry.value
    }

    return this.default?.value
  }

  /**
   * Get the default value for this list of alternates, the value with the highest priority and lowest specificity.
   */
  get default(): AlternateData<T> | undefined {
    return this.#sortedValues[0]
  }

  /**
   * Get the list of alternates sorted in canonical order (alignment then sex, low to high specificity).
   */
  get canonical(): AlternateData<T>[] {
    return this.#sortedValues
  }

  /**
   * Create a joined string from the alternate values in canonical order.
   * @param separator Separator to use. Default is ' / '
   */
  toString(separator: string): string {
    return this.canonical.map(x => x.value).join(separator)
  }

  #compareAlternates(a: AlternateData<T>, b: AlternateData<T>): number {
    const aSpecificity = (a.alignment ? 2 : 0) + (a.sex ? 1 : 0)
    const bSpecificity = (b.alignment ? 2 : 0) + (b.sex ? 1 : 0)
    if (aSpecificity !== bSpecificity) return aSpecificity - bSpecificity // Order first by least-specific

    const alignmentComparison = this.#compareAlignment(a.alignment, b.alignment) // Next by alignment
    if (alignmentComparison !== 0) return alignmentComparison

    const sexComparison = this.#compareSex(a.sex, b.sex) // Last by sex
    if (sexComparison !== 0) return sexComparison

    return String(a.value).localeCompare(String(b.value))
  }

  #compareAlignment(a: Alignment | string | undefined, b: Alignment | string | undefined): number {
    if (a === b) return 0
    if (a === undefined && b !== undefined) return -1
    if (b === undefined && a !== undefined) return 1

    const aSort = a === undefined ? -1 : ALIGNMENT_SORT[a] ?? -1 // Unknown values get -1 priority
    const bSort = b === undefined ? -1 : ALIGNMENT_SORT[b] ?? -1

    if (aSort !== bSort) return bSort - aSort

    // Unknown values (not in ALIGNMENT_SORT) are sorted alphabetically
    return a?.localeCompare(b ?? '') ?? 0
  }

  #compareSex(a?: Sex | string | undefined, b?: Sex | string | undefined): number {
    if (a === b) return 0
    if (a === undefined && b !== undefined) return -1
    if (b === undefined && a !== undefined) return 1

    const aSort = SEX_SORT[a ?? -1] ?? -1 // Unknown values get -1 priority
    const bSort = SEX_SORT[b ?? -1] ?? -1

    if (aSort !== bSort) return bSort - aSort

    // Unknown values (not in SEX_SORT) are sorted alphabetically
    return a?.localeCompare(b ?? '') ?? 0
  }
}
