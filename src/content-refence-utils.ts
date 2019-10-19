import {IBadgeData} from "./types/badge";
import {IGameMapData} from "./types/game-map";

export function badgeReference(badge: IBadgeData): string {
    return `[badge:${badge.key}]`;
}

export function mapReference(map: IGameMapData): string {
    return `[map:${map.key}]`;
}
