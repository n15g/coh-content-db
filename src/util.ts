import { IBadgeData } from './types/badge'
import { IGameMapData } from './types/game-map'

export function createBadgeReference(badge: IBadgeData): string {
  return `[badge:${badge.key}]`
}

export function createMapReference(map: IGameMapData): string {
  return `[map:${map.key}]`
}
