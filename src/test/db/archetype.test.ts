import { Archetype } from '../../main'
import { archetypeDataFixture } from '../api/archetype-data.fixture'

describe(Archetype.name, () => {
  describe('Constructor', () => {
    test(`should accept the test fixture`, () => {
      new Archetype(archetypeDataFixture.create())
    })
  })

  describe('name', () => {
    test(`should be set from data`, () => {
      const data = archetypeDataFixture.create()
      expect(new Archetype(data).name).toBe(data.name)
    })
  })

  describe('description', () => {
    test(`should be set from data`, () => {
      const data = archetypeDataFixture.create()
      expect(new Archetype(data).description).toBe(data.description)
    })

    test(`should be null if missing in data`, () => {
      const data = archetypeDataFixture
        .omit('description')
        .create()
      expect(new Archetype(data).description).toBeUndefined()
    })
  })
})
