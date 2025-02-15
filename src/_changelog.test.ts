import { changelog } from './_changelog'

describe(changelog.name, () => {
  test('should be extant', () => {
    expect(changelog).not.toBeNull()
  })

  test('should have only string keys', () => {
    for (const key of Object.keys(changelog)) {
      expect(typeof key).toBe('string')
    }
  })

  test('should have only semver keys', () => {
    // semver.org - https://regex101.com/r/vkijKf/1/
    const pattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

    for (const key of Object.keys(changelog)) {
      expect(pattern.test(key)).toBeTruthy()
    }
  })

  test('should have only string values', () => {
    for (const value of Object.values(changelog)) {
      expect(typeof value).toBe('string')
    }
  })
})
