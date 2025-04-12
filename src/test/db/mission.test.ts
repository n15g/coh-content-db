import { Mission } from '../../main'
import { missionDataFixture, missionFlashbackDataFixture } from '../api/mission-data.fixture'

describe(Mission.name, () => {
  describe('Constructor', () => {
    test(`should accept the test fixture`, () => {
      new Mission(missionDataFixture.create())
    })
  })

  describe('key', () => {
    test(`should be set from the data`, () => {
      const mission = new Mission(missionDataFixture.create({ key: 'foo' }))
      expect(mission.key).toEqual('foo')
    })
  })

  describe('name', () => {
    test(`should be set from the data`, () => {
      const mission = new Mission(missionDataFixture.create({ name: 'Foo' }))
      expect(mission.name).toEqual('Foo')
    })
  })

  describe('type', () => {
    test(`should be set from the data`, () => {
      const mission = new Mission(missionDataFixture.create({ type: 'story-arc' }))
      expect(mission.type).toEqual('story-arc')
    })
  })

  describe('morality', () => {
    test(`should be set from the data`, () => {
      const mission = new Mission(missionDataFixture.create({ morality: ['hero'] }))
      expect(mission.morality?.hero).toBeTruthy()
      expect(mission.morality?.vigilante).toBeFalsy()
    })

    test(`should be optional`, () => {
      const mission = new Mission(missionDataFixture.omit('morality').create())
      expect(mission.morality?.all).toBeTruthy()
    })
  })

  describe('contactKeys', () => {
    test(`should be set from the data`, () => {
      const mission = new Mission(missionDataFixture.create({ contactKeys: 'foo' }))
      expect(mission.contactKeys).toStrictEqual(['foo'])
    })

    test(`should be optional`, () => {
      const mission = new Mission(missionDataFixture.omit('contactKeys').create())
      expect(mission.contactKeys).toBeUndefined()
    })
  })

  describe('levelRange', () => {
    test(`should be set from the data`, () => {
      const mission = new Mission(missionDataFixture.create({ levelRange: [1, 2] }))
      expect(mission.levelRange).toStrictEqual([1, 2])
    })

    test(`should be optional`, () => {
      const mission = new Mission(missionDataFixture.omit('levelRange').create())
      expect(mission.levelRange).toBeUndefined()
    })
  })

  describe('notes', () => {
    test(`should be set from the data`, () => {
      const mission = new Mission(missionDataFixture.create({ notes: 'foo' }))
      expect(mission.notes).toBe('foo')
    })

    test(`should be optional`, () => {
      const mission = new Mission(missionDataFixture.omit('notes').create())
      expect(mission.notes).toBeUndefined()
    })
  })

  describe('links', () => {
    test('should be set from the data', () => {
      const badge = new Mission(missionDataFixture.create({ links: [{ title: 'foo', href: 'bar' }] }))
      expect(badge.links).toStrictEqual([{ title: 'foo', href: 'bar' }])
    })

    test('should be optional', () => {
      const badge = new Mission(missionDataFixture.omit('links').create())
      expect(badge.links).toHaveLength(0)
    })
  })

  describe('flashback', () => {
    test('should be undefined if omitted', () => {
      const badge = new Mission(missionDataFixture.omit('flashback').create())
      expect(badge.flashback).toBeFalsy()
    })

    describe('id', () => {
      test(`should be set from the data`, () => {
        const mission = new Mission(missionDataFixture.create({ flashback: { id: 'foo' } }))
        expect(mission.flashback?.id).toBe('foo')
      })
    })

    describe('levelRange', () => {
      test(`should be set from the data`, () => {
        const mission = new Mission(missionDataFixture.create({ flashback: { levelRange: [1, 2] } }))
        expect(mission.flashback?.levelRange).toStrictEqual([1, 2])
      })

      test(`should default to the mission value`, () => {
        const mission = new Mission(missionDataFixture.create({ levelRange: [1, 2], flashback: missionFlashbackDataFixture.omit('levelRange').create() }))
        expect(mission.flashback?.levelRange).toStrictEqual([1, 2])
      })

      test(`should be optional`, () => {
        const mission = new Mission(missionDataFixture.omit('levelRange').create({ flashback: missionFlashbackDataFixture.omit('levelRange').create() }))
        expect(mission.flashback?.levelRange).toBeUndefined()
      })
    })

    describe('name', () => {
      test(`should be set from the data`, () => {
        const mission = new Mission(missionDataFixture.create({ flashback: { name: 'Foo' } }))
        expect(mission.flashback?.name).toStrictEqual('Foo')
      })

      test(`should default to the mission value`, () => {
        const mission = new Mission(missionDataFixture.create({ name: 'Foo', flashback: missionFlashbackDataFixture.omit('name').create() }))
        expect(mission.flashback?.name).toStrictEqual('Foo')
      })

      test(`should be optional`, () => {
        const mission = new Mission(missionDataFixture.omit('name').create({ flashback: missionFlashbackDataFixture.omit('name').create() }))
        expect(mission.flashback?.name).toBeUndefined()
      })
    })

    describe('morality', () => {
      test(`should be set from the data`, () => {
        const mission = new Mission(missionDataFixture.create({ flashback: { morality: ['hero'] } }))
        expect(mission.flashback?.morality?.hero).toBeTruthy()
        expect(mission.flashback?.morality?.vigilante).toBeFalsy()
      })

      test(`should default to the mission value`, () => {
        const mission = new Mission(missionDataFixture.create({ morality: ['hero'], flashback: missionFlashbackDataFixture.omit('morality').create() }))
        expect(mission.flashback?.morality?.hero).toBeTruthy()
        expect(mission.flashback?.morality?.vigilante).toBeFalsy()
      })

      test(`should be optional`, () => {
        const mission = new Mission(missionDataFixture.omit('morality').create({ flashback: missionFlashbackDataFixture.omit('morality').create() }))
        expect(mission.morality?.all).toBeTruthy()
      })
    })

    describe('notes', () => {
      test(`should be set from the data`, () => {
        const mission = new Mission(missionDataFixture.create({ flashback: { notes: 'foo' } }))
        expect(mission.flashback?.notes).toStrictEqual('foo')
      })

      test(`should be optional`, () => {
        const mission = new Mission(missionDataFixture.create({ flashback: missionFlashbackDataFixture.omit('notes').create() }))
        expect(mission.flashback?.notes).toBeUndefined()
      })
    })
  })
})
