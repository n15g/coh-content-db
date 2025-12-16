export const ZONE_TYPE = [
  /**
   * The standard zone type, even if not technically occurring in the 'City' proper.
   */
  'city',
  /**
   * An Ouroboros flashback to a zone as it was in a previous era.
   */
  'echo',
  /**
   * Tutorial zon, usually inaccessible after leaving.
   */
  'tutorial',
  /**
   * Trial zones, like the Abandoned Sewers trial.
   */
  'trial',
  /**
   * Hazard zones like the Hollows.
   */
  'hazard',
  /**
   * Mayhem mission zones.
   */
  'mayhem',
  /**
   * Safeguard mission zones.
   */
  'safeguard',
  /**
   * Exists inside a mission not covered by the other types.
   */
  'mission',
  /**
   * Incarnate trial zones.
   */
  'incarnate',
  /**
   * Cooprative zones where Heroes and Villains can team up for PvE content.
   */
  'co-op',
  /**
   * PvP zones like Bloody Bay.
   */
  'pvp',
  /**
   * Located in an arena PvP map.
   */
  'arena',
  /**
   * A building, usually contained within another zone, like the AE buildings.
   */
  'building',
  /**
   * Stuff like the (Phone only) zone.
   */
  'other',
] as const
export type ZoneType = typeof ZONE_TYPE[number]
