import { defineFixture } from 'efate'
import { MISSION_TYPE, MissionData, MissionFlashbackData } from '../../main'

export const missionDataFixture = defineFixture<MissionData>((t) => {
  t.key.as(index => `mission-${index}`)
  t.type.pickFrom([...MISSION_TYPE])
  t.name.as(index => `Mission ${index}`)
})

export const missionFlashbackDataFixture = defineFixture<MissionFlashbackData>((t) => {
  t.id.as(index => `${index}.${index}`)
})
