import {ILink} from "./link";
import {IServerGroup} from "./server-group";

export interface IGameMapData {
    readonly key: string;
    readonly name: string;
    readonly links?: ILink[];
    readonly vidiotMaps?: IVidiotMapData[];
}

export interface IVidiotMapData {
    /**
     * URL for the vidiot map image.
     */
    readonly href: string;
    readonly name?: string;
    readonly pointsOfInterest?: IVidiotMapPoiData[];
}

export interface IVidiotMapPoiData {
    readonly x: number;
    readonly y: number;
    readonly notes?: string;
    /**
     * If the POI is a zone transfer, the map it transfers to.
     */
    readonly mapKey?: string;
    /**
     * If the POI is a badge, the badge.
     */
    readonly badgeKey?: string;
    /**
     * If the POI is a partial for a badge, the partial key.
     */
    readonly badgePartialKey?: string;
}

export interface IGameMap extends IGameMapData {
    readonly serverGroup: IServerGroup;
    readonly vidiotMaps?: IVidiotMap[];
}

export interface IVidiotMap extends IVidiotMapData {
    readonly serverGroup: IServerGroup;
    readonly map: IGameMap;

    readonly pointsOfInterest?: IVidiotMapPoi[];
}

export interface IVidiotMapPoi extends IVidiotMapPoiData {
    readonly serverGroup: IServerGroup;
    readonly map: IGameMap;
    readonly vidiotMap: IVidiotMap
}
