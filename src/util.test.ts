import { createBadgeReference, createMapReference } from './util'

describe(createBadgeReference.name, () => {
  test('should return the expected pattern', () => {
    expect(createBadgeReference({ key: 'foo' })).toBe('[badge:foo]')
    expect(createBadgeReference({ key: 'bar' })).toBe('[badge:bar]')
    expect(createBadgeReference({ key: 'foo-bar' })).toBe('[badge:foo-bar]')
  })
})

describe(createMapReference.name, () => {
  test('should return the expected pattern', () => {
    expect(createMapReference({ key: 'foo', name: 'Foo' })).toBe('[map:foo]')
    expect(createMapReference({ key: 'bar', name: 'Bar' })).toBe('[map:bar]')
    expect(createMapReference({ key: 'foo-bar', name: 'Foo Bar' })).toBe('[map:foo-bar]')
  })
})
