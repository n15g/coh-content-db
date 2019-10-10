import {ILink} from "./link";
import {IServerGroup} from "./server-group";

export interface IGameMapData {
    readonly key: string;
    readonly name: string;
    readonly links?: ILink[];
}

export interface IGameMap extends IGameMapData {
    readonly serverGroup: IServerGroup;
}

