type KeysOfType<T, V> = { [P in keyof T]: T[P] extends V ? P : never }[keyof T]

export class AbstractIndex<T> {
  protected _values: T[] = []
  protected _hashTable: Record<string, T> = {}

  /**
   * Create a new index.
   * @param keyField The field of the values that will act as the key.
   * @param values Values to index.
   */
  constructor(keyField: KeysOfType<T, string>, values: T[] | undefined) {
    this._values = values ?? []
    this._hashTable = {}
    for (const value of this.values) {
      const key = value[keyField] as string
      if (this._hashTable[key] !== undefined) throw new Error(`Duplicate key [${key}]`)
      this._hashTable[key] = value
    }
  }

  /**
   * Return all indexed values
   */
  get values(): T[] {
    return this._values
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
