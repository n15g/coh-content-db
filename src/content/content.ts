import { Key } from './key'

export abstract class Content {
  protected _key: Key

  protected constructor(key: string) {
    this._key = new Key(key)
  }

  public get key(): string {
    return this._key.value
  }
}
