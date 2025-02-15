import * as index from './index'
import { createBadgeReference, createMapReference } from './util'
import { CohContentDatabase } from './coh-content-database'

test('should export the core database', () => {
  expect(index).toHaveProperty(CohContentDatabase.name)
})

test('should export badge reference utils', () => {
  expect(index).toHaveProperty(createBadgeReference.name)
  expect(index).toHaveProperty(createMapReference.name)
})
