const KEY_FORMAT = /[^a-z0-9\-]/

export class Key {
  readonly #value: string

  constructor(value: string) {
    this.#validateKey(value)
    this.#value = value
  }

  get value(): string {
    return this.#value
  }

  #validateKey(key: string) {
    if (KEY_FORMAT.test(key)) throw new Error(`Bad key: [${key}]; Keys can only contain lowercase characters, numbers and dashes.`)
  }
}
