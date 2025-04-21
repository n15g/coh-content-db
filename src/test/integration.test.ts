import { BundleData } from '../main'
import { TEST_BADGE } from './api/badge-data.test'

/**
 * If you change this test, update the example in the README as well
 */
export const MyBundle: BundleData = {
  header: { name: 'My Content Bundle', version: '1.0.0', lastUpdateTime: '2025-04-21T00:00:00Z' },
  badges: [TEST_BADGE],
}

describe('BundleData', () => {
  test('should be a usable interface', () => {
    expect(MyBundle).not.toBeUndefined()
  })
})
