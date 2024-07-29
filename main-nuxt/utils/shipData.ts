
export type ShipManufacturer = "Jupiter Industry" | "NOMA Shipping" | "Antonios" | "Dawn Accord" | "Empty";

export type ShipDirection = "Outstanding Firepower" | "Sustained Combat" | "Strategy & Support" | "Fighter & Corvette" | "Empty";

export type ShipScope = "Direct-Fire Weapon" | "Projectile Weapon" | "Empty";

export type Attribute = "Interception Capability" | "Interception Capability (Fleet)" | "Crit" | "Anti-Aircraft Counterattack" |
"Anti-Aircraft Support" | "Anti-Aircraft Special Ammo" | "Anti-Aircraft Lightweight Ammo" | "Anti-Aircraft Cycle" |
"Anti-Aircraft High-Speed Strike" |  "Anti-Aircraft Critical Strike" | "Increase Energy Weapon Damage" | "Ship Calibration Support" |
"Reduce System Crit Damage Taken" | "Ship Shielding Support" | "Energy Damage Reduction" | "Physical Damage Reduction" |
"Crit Damage Reduction" | "Increase Hit Rate" | "Additional HP Auto-Repair" | "Reduce Evasion" | "Reduce Hit Rate" |
"Oscillatory Excitation" | "Collaborative Calibration" | "Self-holding Capability" | "Increase Production Speed" |
"Back-Row Torpedo Hit Evasion" | "Back-Row Missile Hit Evasion" | "Increase Back-Row Missile Hit Rate" |
"Increase Back-Row Torpedo Hit Rate" | "Ship Disguise" | "Increase Repair Speed" | "Increase Aircraft Damage" |
"Increase Aircraft Hit Rate" | "Aircraft Recovery" | "Attack Against Systems" | "Firepower Recon Support" | 
"UAV Cooperation" | "UAV Aerial Cover Support";

export type Aircraft = "Small Fighter" | "Medium Fighter" | "Large Fighter" | "Corvette";

export type UAV = "Spotter UAV" | "Area-Denial Anti-Aircraft UAV" | "Shield UAV" | "Repair UAV" | "Tactical UAV" | "Info UAV" | 
"Cooperative Offensive UAV" | "Siege UAV" | "Recon UAV";

export type Ship = {
    name: string;
    title: string;
    img: string;
    type: "Fighter" | "Corvette" | "Frigate" | "Destroyer" | "Cruiser" | "Battlecruiser" | "Auxiliary Ship" | "Carrier" | "Battleship";
    fighter_type?: "Small" | "Medium" | "Large";
    variant: "A" | "B" | "C" | "D";
    variant_name: string;
    manufacturer: ShipManufacturer;
    direction: ShipDirection[];
    scope: ShipScope;
    weight: number;
    row: "Front" | "Middle" | "Back";
    cp: number;
    maxInFleet: number;
    aircraftPerSquadron?: number;
    medium_fighters_held?: number;
    large_fighters_held?: number;
    corvettes_held?: number;
    production: {
        metal: number;
        crystal: number;
        deuterium: number;
        timeSeconds: number;
        storage: number;
    }
    systems?: ShipSystemAll[];
    modules?: (Module | UnknownModule)[];
}

export type AffectedStats = "damage" | "hp" | "armor" | "energyShield" | "cruise" | "warp" | "aircraftHitrate" | "smallHitrate" | "bigHitrate" | "generalHitrate" | "missileEvasion" | "torpedoEvasion" | "directEvasion" | "generalEvasion";

export type SystemUpgrade = {
    name: string;
    img: string;
    strategy?: boolean;
    description: string[];
    flavorText: string;
    maxTiers: number;
    affectedStat: AffectedStats | AffectedStats[] | null;
    percentBuffPerTier: number | number[] | null;
    tpPerTier: number | number[];
    tiersUpgraded?: number;
    tpAllocated?: number;
}

export type ShipSystemAll = WeaponSystem | AircraftSystem | ArmorSystem | PropulsionSystem | EnergySystem | CommandSystem | JammingSystem | MiscSystem;

interface ShipSystem {
    name: string;
    main?: boolean;
    maxUpgradeSlots: number;
    systemAdjustment: "weaponDamage" | "hp" | "aircraftDamage" | "uavEffectiveness" | "jamming" | null;
    upgrades: SystemUpgrade[];
    tpAllocated?: number;
}

export interface WeaponSystem extends ShipSystem {
    type: "weapon";
    img: "/weapons/icons/cannon.png";
    baseAntiship: number;
    baseAntiair: number;
    baseSiege: number;
}

export interface AircraftSystem extends ShipSystem {
    type: "aircraft";
    img: "/weapons/icons/aircraft.png";
}

export interface ArmorSystem extends ShipSystem {
    type: "armor";
    img: "/weapons/icons/armor.png";
    baseHp: number;
    baseArmor: number;
    baseEnergyShield: number;
}

export interface PropulsionSystem extends ShipSystem {
    type: "propulsion";
    img: "/weapons/icons/speed.png";
    baseCruise: number;
    baseWarp: number;
    evasion?: number;
}

export interface EnergySystem extends ShipSystem {
    type: "energy";
    img: "/weapons/icons/jamming.png";
    baseDmgBuff?: number;
}

export interface CommandSystem extends ShipSystem {
    type: "command";
    img: "/weapons/icons/command.png";
}

export interface JammingSystem extends ShipSystem {
    type: "jamming";
    img: "/weapons/icons/jamming.png";
}

export interface MiscSystem extends ShipSystem {
    type: "misc";
    img: string;
}

export type Module = {
    type: "known";
    img: string;
    system: "M1" | "M2" | "M3" | "A1" | "A2" | "A3" | "B1" | "B2" | "B3" | "C1" | "C2" | "C3" | "D1" | "D2" | "D3" | "E1" | "E2" | "F1" | "F2" | "G1" | "G2" | "H1" | "H2";
    name: string;
    stats: WeaponStats | ArmorStats | PropulsionStats;
    subsystems: (WeaponSubsystem | AircraftHangerSubsystem | UavHangerSubsystem | MiscSubsystem)[];
}

export type UnknownModule = {
    type: "unknown";
    img: string;
    system: "M1" | "M2" | "M3" | "A1" | "A2" | "A3" | "B1" | "B2" | "B3" | "C1" | "C2" | "C3" | "D1" | "D2" | "D3" | "E1" | "E2" | "F1" | "F2" | "G1" | "G2" | "H1" | "H2";
    unknown: true;
}

export type WeaponStats = {
    type: "weapon";
    antiship: null | number;
    antiair: null | number;
    siege: null | number;
    hp: number;
}

export type ArmorStats = {
    type: "armor";
    armor: null | number;
    extraHP: null | number;
    energyShield: null | number;
    hpRecovery?: number;
    storage?: number;
    hp: number;
}

export type PropulsionStats = {
    type: "propulsion",
    cruise: number;
    warp: number;
    hp: number;
}

export type WeaponSubsystem = {
    type: "weapon";
    count: number;
    title: string;
    name: string;
    damageType: "Projectile" | "Energy";
    target: "Building" | "Aircraft" | "Small Ship" | "Large Ship";
    lockonEfficiency: null | number;
    alpha: number;
    attributes: null | Attribute[];
}

export type AircraftHangerSubsystem = {
    type: "hanger";
    count: number;
    title: string;
    name: string;
    hanger: Aircraft;
    capacity: number;
    attributes: null | Attribute[];
}

export type UavHangerSubsystem = {
    type: "hanger";
    count: number;
    title: string;
    name: string;
    hanger: UAV;
    capacity: number;
    attributes: null | Attribute[];
    damageType?: "Projectile" | "Energy";
    target?: "Building" | "Aircraft" | "Small Ship" | "Large Ship";
    lockonEfficiency?: null | number;
    alpha?: number;
    repair?: number;
}

export type MiscSubsystem = {
    type: "misc";
    count: number;
    title: string;
    name: string;
    attributes: null | Attribute[];
}

export const attributes: Record<Attribute, string> = {
    "Interception Capability": "Has a chance to intercept missiles or torpedoes that target friendly ship in the same row",
    "Interception Capability (Fleet)": "Has a chance to intercept missiles or torpedoes that target any friendly ships in the fleet",
    "Crit": "Has a chance to deal additional Crit damage to the target",
    "Anti-Aircraft Counterattack": "When not under attack by aerial targets, it can strike at opposing air targets targetting same-row friendly ships. Can quickly counterattack aerial targets that strike this ship. During the counterattack, increases Hit Rate by an additional amount",
    "Anti-Aircraft Support": "Can provide anti-aircraft support to all friendly ships",
    "Anti-Aircraft Special Ammo": "Switches to Special Ammo when striking an aircraft target, increasing the Damage Per Hit by an additional amount",
    "Anti-Aircraft Lightweight Ammo": "Switches to Lightweight Ammo to trade for mobility when striking an aircraft, reducing the Damage Per hit by an additional amount",
    "Anti-Aircraft Cycle": "The weapon's operating efficiency is increased when striking an aircraft target, reducing the CD by an additional amount",
    "Anti-Aircraft High-Speed Strike": "Utilizes the High-Speed Strike mode when striking an aircraft target, reducing the duration of the strikes by an additional amount",
    "Ship Calibration Support": "Increase the Hit Rate of the target ship by 20%",
    
    "Anti-Aircraft Critical Strike": "Has a 25% chance to deal an additional 100% Crit Damage to aircraft",
    "Increase Energy Weapon Damage": "Increases the damage of the ship's energy weapon by 10%",
    "Reduce System Crit Damage Taken": "Reduces Crit Damage taken by all systems by 15%",
    "Ship Shielding Support": "Initiate Shielding Support to the target and increase the Evasion of the target ship to energy weapons by 15%",
    "Energy Damage Reduction": "Reduces the Damage taken from energy weapon attacks by 15%",
    "Physical Damage Reduction": "Reduces the Damage taken from projectile weapon attacks by 15%",
    "Crit Damage Reduction": "Reduces Crit Damage received by 30%",
    "Increase Hit Rate": "Increases the Hit Rate of all weapons on the ship by 5%",
    "Additional HP Auto-Repair": "Automatically repairs the damaged portion of additional HP after each battle",
    "Reduce Evasion": "Reduce ship evasion by 10%",
    "Reduce Hit Rate": "Reduces the Hit Rate of the primary weapon by 5%",
    "Oscillatory Excitation": "Triggers one of the onboard weapons to initiate an extra shot every 6 seconds",
    "Collaborative Calibration": "Calibrates the fire control of an onboard weapon once every 15s, increasing the Hit Rate by 30% for 15s",
    "Self-holding Capability": "Provides self-held command points for the auxiliary ship",
    "Increase Production Speed": "Increases Shipbuilding speed of the auxiliary ship",
    "Back-Row Torpedo Hit Evasion": "+8% torpedo evasion to back-row ships in the fleet",
    "Back-Row Missile Hit Evasion": "+8% missile evasion to back-row ships in the fleet",
    "Increase Back-Row Torpedo Hit Rate": "Raise torpedo weapon Hit Rate of back-row ships in the fleet by 12%",
    "Increase Back-Row Missile Hit Rate": "Raise missile weapon Hit Rate of back-row ships in the fleet by 12%",
    "Ship Disguise": "When itself is selected as an attack target, it will be mislabeled as a carrier by the enemy",
    "Increase Repair Speed": "When using the auxiliary ship to conduct repairs, increases the repair speed by 20%",
    "Increase Aircraft Damage": "Increases primary weapon Damage of carried Antonios aircraft by 15%",
    "Increase Aircraft Hit Rate": "Increases primary weapon Hit Rate of carried Antonios aircraft by 15%",
    "Aircraft Recovery": "Aircraft returning to all hangers recover 10% HP",
    "Attack Against Systems": "Has a chance to deal damage to the target's systems (Primary Weapon System: Low efficiency)",
    "Firepower Recon Support": "Increases allies' primary weapon's Crit Chance by 30% and Crit Damage by 40%",
    "UAV Cooperation": "Each aircraft in the same hanger comes with a UAV. Tthe UAV and the aircraft will attack the same target together.",
    "UAV Aerial Cover Support": "Each aircraft in the same hanger comes with a UAV. The UAV provides anti-aircraft support and strikes back at enemy aircraft that attack the supporting aircraft."
}

export const manufacturers: ShipManufacturer[] = ["Jupiter Industry", "NOMA Shipping", "Antonios", "Dawn Accord", "Empty"];
export const directions: ShipDirection[] = ["Outstanding Firepower", "Sustained Combat", "Strategy & Support", "Fighter & Corvette", "Empty"];
export const scopes: ShipScope[] = ["Projectile Weapon", "Direct-Fire Weapon", "Empty"];

export const difficulty = {
    "Jupiter Industry": 3.5,
    "NOMA Shipping": 3.5,
    "Antonios": 4,
    "Dawn Accord": 2.5,
    "Outstanding Firepower": 5.5,
    "Sustained Combat": 5,
    "Strategy & Support": 5.5,
    "Fighter & Corvette": 6,
    "Projectile Weapon": 4.5,
    "Direct-Fire Weapon": 4
};
