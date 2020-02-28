import {IGameMap, IGameMapData, ILink, IVidiotMap, IVidiotMapData, IVidiotMapPoi, IVidiotMapPoiData} from "..";
import {ServerGroup} from "./server-group";
import {validateKey} from "./_common";
import {each} from "lodash";

export class GameMap implements IGameMap {
    public readonly serverGroup: ServerGroup;
    public readonly key: string;
    public name: string;
    public links?: ILink[];
    public vidiotMaps?: IVidiotMap[] = [];

    public constructor(serverGroup: ServerGroup, key: string) {
        validateKey(key);

        this.serverGroup = serverGroup;
        this.key = key;
    }

    public load(data: IGameMapData) {
        if (data.name != undefined) this.name = data.name;
        if (data.links != undefined) this.links = [...this.links || [], ...data.links];

        if (data.vidiotMaps) {
            each(data.vidiotMaps, (vidiotMapData) => this.vidiotMaps.push(new VidiotMap(this.serverGroup, this).load(vidiotMapData)));
        }
    }
}

export class VidiotMap implements IVidiotMap {
    public readonly serverGroup: ServerGroup;
    public readonly map: IGameMap;
    public href: string;
    public name?: string;
    public pointsOfInterest: VidiotMapPoi[] = [];

    public constructor(serverGroup: ServerGroup, map: IGameMap) {
        this.serverGroup = serverGroup;
        this.map = map;
    }

    public load(data: IVidiotMapData): VidiotMap {
        if (data.href != undefined) this.href = data.href;
        if (data.name != undefined) this.name = data.name;

        if (data.pointsOfInterest) {
            each(data.pointsOfInterest, (poiData) => this.pointsOfInterest.push(new VidiotMapPoi(this.serverGroup, this.map, this).load(poiData)));
        }

        return this;
    }
}

export class VidiotMapPoi implements IVidiotMapPoi {
    public readonly serverGroup: ServerGroup;
    public readonly map: IGameMap;
    public readonly vidiotMap: IVidiotMap;
    public x: number;
    public y: number;
    public notes?: string;
    public mapKey?: string;
    public badgeKey?: string;

    constructor(serverGroup: ServerGroup, map: IGameMap, vidiotMap: IVidiotMap) {
        this.serverGroup = serverGroup;
        this.map = map;
        this.vidiotMap = vidiotMap;
    }

    public load(data: IVidiotMapPoiData): VidiotMapPoi {
        if (data.x != undefined) this.x = data.x;
        if (data.y != undefined) this.y = data.y;
        if (data.notes != undefined) this.notes = data.notes;
        if (data.mapKey != undefined) this.mapKey = data.mapKey;
        if (data.badgeKey != undefined) this.badgeKey = data.badgeKey;

        return this;
    }
}
