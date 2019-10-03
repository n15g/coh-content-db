import {IBadge, IGameMap, IServerData, IServerGroup, IServerGroupData, ServerGroupStatus} from "..";
import {IArchetype} from "../types/archetype";
import * as _ from "lodash";
import {Archetype} from "./archetype";
import {GameMap} from "./game-map";
import {Badge} from "./badge";
import {getOrDefine, validateKey} from "./_common";

export class ServerGroup implements IServerGroup {
    public readonly key: string;
    public name?: string;
    public description?: string;
    public status?: ServerGroupStatus[];
    public repository?: string;
    public servers?: IServerData[];
    public archetypes: IArchetype[] = [];
    public maps: IGameMap[] = [];
    public badges: IBadge[] = [];
    public changelog: { [id: string]: string[] } = {};

    private archetypeCache: { [id: string]: Archetype } = {};
    private mapCache: { [id: string]: GameMap } = {};
    private badgeCache: { [id: string]: Badge } = {};

    public constructor(key: string) {
        validateKey(key);

        this.key = key;
    }

    public load(data: IServerGroupData) {
        if (data.name != undefined) this.name = data.name;
        if (data.description != undefined) this.description = data.description;
        if (data.status != undefined) this.status = data.status;
        if (data.repository != undefined) this.repository = data.repository;
        if (data.servers != undefined) this.servers = data.servers;

        if (data.archetypes != undefined) {
            _.each(data.archetypes, data =>
                getOrDefine(data.key, this.archetypeCache, (key) => new Archetype(this, key))
                    .load(data)
            );
            this.archetypes = _.values(this.archetypeCache);
        }

        if (data.maps != undefined) {
            _.each(data.maps, data =>
                getOrDefine(data.key, this.mapCache, (key) => new GameMap(this, key))
                    .load(data)
            );
            this.maps = _.values(this.mapCache);
        }

        if (data.badges != undefined) {
            _.each(data.badges, data =>
                getOrDefine(data.key, this.badgeCache, (key) => new Badge(this, key))
                    .load(data)
            );
            this.badges = _.values(this.badgeCache);
        }

        if (data.changelog) {
            this.changelog = data.changelog;
        }
    }

    public getArchetype(key: string): IArchetype | null {
        return this.archetypeCache[key];
    }

    public getMap(key: string): IGameMap | null {
        return this.mapCache[key];
    }

    public getBadge(key: string): IBadge | null {
        return this.badgeCache[key];
    }
}
