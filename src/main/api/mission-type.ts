export const MISSION_TYPE = ['story-arc', 'mission', 'task-force', 'strike-force', 'trial', 'personal-story'] as const
export type MissionType = typeof MISSION_TYPE[number]
