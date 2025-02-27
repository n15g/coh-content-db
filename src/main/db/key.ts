const INVALID_KEY_PATTERN = /[^a-z0-9-]/

export class Key {
  readonly #value: string

  constructor(value: string) {
    this.#validateKey(value)
    this.#value = value
  }

  get value(): string {
    return this.#value
  }

  #validateKey(key: string): void {
    if (INVALID_KEY_PATTERN.test(key)) throw new Error(`Invalid key: [${key}]; Keys can only contain lowercase characters, numbers and dashes.`)
  }
}
