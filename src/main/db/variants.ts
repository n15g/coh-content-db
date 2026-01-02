import { VariantData } from '../api/variant-data'
import { compareSex } from '../api/sex'
import { compareAlignment } from '../api/alignment'
import { VariantContext } from '../api/variant-context'
import { MoralityMap } from '../api/morality'

export class Variants<T> {
  readonly #sortedValues: VariantData<T>[] = []

  /**
   * Create a variant set from either a list of categorized values, or a single value when there are no variants.
   * @param value List of variants, or a single value.
   */
  constructor(value: VariantData<T>[] | T) {
    if (Array.isArray(value)) {
      this.#sortedValues = value.toSorted()
      this.#sortedValues.sort((a, b) => this.#compareVariants(a, b))
    } else {
      this.#sortedValues = [{ value }]
    }
  }

  /**
   * Get a variant by context
   * @param context The context
   */
  getVariant(context?: VariantContext): VariantData<T> | undefined {
    const alignment = context?.morality ? MoralityMap[context.morality] : undefined
    const sex = context?.sex

    for (let index = this.#sortedValues.length; index--;) {
      const entry = this.#sortedValues[index]
      if ((entry.alignment === undefined || entry.alignment === alignment)
        && (entry.sex === undefined || entry.sex === sex)
      ) return entry
    }

    return this.default
  }

  /**
   * Get a value by variant context
   * @param context The context
   */
  getValue(context?: VariantContext): T | undefined {
    return this.getVariant(context)?.value
  }

  /**
   * Get the default value for this list of variants, the value with the highest priority and lowest specificity.
   */
  get default(): VariantData<T> | undefined {
    return this.#sortedValues[0]
  }

  /**
   * Get the list of variants sorted in canonical order (alignment then sex, low to high specificity).
   */
  get canonical(): VariantData<T>[] {
    return this.#sortedValues
  }

  /**
   * Create a joined string from the variant values in canonical order.
   * @param separator Separator to use. Default is ' / '
   */
  toString(separator: string): string {
    return this.canonical.map(x => x.value).join(separator)
  }

  #compareVariants(a: VariantData<T>, b: VariantData<T>): number {
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
