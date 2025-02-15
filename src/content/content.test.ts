import { Content } from './content'

class TestContent extends Content {
  constructor(key: string) {
    super(key)
  }
}

describe(Content.name, () => {
  describe('Constructor', () => {
    test('should set the key field', () => {
      const entity = new TestContent('foo-key')
      expect(entity.key).toBe('foo-key')
    })
  })
})
