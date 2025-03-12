import { ServerGroupData } from '../../main'
import { TEST_BADGE } from './badge-data.test'

// If you change this test, update the example in the README as well
export const TEST_SERVER_GROUP: ServerGroupData = {
  key: 'my-server-group',
  name: 'My Server Group',
  badges: [TEST_BADGE],
}

describe('ServerGroupData', () => {
  test('should be a usable interface', () => {
    expect(TEST_SERVER_GROUP).not.toBeNull()
  })
})
