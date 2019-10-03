import {IGameMap, IGameMapData, ILink} from "..";
import {ServerGroup} from "./server-group";
import {validateKey} from "./_common";

export class GameMap implements IGameMap {
    public readonly serverGroup: ServerGroup;
    public readonly key: string;
    public name: string;
    public links: ILink[];

    public constructor(serverGroup: ServerGroup, key: string) {
        validateKey(key);

        this.serverGroup = serverGroup;
        this.key = key;
    }

    public load(data: IGameMapData) {
        if (data.name != undefined) this.name = data.name;
        if (data.links != undefined) this.links = [...this.links || [], ...data.links];
    }
}
