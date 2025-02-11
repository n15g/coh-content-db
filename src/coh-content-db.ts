import {IServerGroup, IServerGroupData} from "./types/server-group";
import {getOrDefine} from "./internal/_common";
import {ServerGroup} from "./internal/server-group";

interface ICohContentDb {
    /**
     * Load server group data package into the database.
     * @param data The data to load.
     */
    load(data: IServerGroupData): void;

    /**
     * Get all the server groups currently loaded in the database.
     */
    getServerGroups(): IServerGroup[];

    /**
     * get a server group by key.
     * @param serverGroupKey The key.
     */
    getServerGroup(serverGroupKey: string): IServerGroup | null;
}

export class CohContentDb implements ICohContentDb {
    private readonly serverGroups: { [id: string]: ServerGroup } = {};

    /**
     * @inheritDoc
     * @override
     */
    load(data: IServerGroupData) {
        const serverGroup = getOrDefine(data.key, this.serverGroups, (key) => new ServerGroup(key));
        serverGroup.load(data);
    }

    /**
     * @inheritDoc
     * @override
     */
    getServerGroups(): IServerGroup[] {
        return Object.values(this.serverGroups);
    }

    /**
     * @inheritDoc
     * @override
     */
    getServerGroup(serverGroupKey: string): IServerGroup | null {
        return this.serverGroups[serverGroupKey];
    }
}
