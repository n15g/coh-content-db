import {IBadge} from "./types/badge";
import {IGameMap} from "./types/game-map";

export function badgeReference(badge: IBadge): string {
    return `[badge:${badge.key}]`;
}

export function mapReference(map: IGameMap): string {
    return `[map:${map.key}]`;
}
