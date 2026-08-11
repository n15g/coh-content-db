import { TEST_BADGE } from './badge-data.fixture'

describe('BadgeData', () => {
  test('should be a usable interface', () => {
    expect(TEST_BADGE).not.toBeUndefined()
  })
})
