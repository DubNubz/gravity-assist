import type { AllShip, Fighter, SuperCapitalShip, WeaponModule, MiscModule, AircraftSubsystem } from "~/utils/ships";

export type FleetRow = "Front" | "Middle" | "Back";

/** Ship types that are considered aircraft and do not count toward fleet CP */
export const AIRCRAFT_TYPES = ["Fighter", "Corvette"] as const;

export interface FleetEntry {
  /** AllShip.id */
  shipId: number;
  /** AllShip.variant */
  variant: string;
  /** How many of this ship variant are in this row (max = serviceLimit) */
  count: number;
}

export interface SavedFleet {
  id: string;
  name: string;
  maxCommandPoints: number;
  /** Whether this fleet was composed using owned-blueprints-only mode */
  ownedOnly: boolean;
  rows: {
    Front: FleetEntry[];
    Middle: FleetEntry[];
    Back: FleetEntry[];
  };
  /** Ships that don't count toward CP but fill hangar slots */
  reinforcements: FleetEntry[];
  savedAt: string;
}

export interface AircraftCapacity {
  smallFighters: number;
  mediumFighters: number;
  largeFighters: number;
  corvettes: number;
}

/** All ship types that appear in the fleet library and formation */
export const FLEET_SHIP_TYPES = ["Fighter", "Corvette", "Frigate", "Destroyer", "Cruiser", "Battlecruiser", "Auxiliary Ship", "Carrier", "Battleship"] as const;

export const FLEET_ROWS: FleetRow[] = ["Front", "Middle", "Back"];

/**
 * Calculate aircraft/corvette hangar capacity for a ship.
 * For supercapital ships, uses default modules unless specific module systems are provided.
 */
export function getShipAircraftCapacity(ship: AllShip, unlockedModuleSystems?: string[]): AircraftCapacity {
  const cap: AircraftCapacity = { smallFighters: 0, mediumFighters: 0, largeFighters: 0, corvettes: 0 };

  // Regular capital ships with fixed carrier fields
  if ("mediumFighterCapacity" in ship) cap.mediumFighters = (ship as any).mediumFighterCapacity as number;
  if ("largeFighterCapacity" in ship) cap.largeFighters = (ship as any).largeFighterCapacity as number;
  if ("corvetteCapacity" in ship) cap.corvettes = (ship as any).corvetteCapacity as number;

  // Supercapital ships with configurable modules
  if ("modules" in ship) {
    const supercap = ship as SuperCapitalShip;
    for (const module of supercap.modules) {
      if (module.type === "unknown") continue;

      // Determine whether to count this module
      const useModule = unlockedModuleSystems ? unlockedModuleSystems.includes(module.system) : module.default === true;
      if (!useModule) continue;

      if ("subsystems" in module) {
        const subsystems = (module as WeaponModule | MiscModule).subsystems;
        for (const sub of subsystems) {
          if (sub.type !== "hanger") continue;
          if (!("hanger" in sub)) continue;

          const hangerSub = sub as AircraftSubsystem;
          // total = number of bays (count) × aircraft per bay (capacity)
          const total = sub.count * hangerSub.capacity;
          switch (hangerSub.hanger) {
            case "Small Fighter":
              cap.smallFighters += total;
              break;
            case "Medium Fighter":
              cap.mediumFighters += total;
              break;
            case "Large Fighter":
              cap.largeFighters += total;
              break;
            case "Corvette":
              cap.corvettes += total;
              break;
          }
        }
      }
    }
  }

  return cap;
}

/** Sum aircraft capacity across all fleet entries, optionally using blueprint module data */
export function getFleetAircraftCapacity(
  rows: SavedFleet["rows"],
  shipData: AllShip[],
  getBlueprintModules?: (shipId: number, variant: string) => string[] | undefined
): AircraftCapacity {
  const total: AircraftCapacity = { smallFighters: 0, mediumFighters: 0, largeFighters: 0, corvettes: 0 };

  for (const row of FLEET_ROWS) {
    for (const entry of rows[row]) {
      const ship = shipData.find((s) => s.id === entry.shipId && s.variant === entry.variant);
      if (!ship) continue;

      const unlockedModules = getBlueprintModules?.(entry.shipId, entry.variant);
      const cap = getShipAircraftCapacity(ship, unlockedModules);

      total.smallFighters += cap.smallFighters * entry.count;
      total.mediumFighters += cap.mediumFighters * entry.count;
      total.largeFighters += cap.largeFighters * entry.count;
      total.corvettes += cap.corvettes * entry.count;
    }
  }

  return total;
}

/** Calculate total command points used by a fleet (fighters and corvettes are excluded) */
export function getFleetCommandPoints(rows: SavedFleet["rows"], shipData: AllShip[]): number {
  let total = 0;
  for (const row of FLEET_ROWS) {
    for (const entry of rows[row]) {
      const ship = shipData.find((s) => s.id === entry.shipId && s.variant === entry.variant);
      if (ship && !(AIRCRAFT_TYPES as readonly string[]).includes(ship.type)) {
        total += ship.commandPoints * entry.count;
      }
    }
  }
  return total;
}

export function emptyFleetRows(): SavedFleet["rows"] {
  return { Front: [], Middle: [], Back: [] };
}

export function emptyReinforcements(): FleetEntry[] {
  return [];
}

/** Map a Fighter's fighterType to the corresponding hangar slot category */
export function fighterTypeToHangar(fighterType: Fighter["fighterType"]): "smallFighters" | "mediumFighters" | "largeFighters" {
  if (fighterType === "Small") return "smallFighters";
  if (fighterType === "Large") return "largeFighters";
  return "mediumFighters";
}

const FLEET_STORAGE_KEY = "ga_savedFleets";

export function loadSavedFleets(): SavedFleet[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const fleets = JSON.parse(localStorage.getItem(FLEET_STORAGE_KEY) ?? "[]") as SavedFleet[];
    // Migrate old saved fleets that don't have a reinforcements field
    return fleets.map((f) => ({ ...f, reinforcements: f.reinforcements ?? [] }));
  } catch {
    return [];
  }
}

export function persistSavedFleets(fleets: SavedFleet[]): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(fleets));
}
