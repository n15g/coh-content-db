import { Archetype } from '../../main'
import { archetypeDataFixture } from '../api/archetype-data.fixture'

describe(Archetype.name, () => {
  describe('Constructor', () => {
    test('should accept the test fixture', () => {
      new Archetype(archetypeDataFixture.create())
    })
  })

  describe('key', () => {
    test('should be set from data', () => {
      const data = archetypeDataFixture.create({ key: 'foo' })
      expect(new Archetype(data).key).toBe('foo')
    })
  })

  describe('name', () => {
    test('should be set from data', () => {
      const data = archetypeDataFixture.create({ name: 'foo' })
      expect(new Archetype(data).name).toBe('foo')
    })
  })

  describe('description', () => {
    test('should be set from data', () => {
      const data = archetypeDataFixture.create({ description: 'foo' })
      expect(new Archetype(data).description).toBe('foo')
    })

    test('should be undefined if missing in data', () => {
      const data = archetypeDataFixture
        .omit('description')
        .create()
      expect(new Archetype(data).description).toBeUndefined()
    })
  })
})
