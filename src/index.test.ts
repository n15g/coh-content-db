import * as index from './index'

test('should export the changelog', () => {
  expect(index).toHaveProperty('CHANGELOG')
})

test('should export badge reference utils', () => {
  expect(index).toHaveProperty('createBadgeReference')
  expect(index).toHaveProperty('createMapReference')
})
