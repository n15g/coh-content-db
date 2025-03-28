import { ContentBundle } from '../../main'
import { TEST_BADGE } from './badge-data.test'

// If you change this test, update the example in the README as well
export const TEST_BUNDLE: ContentBundle = {
  name: 'My Content Bundle',
  badges: [TEST_BADGE],
}

describe('ContentBundle', () => {
  test('should be a usable interface', () => {
    expect(TEST_BUNDLE).not.toBeUndefined()
  })
})
