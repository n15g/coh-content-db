import { AlternateData } from '../api/alternate-data'
import { compareSex, Sex } from '../api/sex'
import { Alignment, compareAlignment } from '../api/alignment'

export class Alternates<T> {
  readonly #sortedValues: AlternateData<T>[] = []

  /**
   * Create an alternate set from either a list of categorized values, or a single value when there are no alternates.
   * @param value List of alternates, or a single value.
   */
  constructor(value: AlternateData<T>[] | T) {
    if (Array.isArray(value)) {
      this.#sortedValues = value.sort()
      this.#sortedValues.sort((a, b) => this.#compareAlternates(a, b))
    } else {
      this.#sortedValues = [{ value }]
    }
  }

  getValue(alignment?: Alignment, sex?: Sex): T | undefined {
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

    const alignmentComparison = compareAlignment(a.alignment, b.alignment) // Next by alignment
    if (alignmentComparison !== 0) return alignmentComparison

    const sexComparison = compareSex(a.sex, b.sex) // Last by sex
    if (sexComparison !== 0) return sexComparison

    return String(a.value).localeCompare(String(b.value))
  }
}
