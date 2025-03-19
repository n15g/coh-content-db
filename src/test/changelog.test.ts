import { CHANGELOG } from '../main'

describe('CHANGELOG', () => {
  test('should be extant', () => {
    expect(CHANGELOG).not.toBeUndefined()
    expect(CHANGELOG).not.toBeUndefined()
  })

  test('should be an array', () => {
    expect(Array.isArray(CHANGELOG)).toBeTruthy()
  })

  test('should have only semver versions', () => {
    // semver.org - https://regex101.com/r/vkijKf/1/
    const pattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

    for (const change of CHANGELOG) {
      expect(pattern.test(change.version)).toBeTruthy()
    }
  })

  test('should have dates', () => {
    for (const change of CHANGELOG) {
      const date = change.date
      expect(date).not.toBeUndefined()
      expect(date).not.toBeUndefined()
    }
  })

  test('should have descriptions', () => {
    for (const change of CHANGELOG) {
      expect(change).not.toBeUndefined()
      expect(change).not.toBeUndefined()
    }
  })
})
