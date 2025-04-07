import { BadgeData } from '../../main'

// If you change this test, update the example in the README as well
export const TEST_BADGE: BadgeData = {
  key: 'test-badge',
  type: 'achievement',
  name: [{ value: 'Test Badge' }, { alignment: 'praetorian', value: 'My Badge for Praetorians' }],
  morality: ['hero', 'praetorian'],
}

describe('BadgeData', () => {
  test('should be a usable interface', () => {
    expect(TEST_BADGE).not.toBeUndefined()
  })
})
