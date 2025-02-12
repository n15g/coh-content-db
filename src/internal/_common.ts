const KEY_FORMAT = /[^a-z0-9\-]/

export function validateKey(key: string) {
  if (KEY_FORMAT.test(key)) throw new Error(`Bad key: [${key}]; Keys can only contain lowercase characters, numbers and dashes.`)
}

export function getOrDefine<T>(key: string, cache: { [id: string]: T }, provider: (key: string) => T): T {
  let entry = cache[key]

  if (entry === undefined) {
    entry = cache[key] = provider(key)
  }

  return entry
}
