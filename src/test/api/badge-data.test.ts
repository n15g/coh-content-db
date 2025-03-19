import { BadgeData } from '../../main'

// If you change this test, update the example in the README as well
export const TEST_BADGE: BadgeData = {
  key: 'test-badge',
  type: 'ACHIEVEMENT',
  name: [{ value: 'Test Badge' }, { alignment: 'P', value: 'My Badge for Praetorians' }],
  alignment: ['H', 'V', 'P'],
}

describe('BadgeData', () => {
  test('should be a usable interface', () => {
    expect(TEST_BADGE).not.toBeUndefined()
  })
})
