import { CohContentDatabase } from '../../main'
import { serverGroupDataFixture } from '../api/server-group-data.fixture'

describe(CohContentDatabase.name, () => {
  test('should be instantiable', () => {
    expect(new CohContentDatabase()).not.toBeNull()
  })

  describe(CohContentDatabase.prototype.loadServerGroupData.name, () => {
    test('should load an empty server group', () => {
      const database = new CohContentDatabase()
      database.loadServerGroupData(serverGroupDataFixture.create())
    })
  })

  describe(CohContentDatabase.prototype.listServerGroups.name, () => {
    test('should load two server groups', () => {
      const database = new CohContentDatabase()
      database.loadServerGroupData(serverGroupDataFixture.create({ key: 'sg1' }))
      database.loadServerGroupData(serverGroupDataFixture.create({ key: 'sg2' }))

      const sgs = database.listServerGroups()

      expect(sgs).toHaveLength(2)

      for (const entry of sgs) {
        expect(['sg1', 'sg2']).toContain(entry.key)
      }
    })
  })

  describe(CohContentDatabase.prototype.getServerGroup.name, () => {
    test('should load a server group by key', () => {
      const database = new CohContentDatabase()
      database.loadServerGroupData(serverGroupDataFixture.create({ key: 'sg1' }))

      const sg = database.getServerGroup('sg1')
      expect(sg).not.toBeNull()
      expect(sg?.key).toEqual('sg1')
    })
  })
})
