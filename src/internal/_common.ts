

export function getOrDefine<T>(key: string, cache: { [id: string]: T }, provider: (key: string) => T): T {
  let entry = cache[key]

  if (entry === undefined) {
    entry = cache[key] = provider(key)
  }

  return entry
}
