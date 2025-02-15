import { Archetype } from './archetype'
import { archetypeDataFixture, archetypeDataFixtureMinimal } from './archetype-data.fixture'

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
      const data = archetypeDataFixtureMinimal.create()
      expect(new Archetype(data).description).toBeNull()
    })
  })
})
