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
    readonly images?: string[];

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
     * The number or letter the badge appears as on Vidiot Maps.
     */
    readonly vidiotMapKey?: string;

    /**
     * For badges that have partial fulfilment requirements, such as plaques for history badges, or other badges for meta-badges like accolades.
     */
    readonly partials?: IBadgePartialData[];
}

export interface IBadgePartialData {
    /**
     * Key.
     */
    readonly key: string;

    /**
     * Type of partial.
     */
    readonly type: BadgePartialType;

    /**
     * Map the partial is located on.
     */
    readonly mapKey?: string;

    /**
     * /loc coordinates.
     */
    readonly location?: number[];

    /**
     * Is it a wall plaque or a physical monument?
     */
    readonly plaqueType?: PlaqueType;

    /**
     * Plaque inscription.
     */
    readonly inscription?: string;

    /**
     * The number or letter the partial appears as on Vidiot Maps.
     */
    readonly vidiotMapKey?: string;


    /**
     * The badge required for this partial.
     */
    readonly badgeKey?: string;

    /**
     * Level of the invention required.
     */
    readonly inventionLevel?: number;

    /**
     * Number of invention crafts required.
     */
    readonly count?: number;

    /**
     * Any additional notes.
     */
    readonly notes?: string;
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

export enum BadgePartialType {
    PLAQUE = "PLAQUE",
    BADGE = "BADGE",
    INVENTION = "INVENTION",
    /**
     * Some invention badges require you to build x of two different invention levels, and 'one additional of either level'.
     */
    INVENTION_PLUS_ONE = "INVENTION_ADDITIONAL",
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

export const ALIGNMENT_HERO: IAlignmentFlags = {h: true, v: false, p: false};
export const ALIGNMENT_VILLAIN: IAlignmentFlags = {h: false, v: true, p: false};
export const ALIGNMENT_PRAETORIAN: IAlignmentFlags = {h: false, v: false, p: true};
export const ALIGNMENT_ANY: IAlignmentFlags = {h: true, v: true, p: true};

export enum PlaqueType {
    WALL_PLAQUE = "WALL_PLAQUE",
    MONUMENT = "MONUMENT"
}

export interface IBadge extends IBadgeData {
    readonly serverGroup: IServerGroup;
    readonly partials?: IBadgePartial[];
}

export interface IBadgePartial extends IBadgePartialData {
    readonly serverGroup: IServerGroup;
    readonly parent: IBadge;
}

