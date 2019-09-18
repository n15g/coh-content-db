import {ILink} from "./link";
import {IServerGroup} from "./server-group";

export interface IBadgeData {
    /**
     * Key.
     */
    readonly key: string;

    /**
     * Badge type.
     */
    readonly type: BadgeType;

    /**
     * The canonical, or default, name for the badge.
     */
    readonly canonicalName: string;

    /**
     * Alternate names the badge may be known as.
     */
    readonly alternateNames?: IAlternateName[];

    /**
     * The alignments this badge can be obtained by.
     */
    readonly alignment: IAlignmentFlags;

    /**
     * The in-game badge text.
     */
    readonly badgeText?: string;

    /**
     * The method used to acquire the badge.
     */
    readonly acquisition?: string;

    /**
     * Badge images.
     */
    readonly images: string[];

    /**
     * Notes or tips about the badge.
     */
    readonly notes?: string;

    /**
     * List of links to external resources.
     */
    readonly links?: ILink[];

    /**
     * Key of the map this badge is found on for exploration badges.
     */
    readonly mapKey?: string;

    /**
     * /loc coordinates of the badge in-game.
     */
    readonly location?: number[];

    /**
     * The number the badge appears as on Vidiot Maps.
     */
    readonly vidiotMapNumber?: number;
}

export enum BadgeType {
    EXPLORATION = "EXPLORATION",
    HISTORY = "HISTORY",
    ACCOMPLISHMENT = "ACCOMPLISHMENT",
    ACHIEVEMENT = "ACHIEVEMENT",
    ACCOLADE = "ACCOLADE",
    GLADIATOR = "GLADIATOR",
    VETERAN = "VETERAN",
    PVP = "PVP",
    INVENTION = "INVENTION",
    DEFEAT = "DEFEAT",
    EVENT = "EVENT",
    OUROBOROS = "OUROBOROS",
    CONSIGNMENT = "CONSIGNMENT",
    DAY_JOB = "DAY_JOB",
    AE = "AE"
}

export interface IAlternateName {
    readonly type: AlternateNameType,
    readonly value: string
}

export enum AlternateNameType {
    M = "M",
    F = "F",
    H = "H",
    V = "V",
    P = "P",
    MH = "MH",
    MV = "MV",
    MP = "MP",
    FH = "FH",
    FV = "FV",
    FP = "FP"
}

export interface IAlignmentFlags {
    readonly h: boolean,
    readonly v: boolean,
    readonly p: boolean
}

export interface IBadge extends IBadgeData {
    readonly serverGroup: IServerGroup;
}
