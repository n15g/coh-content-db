import * as index from '../main/index'

test('should export the changelog', () => {
  expect(index).toHaveProperty('CHANGELOG')
})

test('should export badge reference utils', () => {
  expect(index).toHaveProperty('badgeUri')
  expect(index).toHaveProperty('badgeLink')
  expect(index).toHaveProperty('mapUri')
  expect(index).toHaveProperty('mapLink')
})
