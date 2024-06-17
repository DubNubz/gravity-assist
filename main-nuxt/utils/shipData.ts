
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
"Increase Aircraft Hit Rate" | "Aircraft Recovery" | "Attack Against Systems";

export type Aircraft = "Small Fighter" | "Medium Fighter" | "Large Fighter" | "Corvette";

export type UAV = "Spotter UAV" | "Area-Denial Anti-Aircraft UAV" | "Shield UAV" | "Repair UAV" | "Tactical UAV" | "Info UAV" | 
"Cooperative Offensive UAV" | "Siege UAV";

export type Module = {
    type: "known";
    img: string;
    system: "M1" | "M2" | "M3" | "A1" | "A2" | "A3" | "B1" | "B2" | "B3" | "C1" | "C2" | "C3" | "D1" | "D2" | "D3" | "E1" | "E2";
    name: string;
    stats: WeaponStats | ArmorStats;
    subsystems: (WeaponSubsystem | AircraftHangerSubsystem | UavHangerSubsystem | MiscSubsystem)[];
}

export type UnknownModule = {
    type: "unknown";
    img: string;
    system: "M1" | "M2" | "M3" | "A1" | "A2" | "A3" | "B1" | "B2" | "B3" | "C1" | "C2" | "C3" | "D1" | "D2" | "D3" | "E1" | "E2";
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

export type Ship = {
    name: string;
    title: string;
    img: string;
    type: "Fighter" | "Corvette" | "Frigate" | "Destroyer" | "Cruiser" | "Battlecruiser" | "Auxiliary Ship" | "Carrier";
    variant: "A" | "B" | "C" | "D";
    variant_name: string;
    manufacturer: ShipManufacturer;
    direction: ShipDirection[];
    scope: ShipScope;
    weight: number;
    row: "Front" | "Middle" | "Back";
    modules?: (Module | UnknownModule)[];
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
    "Attack Against Systems": "Has a chance to deal damage to the target's systems (Primary Weapon System: Low efficiency)"
}

export const manufacturers: ShipManufacturer[] = ["Jupiter Industry", "NOMA Shipping", "Antonios", "Dawn Accord", "Empty"];
export const directions: ShipDirection[] = ["Outstanding Firepower", "Sustained Combat", "Strategy & Support", "Fighter & Corvette", "Empty"];
export const scopes: ShipScope[] = ["Projectile Weapon", "Direct-Fire Weapon", "Empty"];

export const shipData: Ship[] = [{
        name: "AT021",
        title: "Pulse Attacker",
        img: "/ships/at021_a.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Pulse Cannon Type",
        manufacturer: "Dawn Accord",
        direction: ["Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "AT021",
        title: "Tactical Attacker",
        img: "/ships/at021_b.png",
        type: "Fighter",
        variant: "B",
        variant_name: "Interference Type",
        manufacturer: "Dawn Accord",
        direction: ["Sustained Combat", "Strategy & Support", "Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "AT021",
        title: "Heavy Attacker",
        img: "/ships/at021_c.png",
        type: "Fighter",
        variant: "C",
        variant_name: "Multi-Role Type",
        manufacturer: "Dawn Accord",
        direction: ["Outstanding Firepower", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "B192 Newland",
        title: "Heavy Attacker",
        img: "/ships/b192newland.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Multi-Role Type",
        manufacturer: "Jupiter Industry",
        direction: ["Strategy & Support", "Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "BR050",
        title: "Standard Bomber",
        img: "/ships/br050_a.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Anti-Ship Type",
        manufacturer: "Dawn Accord",
        direction: ["Outstanding Firepower", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "BR050",
        title: "Multi-Role Bomber",
        img: "/ships/br050_b.png",
        type: "Fighter",
        variant: "B",
        variant_name: "Defense Type",
        manufacturer: "Dawn Accord",
        direction: ["Sustained Combat", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "BR050",
        title: "Torpedo Bomber",
        img: "/ships/br050_c.png",
        type: "Fighter",
        variant: "C",
        variant_name: "Torpedo Type",
        manufacturer: "Dawn Accord",
        direction: ["Outstanding Firepower", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Balancer Anderson SC020",
        title: "Scout",
        img: "/ships/sc020.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Interference Type",
        manufacturer: "Antonios",
        direction: ["Sustained Combat", "Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Bullfrog",
        title: "Dual-Purpose Bomber",
        img: "/ships/bullfrog.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Siege Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Hayreddin's Loyal",
        title: "Pulsar Fighter",
        img: "/ships/hayreddinsLoyal.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Special Type",
        manufacturer: "Empty",
        direction: ["Outstanding Firepower", "Sustained Combat", "Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Janbiya Aer410",
        title: "Assault Attacker",
        img: "/ships/janbiyaAer410.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Anti-Ship Type",
        manufacturer: "Jupiter Industry",
        direction: ["Strategy & Support", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Mistral",
        title: "Combat Attacker",
        img: "/ships/mistral.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Anti-Aircraft Type",
        manufacturer: "Antonios",
        direction: ["Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "SC002",
        title: "Quantum Scout",
        img: "/ships/sc002.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Generic Type",
        manufacturer: "Dawn Accord",
        direction: ["Sustained Combat", "Strategy & Support", "Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Sandrake",
        title: "Atmospheric Interceptor",
        img: "/ships/sandrake.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Dual-Purpose Type",
        manufacturer: "NOMA Shipping",
        direction: ["Strategy & Support", "Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Spore A404",
        title: "Light Fighter",
        img: "/ships/sporeA404.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Anti-Aircraft Type",
        manufacturer: "Jupiter Industry",
        direction: ["Strategy & Support", "Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Stingray",
        title: "Torpedo Bomber",
        img: "/ships/stingray.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Stealth Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower", "Sustained Combat", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Strix A100",
        title: "Joint Attacker",
        img: "/ships/strixA100.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Anti-Ship Type",
        manufacturer: "NOMA Shipping",
        direction: ["Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Vitas A021",
        title: "Heavy Attacker",
        img: "/ships/vitasA021.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Anti-Ship Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Vitas-B010",
        title: "Bomber",
        img: "/ships/vitasB010.png",
        type: "Fighter",
        variant: "A",
        variant_name: "Anti-Ship Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower", "Sustained Combat", "Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "CV-II003",
        title: "Light Corvette",
        img: "/ships/cvii003.png",
        type: "Corvette",
        variant: "A",
        variant_name: "Multi-Role Type",
        manufacturer: "Dawn Accord",
        direction: ["Strategy & Support", "Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "CV-M011",
        title: "Heavy Missile Corvette",
        img: "/ships/cvm011_a.png",
        type: "Corvette",
        variant: "A",
        variant_name: "Missile Type",
        manufacturer: "Dawn Accord",
        direction: ["Outstanding Firepower", "Sustained Combat", "Strategy & Support", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "CV-M011",
        title: "Heavy Cannon Corvette",
        img: "/ships/cvm011_b.png",
        type: "Corvette",
        variant: "B",
        variant_name: "Cannon Type",
        manufacturer: "Dawn Accord",
        direction: ["Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "CV-M011",
        title: "High-Speed Missile Corvette",
        img: "/ships/cvm011_c.png",
        type: "Corvette",
        variant: "C",
        variant_name: "High-Speed Type",
        manufacturer: "Dawn Accord",
        direction: ["Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "CV-T800",
        title: "Pulsar Corvette",
        img: "/ships/cvt800.png",
        type: "Corvette",
        variant: "A",
        variant_name: "Anti-Aircraft Type",
        manufacturer: "Dawn Accord",
        direction: ["Outstanding Firepower", "Strategy & Support", "Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Cellular Defender",
        title: "Heavy Torpedo Corvette",
        img: "/ships/cellularDefender.png",
        type: "Corvette",
        variant: "A",
        variant_name: "Multi-Role Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Nebula Chaser",
        title: "Heavy Corvette",
        img: "/ships/nebulaChaser_a.png",
        type: "Corvette",
        variant: "A",
        variant_name: "Ballistic Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower", "Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Nebula Chaser",
        title: "Pulsar Corvette",
        img: "/ships/nebulaChaser_b.png",
        type: "Corvette",
        variant: "B",
        variant_name: "Pulse Cannon Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower", "Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "RedBeast 7-13",
        title: "Missile Corvette",
        img: "/ships/redbeast713.png",
        type: "Corvette",
        variant: "A",
        variant_name: "Offensive Type",
        manufacturer: "NOMA Shipping",
        direction: ["Sustained Combat", "Strategy & Support", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "S-Levy 9",
        title: "Heavy Torpedo Escort Corvette",
        img: "/ships/slevy9.png",
        type: "Corvette",
        variant: "A",
        variant_name: "Anti-Ship Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower", "Sustained Combat", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Silent Assassin",
        title: "Armored Corvette",
        img: "/ships/silentAssassin.png",
        type: "Corvette",
        variant: "A",
        variant_name: "High-Speed Type",
        manufacturer: "NOMA Shipping",
        direction: ["Fighter & Corvette"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Void Elfin",
        title: "Stealth Missile Corvette",
        img: "/ships/voidElfin.png",
        type: "Corvette",
        variant: "A",
        variant_name: "Offensive Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower", "Sustained Combat", "Fighter & Corvette"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Carilion",
        title: "Recon Frigate",
        img: "/ships/carilion_a.png",
        type: "Frigate",
        variant: "A",
        variant_name: "Recon Type",
        manufacturer: "Antonios",
        direction: ["Sustained Combat", "Strategy & Support"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Carilion",
        title: "Heavy Cannon Frigate",
        img: "/ships/carilion_b.png",
        type: "Frigate",
        variant: "B",
        variant_name: "Heavy Cannon Type",
        manufacturer: "Antonios",
        direction: ["Strategy & Support"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Carilion",
        title: "Special Frigate",
        img: "/ships/carilion_c.png",
        type: "Frigate",
        variant: "C",
        variant_name: "Special Type",
        manufacturer: "Antonios",
        direction: ["Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "FG300",
        title: "Multi-Role Frigate",
        img: "/ships/fg300_a.png",
        type: "Frigate",
        variant: "A",
        variant_name: "Multi-Role Type",
        manufacturer: "Dawn Accord",
        direction: ["Strategy & Support"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "FG300",
        title: "Armored Frigate",
        img: "/ships/fg300_b.png",
        type: "Frigate",
        variant: "B",
        variant_name: "Armored Type",
        manufacturer: "Dawn Accord",
        direction: ["Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "FG300",
        title: "Recon Frigate",
        img: "/ships/fg300_c.png",
        type: "Frigate",
        variant: "C",
        variant_name: "Recon Type",
        manufacturer: "Dawn Accord",
        direction: ["Strategy & Support"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "Mare Imbrium",
        title: "Assault Frigate",
        img: "/ships/mareImbrium_a.png",
        type: "Frigate",
        variant: "A",
        variant_name: "Railgun Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Mare Imbrium",
        title: "Experimental Pulse Cannon Frigate",
        img: "/ships/mareImbrium_b.png",
        type: "Frigate",
        variant: "B",
        variant_name: "Pulse Cannon Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Middle",
    }, {
        name: "Mare Nubium",
        title: "Light Landing Ship",
        img: "/ships/mareNubium_a.png",
        type: "Frigate",
        variant: "A",
        variant_name: "Assault Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "Mare Nubium",
        title: "Anti-Aircraft Frigate",
        img: "/ships/mareNubium_b.png",
        type: "Frigate",
        variant: "B",
        variant_name: "Anti-Aircraft Type",
        manufacturer: "Jupiter Industry",
        direction: ["Empty"],
        scope: "Empty",
        weight: 10,
        row: "Middle",
    }, {
        name: "Mare Serenitatis",
        title: "Heavy Frigate",
        img: "/ships/mareSerenitatis_a.png",
        type: "Frigate",
        variant: "A",
        variant_name: "Anti-Ship Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Back",
    }, {
        name: "Mare Serenitatis",
        title: "Missile Frigate",
        img: "/ships/mareSerenitatis_b.png",
        type: "Frigate",
        variant: "B",
        variant_name: "Missile Type",
        manufacturer: "Jupiter Industry",
        direction: ["Sustained Combat"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Back",
    }, {
        name: "Mare Serenitatis",
        title: "Anti-Aircraft Frigate",
        img: "/ships/mareSerenitatis_c.png",
        type: "Frigate",
        variant: "C",
        variant_name: "Anti-Aircraft Type",
        manufacturer: "Jupiter Industry",
        direction: ["Sustained Combat"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Back",
    }, {
        name: "Mare Tranquillitatis",
        title: "Missile Frigate",
        img: "/ships/mareTranquillitatis_a.png",
        type: "Frigate",
        variant: "A",
        variant_name: "Integrated Type",
        manufacturer: "Jupiter Industry",
        direction: ["Strategy & Support"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "Mare Tranquillitatis",
        title: "Pulse Cannon Frigate",
        img: "/ships/mareTranquillitatis_b.png",
        type: "Frigate",
        variant: "B",
        variant_name: "Pulse Cannon Type",
        manufacturer: "Jupiter Industry",
        direction: ["Empty"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "Mare Tranquillitatis",
        title: "Interceptor Frigate",
        img: "/ships/mareTranquillitatis_c.png",
        type: "Frigate",
        variant: "C",
        variant_name: "Anti-Aircraft Type",
        manufacturer: "Jupiter Industry",
        direction: ["Strategy & Support"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "NOMA M470",
        title: "Heavy Landing Ship",
        img: "/ships/nomaM470_a.png",
        type: "Frigate",
        variant: "A",
        variant_name: "Siege Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "NOMA M470",
        title: "Support Frigate",
        img: "/ships/nomaM470_b.png",
        type: "Frigate",
        variant: "B",
        variant_name: "Support Type",
        manufacturer: "NOMA Shipping",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "NOMA M470",
        title: "Anti-Aircraft Frigate",
        img: "/ships/nomaM470_c.png",
        type: "Frigate",
        variant: "C",
        variant_name: "Anti-Aircraft Type",
        manufacturer: "NOMA Shipping",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "Reliat",
        title: "Rapid Torpedo Frigate",
        img: "/ships/reliat_a.png",
        type: "Frigate",
        variant: "A",
        variant_name: "Anti-Ship Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "Reliat",
        title: "Tactical Torpedo Frigate",
        img: "/ships/reliat_b.png",
        type: "Frigate",
        variant: "B",
        variant_name: "Torpedo Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "Reliat",
        title: "Stealth Frigate",
        img: "/ships/reliat_c.png",
        type: "Frigate",
        variant: "C",
        variant_name: "Stealth Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "Ruby",
        title: "Heavy Railgun Frigate",
        img: "/ships/ruby_a.png",
        type: "Frigate",
        variant: "A",
        variant_name: "Railgun Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Middle",
    }, {
        name: "Ruby",
        title: "Experimental Ion Cannon Frigate",
        img: "/ships/ruby_b.png",
        type: "Frigate",
        variant: "B",
        variant_name: "Ion Cannon Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Middle",
    }, {
        name: "Ruby",
        title: "Defensive Frigate",
        img: "/ships/ruby_c.png",
        type: "Frigate",
        variant: "C",
        variant_name: "Defensive Type",
        manufacturer: "NOMA Shipping",
        direction: ["Sustained Combat"],
        scope: "Projectile Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "XenoStinger",
        title: "Tactical Frigate",
        img: "/ships/xenostinger_a.png",
        type: "Frigate",
        variant: "A",
        variant_name: "Special Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower"],
        scope: "Empty",
        weight: 5,
        row: "Back",
    }, {
        name: "XenoStinger",
        title: "Defensive Frigate",
        img: "/ships/xenostinger_b.png",
        type: "Frigate",
        variant: "B",
        variant_name: "Anti-Aircraft Type",
        manufacturer: "NOMA Shipping",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 5,
        row: "Back",
    }, {
        name: "AC721",
        title: "Heavy Logistics Destroyer",
        img: "/ships/ac721_a.png",
        type: "Destroyer",
        variant: "A",
        variant_name: "Generic Type",
        manufacturer: "Dawn Accord",
        direction: ["Strategy & Support"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "AC721",
        title: "Heavy Missile Destroyer",
        img: "/ships/ac721_b.png",
        type: "Destroyer",
        variant: "B",
        variant_name: "Missile Type",
        manufacturer: "Dawn Accord",
        direction: ["Strategy & Support"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Back",
    }, {
        name: "AC721",
        title: "Heavy Dual-Purpose Assault Ship",
        img: "/ships/ac721_d.png",
        type: "Destroyer",
        variant: "D",
        variant_name: "Aircraft Type",
        manufacturer: "Dawn Accord",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "Aldabra",
        title: "Heavy Cannon Destroyer",
        img: "/ships/aldabra_a.png",
        type: "Destroyer",
        variant: "A",
        variant_name: "Generic Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Aldabra",
        title: "Heavy Assault Destroyer",
        img: "/ships/aldabra_b.png",
        type: "Destroyer",
        variant: "B",
        variant_name: "Armored Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Ceres",
        title: "Aircraft Destroyer",
        img: "/ships/ceres_a.png",
        type: "Destroyer",
        variant: "A",
        variant_name: "Aircraft Type",
        manufacturer: "Jupiter Industry",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "Ceres",
        title: "Support Destroyer",
        img: "/ships/ceres_b.png",
        type: "Destroyer",
        variant: "B",
        variant_name: "Support Type",
        manufacturer: "Jupiter Industry",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "Ceres",
        title: "Tactical Destroyer",
        img: "/ships/ceres_c.png",
        type: "Destroyer",
        variant: "C",
        variant_name: "Tactical Type",
        manufacturer: "Jupiter Industry",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "Eris I",
        title: "Maneuver Assault Destroyer",
        img: "/ships/eris_a.png",
        type: "Destroyer",
        variant: "A",
        variant_name: "Cannon Type",
        manufacturer: "Jupiter Industry",
        direction: ["Strategy & Support"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Eris I",
        title: "Heavy Cannon Destroyer",
        img: "/ships/eris_b.png",
        type: "Destroyer",
        variant: "B",
        variant_name: "Heavy Cannon Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Eris I",
        title: "Armored Destroyer",
        img: "/ships/eris_c.png",
        type: "Destroyer",
        variant: "C",
        variant_name: "Armored Type",
        manufacturer: "Jupiter Industry",
        direction: ["Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "Guardian",
        title: "Support Destroyer",
        img: "/ships/guardian_a.png",
        type: "Destroyer",
        variant: "A",
        variant_name: "Support Type",
        manufacturer: "Antonios",
        direction: ["Empty"],
        scope: "Projectile Weapon",
        weight: 5,
        row: "Middle",
    }, {
        name: "Guardian",
        title: "Dual-Purpose Assault Ship",
        img: "/ships/guardian_b.png",
        type: "Destroyer",
        variant: "B",
        variant_name: "Dual-Purpose Type",
        manufacturer: "Antonios",
        direction: ["Strategy & Support"],
        scope: "Projectile Weapon",
        weight: 5,
        row: "Back",
    }, {
        name: "Guardian",
        title: "Experimental Pulse Assault Ship",
        img: "/ships/guardian_c.png",
        type: "Destroyer",
        variant: "C",
        variant_name: "Pulse Cannon Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Quaoar",
        title: "Railgun Destroyer",
        img: "/ships/quaoar_a.png",
        type: "Destroyer",
        variant: "A",
        variant_name: "Railgun Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "Quaoar",
        title: "Torpedo Destroyer",
        img: "/ships/quaoar_b.png",
        type: "Destroyer",
        variant: "B",
        variant_name: "Torpedo Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "Taurus",
        title: "Pulse Cannon Destroyer",
        img: "/ships/taurus_a.png",
        type: "Destroyer",
        variant: "A",
        variant_name: "Offensive Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Taurus",
        title: "Assault Destroyer",
        img: "/ships/taurus_b.png",
        type: "Destroyer",
        variant: "B",
        variant_name: "Assault Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Taurus",
        title: "Defensive Destroyer",
        img: "/ships/taurus_c.png",
        type: "Destroyer",
        variant: "C",
        variant_name: "Defensive Type",
        manufacturer: "NOMA Shipping",
        direction: ["Sustained Combat", "Strategy & Support"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Tundra",
        title: "Tactical Destroyer",
        img: "/ships/tundra_a.png",
        type: "Destroyer",
        variant: "A",
        variant_name: "Support Type",
        manufacturer: "NOMA Shipping",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "Tundra",
        title: "Aircraft Destroyer",
        img: "/ships/tundra_b.png",
        type: "Destroyer",
        variant: "B",
        variant_name: "Aircraft Type",
        manufacturer: "NOMA Shipping",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "Winged Hussar",
        title: "Light Missile Destroyer",
        img: "/ships/wingedHussar_a.png",
        type: "Destroyer",
        variant: "A",
        variant_name: "Anti-Ship Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "Winged Hussar",
        title: "Integrated Missile Destroyer",
        img: "/ships/wingedHussar_b.png",
        type: "Destroyer",
        variant: "B",
        variant_name: "Integrated Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Back",
    }, {
        name: "Winged Hussar",
        title: "Area-Denial Anti-Aircraft Destroyer",
        img: "/ships/wingedHussar_c.png",
        type: "Destroyer",
        variant: "C",
        variant_name: "Anti-Aircraft Type",
        manufacturer: "Antonios",
        direction: ["Sustained Combat", "Strategy & Support"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "CAS066",
        title: "Generic Cruiser",
        img: "/ships/cas066_a.png",
        type: "Cruiser",
        variant: "A",
        variant_name: "Integrated Type",
        manufacturer: "Dawn Accord",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Front",
    }, {
        name: "CAS066",
        title: "Artillery Cruiser",
        img: "/ships/cas066_b.png",
        type: "Cruiser",
        variant: "B",
        variant_name: "Artillery Type",
        manufacturer: "Dawn Accord",
        direction: ["Outstanding Firepower"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "CAS066",
        title: "Aircraft Cruiser",
        img: "/ships/cas066_c.png",
        type: "Cruiser",
        variant: "C",
        variant_name: "Aircraft Type",
        manufacturer: "Dawn Accord",
        direction: ["Empty"],
        scope: "Empty",
        weight: 10,
        row: "Middle",
    }, {
        name: "CAS066",
        title: "Auxiliary Cruiser",
        img: "/ships/cas066_d.png",
        type: "Cruiser",
        variant: "D",
        variant_name: "Support Type",
        manufacturer: "Dawn Accord",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 10,
        row: "Middle",
    }, {
        name: "Callisto",
        title: "Cluster Torpedo Raid Ship",
        img: "/ships/callisto_a.png",
        type: "Cruiser",
        variant: "A",
        variant_name: "Torpedo Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower"],
        scope: "Projectile Weapon",
        weight: 2,
        row: "Back",
    }, {
        name: "Callisto",
        title: "Heavy Torpedo Raid Ship",
        img: "/ships/callisto_b.png",
        type: "Cruiser",
        variant: "B",
        variant_name: "Anti-Ship Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower"],
        scope: "Projectile Weapon",
        weight: 2,
        row: "Back",
    }, {
        name: "Callisto",
        title: "Heavy UAV Cruiser",
        img: "/ships/callisto_c.png",
        type: "Cruiser",
        variant: "C",
        variant_name: "Support Type",
        manufacturer: "Jupiter Industry",
        direction: ["Empty"],
        scope: "Projectile Weapon",
        weight: 2,
        row: "Back",
    }, {
        name: "Chimera",
        title: "Heavy Cruiser",
        img: "/ships/chimera_a.png",
        type: "Cruiser",
        variant: "A",
        variant_name: "Ballistic Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Chimera",
        title: "Cannon Cruiser",
        img: "/ships/chimera_b.png",
        type: "Cruiser",
        variant: "B",
        variant_name: "Heavy Cannon Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Chimera",
        title: "Defensive Cruiser",
        img: "/ships/chimera_c.png",
        type: "Cruiser",
        variant: "C",
        variant_name: "Defensive Type",
        manufacturer: "NOMA Shipping",
        direction: ["Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Middle",
    }, {
        name: "Conamara Chaos",
        title: "Railgun Cruiser",
        img: "/ships/conamaraChaos_a.png",
        type: "Cruiser",
        variant: "A",
        variant_name: "Railgun Type",
        manufacturer: "Jupiter Industry",
        direction: ["Strategy & Support"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Back",
    }, {
        name: "Conamara Chaos",
        title: "High-Speed Plasma Cruiser",
        img: "/ships/conamaraChaos_b.png",
        type: "Cruiser",
        variant: "B",
        variant_name: "Plasma Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Back",
    }, {
        name: "Io",
        title: "Assault Ion Cannon Cruiser",
        img: "/ships/io_a.png",
        type: "Cruiser",
        variant: "A",
        variant_name: "Ion Cannon Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Io",
        title: "High-Speed Ion Cannon Cruiser",
        img: "/ships/io_b.png",
        type: "Cruiser",
        variant: "B",
        variant_name: "Anti-Ship Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Io",
        title: "Siege Ion Cannon Cruiser",
        img: "/ships/io_c.png",
        type: "Cruiser",
        variant: "C",
        variant_name: "Siege Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Front",
    }, {
        name: "Jaeger",
        title: "Heavy Aircraft Cruiser",
        img: "/ships/jaeger_a.png",
        type: "Cruiser",
        variant: "A",
        variant_name: "Support Type",
        manufacturer: "Antonios",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 5,
        row: "Back",
    }, {
        name: "Jaeger",
        title: "Heavy Cannon Cruiser",
        img: "/ships/jaeger_b.png",
        type: "Cruiser",
        variant: "B",
        variant_name: "Anti-Ship Type",
        manufacturer: "Antonios",
        direction: ["Strategy & Support"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Back",
    }, {
        name: "KCCPV2.0",
        title: "Light Attack Cruiser",
        img: "/ships/kccpv_a.png",
        type: "Cruiser",
        variant: "A",
        variant_name: "Integrated Type",
        manufacturer: "Dawn Accord",
        direction: ["Outstanding Firepower", "Strategy & Support"],
        scope: "Projectile Weapon",
        weight: 10,
        row: "Back",
    }, {
        name: "KCCPV2.0",
        title: "Light Pulse Attack Cruiser",
        img: "/ships/kccpv_b.png",
        type: "Cruiser",
        variant: "B",
        variant_name: "Pulse Cannon Type",
        manufacturer: "Dawn Accord",
        direction: ["Outstanding Firepower"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "KCCPV2.0",
        title: "Light Railgun Cruiser",
        img: "/ships/kccpv_c.png",
        type: "Cruiser",
        variant: "C",
        variant_name: "Railgun Type",
        manufacturer: "Dawn Accord",
        direction: ["Empty"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Middle",
    }, {
        name: "KCCPV2.0",
        title: "Light Aircraft Cruiser",
        img: "/ships/kccpv_d.png",
        type: "Cruiser",
        variant: "D",
        variant_name: "Aircraft Type",
        manufacturer: "Dawn Accord",
        direction: ["Empty"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "Light Cone",
        title: "Multi-Role Missile Cruiser Cruiser",
        img: "/ships/lightCone_a.png",
        type: "Cruiser",
        variant: "A",
        variant_name: "Generic Type",
        manufacturer: "NOMA Shipping",
        direction: ["Empty"],
        scope: "Projectile Weapon",
        weight: 5,
        row: "Middle",
    }, {
        name: "Light Cone",
        title: "Area-Denial Anti-Aircraft Cruiser",
        img: "/ships/lightCone_b.png",
        type: "Cruiser",
        variant: "B",
        variant_name: "Anti-Aircraft Type",
        manufacturer: "NOMA Shipping",
        direction: ["Strategy & Support"],
        scope: "Projectile Weapon",
        weight: 5,
        row: "Middle",
    }, {
        name: "Light Cone",
        title: "Offensive Missile Cruiser",
        img: "/ships/lightCone_c.png",
        type: "Cruiser",
        variant: "C",
        variant_name: "Assault Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower"],
        scope: "Projectile Weapon",
        weight: 5,
        row: "Middle",
    }, {
        name: "Ranger",
        title: "Comprehensive Warfare Cruiser",
        img: "/ships/ranger_a.png",
        type: "Cruiser",
        variant: "A",
        variant_name: "Integrated Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower"],
        scope: "Direct-Fire Weapon",
        weight: 10,
        row: "Back",
    }, {
        name: "Ranger",
        title: "Heavy Ion Cannon Cruiser",
        img: "/ships/ranger_b.png",
        type: "Cruiser",
        variant: "B",
        variant_name: "Ion Cannon Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower"],
        scope: "Direct-Fire Weapon",
        weight: 2,
        row: "Back",
    }, {
        name: "Predator",
        title: "Aircraft Cruiser",
        img: "/ships/predator_a.png",
        type: "Cruiser",
        variant: "A",
        variant_name: "Generic Type",
        manufacturer: "Antonios",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "Predator",
        title: "Tactical Aircraft Cruiser",
        img: "/ships/predator_b.png",
        type: "Cruiser",
        variant: "B",
        variant_name: "Tactical Type",
        manufacturer: "Antonios",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "Predator",
        title: "Anti-Aircraft Cruiser",
        img: "/ships/predator_c.png",
        type: "Cruiser",
        variant: "C",
        variant_name: "Anti-Aircraft Type",
        manufacturer: "Antonios",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 10,
        row: "Back",
    }, {
        name: "Constantine the Great",
        title: "Multi-Role Battlecruiser",
        img: "/ships/constantineTheGreat.png",
        type: "Battlecruiser",
        variant: "A",
        variant_name: "Super Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower"],
        scope: "Direct-Fire Weapon",
        weight: 2,
        row: "Middle",
        modules: [{
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M1",
            name: `"Gamma Storm" Ion Attack System`,
            stats: {
                type: "weapon",
                antiship: 11917,
                antiair: 0,
                siege: 2502,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `CI-2x700T "Helium Flash"`,
                name: `Dual-Gun Super-Heavy Ion Turret`,
                damageType: "Energy",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 400,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M2",
            name: `"Gamma Storm" Projectile Attack System`,
            stats: {
                type: "weapon",
                antiship: 19885,
                antiair: 0,
                siege: 2784,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `CI-2x600T "Gamma Storm"`,
                name: `Energy Torpedo Launching System`,
                damageType: "Energy",
                target: "Large Ship",
                alpha: 1740,
                lockonEfficiency: 10,
                attributes: ["Crit"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A1",
            name: `"Gamma Storm" Projectile Weapon System`,
            stats: {
                type: "weapon",
                antiship: 24917,
                antiair: 0,
                siege: 2016,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `CM-8x608A "Gamma Storm"`,
                name: `Generic Missile Launching System`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 850,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A2",
            name: `"Gamma Storm" Projectile Weapon System`,
            stats: {
                type: "weapon",
                antiship: 40666,
                antiair: 1643,
                siege: 3138,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `CM-8x608 "Gamma Storm"`,
                name: `Pulse Energy Missile Launching System`,
                damageType: "Energy",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 945,
                attributes: null
            }, {
                type: "weapon",
                count: 2,
                title: "CM-12x550",
                name: `Dodeca-Fire Anti-Ship Missile System`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 437,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "B1",
            name: `Generic Battery System`,
            stats: {
                type: "weapon",
                antiship: 10628,
                antiair: 270,
                siege: 1461,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `CG-1350`,
                name: `350mm Dual-Cannon Anti-Ship Battery`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 250,
                attributes: null
            }, {
                type: "weapon",
                count: 4,
                title: `CG-1160B`,
                name: `Generic Cannon`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: null,
                alpha: 50,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "B2",
            name: `Pulse Anti-Aircraft System`,
            stats: {
                type: "weapon",
                antiship: 5175,
                antiair: 2040,
                siege: 0,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `CP-3x220`,
                name: `Triple-Fire Anti-Aircraft Pulse`,
                damageType: "Energy",
                target: "Aircraft",
                lockonEfficiency: 60,
                alpha: 40,
                attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
            }, {
                type: "weapon",
                count: 4,
                title: `CP-120`,
                name: `Anti-Missile Pulse Array`,
                damageType: "Energy",
                target: "Aircraft",
                lockonEfficiency: 60,
                alpha: 40,
                attributes: ["Interception Capability", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "B3",
            name: `Anti-Aircraft Missile System`,
            stats: {
                type: "weapon",
                antiship: 2400,
                antiair: 1548,
                siege: 0,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `MK2-CM-4x200B "Storm"`,
                name: `Missile Launcher Nest`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 60,
                alpha: 35,
                attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Cycle", "Anti-Aircraft Support"]
            }, {
                type: "weapon",
                count: 2,
                title: `CM-2x188B`,
                name: `Missile Launcher Array`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 60,
                alpha: 25,
                attributes: ["Interception Capability", "Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "C1",
            name: `Additional Energy System`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 15750
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `RIT-650`,
                name: `Energy Compression Device`,
                attributes: ["Increase Energy Weapon Damage"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "C2",
            name: `Aircraft Module`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 18000
            },
            subsystems: [{
                type: "hanger",
                count: 2,
                title: `CBF-200`,
                name: `Medium Hanger`,
                hanger: "Medium Fighter",
                capacity: 1,
                attributes: null
            }, {
                type: "misc",
                count: 1,
                title: `XAC-2000`,
                name: `Aviation Bridge`,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "C3",
            name: `Recon UAV System`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 18000
            },
            subsystems: [{
                type: "hanger",
                count: 3,
                title: "CIT-1",
                name: `Fire-Control Spotter UAV Hanger`,
                hanger: "Spotter UAV",
                capacity: 3,
                attributes: ["Ship Calibration Support"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "D1",
            name: `Short-Range Anti-Aircraft System`,
            stats: {
                type: "weapon",
                antiship: 0,
                antiair: 1011,
                siege: 0,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 4,
                title: `CM-2x45B`,
                name: `Short-Range Anti-Aircraft Missile`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 60,
                alpha: 40,
                attributes: ["Anti-Aircraft Critical Strike", "Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/armor.png",
            system: "D2",
            name: `Targeted Protection System`,
            stats: {
                type: "armor",
                armor: null,
                extraHP: null,
                energyShield: null,
                hp: 18000
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: "ASM-220",
                name: `Critical-System Reinforced Armor`,
                attributes: ["Reduce System Crit Damage Taken"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/storage.png",
            system: "D3",
            name: `Damage Control System`,
            stats: {
                type: "armor",
                armor: null,
                extraHP: null,
                energyShield: null,
                hpRecovery: 4800,
                hp: 15750
            },
            subsystems: [{
                type: "misc",
                count: 4,
                title: "AST-50",
                name: `Damage Monitoring System`,
                attributes: null
            }]
        }]
    }, {
        name: "Eternal Storm",
        title: "Attack Battlecruiser",
        img: "/ships/eternalStorm.png",
        type: "Battlecruiser",
        variant: "A",
        variant_name: "Super Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower"],
        scope: "Direct-Fire Weapon",
        weight: 2,
        row: "Middle",
        modules: [{
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M1",
            name: `"Viggen" Ion Generation System`,
            stats: {
                type: "weapon",
                antiship: 16000,
                antiair: 0,
                siege: 3360,
                hp: 18000
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `AI-900A "Viggen"`,
                name: `Ion Cannon`,
                damageType: "Energy",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 1200,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M2",
            name: `Experimental Plasma Caster`,
            stats: {
                type: "weapon",
                antiship: 15692,
                antiair: 1883, 
                siege: 2824,
                hp: 18000
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `AIM-850T`,
                name: `Plasma Caster`,
                damageType: "Energy",
                target: "Large Ship",
                lockonEfficiency: 10,
                alpha: 850,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A1",
            name: `"Eternal Polaris" Mk II Projectile Launching System`,
            stats: {
                type: "weapon",
                antiship: 12240,
                antiair: 396,
                siege: 1539,
                hp: 18000
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `MK3-AT-800A "Supernova-White"`,
                name: `Anti-Ship Torpedo`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 1600,
                attributes: null
            }, {
                type: "weapon",
                count: 2,
                title: `MK2-AM-8x300B "Eternal Polaris K"`,
                name: `Cluster Missile`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 55,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A2",
            name: `"Eternal Polaris" Mk II Projectile Launching System`,
            stats: {
                type: "weapon",
                antiship: 11900,
                antiair: 0,
                siege: 10440,
                hp: 18000
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `MK3-AT-750C "Supernova-White"`,
                name: `Siege Torpedo Launcher Array`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 1200,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A3",
            name: `"Eternal Polaris" Mk II Projectile Launching System TEST`,
            stats: {
                type: "weapon",
                antiship: 11345,
                antiair: 593,
                siege: 1440,
                hp: 18000
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `MK4-AT-1-800AT "Supernova-White"`,
                name: `Energy Torpedo`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 1600,
                attributes: null
            }, {
                type: "weapon",
                count: 2,
                title: `MK2-AM-16x150B "Eternal Polaris K"`,
                name: `Anti-Aircraft Missile Array`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 60,
                alpha: 40,
                attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "B1",
            name: `Generic Cannon Platform`,
            stats: {
                type: "weapon",
                antiship: 5850,
                antiair: 126,
                siege: 1113,
                hp: 18000
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `AG-2580`,
                name: `Dual-Cannon Heavy Battery`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 350,
                attributes: null
            }, {
                type: "weapon",
                count: 2,
                title: `AG-1120B`,
                name: `Rapid-Fire Cannon`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: null,
                alpha: 35,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "B2",
            name: `Generic Close-In Weapon System`,
            stats: {
                type: "weapon",
                antiship: 900,
                antiair: 405,
                siege: 60,
                hp: 18000
            },
            subsystems: [{
                type: "weapon",
                count: 4,
                title: `AG-1105B`,
                name: `Generic Cannon`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: null,
                alpha: 25,
                attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "C1",
            name: `NT UAV Anti-Aircraft System`,
            stats: {
                type: "weapon",
                antiship: 0,
                antiair: 3888,
                siege: 0,
                hp: 20250
            },
            subsystems: [{
                type: "hanger",
                count: 3,
                title: `NT-1`,
                name: `Anti-Aircraft UAV Rack`,
                hanger: "Area-Denial Anti-Aircraft UAV",
                capacity: 3,
                attributes: null,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: null,
                alpha: 15,
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "C2",
            name: `"Thunderstorm" UAV Shield System`,
            stats: {
                type: "armor",
                armor: null,
                extraHP: null,
                energyShield: null,
                hp: 20250
            },
            subsystems: [{
                type: "hanger",
                count: 2,
                title: `SNT-1`,
                name: `Shielded UAV Rack`,
                hanger: "Shield UAV",
                capacity: 2,
                attributes: [`Ship Shielding Support`]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "C3",
            name: `Energy Compensation Armor System`,
            stats: {
                type: "armor",
                armor: null,
                extraHP: null,
                energyShield: null,
                hp: 16200
            },
            subsystems: [{
                type: "misc",
                count: 2,
                title: `RIR-220`,
                name: `Experimental Energy Compensation Armor`,
                attributes: ["Energy Damage Reduction", "Physical Damage Reduction", "Crit Damage Reduction"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "D1",
            name: `Ion Turret System`,
            stats: {
                type: "weapon",
                antiship: 6857,
                antiair: 0,
                siege: 1028,
                hp: 18000
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `AI-450A`,
                name: `Experimental Ion Turret`,
                damageType: "Energy",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 800,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "D2",
            name: `Pulse Turret System`,
            stats: {
                type: "weapon",
                antiship: 0,
                antiair: 432,
                siege: 0,
                hp: 18000
            },
            subsystems: [{
                type: "weapon",
                count: 4,
                title: `AP-130B`,
                name: `Rapid-Fire Near-Defense Pulse Cannon`,
                damageType: "Energy",
                target: "Aircraft",
                lockonEfficiency: 60,
                alpha: 40,
                attributes: ["Interception Capability", "Anti-Aircraft Counterattack"]
            }]
        }]
    }, {
        name: "Spear of Uranus",
        title: "Heavy Battlecruiser",
        img: "/ships/spearOfUranus.png",
        type: "Battlecruiser",
        variant: "A",
        variant_name: "Super Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower", "Sustained Combat"],
        scope: "Direct-Fire Weapon",
        weight: 2,
        row: "Front",
        modules: [{
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M1",
            name: `Bow Railgun System`,
            stats: {
                type: "weapon",
                antiship: 12950,
                antiair: 0,
                siege: 11310,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `BR-1950C "Ruby"`,
                name: `Bow-Mounted Siege Railgun`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 2600,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M2",
            name: `Ion Turret System`,
            stats: {
                type: "weapon",
                antiship: 12857,
                antiair: 0,
                siege: 1800,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `BI-850`,
                name: `Dual-Fire Heavy Ion Turret`,
                damageType: "Energy",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 750,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A1",
            name: `"Fortress" Battery System A`,
            stats: {
                type: "weapon",
                antiship: 13120,
                antiair: 636,
                siege: 3075,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `BG-1850`,
                name: `Heavy Cannon`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 950,
                attributes: null
            }, {
                type: "weapon",
                count: 3,
                title: `BG-2240`,
                name: `Anti-Ship Cannon`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 100,
                attributes: ["Anti-Aircraft Counterattack"]
            }, {
                type: "weapon",
                count: 4,
                title: `BG-340B`,
                name: `Anti-Aircraft Cannon`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 45,
                alpha: 10,
                attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A2",
            name: `"Fortress" Battery System B`,
            stats: {
                type: "weapon",
                antiship: 15986,
                antiair: 216,
                siege: 2880,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 4,
                title: `BG-1950`,
                name: `Heavy Cannon`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 1200, 
                attributes: null
            }, {
                type: "weapon",
                count: 4,
                title: `BG-340B`,
                name: `Anti-Aircraft Cannon`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 45,
                alpha: 10,
                attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A3",
            name: `"Fortress" Battery System F`,
            stats: {
                type: "weapon",
                antiship: 17220,
                antiair: 1026,
                siege: 1800,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 6,
                title: `BG-2350`,
                name: `Anti-Ship Cannon`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 200,
                attributes: ["Anti-Aircraft Counterattack"]
            }, {
                type: "weapon",
                count: 4,
                title: `BG-340B`,
                name: `Anti-Aircraft Cannon`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 45,
                alpha: 10,
                attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "B1",
            name: `"Minecart" Projectile Launching Array`,
            stats: {
                type: "weapon",
                antiship: 5940,
                antiair: 680,
                siege: 259,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 3,
                title: `BM-12x250`,
                name: `Generic Missile Launching Array`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: null,
                alpha: 120,
                attributes: ["Interception Capability", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "B2",
            name: `Corvette Dock`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 23850
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CBC-2300`,
                name: `Corvette Mounting Dock`,
                hanger: "Corvette",
                capacity: 3,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/storage.png",
            system: "B3",
            name: `Integrated Damage Control System`,
            stats: {
                type: "armor",
                armor: null,
                extraHP: null,
                energyShield: null,
                hpRecovery: 5454,
                hp: 19800
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CRT-3`,
                name: `Engineering UAV Maintenance Pod`,
                hanger: "Repair UAV",
                capacity: 2,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "C1",
            name: `Distributed Weapon Control System`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 18000
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `XI-1200`,
                name: "Distributed Fire Control Radar",
                attributes: ["Increase Hit Rate"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/armor.png",
            system: "C2",
            name: `Additional Armor System`,
            stats: {
                type: "armor",
                armor: 0,
                extraHP: 32484,
                energyShield: 0,
                hp: 27000
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `ASX-150`,
                name: "Energized Nano Armor",
                attributes: ["Additional HP Auto-Repair"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "C3",
            name: `Anti-Missile System`,
            stats: {
                type: "weapon",
                antiship: 0,
                antiair: 410,
                siege: 0,
                hp: 19800
            },
            subsystems: [{
                type: "weapon",
                count: 3,
                title: `BG-625C`,
                name: `Area Anti-Missile Cannon`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: null,
                alpha: 10,
                attributes: ["Interception Capability (Fleet)", "Anti-Aircraft Special Ammo", "Anti-Aircraft Support"]
            }]
        }]
    }, {
        name: "ST59",
        title: "Defensive Battlecruiser",
        img: "/ships/st59.png",
        type: "Battlecruiser",
        variant: "A",
        variant_name: "Super Type",
        manufacturer: "Dawn Accord",
        direction: ["Sustained Combat", "Strategy & Support"],
        scope: "Direct-Fire Weapon",
        weight: 5,
        row: "Middle",
        modules: [{
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M1",
            name: "Assault Railgun System",
            stats: {
                type: "weapon",
                antiship: 10875,
                antiair: 0,
                siege: 3528,
                hp: 15750
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `SR-2600`,
                name: `Heavy Railgun`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 735,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M2",
            name: `Bow Mounted Battery System`,
            stats: {
                type: "weapon",
                antiship: 11400,
                antiair: 0,
                siege: 960,
                hp: 15750
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `SG-2400`,
                name: `Dual-Cannon Rapid-Fire Battery`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 200,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M3",
            name: `Assault Torpedo System`,
            stats: {
                type: "weapon",
                antiship: 11200,
                antiair: 0,
                siege: 2266,
                hp: 15750
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `ST-2600`,
                name: `Heavy Torpedo Launcher`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 850,
                attributes: ["Crit"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A1",
            name: `Large Cannon Platform`,
            stats: {
                type: "weapon",
                antiship: 7875,
                antiair: 216,
                siege: 1206,
                hp: 15750
            },
            subsystems: [{
                type: "weapon",
                count: 3,
                title: `MK4-SG-2580 "Thunderbolt"`,
                name: `Dual-Cannon Heavy Battery`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 280,
                attributes: null
            }, {
                type: "weapon",
                count: 4,
                title: `SG-1120`,
                name: `Generic Cannon`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 40,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A2",
            name: `Railgun Turret Array`,
            stats: {
                type: "weapon",
                antiship: 9900,
                antiair: 0,
                siege: 1923,
                hp: 15750
            },
            subsystems: [{
                type: "weapon",
                count: 3,
                title: `SR-1425`,
                name: `Railgun Turret`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 450,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A3",
            name: `Pulse Turret Array`,
            stats: {
                type: "weapon",
                antiship: 7500,
                antiair: 787,
                siege: 1200,
                hp: 15750
            },
            subsystems: [{
                type: "weapon",
                count: 3,
                title: `SP-430`,
                name: `Pulse Turret`,
                damageType: "Energy",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 250,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "B1",
            name: `Integrated Projectile Weapon Platform`,
            stats: {
                type: "weapon",
                antiship: 8188,
                antiair: 0,
                siege: 1185,
                hp: 15750
            },
            subsystems: [{
                type: "weapon",
                count: 4,
                title: `K-ST-12-255A`,
                name: `3x4 Cluster Torpedo Launching System`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 300,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "B2",
            name: `Aircraft System`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 15300
            },
            subsystems: [{
                type: "hanger",
                count: 2,
                title: `CBF-305`,
                name: "Medium Hanger",
                hanger: "Medium Fighter",
                capacity: 2,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "B3",
            name: `Area Fire-Control System`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 15300
            },
            subsystems: [{
                type: "hanger",
                count: 2,
                title: `CIT-1`,
                name: `Fire-Control Spotter UAV Hanger`,
                hanger: "Spotter UAV",
                capacity: 3,
                attributes: ["Ship Calibration Support"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/armor.png",
            system: "C1",
            name: `Additional Armor System`,
            stats: {
                type: "armor",
                armor: 0,
                extraHP: 27302,
                energyShield: 0,
                hp: 15750
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `ASX-100`,
                name: "Additional Armor",
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/armor.png",
            system: "C2",
            name: `EM Armor System`,
            stats: {
                type: "armor",
                armor: 0,
                extraHP: 0,
                energyShield: 20,
                hp: 15750
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `AEX-120`,
                name: "EM Armor",
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/armor.png",
            system: "C3",
            name: "Heavy Defensive Armor System",
            stats: {
                type: "armor",
                armor: 250,
                extraHP: 0,
                energyShield: 0,
                hp: 15750
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `ASX-130`,
                name: "Additional Armor",
                attributes: ["Reduce Evasion", "Reduce Hit Rate"]
            }]
        }]
    }, {
        name: "Thunderbolt Star",
        title: "Multi-Role Arsenal Ship",
        img: "/ships/thunderboltStar.png",
        type: "Battlecruiser",
        variant: "A",
        variant_name: "Super Type",
        manufacturer: "Empty",
        direction: ["Outstanding Firepower", "Strategy & Support"],
        scope: "Direct-Fire Weapon",
        weight: 2,
        row: "Middle",
        modules: [{
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M1",
            name: `"Thunderbolt" Bow-Mounted Weapon System`,
            stats: {
                type: "weapon",
                antiship: 40628,
                antiair: 0,
                siege: 8562,
                hp: 23400
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `HR-1850`,
                name: `Long-Rail Railgun`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 2775,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M2",
            name: `"Thunderbolt" Bow-Mounted Projectile Weapon System`,
            stats: {
                type: "weapon",
                antiship: 27168,
                antiair: 0,
                siege: 5705,
                hp: 23400
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `HT-1-850`,
                name: "High Energy Torpedo Launcher",
                damageType: "Energy",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 2070,
                attributes: ["Crit"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M3",
            name: `"Thunderbolt Star" Bow-Mounted High-Energy Weapon System`,
            stats: {
                type: "weapon",
                antiship: 33120,
                antiair: 0,
                siege: 3312,
                hp: 23400
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `HT-1250T`,
                name: `Experimental Super High-Energy Ion Cannon`,
                damageType: "Energy",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 2760,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A1",
            name: `Rapid-Fire Anti-Ship Weapon System`,
            stats: {
                type: "weapon",
                antiship: 12636,
                antiair: 1266,
                siege: 1407,
                hp: 23400
            },
            subsystems: [{
                type: "weapon",
                count: 4,
                title: `HG-1220`,
                name: "Rapid-Fire Artillery Array",
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 97,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A2",
            name: `Medium Anti-Ship Weapon System`,
            stats: {
                type: "weapon",
                antiship: 14184,
                antiair: 0,
                siege: 1490,
                hp: 23400
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `HG-2280`,
                name: "Dual-Cannon Stationary Heavy Battery",
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 207,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "B1",
            name: "Active Anti-Aircraft System",
            stats: {
                type: "weapon",
                antiship: 3375,
                antiair: 465,
                siege: 0,
                hp: 23400
            },
            subsystems: [{
                type: "weapon",
                count: 4,
                title: `HM-4x60B`,
                name: "Mid-Range Anti-Aircraft Missile Array",
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 60,
                alpha: 28,
                attributes: ["Anti-Aircraft Support"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "B2",
            name: "Range Interception System",
            stats: {
                type: "weapon",
                antiship: 0,
                antiair: 345,
                siege: 0,
                hp: 23400
            },
            subsystems: [{
                type: "weapon",
                count: 4,
                title: `HP-100B`,
                name: "Anti-Aircraft Pulse Array",
                damageType: "Energy",
                target: "Aircraft",
                lockonEfficiency: 60,
                alpha: 28,
                attributes: ["Interception Capability", "Anti-Aircraft Support"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "C1",
            name: "Weapon Coordination Center",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 23400
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `HNI-260`,
                name: "Weapon Activation Device",
                attributes: ["Oscillatory Excitation"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "C2",
            name: "Fire-Control Calibration System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 23400
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `HNA-240`,
                name: "Real-Time Target Callibration Module",
                attributes: ["Collaborative Calibration"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "D1",
            name: "Accurate Projectile Weapon System",
            stats: {
                type: "weapon",
                antiship: 9140,
                antiair: 1164,
                siege: 970,
                hp: 23400
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `HM-1x220A`,
                name: "Mid-Range Anti-Ship Missile",
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 172,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "D2",
            name: "Large Projectile Weapon System",
            stats: {
                type: "weapon",
                antiship: 9948,
                antiair: 0,
                siege: 2112,
                hp: 23400
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `HT-1-450`,
                name: "Large Torpedo Launcher",
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 631,
                attributes: ["Crit"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "E1",
            name: "Multi-Target Weapon System",
            stats: {
                type: "weapon",
                antiship: 6990,
                antiair: 910,
                siege: 759,
                hp: 23400
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `HG-1220A`,
                name: "Multi-Target Anti-Ship Battery",
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 126,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "E2",
            name: "Multi-Target Anti-Aircraft System",
            stats: {
                type: "weapon",
                antiship: 0,
                antiair: 633,
                siege: 0,
                hp: 23400
            },
            subsystems: [{
                type: "weapon",
                count: 3,
                title: `HG-1120B`,
                name: "Multi-Target Anti-Aircraft Turret",
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 60,
                alpha: 40,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }]
    }, {
        name: "Ediacaran",
        title: "Heavy Firepower Auxiliary Ship",
        img: "/ships/ediacaran.png",
        type: "Auxiliary Ship",
        variant: "A",
        variant_name: "Super Type",
        manufacturer: "NOMA Shipping",
        direction: ["Outstanding Firepower", "Strategy & Support"],
        scope: "Empty",
        weight: 2,
        row: "Middle",
        modules: [{
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M1",
            name: "Fortress Bow-Mounted Heavy Cannon System",
            stats: {
                type: "weapon",
                antiship: 11057,
                antiair: 394,
                siege: 1756,
                hp: 18900
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `"Fortress" MK4-BG-2560`,
                name: `Dual-Cannon Heavy Bow Battery`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 650,
                attributes: null
            }, {
                type: "weapon",
                count: 2,
                title: `BG-1260`,
                name: `Anti-Ship Turret`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 105,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M2",
            name: `Fortress Assault Railgun System`,
            stats: {
                type: "weapon",
                antiship: 12000,
                antiair: 319,
                siege: 3150,
                hp: 18900
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `"Fortress" MK4-BG-1850A`,
                name: `Bow-Mounted Assault Heavy Railgun`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 2250,
                attributes: ["Crit"]
            }, {
                type: "weapon",
                count: 2,
                title: `BM-2x280B`,
                name: `Anti-Aircraft Missile Launcher Array`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 45,
                alpha: 25,
                attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "A1",
            name: "Frigates Production System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 18800
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `MF-2500`,
                name: "Frigates Independent Production Facility",
                attributes: ["Self-holding Capability"]
            }, {
                type: "misc",
                count: 1,
                title: `BMP-60`,
                name: "Production Line Modification Module",
                attributes: ["Increase Production Speed"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "A2",
            name: "Corvette Production System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 19800
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `MC-2500`,
                name: "Corvette Independent Production Facility",
                attributes: null
            }, {
                type: "misc",
                count: 1,
                title: `BMP-60`,
                name: "Production Line Modification Module",
                attributes: ["Increase Production Speed"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "A3",
            name: "Destroyer Production System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 18800
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `MD-2500`,
                name: "Destroyer Independent Production Facility",
                attributes: ["Self-holding Capability"]
            }, {
                type: "misc",
                count: 1,
                title: `BMP-60`,
                name: "Production Line Modification Module",
                attributes: ["Increase Production Speed"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "B1",
            name: `"Tundra" Interceptor UAV System`,
            stats: {
                type: "weapon",
                antiship: 0,
                antiair: 4608,
                siege: 0,
                hp: 19350
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CAT/R-6`,
                name: `Area-Denial Anti-Aircraft UAV Pod`,
                hanger: "Area-Denial Anti-Aircraft UAV",
                capacity: 4,
                attributes: ["Anti-Aircraft Counterattack"],
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: null,
                alpha: 15
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "B2",
            name: `Aircraft Loading System`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 19350
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CBF-200`,
                name: "Large Aircraft Hanger",
                hanger: "Large Fighter",
                capacity: 2,
                attributes: null
            }]
        }, {
            type: "unknown",
            img: "/weapons/icons/unknown.png",
            system: "B3",
            unknown: true
        }, {
            type: "unknown",
            img: "/weapons/icons/unknown.png",
            system: "C1",
            unknown: true
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "C2",
            name: `Corvette Dock`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 19350
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CBC-2000`,
                name: "Corvette Dock",
                hanger: "Corvette",
                capacity: 3,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/armor.png",
            system: "D1",
            name: `Heavy Additional Armor System`,
            stats: {
                type: "armor",
                armor: 80,
                extraHP: 30069,
                energyShield: 0,
                hp: 18000
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `ASX-90`,
                name: "Heavy Additional Armor",
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/storage.png",
            system: "D2",
            name: `Nano Automated Maintenance System`,
            stats: {
                type: "armor",
                armor: null,
                extraHP: null,
                energyShield: null,
                hpRecovery: 5169,
                hp: 18000
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `BST-300`,
                name: `Nano Repair System`,
                attributes: null
            }]
        }]
    }, {
        name: "FSV830",
        title: "Fast Tactical Auxiliary Ship",
        img: "/ships/fsv830.png",
        type: "Auxiliary Ship",
        variant: "A",
        variant_name: "Super Type",
        manufacturer: "Dawn Accord",
        direction: ["Sustained Combat", "Strategy & Support"],
        scope: "Empty",
        weight: 5,
        row: "Back",
        modules: [{
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "A1",
            name: "Frigates Production System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 21500
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `XE-1250AM`,
                name: "Frigates Independent Production Facility",
                attributes: ["Self-holding Capability"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "A2",
            name: "Corvette Production System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 21500
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `XE-1250AG`,
                name: "Corvette Independent Build Facility",
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "A3",
            name: "Fighter Production System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 21500
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `MFG-1500`,
                name: "Fighter Independent Production Facility",
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "B1",
            name: "Warning and Control System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 22000
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `XE-1250AW`,
                name: "Situational Awareness System",
                attributes: ["Back-Row Torpedo Hit Evasion", "Back-Row Missile Hit Evasion"]
            }, {
                type: "misc",
                count: 1,
                title: `XC-4500`,
                name: "Bridge",
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "B2",
            name: "Coordinate Command System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 22000
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `XCE-1250AI`,
                name: "Assisted Lock-On Radar",
                attributes: [`Increase Back-Row Missile Hit Rate`, `Increase Back-Row Torpedo Hit Rate`]
            }, {
                type: "misc",
                count: 1,
                title: `XC-4500`,
                name: "Bridge",
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "B3",
            name: "Camoflage System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 22000
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `XS-1250AC`,
                name: "Field Signal Disguise Module",
                attributes: [`Ship Disguise`]
            }, {
                type: "misc",
                count: 1,
                title: `XC-4500`,
                name: "Bridge",
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "C1",
            name: "Engineering Maintenance System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 22000
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `BSR-200`,
                name: "Quick Repair Device",
                attributes: ["Increase Repair Speed"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/storage.png",
            system: "C2",
            name: "Strategic Resource Storage System",
            stats: {
                type: "armor",
                armor: null,
                extraHP: null,
                energyShield: null,
                storage: 60000,
                hp: 22000
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `W-500`,
                name: "Loading Platform",
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "D1",
            name: "Aircraft System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 21500
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CBF-255`,
                name: "Medium Hanger",
                hanger: "Medium Fighter",
                capacity: 2,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/storage.png",
            system: "D2",
            name: "Repair UAV System",
            stats: {
                type: "armor",
                armor: null,
                extraHP: null,
                energyShield: null,
                hpRecovery: 5454,
                hp: 21500
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CRT-3`,
                name: "Engineering UAV Maintenance Pod",
                hanger: "Repair UAV",
                capacity: 2,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "E1",
            name: "Area-Defense System",
            stats: {
                type: "weapon",
                antiship: 0,
                antiair: 882,
                siege: 0,
                hp: 22000
            },
            subsystems: [{
                type: "weapon",
                count: 3,
                title: `SM-4x40B`,
                name: "Anti-Arcraft Missile Silo",
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 45,
                alpha: 35,
                attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Support"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "E2",
            name: "Corvette Dock",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 21500
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CBC-2000`,
                name: "Corvette Dock",
                hanger: "Corvette",
                capacity: 3,
                attributes: null
            }]
        }]
    }, {
        name: "CV3000",
        title: "High-Speed Carrier",
        img: "/ships/cv3000.png",
        type: "Carrier",
        variant: "A",
        variant_name: "Super Type",
        manufacturer: "Dawn Accord",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 2,
        row: "Back",
        modules: [{
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "M1",
            name: "Integrated Aircraft Hanger",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 23850
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CFB-605`,
                name: "Large Aircraft Hanger",
                hanger: "Large Fighter",
                capacity: 5,
                attributes: null
            }, {
                type: "hanger",
                count: 1,
                title: `CBC-2100`,
                name: "Corvette Dock",
                hanger: "Corvette",
                capacity: 3,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "M2",
            name: "Integrated Aircraft System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 23850
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CFB-605`,
                name: "Large Aircraft Hanger",
                hanger: "Large Fighter",
                capacity: 5,
                attributes: null
            }, {
                type: "hanger",
                count: 1,
                title: `CIT-5`,
                name: "Field Support UAV Hanger",
                hanger: "Tactical UAV",
                capacity: 5,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 27,
                attributes: ["Attack Against Systems"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "M3",
            name: "Large Aircraft System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 23850
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CFB-605`,
                name: "Large Aircraft Hanger",
                hanger: "Large Fighter",
                capacity: 5,
                attributes: null
            }, {
                type: "hanger",
                count: 1,
                title: `CFB-400`,
                name: "Aircraft Hanger",
                hanger: "Large Fighter",
                capacity: 3,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A1",
            name: `"Dragoon" Battery System`,
            stats: {
                type: "weapon",
                antiship: 6500,
                antiair: 297,
                siege: 619,
                hp: 25200
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `MK4-C/SG-3480A "Dragoon"`,
                name: `Triple-Cannon Heavy Battery`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 200,
                attributes: null
            }, {
                type: "weapon",
                count: 4,
                title: `C/SG-190B "Dragoon"`,
                name: `Generic Rapid-Fire Cannon`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: null,
                alpha: 55,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A2",
            name: `Anti-Aircraft Missile Platform`,
            stats: {
                type: "weapon",
                antiship: 2868,
                antiair: 372,
                siege: 0,
                hp: 25200
            },
            subsystems: [{
                type: "weapon",
                count: 3,
                title: `Bm-12x180T`,
                name: `Missile Defense System`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 60,
                alpha: 52,
                attributes: ["Interception Capability", "Anti-Aircraft Support"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "B1",
            name: `Missile Defense System`,
            stats: {
                type: "weapon",
                antiship: 1200,
                antiair: 210,
                siege: 70,
                hp: 25200
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `MK3-SM-6x400B/C "Starfire"`,
                name: `Missile Launcher Array`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: null,
                alpha: 70,
                attributes: ["Interception Capability", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "B2",
            name: `Corvette Loading System`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 23850
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CBC-2100`,
                name: "Corvette Dock",
                hanger: "Corvette",
                capacity: 3,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "B3",
            name: `Info UAV Support Platform`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 23850
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CITA-2`,
                name: "Field Support UAV Pod",
                hanger: "Info UAV",
                capacity: 3,
                attributes: ["Ship Calibration Support"]
            }]
        }]
    }, {
        name: "Eternal Heavens",
        title: "UAV Carrier",
        img: "/ships/eternalHeavens.png",
        type: "Carrier",
        variant: "A",
        variant_name: "Super Type",
        manufacturer: "Jupiter Industry",
        direction: ["Outstanding Firepower"],
        scope: "Empty",
        weight: 2,
        row: "Back",
        modules: [{
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "M1",
            name: "Collaborative Hanger I",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 24500
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CBF-280`,
                name: "Medium Fighter Hanger",
                hanger: "Medium Fighter",
                capacity: 3,
                attributes: null
            }, {
                type: "hanger",
                count: 3,
                title: `"Decomposer"`,
                name: "Cooperative Offensive UAV Platform",
                hanger: "Cooperative Offensive UAV",
                capacity: 3,
                damageType: "Energy",
                target: "Aircraft",
                lockonEfficiency: null,
                alpha: 140,
                attributes: ["Anti-Aircraft Lightweight Ammo"]
            }]
        }, {
            type: "unknown",
            img: "/weapons/icons/unknown.png",
            system: "M2",
            unknown: true
        }, {
            type: "unknown",
            img: "/weapons/icons/unknown.png",
            system: "M3",
            unknown: true
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A1",
            name: `Integrated Battery System`,
            stats: {
                type: "weapon",
                antiship: 10250,
                antiair: 472,
                siege: 3815,
                hp: 26000
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `AG-3400A`,
                name: `Triple-Fire Heavy Turret`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 320,
                attributes: null
            }, {
                type: "weapon",
                count: 3,
                title: `AG-2208A`,
                name: `Dual-Cannon Anti-Ship Battery`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 100,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A2",
            name: `Experimental Ion Cannon System`,
            stats: {
                type: "weapon",
                antiship: 8857,
                antiair: 252,
                siege: 828,
                hp: 26000
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `AI-450T`,
                name: `Experimental Ion Turret`,
                damageType: "Energy",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 400,
                attributes: null
            }, {
                type: "weapon",
                count: 4,
                title: `AG-290`,
                name: `Generic Dual-Cannon Battery`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 45,
                alpha: 35,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/unknown.png",
            system: "A3",
            name: `Pulse Anti-Aircraft System`,
            stats: {
                type: "weapon",
                antiship: 3600,
                antiair: 1370,
                siege: 0,
                hp: 26000
            },
            subsystems: [{
                type: "weapon",
                count: 3,
                title: `AP-2x180`,
                name: "Dual-Fire Pulse Cannon",
                damageType: "Energy",
                target: "Aircraft",
                lockonEfficiency: 45,
                alpha: 40,
                attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
            }, {
                type: "weapon",
                count: 3,
                title: `AP-140B`,
                name: "Rapid-Fire Anti-Aircraft Pulse Cannon",
                damageType: "Energy",
                target: "Aircraft",
                lockonEfficiency: 45,
                alpha: 20,
                attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "B1",
            name: `Anti-Ship Projectile Launching System`,
            stats: {
                type: "weapon",
                antiship: 5640,
                antiair: 0,
                siege: 882,
                hp: 26000
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `AM-2x450`,
                name: `Dual-Fire Anti-Ship Missile Launcher`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 350,
                attributes: null
            }, {
                type: "weapon",
                count: 4,
                title: `AM-250`,
                name: `Light Missile Launcher`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 140,
                attributes: null
            }]
        }, {
            type: "unknown",
            img: "/weapons/icons/unknown.png",
            system: "B2",
            unknown: true
        }, {
            type: "unknown",
            img: "/weapons/icons/unknown.png",
            system: "B3",
            unknown: true
        }, {
            type: "unknown",
            img: "/weapons/icons/unknown.png",
            system: "C1",
            unknown: true
        }, {
            type: "unknown",
            img: "/weapons/icons/unknown.png",
            system: "C2",
            unknown: true
        }, {
            type: "unknown",
            img: "/weapons/icons/unknown.png",
            system: "C3",
            unknown: true
        }]
    }, {
        name: "Marshal Crux",
        title: "Carrier",
        img: "/ships/marshalCrux.png",
        type: "Carrier",
        variant: "A",
        variant_name: "Super Type",
        manufacturer: "Antonios",
        direction: ["Outstanding Firepower", "Strategy & Support"],
        scope: "Direct-Fire Weapon",
        weight: 2,
        row: "Back",
        modules: [{
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M1",
            name: `"White Flashing" Integrated Armory`,
            stats: {
                type: "weapon",
                antiship: 16080,
                antiair: 691,
                siege: 1908,
                hp: 28800
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `CI-600T`,
                name: `Heavy Ion Turret`,
                damageType: "Energy",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 450,
                attributes: null
            }, {
                type: "weapon",
                count: 2,
                title: `CG-2220`,
                name: `Generic Dual-Cannon Battery`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 120,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "M2",
            name: `"White Flashing" Integrated Armory`,
            stats: {
                type: "weapon",
                antiship: 13628,
                antiair: 162,
                siege: 2275,
                hp: 28800
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `CR-1650`,
                name: `Railgun`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 1000,
                attributes: null
            }, {
                type: "weapon",
                count: 6,
                title: `CG-1105B`,
                name: `Generic Cannon`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: null,
                alpha: 20,
                attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "A1",
            name: `Integrated Aircraft Hanger`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 25200
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CFB-700`,
                name: "Large Aircraft Hanger",
                hanger: "Large Fighter",
                capacity: 6,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "A2",
            name: `Corvette Dock`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 25200
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CBC-3200`,
                name: "Corvette Dock",
                hanger: "Corvette",
                capacity: 6,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "B1",
            name: `Additional Energy System`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 27000
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `RET-200`,
                name: "Energy Amplification Device",
                attributes: ["Increase Aircraft Damage"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "B2",
            name: `Fire-Control Auxiliary Calibration System`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 27000
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `XGC-200`,
                name: "Precision Guidance System",
                attributes: ["Increase Aircraft Hit Rate"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "C1",
            name: `Additional Aircraft System`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 25200
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CBF-200`,
                name: "Medium Hanger",
                hanger: "Medium Fighter",
                capacity: 4,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "C2",
            name: `Missile Defense System`,
            stats: {
                type: "weapon",
                antiship: 5200,
                antiair: 504,
                siege: 392,
                hp: 28800
            },
            subsystems: [{
                type: "weapon",
                count: 4,
                title: `MK2-CM-4x250A "Storm"`,
                name: `Missile Launcher Nest`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 140,
                attributes: ["Anti-Aircraft Support"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "C3",
            name: `Recon UAV System`,
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 25200
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: "CIT-3",
                name: `Fire-Control Spotter UAV Hanger`,
                hanger: "Spotter UAV",
                capacity: 3,
                attributes: ["Ship Calibration Support"]
            }]
        }]
    }, {
        name: "Solar Whale",
        title: "Armed Tactical Carrier",
        img: "/ships/solarWhale.png",
        type: "Carrier",
        variant: "A",
        variant_name: "Super Type",
        manufacturer: "NOMA Shipping",
        direction: ["Strategy & Support"],
        scope: "Empty",
        weight: 2,
        row: "Middle",
        modules: [{
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "M1",
            name: "Corvette Dock",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 24750
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CBC-3200`,
                name: "Corvette Dock",
                hanger: "Corvette",
                capacity: 6,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "M2",
            name: "Large Aircraft System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 24750
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CFB-1200`,
                name: "Large Aircraft Hanger",
                hanger: "Large Fighter",
                capacity: 8,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A1",
            name: `Integrated Armory`,
            stats: {
                type: "weapon",
                antiship: 9648,
                antiair: 589,
                siege: 959,
                hp: 27000
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `BG-2450A`,
                name: `Dual-Cannon Heavy Battery`,
                damageType: "Projectile",
                target: "Large Ship",
                lockonEfficiency: null,
                alpha: 320,
                attributes: null
            }, {
                type: "weapon",
                count: 2,
                title: `MK3-BM-8x320 "Lightning Field"`,
                name: `Dodeca-Fire Anti-Ship Missile System`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 220,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A2",
            name: `Projectile Weapon Platform`,
            stats: {
                type: "weapon",
                antiship: 8749,
                antiair: 589,
                siege: 648,
                hp: 27000
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `MK5-BM-16x180 "Lightning Field"`,
                name: `Anti-Ship Missile Array`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: null,
                alpha: 120,
                attributes: null
            }, {
                type: "weapon",
                count: 2,
                title: `MK3-BM-8x320 "Lightning Field"`,
                name: `Dodeca-Fire Anti-Ship Missile System`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 220,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "A3",
            name: `Integrated Cannon Platform`,
            stats: {
                type: "weapon",
                antiship: 8888,
                antiair: 1021,
                siege: 630,
                hp: 27000
            },
            subsystems: [{
                type: "weapon",
                count: 2,
                title: `MK3-BM-8x320 "Lightning Field"`,
                name: `Dodeca-Fire Anti-Ship Missile System`,
                damageType: "Projectile",
                target: "Small Ship",
                lockonEfficiency: 10,
                alpha: 220,
                attributes: ["Anti-Aircraft Counterattack"]
            }, {
                type: "weapon",
                count: 2,
                title: `BG-2180`,
                name: `Anti-Ship Cannon`,
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: null,
                alpha: 80,
                attributes: ["Anti-Aircraft Counterattack"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/jamming.png",
            system: "B1",
            name: "Ship Maintenance System",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 25200
            },
            subsystems: [{
                type: "misc",
                count: 1,
                title: `BSY-5000`,
                name: "Large Docking Jetty",
                attributes: ["Aircraft Recovery"]
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "B2",
            name: "Corvette Loading Platform",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 24750
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CBC-2000`,
                name: "Corvette Dock",
                hanger: "Corvette",
                capacity: 3,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "C1",
            name: "Aircraft Hanger",
            stats: {
                type: "weapon",
                antiship: null,
                antiair: null,
                siege: null,
                hp: 24750
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CFB-600`,
                name: "Aircraft Hanger",
                hanger: "Large Fighter",
                capacity: 5,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/aircraft.png",
            system: "C2",
            name: "Siege UAV System",
            stats: {
                type: "weapon",
                antiship: 0,
                antiair: 0,
                siege: 6652,
                hp: 24750
            },
            subsystems: [{
                type: "hanger",
                count: 1,
                title: `CST-6`,
                name: "Siege UAV Pod",
                hanger: "Siege UAV",
                capacity: 4,
                damageType: "Energy",
                target: "Building",
                lockonEfficiency: null,
                alpha: 720,
                attributes: null
            }]
        }, {
            type: "known",
            img: "/weapons/icons/cannon.png",
            system: "C3",
            name: "Anti-Aircraft Missile Platform",
            stats: {
                type: "weapon",
                antiship: 2618,
                antiair: 1178,
                siege: 0,
                hp: 27000
            },
            subsystems: [{
                type: "weapon",
                count: 1,
                title: `BM-12x180T`,
                name: "Missile Defense System",
                damageType: "Projectile",
                target: "Aircraft",
                lockonEfficiency: 60,
                alpha: 50,
                attributes: ["Interception Capability", "Anti-Aircraft Special Ammo", "Anti-Aircraft Support"]
            }]
        }]
    }
];

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
