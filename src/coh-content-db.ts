import * as _ from "lodash";
import {IServerData, IServerGroup, IServerGroupData, ServerGroupStatus} from "./types/server-group";
import {ILink} from "./types/link";
import {BadgePartialType, BadgeType, IAlignmentFlags, IAlternateValue, IBadge, IBadgeData, IBadgePartial, IBadgePartialData, PlaqueType} from "./types/badge";
import {IGameMap, IGameMapData} from "./types/game-map";
import {EnhancementCategory} from "./types/enhancement";

export class CohContentDb {
    private readonly serverGroups: { [id: string]: ServerGroup } = {};

    public load(data: IServerGroupData) {
        let serverGroup = this.serverGroups[data.key];

        if (serverGroup == undefined) {
            serverGroup = this.serverGroups[data.key] = new ServerGroup(data.key);
        }

        serverGroup.load(data);
    }

    public getServerGroups(): ServerGroup[] {
        return _.values(this.serverGroups);
    }

    public getServerGroup(serverGroupKey: string): ServerGroup | null {
        return this.serverGroups[serverGroupKey];
    }
}

export class ServerGroup implements IServerGroup {
    public readonly key: string;
    public name?: string;
    public description?: string;
    public status?: ServerGroupStatus[];
    public repository?: string;
    public servers?: IServerData[];
    public maps?: IGameMap[];
    public badges?: IBadge[];

    private mapCache: { [id: string]: GameMap } = {};
    private badgeCache: { [id: string]: Badge } = {};

    public constructor(key: string) {
        this.key = key;
    }

    public load(data: IServerGroupData) {
        if (data.name != undefined) this.name = data.name;
        if (data.description != undefined) this.description = data.description;
        if (data.status != undefined) this.status = data.status;
        if (data.repository != undefined) this.repository = data.repository;
        if (data.servers != undefined) this.servers = data.servers;

        if (data.maps != undefined) {
            this.maps = [];
            this.mapCache = {};
            _.each(data.maps, data => {
                const map = new GameMap(this, data);
                this.maps.push(map);
                this.mapCache[map.key] = map;
            });
        }

        if (data.badges != undefined) {
            this.badges = [];
            this.badgeCache = {};
            _.each(data.badges, data => {
                const badge = new Badge(this, data);
                this.badges.push(badge);
                this.badgeCache[badge.key] = badge;
            });
        }
    }

    public getMap(key: string): IGameMap | null {
        return this.mapCache[key];
    }

    public getBadge(key: string): IBadge | null {
        return this.badgeCache[key];
    }
}

class GameMap implements IGameMap {
    public readonly serverGroup: ServerGroup;
    public readonly key: string;
    public readonly name: string;
    public readonly links: ILink[];

    public constructor(serverGroup: ServerGroup, data: IGameMapData) {
        this.serverGroup = serverGroup;
        this.key = data.key;
        this.name = data.name;
        this.links = data.links;
    }
}

class Badge implements IBadge {
    public readonly serverGroup: ServerGroup;
    public readonly key: string;
    public readonly type: BadgeType;
    public readonly names: IAlternateValue[];
    public readonly alignment: IAlignmentFlags;
    public readonly badgeText?: IAlternateValue[];
    public readonly acquisition?: string;
    public readonly imageKeys?: IAlternateValue[];
    public readonly notes?: string;
    public readonly links?: ILink[];
    public readonly mapKey?: string;
    public readonly location?: number[];
    public readonly vidiotMapKey?: string;
    public readonly effect?: string;
    public readonly partials?: IBadgePartial[];

    public constructor(serverGroup: ServerGroup, data: IBadgeData) {
        this.serverGroup = serverGroup;
        this.key = data.key;
        this.type = data.type;
        this.names = data.names;
        this.alignment = data.alignment;
        this.badgeText = data.badgeText;
        this.acquisition = data.acquisition;
        this.imageKeys = data.imageKeys;
        this.notes = data.notes;
        this.links = data.links;
        this.mapKey = data.mapKey;
        this.location = data.location;
        this.effect = data.effect;
        this.vidiotMapKey = data.vidiotMapKey;

        if (data.partials != undefined) {
            this.partials = _.map(data.partials, (data) => new BadgePartial(this.serverGroup, this, data));
        }
    }
}

class BadgePartial implements IBadgePartial {
    public readonly serverGroup: ServerGroup;
    public readonly parent: Badge;
    public readonly key: string;
    public readonly type: BadgePartialType;
    public readonly mapKey?: string;
    public readonly location?: number[];
    public readonly plaqueType?: PlaqueType;
    public readonly inscription?: string;
    public readonly vidiotMapKey?: string;
    public readonly badgeKey?: string;
    public readonly inventionLevel?: number;
    public readonly inventionTypes?: EnhancementCategory[];
    public readonly count?: number;
    public readonly notes?: string;

    constructor(serverGroup: ServerGroup, parent: Badge, data: IBadgePartialData) {
        this.key = data.key;
        this.serverGroup = serverGroup;
        this.parent = parent;
        this.type = data.type;
        this.mapKey = data.mapKey;
        this.location = data.location;
        this.plaqueType = data.plaqueType;
        this.inscription = data.inscription;
        this.vidiotMapKey = data.vidiotMapKey;
        this.badgeKey = data.badgeKey;
        this.inventionLevel = data.inventionLevel;
        this.inventionTypes = data.inventionTypes;
        this.count = data.count;
        this.notes = data.notes;
    }
}
