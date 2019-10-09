import {BadgePartialType, BadgeType, EnhancementCategory, IAlignmentFlags, IAlternateValue, IBadge, IBadgeData, IBadgePartial, IBadgePartialData, ILink, PlaqueType} from "..";
import {ServerGroup} from "./server-group";
import {getOrDefine, validateKey} from "./_common";
import * as _ from "lodash";

export class Badge implements IBadge {
    public readonly serverGroup: ServerGroup;
    public readonly key: string;
    public type?: BadgeType;
    public names?: IAlternateValue[];
    public alignment?: IAlignmentFlags;
    public badgeText?: IAlternateValue[];
    public acquisition?: string;
    public icons?: IAlternateValue[];
    public notes?: string;
    public links?: ILink[];
    public mapKey?: string;
    public location?: number[];
    public vidiotMapKey?: string;
    public effect?: string;
    public partials?: BadgePartial[];

    private partialCache: { [id: string]: BadgePartial } = {};

    public constructor(serverGroup: ServerGroup, key: string) {
        validateKey(key);

        this.serverGroup = serverGroup;
        this.key = key;
    }

    public load(data: IBadgeData) {
        if (data.type != undefined) this.type = data.type;
        if (data.names != undefined) this.names = [...this.names || [], ...data.names];
        if (data.alignment != undefined) this.alignment = data.alignment;
        if (data.badgeText != undefined) this.badgeText = [...this.badgeText || [], ...data.badgeText];
        if (data.acquisition != undefined) this.acquisition = data.acquisition;
        if (data.icons != undefined) this.icons = [...this.icons || [], ...data.icons];
        if (data.notes != undefined) this.notes = data.notes;
        if (data.links != undefined) this.links = [...this.links || [], ...data.links];
        if (data.mapKey != undefined) this.mapKey = data.mapKey;
        if (data.location != undefined) this.location = data.location;
        if (data.effect != undefined) this.effect = data.effect;
        if (data.vidiotMapKey != undefined) this.vidiotMapKey = data.vidiotMapKey;

        if (data.partials != undefined) {
            _.each(data.partials, data =>
                getOrDefine(data.key, this.partialCache, (key) => new BadgePartial(this.serverGroup, this, key))
                    .load(data)
            );
            this.partials = _.values(this.partialCache);
        }
    }

    public getPartial(key: string): IBadgePartial | null {
        return this.partialCache[key];
    }
}

export class BadgePartial implements IBadgePartial {
    public readonly serverGroup: ServerGroup;
    public readonly parent: Badge;
    public readonly key: string;
    public type?: BadgePartialType;
    public mapKey?: string;
    public location?: number[];
    public plaqueType?: PlaqueType;
    public inscription?: string;
    public vidiotMapKey?: string;
    public badgeKey?: string;
    public inventionLevel?: number;
    public inventionTypes?: EnhancementCategory[];
    public count?: number;
    public notes?: string;

    constructor(serverGroup: ServerGroup, parent: Badge, key: string) {
        validateKey(key);

        this.key = key;
        this.serverGroup = serverGroup;
        this.parent = parent;
    }

    public load(data: IBadgePartialData) {
        if (data.type != undefined) this.type = data.type;
        if (data.mapKey != undefined) this.mapKey = data.mapKey;
        if (data.location != undefined) this.location = data.location;
        if (data.plaqueType != undefined) this.plaqueType = data.plaqueType;
        if (data.inscription != undefined) this.inscription = data.inscription;
        if (data.vidiotMapKey != undefined) this.vidiotMapKey = data.vidiotMapKey;
        if (data.badgeKey != undefined) this.badgeKey = data.badgeKey;
        if (data.inventionLevel != undefined) this.inventionLevel = data.inventionLevel;
        if (data.inventionTypes != undefined) this.inventionTypes = data.inventionTypes;
        if (data.count != undefined) this.count = data.count;
        if (data.notes != undefined) this.notes = data.notes;
    }
}
