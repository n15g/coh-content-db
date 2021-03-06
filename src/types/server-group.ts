import {IBadge, IBadgeData} from "./badge";
import {IGameMap, IGameMapData} from "./game-map";
import {IArchetype, IArchetypeData} from "./archetype";

/**
 * A server group is a collection of game servers.
 */
export interface IServerGroupData {
    /**
     * Key.
     */
    readonly key: string;
    /**
     * Name of the server group.
     */
    readonly name?: string;
    /**
     * Description of the server group. Markdown allowed.
     */
    readonly description?: string;

    /**
     * Status of the content module. {@see ServerGroupStatus}.
     */
    readonly status?: ServerGroupStatus[];

    /**
     * Repository where the db content package is maintained.
     */
    readonly repository?: string;

    /**
     * List of the names of the servers in this group.
     * Torchbearer, Excelsior, etc.
     */
    readonly servers?: IServerData[];

    /**
     * List of archetypes available on this group.
     */
    readonly archetypes?: IArchetypeData[];

    /**
     * List of game maps supported by this server group.
     */
    readonly maps?: IGameMapData[];

    /**
     * List of badges available on this server group.
     */
    readonly badges?: IBadgeData[];

    /**
     * Change log.
     */
    readonly changelog?: { [id: string]: string };
}

export interface IServerData {
    name: string;
}

export enum ServerGroupStatus {
    /**
     * Package is still being developed, and may be missing some data or some data may be inaccurate.
     */
    WORK_IN_PROGRESS = "WORK_IN_PROGRESS",

    /**
     * This server group has been sunset, and is not longer being maintained/developed.
     */
    SUNSET = "SUNSET"
}

export interface IServerGroup extends IServerGroupData {
    readonly servers?: IServer[];
    readonly archetypes?: IArchetype[];
    readonly maps?: IGameMap[];
    readonly badges?: IBadge[];

    getArchetype(key: string): IArchetype | null;

    getMap(key: string): IGameMap | null;

    getBadge(key: string): IBadge | null;
}

export interface IServer extends IServerData {

}
