type KeysOfType<T, V> = { [P in keyof T]: T[P] extends V ? P : never }[keyof T]

export class AbstractIndex<T> {
  readonly #keyField: KeysOfType<T, string>
  protected _values: T[] = []
  protected _hashTable: Record<string, T> = {}

  constructor(keyField: KeysOfType<T, string>) {
    this.#keyField = keyField
  }

  /**
   * Return all indexed values
   */
  get values(): T[] {
    return this._values
  }

  /**
   * Load the given list of values into the index, replacing any existing data.
   * @param values List of values.
   */
  load(values: T[] | undefined): void {
    this._values = values ?? []
    this._hashTable = {}
    for (const value of this.values) {
      const key = value[this.#keyField] as string
      if (this._hashTable[key] !== undefined) throw new Error(`Duplicate key [${key}]`)
      this._hashTable[key] = value
    }
  }

  /**
   * Get a value from the index
   * @param key Key string
   */
  get(key: string | undefined): T | undefined {
    if (!key) return undefined
    return this._hashTable[key]
  }
}
