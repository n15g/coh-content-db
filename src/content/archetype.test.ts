import { Archetype } from './archetype'
import { ArchetypeData } from './archetype-data'

const archetypeDataFixture: ArchetypeData = {
  key: 'foo',
  name: 'Foo',
  description: 'The fabled Foomancer.',
}

describe(Archetype.name, () => {
  describe('Constructor', () => {
    test(`should accept the test fixture`, () => {
      new Archetype(archetypeDataFixture)
    })
  })
})
