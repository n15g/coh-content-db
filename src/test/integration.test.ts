import { BundleData } from '../main'
import { TEST_BADGE } from './api/badge-data.test'

/**
 * If you change this test, update the example in the README as well
 */
export const TEST_BUNDLE: BundleData = {
  header: { name: 'My Content Bundle' },
  badges: [TEST_BADGE],
}

describe('BundleData', () => {
  test('should be a usable interface', () => {
    expect(TEST_BUNDLE).not.toBeUndefined()
  })
})
