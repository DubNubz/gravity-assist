
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
    /** Name of the ship, as shown ingame.
     * @example "Conamara Chaos"
     */
    name: string;

    /** Title of the ship, shown next to the name.
     * @example "High-Speed Plasma Cruiser"
     */
    title: string;

    /** Image of the ship, found in `/public/ships`.
     * 
     * Format: `shipName_variant.png`
     * @example "/ships/conamaraChaos_b.png"
     */
    img: string;

    /** Class of the ship. */
    type: "Fighter" | "Corvette" | "Frigate" | "Destroyer" | "Cruiser" | "Battlecruiser" | "Auxiliary Ship" | "Carrier" | "Battleship";

    /** If this ship is a fighter, the type of fighter. */
    fighter_type?: "Small" | "Medium" | "Large";

    /** Variant of the ship. */
    variant: "A" | "B" | "C" | "D";

    /** Name of the variant, shown next to the variant letter.
     * @example "Plasma Type"
     */
    variant_name: string;

    manufacturer: ShipManufacturer;
    direction: ShipDirection[];
    scope: ShipScope;
    weight: number;
    row: "Front" | "Middle" | "Back";

    /** Command Points. */
    cp: number;

    /** Active Service limit. */
    maxInFleet: number;

    /** If this ship is a fighter, the number of fighters per unit. */
    aircraftPerSquadron?: number;

    /** If this ship is a medium fighter carrier, the number of medium fighters held. */
    medium_fighters_held?: number;

    /** If this ship is a large fighter carrier, the number of large fighters held. */
    large_fighters_held?: number;

    /** If this ship is a corvette carrier, the number of corvettes held. */
    corvettes_held?: number;

    /** Production Info, shown after clicking the button at the top right of the Basic Stats box. */
    production: {
        metal: number;
        crystal: number;
        deuterium: number;
        /** Time to produce this ship, in seconds. */
        timeSeconds: number;
        storage: number;
    }

    /** Only found if this ship is a capital ship or aircraft. */
    systems?: ShipSystemAll[];

    /** Only found if this ship is a super capital ship. */
    modules?: (Module | UnknownModule)[];
}

export type AffectedStats = "damage" | "hp" | "armor" | "energyShield" | "cruise" | "warp" | "aircraftHitrate" | "smallHitrate" | "bigHitrate" | "generalHitrate" | "missileEvasion" | "torpedoEvasion" | "directEvasion" | "generalEvasion" | "siegeDamage";

export type SystemUpgrade = {
    /** Name of the upgrade.
     * @example "Overdrive"
     */
    name: string;

    /** Image of the upgrade's icon, found in `/public/weapons/upgrades`.
     * 
     * If upgrade is a strategy, the image is found in `/public/weapons/upgrades/strategies`.
     * @example "/weapons/upgrades/genericCooldown.png"
     */
    img: string;

    /** Only found if this upgrade is a strategy. */
    strategy?: true;

    /** Description of the upgrade, separated into strings.
     * 
     * - The first string of the array is the first section of the description, up until the first instance of a yellow character. This includes the space before the yellow character.
     * - The second string of the array is/are the first yellow character(s). It should not contain any spaces and should only contain the yellow character(s).
     * - The third string is the next section of the description, including the space after the previous yellow character(s).
     * - And so on.
     * 
     * @example ["Increases damage by ", "40%", " and Hit Rate by ", "25%", "."]
     */
    description: string[];

    /** The maximum number of tiers this upgrade has. */
    maxTiers: number;

    /** - If only one stat is affected by this upgrade, this property should be a string of the stat affected.
     * - If more than one stat is affected by this upgrade, this property should be an array of strings of the stats affected.
     * @example affectedStat: "damage"
     * @example affectedStat: ["damage", "generalHitrate"]
     */
    affectedStat: AffectedStats | AffectedStats[] | null;

    /** - If only one stat is affected by this upgrade. this property should be a number of the stat affected.
     * - If more than one stat is affected by this upgrade, this property should be an array of numbers of the stats affected.
     * 
     * If `affectedStat === "armor"`, this property should be a flat value.
     * @example percentBuffPerTier: 1.02
     * @example percentBuffPerTier: [1.02, 1.15]
     * @example affectedStat: "armor"; percentBuffPerTier: 6
     */
    percentBuffPerTier: number | number[] | null;

    /** - If the required number of tech points stays the same throughout all tiers of the upgrade, this property should be that number.
     * - If the required number of tech points increases throughout the tiers of the upgrade, this property should be an array of numbers representing the number of tech points for each tier.
     * 
     * The number of tech points for each tier can be inferred; if `maxTiers === 3` and the number of tech points to upgrade all tiers is `5`, the only possible arrangement of tech points is `[1, 2, 2]`.
     * @example tpPerTier: 2
     * @example tpPerTier: [1, 1, 1, 1, 2]
     */
    tpPerTier: number | number[];

    /** This property should not be present in the default ship data.
     * 
     * Represents the number of tiers upgraded by the user.
     */
    tiersUpgraded?: number;

    /** This property should not be present in the default ship data.
     * 
     * Represents the total number of tech points allocated to this upgrade by the user.
     */
    tpAllocated?: number;
}

export type ShipSystemAll = WeaponSystem | AircraftSystem | ArmorSystem | PropulsionSystem | EnergySystem | CommandSystem | JammingSystem | MiscSystem;

interface ShipSystem {
    /** Name of the system.
     * @example "Bow-Mounted Plasma Caster"
     */
    name: string;

    /** Only found if this system is the main system. */
    main?: true;

    /** The maximum number of upgrades this system has. */
    maxUpgradeSlots: number;

    /** The type of system adjustment available for this system. */
    systemAdjustment: "weaponDamage" | "hp" | "aircraftDamage" | "uavEffectiveness" | "jamming" | null;

    /** Array of all upgrades located in this system. */
    upgrades: SystemUpgrade[];

    /** This property should not be present in the default ship data.
     * 
     * Represents the total number of tech points allocated to this system by the user.
     */
    tpAllocated?: number;
}

export interface WeaponSystem extends ShipSystem {
    type: "weapon";

    /** Image of the system's icon, found in `/public/weapons/icons`.
     * @example "/weapons/icons/cannon.png"
     */
    img: "/weapons/icons/cannon.png";

    /** Default Anti-Ship Fire value, found after clicking the system.
     * 
     * - If the ship is a figher or corvette, the Anti-Ship Fire value is different if you click the system and if you don't click the system.
     * - Use the value found after clicking the system.
     * @readonly This property should not be modified.
     */
    readonly baseAntiship: number;

    /** Default Air Defense value, found after clicking the system.
     * 
     * - If the ship is a figher or corvette, the Air Defense value is different if you click the system and if you don't click the system.
     * - Use the value found after clicking the system.
     * @readonly This property should not be modified.
     */
    readonly baseAntiair: number;

    /** Default Siege Fire value, found after clicking the system.
     * 
     * - If the ship is a figher or corvette, the Siege Fire value is different if you click the system and if you don't click the system.
     * - Use the value found after clicking the system.
     * @readonly This property should not be modified.
     */
    readonly baseSiege: number;

    /** This property should not be present in the default ship data.
     * 
     * Represents the modified Anti-Ship Fire value, after system upgrades.
     */
    modifiedAntiship?: number;

    /** This property should not be present in the default ship data.
     * 
     * Represents the modified Air Defense value, after system upgrades.
     */
    modifiedAntiair?: number;

    /** This property should not be present in the default ship data.
     * 
     * Represents the modified Siege Fire value, after system upgrades.
     */
    modifiedSiege?: number;
}

export interface AircraftSystem extends ShipSystem {
    type: "aircraft";
    img: "/weapons/icons/aircraft.png";
}

export interface ArmorSystem extends ShipSystem {
    type: "armor";
    img: "/weapons/icons/armor.png";

    /** Default HP value.
     * @readonly This property should not be modified.
     */
    readonly baseHp: number;

    /** Default Armor value.
     * @readonly This property should not be modified.
     */
    readonly baseArmor: number;
    
    /** Default Energy Shield value.
     * @readonly This property should not be modified.
     */
    readonly baseEnergyShield: number;

    /** This property should not be present in the default ship data.
     * 
     * Represents the modified HP value, after system upgrades.
     */
    modifiedHp?: number;

    /** This property should not be present in the default ship data.
     * 
     * Represents the modified Armor value, after system upgrades.
     */
    modifiedArmor?: number;

    /** This property should not be present in the default ship data.
     * 
     * Represents the modified Energy Shield value, after system upgrades.
     */
    modifiedEnergyShield?: number;
}

export interface PropulsionSystem extends ShipSystem {
    type: "propulsion";
    img: "/weapons/icons/speed.png";

    /** Default Cruise Speed value.
     * @readonly This property should not be modified.
     */
    readonly baseCruise: number;

    /** Default Warp Speed value.
     * @readonly This property should not be modified.
     */
    readonly baseWarp: number;

    /** Only found if this system provides an evasion bonus.
     * 
     * Represents the default Evasion value.
     * @readonly This property should not be modified. */
    readonly baseEvasion?: number;

    /** This property should not be present in the default ship data.
     * 
     * Represents the modified Crise Speed value, after system upgrades.
     */
    modifiedCruise?: number;

    /** This property should not be present in the default ship data.
     * 
     * Represents the modified Warp Speed value, after system upgrades.
     */
    modifiedWarp?: number;

    /** This property should not be present in the default ship data.
     * 
     * Represents the modified Evasion value, after system upgrades.
     */
    modifiedEvasion?: number;
}

export interface EnergySystem extends ShipSystem {
    type: "energy";
    img: "/weapons/icons/jamming.png";

    /** Only found if this system provides a damage bonus.
     * 
     * Represents the default damage bonus.
     * @example 1.15
     */
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
    readonly baseEvasion?: number;
    modifiedEvasion?: number;
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
