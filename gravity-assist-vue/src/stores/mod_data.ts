
type Aircraft = "Small Fighter" | "Medium Fighter" | "Large Fighter" | "Corvette" | "Spotter UAV" | "Area-Denial Anti-Aircraft UAV"
            | "Shield UAV" | "Repair UAV" | "Tactical UAV" | "Info UAV" | "Cooperative Offensive UAV" | "Siege UAV";

type Ship = {
    name: string;
    title: string;
    img: string;
    type: "Battlecruiser" | "Auxiliary Ship" | "Carrier";
    cost: number;
    row: "Front" | "Middle" | "Back";
    manufacturer: "Jupiter Industry" | "NOMA Shipping" | "Antonios" | "Dawn Accord" | "Thunderbolt Group";
    modules: (WeaponMod | MiscMod | ArmorMod | UnknownMod)[];
}

type WeaponMod = {
    img: string;
    type: "weapon";
    identity: string;
    name: string;
    default: boolean;
    stats: {
        antiship: number;
        antiair: number;
        siege: number;
        hp: number;
    };
    weapons: (WeaponWeapon | HangerWeapon)[];
}

type WeaponWeapon = {
    type: "weapon";
    count: number;
    title: string;
    name: string;
    damageType: "Projectile" | "Energy";
    target: "Aircraft" | "Small Ship" | "Large Ship";
    lockonEfficiency?: number;
    alpha: number;
    attributes: string[];
}

type MiscMod = {
    img: string;
    type: "misc";
    identity: string;
    name: string;
    default: boolean;
    stats: {
        hp: number;
    };
    weapons: (BuffWeapon | HangerWeapon)[];
}

type BuffWeapon = {
    type: "buff";
    count: number;
    title: string;
    name: string;
    attributes: string[];
}

type HangerWeapon = {
    type: "hanger";
    count: number;
    title: string;
    name: string;
    hanger: Aircraft;
    capacity: number;
    attributes?: string[];
}

type ArmorMod = {
    img: string;
    type: "armor";
    identity: string;
    name: string;
    default: boolean;
    stats: {
        armor: number;
        extraHP: number;
        energyShield: number;
        hp: number;
    };
    weapons: BuffWeapon[];
}

type UnknownMod = {
    type: "unknown";
    identity: string;
}

const data: Ship[] = [{
    name: "Constantine the Great",
    title: "Multi-Role Battlecruiser",
    img: "/ships/constantineTheGreat.png",
    type: "Battlecruiser",
    cost: 35,
    row: "Middle",
    manufacturer: "Antonios",
    modules: [{
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M1",
        name: `"Gamma Storm" Ion Attack System`,
        default: true,
        stats: {
            antiship: 11917,
            antiair: 0,
            siege: 2502,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M2",
        name: `"Gamma Storm" Projectile Attack System`,
        default: false,
        stats: {
            antiship: 19885,
            antiair: 0,
            siege: 2784,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A1",
        name: `"Gamma Storm" Projectile Weapon System`,
        default: true,
        stats: {
            antiship: 24917,
            antiair: 0,
            siege: 2016,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A2",
        name: `"Gamma Storm" Projectile Weapon System`,
        default: false,
        stats: {
            antiship: 40666,
            antiair: 1643,
            siege: 3138,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "B1",
        name: `Generic Battery System`,
        default: false,
        stats: {
            antiship: 10628,
            antiair: 270,
            siege: 1461,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "B2",
        name: `Pulse Anti-Aircraft System`,
        default: false,
        stats: {
            antiship: 5175,
            antiair: 2040,
            siege: 0,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "B3",
        name: `Anti-Aircraft Missile System`,
        default: false,
        stats: {
            antiship: 2400,
            antiair: 1548,
            siege: 0,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "C1",
        name: `Additional Energy System`,
        default: false,
        stats: {
            hp: 15750
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `RIT-650`,
            name: `Energy Compression Device`,
            attributes: ["Increase Energy Weapon Damage: Increases the damage of the ship's energy weapon by 10%"]
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "C2",
        name: `Aircraft Module`,
        default: false,
        stats: {
            hp: 18000
        },
        weapons: [{
            type: "hanger",
            count: 2,
            title: `CBF-200`,
            name: `Medium Hanger`,
            hanger: "Medium Fighter",
            capacity: 1
        }, {
            type: "buff",
            count: 1,
            title: `XAC-2000`,
            name: `Aviation Bridge`,
            attributes: ["No attributes"]
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "C3",
        name: `Recon UAV System`,
        default: false,
        stats: {
            hp: 18000
        },
        weapons: [{
            type: "hanger",
            count: 3,
            title: "CIT-1",
            name: `Fire-Control Spotter UAV Hanger`,
            hanger: "Spotter UAV",
            capacity: 3,
            attributes: ["Ship Calibration Support: Increase the Hit Rate of the target ship by 20%"]
        }]
    }, {
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "D1",
        name: `Short-Range Anti-Aircraft System`,
        default: false,
        stats: {
            antiship: 0,
            antiair: 1011,
            siege: 0,
            hp: 19800
        },
        weapons: [{
            type: "weapon",
            count: 4,
            title: `CM-2x45B`,
            name: `Short-Range Anti-Aircraft Missile`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: 60,
            alpha: 40,
            attributes: ["Anti-Aircraft Critical Strike", "Anti-Aircraft Special Ammom", "Anti-Aircraft Counterattack"]
        }]
    }, {
        img: "/weapons/armor.png",
        type: "armor",
        identity: "D2",
        name: `Targeted Protection System`,
        default: false,
        stats: {
            armor: 0,
            extraHP: 0,
            energyShield: 0,
            hp: 18000
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: "ASM-220",
            name: `Critical-System Reinforced Armor`,
            attributes: ["Reduce System Crit Damage Taken: Reduces Crit Damage taken by all systems by 15%"]
        }]
    }, {
        img: "/weapons/storage.png",
        type: "misc",
        identity: "D3",
        name: `Damage Control System`,
        default: false,
        stats: {
            hp: 15750
        },
        weapons: [{
            type: "buff",
            count: 4,
            title: "AST-50",
            name: `Damage Monitoring System`,
            attributes: ["4800/min HP recovery"]
        }]
    }]
}, {
    name: "Eternal Storm",
    title: "Attack Battlecruiser",
    img: "/ships/eternalStorm.png",
    type: "Battlecruiser",
    cost: 32,
    row: "Middle",
    manufacturer: "Jupiter Industry",
    modules: [{
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M1",
        name: `"Viggen" Ion Generation System`,
        default: true,
        stats: {
            antiship: 16000,
            antiair: 0,
            siege: 3360,
            hp: 18000
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M2",
        name: `Experimental Plasma Caster`,
        default: false,
        stats: {
            antiship: 15692,
            antiair: 1883, 
            siege: 2824,
            hp: 18000
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A1",
        name: `"Eternal Polaris" Mk II Projectile Launching System`,
        default: true,
        stats: {
            antiship: 12240,
            antiair: 396,
            siege: 1539,
            hp: 18000
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A2",
        name: `"Eternal Polaris" Mk II Projectile Launching System`,
        default: false,
        stats: {
            antiship: 11900,
            antiair: 0,
            siege: 10440,
            hp: 18000
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A3",
        name: `"Eternal Polaris" Mk II Projectile Launching System TEST`,
        default: false,
        stats: {
            antiship: 11345,
            antiair: 593,
            siege: 1440,
            hp: 18000
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "B1",
        name: `Generic Cannon Platform`,
        default: false,
        stats: {
            antiship: 5850,
            antiair: 126,
            siege: 1113,
            hp: 18000
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "B2",
        name: `Generic Close-In Weapon System`,
        default: false,
        stats: {
            antiship: 900,
            antiair: 405,
            siege: 60,
            hp: 18000
        },
        weapons: [{
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
        img: "/weapons/aircraft.png",
        type: "weapon",
        identity: "C1",
        name: `NT UAV Anti-Aircraft System`,
        default: false,
        stats: {
            antiship: 0,
            antiair: 3888,
            siege: 0,
            hp: 20250
        },
        weapons: [{
            type: "hanger",
            count: 3,
            title: `NT-1`,
            name: `Anti-Aircraft UAV Rack`,
            hanger: "Area-Denial Anti-Aircraft UAV",
            capacity: 3,
            attributes: ["Damage Type: Projectile", "Prioritized Target: Aircraft", "Damage per Hit: 15"]
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "C2",
        name: `"Thunderstorm" UAV Shield System`,
        default: false,
        stats: {
            hp: 20250
        },
        weapons: [{
            type: "hanger",
            count: 2,
            title: `SNT-1`,
            name: `Shielded UAV Rack`,
            hanger: "Shield UAV",
            capacity: 2,
            attributes: [`Ship Shielding Support: "Initiate Shielding Support to the target and increase the Evasion of the target ship to the energy weapon by 15%"`]
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "C3",
        name: `Energy Compensation Armor System`,
        default: false,
        stats: {
            hp: 16200
        },
        weapons: [{
            type: "buff",
            count: 2,
            title: `RIR-220`,
            name: `Experimental Energy Compensation Armor`,
            attributes: ["Energy Damage Reduction: Reduces the Damage taken from energy weapon attacks by 15%", "Physical Damage Reduction: Reduces the Damage taken from projectile weapon attacks by 15%", "Crit Damage Reduction: Reduces Crit Damage received by 30%"]
        }]
    }, {
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "D1",
        name: `Ion Turret System`,
        default: false,
        stats: {
            antiship: 6857,
            antiair: 0,
            siege: 1028,
            hp: 18000
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "D2",
        name: `Pulse Turret System`,
        default: false,
        stats: {
            antiship: 0,
            antiair: 432,
            siege: 0,
            hp: 18000
        },
        weapons: [{
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
    cost: 35,
    row: "Front",
    manufacturer: "NOMA Shipping",
    modules: [{
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M1",
        name: `Bow Railgun System`,
        default: true,
        stats: {
            antiship: 12950,
            antiair: 0,
            siege: 11310,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M2",
        name: `Ion Turret System`,
        default: false,
        stats: {
            antiship: 12857,
            antiair: 0,
            siege: 1800,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A1",
        name: `"Fortress" Battery System A`,
        default: true,
        stats: {
            antiship: 13120,
            antiair: 636,
            siege: 3075,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A2",
        name: `"Fortress" Battery System B`,
        default: false,
        stats: {
            antiship: 15986,
            antiair: 216,
            siege: 2880,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A3",
        name: `"Fortress" Battery System F`,
        default: false,
        stats: {
            antiship: 17220,
            antiair: 1026,
            siege: 1800,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "B1",
        name: `"Minecart" Projectile Launching Array`,
        default: false,
        stats: {
            antiship: 5940,
            antiair: 680,
            siege: 259,
            hp: 19800
        },
        weapons: [{
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
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "B2",
        name: `Corvette Dock`,
        default: false,
        stats: {
            hp: 23850
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CBC-2300`,
            name: `Corvette Mounting Dock`,
            hanger: "Corvette",
            capacity: 3
        }]
    }, {
        img: "/weapons/storage.png",
        type: "misc",
        identity: "B3",
        name: `Integrated Damage Control System`,
        default: false,
        stats: {
            hp: 19800
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CRT-3`,
            name: `Engineering UAV Maintenance Pod`,
            hanger: "Repair UAV",
            capacity: 2,
            attributes: ["5454/min HP recovery"]
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "C1",
        name: `Distributed Weapon Control System`,
        default: false,
        stats: {
            hp: 18000
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `XI-1200`,
            name: "Distributed Fire Control Radar",
            attributes: ["Increase Hit Rate: Increases the Hit Rate of all weapons on the ship by 5%"]
        }]
    }, {
        img: "/weapons/armor.png",
        type: "armor",
        identity: "C2",
        name: `Additional Armor System`,
        default: false,
        stats: {
            armor: 0,
            extraHP: 32484,
            energyShield: 0,
            hp: 27000
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `ASX-150`,
            name: "Energized Nano Armor",
            attributes: ["Additional HP Auto-Repair: Automatically repairs the damaged portion of additional HP after each battle"]
        }]
    }, {
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "C3",
        name: `Anti-Missile System`,
        default: false,
        stats: {
            antiship: 0,
            antiair: 410,
            siege: 0,
            hp: 19800
        },
        weapons: [{
            type: "weapon",
            count: 3,
            title: `BG-625C`,
            name: `Area Anti-Missile Cannon`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: null,
            alpha: 10,
            attributes: ["Interception Capability", "Anti-Aircraft Special Ammo", "Anti-Aircraft Support"]
        }]
    }]
}, {
    name: "ST59",
    title: "Defensive Battlecruiser",
    img: "/ships/st59.png",
    type: "Battlecruiser",
    cost: 28,
    row: "Middle",
    manufacturer: "Dawn Accord",
    modules: [{
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M1",
        name: "Assault Railgun System",
        default: true,
        stats: {
            antiship: 10875,
            antiair: 0,
            siege: 3528,
            hp: 15750
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M2",
        name: `Bow Mounted Battery System`,
        default: false,
        stats: {
            antiship: 11400,
            antiair: 0,
            siege: 960,
            hp: 15750
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M3",
        name: `Assault Torpedo System`,
        default: false,
        stats: {
            antiship: 11200,
            antiair: 0,
            siege: 2266,
            hp: 15750
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A1",
        name: `Large Cannon Platform`,
        default: true,
        stats: {
            antiship: 7875,
            antiair: 216,
            siege: 1206,
            hp: 15750
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A2",
        name: `Railgun Turret Array`,
        default: false,
        stats: {
            antiship: 9900,
            antiair: 0,
            siege: 1923,
            hp: 15750
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A3",
        name: `Pulse Turret Array`,
        default: false,
        stats: {
            antiship: 7500,
            antiair: 787,
            siege: 1200,
            hp: 15750
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "B1",
        name: `Integrated Projectile Weapon Platform`,
        default: false,
        stats: {
            antiship: 8188,
            antiair: 0,
            siege: 1185,
            hp: 15750
        },
        weapons: [{
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
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "B2",
        name: `Aircraft System`,
        default: false,
        stats: {
            hp: 15300
        },
        weapons: [{
            type: "hanger",
            count: 2,
            title: `CBF-305`,
            name: "Medium Hanger",
            hanger: "Medium Fighter",
            capacity: 2
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "B3",
        name: `Area Fire-Control System`,
        default: false,
        stats: {
            hp: 15300
        },
        weapons: [{
            type: "hanger",
            count: 2,
            title: `CIT-1`,
            name: `Fire-Control Spotter UAV Hanger`,
            hanger: "Spotter UAV",
            capacity: 3,
            attributes: ["Ship Calibration Support: Increase the Hit Rate of the target ship by 20%"]
        }]
    }, {
        img: "/weapons/armor.png",
        type: "armor",
        identity: "C1",
        name: `Additional Armor System`,
        default: false,
        stats: {
            armor: 0,
            extraHP: 27302,
            energyShield: 0,
            hp: 15750
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `ASX-100`,
            name: "Additional Armor",
            attributes: ["Extra HP: 20%"]
        }]
    }, {
        img: "/weapons/armor.png",
        type: "armor",
        identity: "C2",
        name: `EM Armor System`,
        default: false,
        stats: {
            armor: 0,
            extraHP: 0,
            energyShield: 20,
            hp: 15750
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `AEX-120`,
            name: "EM Armor",
            attributes: ["Energy Shield: 20%"]
        }]
    }, {
        img: "/weapons/armor.png",
        type: "armor",
        identity: "C3",
        name: "Heavy Defensive Armor System",
        default: false,
        stats: {
            armor: 250,
            extraHP: 0,
            energyShield: 0,
            hp: 15750
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `ASX-130`,
            name: "Additional Armor",
            attributes: ["Armor: 250", "Reduce Evasion: Reduces ship evasion by 10%", "Reduce Hit Rate: Reduces the Hit Rate of the primary weapon by 5%"]
        }]
    }]
}, {
    name: "Thunderbolt Star",
    title: "Multi-Role Arsenal Ship",
    img: "/ships/thunderboltStar.png",
    type: "Battlecruiser",
    cost: 35,
    row: "Middle",
    manufacturer: "Thunderbolt Group",
    modules: [{
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M1",
        name: `"Thunderbolt" Bow-Mounted Weapon System`,
        default: true,
        stats: {
            antiship: 40628,
            antiair: 0,
            siege: 8562,
            hp: 23400
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M2",
        name: `"Thunderbolt" Bow-Mounted Projectile Weapon System`,
        default: false,
        stats: {
            antiship: 27168,
            antiair: 0,
            siege: 5705,
            hp: 23400
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M3",
        name: `"Thunderbolt Star" Bow-Mounted High-Energy Weapon System`,
        default: false,
        stats: {
            antiship: 33120,
            antiair: 0,
            siege: 3312,
            hp: 23400
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A1",
        name: `Rapid-Fire Anti-Ship Weapon System`,
        default: true,
        stats: {
            antiship: 12636,
            antiair: 1266,
            siege: 1407,
            hp: 23400
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A2",
        name: `Medium Anti-Ship Weapon System`,
        default: false,
        stats: {
            antiship: 14184,
            antiair: 0,
            siege: 1490,
            hp: 23400
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "B1",
        name: "Active Anti-Aircraft System",
        default: true,
        stats: {
            antiship: 3375,
            antiair: 465,
            siege: 0,
            hp: 23400
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "B2",
        name: "Range Interception System",
        default: false,
        stats: {
            antiship: 0,
            antiair: 345,
            siege: 0,
            hp: 23400
        },
        weapons: [{
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
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "C1",
        name: "Weapon Coordination Center",
        default: false,
        stats: {
            hp: 23400
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `HNI-260`,
            name: "Weapon Activation Device",
            attributes: ["Oscillatory Excitation: Triggers one of the onboard weapons to initiate an extra shot every 6s."]
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "C2",
        name: "Fire-Control Calibration System",
        default: false,
        stats: {
            hp: 23400
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `HNA-240`,
            name: "Real-Time Target Callibration Module",
            attributes: ["Collaborative Calibration: Calibrates the fire control of an onboard weapon once every 15s, increasing the Hit Rate by 30% for 15s."]
        }]
    }, {
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "D1",
        name: "Accurate Projectile Weapon System",
        default: false,
        stats: {
            antiship: 9140,
            antiair: 1164,
            siege: 970,
            hp: 23400
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "D2",
        name: "Large Projectile Weapon System",
        default: false,
        stats: {
            antiship: 9948,
            antiair: 0,
            siege: 2112,
            hp: 23400
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "E1",
        name: "Multi-Target Weapon System",
        default: false,
        stats: {
            antiship: 6990,
            antiair: 910,
            siege: 759,
            hp: 23400
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "E2",
        name: "Multi-Target Anti-Aircraft System",
        default: false,
        stats: {
            antiship: 0,
            antiair: 633,
            siege: 0,
            hp: 23400
        },
        weapons: [{
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
    cost: 40,
    row: "Middle",
    manufacturer: "NOMA Shipping",
    modules: [{
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M1",
        name: "Fortress Bow-Mounted Heavy Cannon System",
        default: true,
        stats: {
            antiship: 11057,
            antiair: 394,
            siege: 1756,
            hp: 18900
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M2",
        name: `Fortress Assault Railgun System`,
        default: false,
        stats: {
            antiship: 12000,
            antiair: 319,
            siege: 3150,
            hp: 18900
        },
        weapons: [{
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
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "A1",
        name: "Frigates Production System",
        default: true,
        stats: {
            hp: 18800
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `MF-2500`,
            name: "Frigates Independent Production Facility",
            attributes: ["Self-holding Capability: Provides self-held command points for the auxiliary ship by 80", "Frigate Production Facility: Can produce frigates"]
        }, {
            type: "buff",
            count: 1,
            title: `BMP-60`,
            name: "Production Line Modification Module",
            attributes: ["Increase Production Speed: Increases Shipbuilding Speed of Auxiliary Ship by 10%"]
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "A2",
        name: "Corvette Production System",
        default: false,
        stats: {
            hp: 19800
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `MC-2500`,
            name: "Corvette Independent Production Facility",
            attributes: ["Corvette Production Facility: Can produce corvettes"]
        }, {
            type: "buff",
            count: 1,
            title: `BMP-60`,
            name: "Production Line Modification Module",
            attributes: ["Increase Production Speed: Increases Shipbuilding Speed of Auxiliary Ship by 10%"]
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "A3",
        name: "Destroyer Production System",
        default: false,
        stats: {
            hp: 18800
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `MD-2500`,
            name: "Destroyer Independent Production Facility",
            attributes: ["Self-holding Capability: Provides self-held command points for the auxiliary ship by 80", "Destroyer Production Facility: Can produce destroyers"]
        }, {
            type: "buff",
            count: 1,
            title: `BMP-60`,
            name: "Production Line Modification Module",
            attributes: ["Increase Production Speed: Increases Shipbuilding Speed of Auxiliary Ship by 10%"]
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "weapon",
        identity: "B1",
        name: `"Tundra" Interceptor UAV System`,
        default: true,
        stats: {
            antiship: 0,
            antiair: 4608,
            siege: 0,
            hp: 19350
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CAT/R-6`,
            name: `Area-Denial Anti-Aircraft UAV Pod`,
            hanger: "Area-Denial Anti-Aircraft UAV",
            capacity: 4,
            attributes: ["Damage Type: Projectile", "Prioritized Target: Aircraft", "Damage per Hit: 15", "Anti-Aircraft Counterattack"]
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "B2",
        name: `Aircraft Loading System`,
        default: false,
        stats: {
            hp: 19350
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CBF-200`,
            name: "Large Aircraft Hanger",
            hanger: "Large Fighter",
            capacity: 2
        }]
    }, {
        type: "unknown",
        identity: "B3"
    }, {
        type: "unknown",
        identity: "C1"
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "C2",
        name: `Corvette Dock`,
        default: false,
        stats: {
            hp: 19350
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CBC-2000`,
            name: "Corvette Dock",
            hanger: "Corvette",
            capacity: 3
        }]
    }, {
        img: "/weapons/armor.png",
        type: "armor",
        identity: "D1",
        name: `Heavy Additional Armor System`,
        default: false,
        stats: {
            armor: 80,
            extraHP: 30069,
            energyShield: 0,
            hp: 18000
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `ASX-90`,
            name: "Heavy Additional Armor",
            attributes: ["Armor: 80", "Extra HP: 15%"]
        }]
    }, {
        img: "/weapons/storage.png",
        type: "misc",
        identity: "D2",
        name: `Nano Automated Maintenance System`,
        default: false,
        stats: {
            hp: 18000
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `BST-300`,
            name: `Nano Repair System`,
            attributes: ["5169/min HP recovery"]
        }]
    }]
}, {
    name: "FSV830",
    title: "Fast Tactical Auxiliary Ship",
    img: "/ships/fsv830.png",
    type: "Auxiliary Ship",
    cost: 40,
    row: "Back",
    manufacturer: "Dawn Accord",
    modules: [{
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "A1",
        name: "Frigates Production System",
        default: true,
        stats: {
            hp: 21500
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `XE-1250AM`,
            name: "Frigates Independent Production Facility",
            attributes: ["Self-holding Capability: Provides self-held command points for the auxiliary ship by 60", "Frigate Production Facility: Can produce frigates"]
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "A2",
        name: "Corvette Production System",
        default: false,
        stats: {
            hp: 21500
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `XE-1250AG`,
            name: "Corvette Independent Build Facility",
            attributes: [`Corvette Production Facility: Can produce corvettes`]
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "A3",
        name: "Fighter Production System",
        default: false,
        stats: {
            hp: 21500
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `MFG-1500`,
            name: "Fighter Independent Production Facility",
            attributes: ["Fighter Production Facility: Can build fighters"]
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "B1",
        name: "Warning and Control System",
        default: true,
        stats: {
            hp: 22000
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `XE-1250AW`,
            name: "Situational Awareness System",
            attributes: ["Back-Row Torpedo Hit Evasion: +8% torpedo evasion to back-row ships in the fleet", "Back-Row Missile Hit Evasion: +8% missile evasion to back-row ships in the fleet"]
        }, {
            type: "buff",
            count: 1,
            title: `XC-4500`,
            name: "Bridge",
            attributes: ["No attributes"]
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "B2",
        name: "Coordinate Command System",
        default: false,
        stats: {
            hp: 22000
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `XCE-1250AI`,
            name: "Assisted Lock-On Radar",
            attributes: [`Increase Back-Row Missile Hit Rate: "Increase weapon Hit Rate of back-row ships in the fleet by 12%"`, `Increase Back-Row Torpedo Hit Rate: "Raise torpedo weapon hit rate of back-row ships by 12%"`]
        }, {
            type: "buff",
            count: 1,
            title: `XC-4500`,
            name: "Bridge",
            attributes: ["No attributes"]
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "B3",
        name: "Camoflage System",
        default: false,
        stats: {
            hp: 22000
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `XS-1250AC`,
            name: "Field Signal Disguise Module",
            attributes: [`Ship Disguise: "When itself is selected as an attack target, it will be mislabeled as a carrier by the enemy."`]
        }, {
            type: "buff",
            count: 1,
            title: `XC-4500`,
            name: "Bridge",
            attributes: ["No attributes"]
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "C1",
        name: "Engineering Maintenance System",
        default: false,
        stats: {
            hp: 22000
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `BSR-200`,
            name: "Quick Repair Device",
            attributes: ["Increase Repair Speed: When using the auxiliary ship to conduct repairs, increases the repair speed by 20%"]
        }]
    }, {
        img: "/weapons/storage.png",
        type: "misc",
        identity: "C2",
        name: "Strategic Resource Storage System",
        default: false,
        stats: {
            hp: 22000
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `W-500`,
            name: "Loading Platform",
            attributes: ["Increases storage by 60,000"]
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "D1",
        name: "Aircraft System",
        default: false,
        stats: {
            hp: 21500
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CBF-255`,
            name: "Medium Hanger",
            hanger: "Medium Fighter",
            capacity: 2
        }]
    }, {
        img: "/weapons/storage.png",
        type: "misc",
        identity: "D2",
        name: "Repair UAV System",
        default: false,
        stats: {
            hp: 21500
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CRT-3`,
            name: "Engineering UAV Maintenance Pod",
            hanger: "Repair UAV",
            capacity: 2,
            attributes: ["5454/min HP recovery"]
        }]
    }, {
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "E1",
        name: "Area-Defense System",
        default: false,
        stats: {
            antiship: 0,
            antiair: 882,
            siege: 0,
            hp: 22000
        },
        weapons: [{
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
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "E2",
        name: "Corvette Dock",
        default: false,
        stats: {
            hp: 21500
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CBC-2000`,
            name: "Corvette Dock",
            hanger: "Corvette",
            capacity: 3
        }]
    }]
}, {
    name: "CV3000",
    title: "High-Speed Carrier",
    img: "/ships/cv3000.png",
    type: "Carrier",
    cost: 40,
    row: "Back",
    manufacturer: "Dawn Accord",
    modules: [{
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "M1",
        name: "Integrated Aircraft Hanger",
        default: true,
        stats: {
            hp: 23850
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CFB-605`,
            name: "Large Aircraft Hanger",
            hanger: "Large Fighter",
            capacity: 5
        }, {
            type: "hanger",
            count: 1,
            title: `CBC-2100`,
            name: "Corvette Dock",
            hanger: "Corvette",
            capacity: 3
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "M2",
        name: "Integrated Aircraft System",
        default: false,
        stats: {
            hp: 23850
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CFB-605`,
            name: "Large Aircraft Hanger",
            hanger: "Large Fighter",
            capacity: 5
        }, {
            type: "hanger",
            count: 1,
            title: `CIT-5`,
            name: "Field Support UAV Hanger",
            hanger: "Tactical UAV",
            capacity: 5,
            attributes: ["Damage Type: Projectile", "Prioritized Target: Small Ship", "Damage per Hit: 27", "Attack Against Systems (01: Primary Weapon System, low)"]
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "M3",
        name: "Large Aircraft System",
        default: false,
        stats: {
            hp: 23850
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CFB-605`,
            name: "Large Aircraft Hanger",
            hanger: "Large Fighter",
            capacity: 5
        }, {
            type: "hanger",
            count: 1,
            title: `CFB-400`,
            name: "Aircraft Hanger",
            hanger: "Large Fighter",
            capacity: 3
        }]
    }, {
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A1",
        name: `"Dragoon" Battery System`,
        default: true,
        stats: {
            antiship: 6500,
            antiair: 297,
            siege: 619,
            hp: 25200
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A2",
        name: `Anti-Aircraft Missile Platform`,
        default: false,
        stats: {
            antiship: 2868,
            antiair: 372,
            siege: 0,
            hp: 25200
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "B1",
        name: `Missile Defense System`,
        default: false,
        stats: {
            antiship: 1200,
            antiair: 210,
            siege: 70,
            hp: 25200
        },
        weapons: [{
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
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "B2",
        name: `Corvette Loading System`,
        default: false,
        stats: {
            hp: 23850
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CBC-2100`,
            name: "Corvette Dock",
            hanger: "Corvette",
            capacity: 3
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "B3",
        name: `Info UAV Support Platform`,
        default: false,
        stats: {
            hp: 23850
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CITA-2`,
            name: "Field Support UAV Pod",
            hanger: "Info UAV",
            capacity: 3,
            attributes: ["Ship Calibration Support: Increase the Hit Rate of the target ship by 20%"]
        }]
    }]
}, {
    name: "Eternal Heavens",
    title: "UAV Carrier",
    img: "/ships/eternalHeavens.png",
    type: "Carrier",
    cost: 40,
    row: "Back",
    manufacturer: "Jupiter Industry",
    modules: [{
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "M1",
        name: "Collaborative Hanger I",
        default: true,
        stats: {
            hp: 24500
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CBF-280`,
            name: "Medium Fighter Hanger",
            hanger: "Medium Fighter",
            capacity: 3
        }, {
            type: "hanger",
            count: 3,
            title: `"Decomposer"`,
            name: "Cooperative Offensive UAV Platform",
            hanger: "Cooperative Offensive UAV",
            capacity: 3,
            attributes: ["Damage Type: Energy", "Prioritized Target: Aircraft", "Damage per Hit: 140", "Anti-Aircraft Lightweight Ammo", "UAV Cooperation: Each set of aircrafts in the same system comes with a UAV to perform cooperative combat. If any aircraft survives, the UAV and the aircraft(s) will attack the same target together first."]
        }]
    }, {
        type: "unknown",
        identity: "M2"
    }, {
        type: "unknown",
        identity: "M3"
    }, {
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A1",
        name: `Integrated Battery System`,
        default: true,
        stats: {
            antiship: 10250,
            antiair: 472,
            siege: 3815,
            hp: 26000
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A2",
        name: `Experimental Ion Cannon System`,
        default: false,
        stats: {
            antiship: 8857,
            antiair: 252,
            siege: 828,
            hp: 26000
        },
        weapons: [{
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
        type: "unknown",
        identity: "A3"
    }, {
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "B1",
        name: `Anti-Ship Projectile Launching System`,
        default: false,
        stats: {
            antiship: 5640,
            antiair: 0,
            siege: 882,
            hp: 26000
        },
        weapons: [{
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
        identity: "B2"
    }, {
        type: "unknown",
        identity: "B3"
    }, {
        type: "unknown",
        identity: "C1"
    }, {
        type: "unknown",
        identity: "C2"
    }, {
        type: "unknown",
        identity: "C3"
    }]
}, {
    name: "Marshal Crux",
    title: "Carrier",
    img: "/ships/marshalCrux.png",
    type: "Carrier",
    cost: 40,
    row: "Back",
    manufacturer: "Antonios",
    modules: [{
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M1",
        name: `"White Flashing" Integrated Armory`,
        default: true,
        stats: {
            antiship: 16080,
            antiair: 691,
            siege: 1908,
            hp: 28800
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "M2",
        name: `"White Flashing" Integrated Armory`,
        default: false,
        stats: {
            antiship: 13628,
            antiair: 162,
            siege: 2275,
            hp: 28800
        },
        weapons: [{
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
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "A1",
        name: `Integrated Aircraft Hanger`,
        default: true,
        stats: {
            hp: 25200
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CFB-700`,
            name: "Large Aircraft Hanger",
            hanger: "Large Fighter",
            capacity: 6
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "A2",
        name: `Corvette Dock`,
        default: false,
        stats: {
            hp: 25200
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CBC-3200`,
            name: "Corvette Dock",
            hanger: "Corvette",
            capacity: 6
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "B1",
        name: `Additional Energy System`,
        default: true,
        stats: {
            hp: 27000
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `RET-200`,
            name: "Energy Amplification Device",
            attributes: ["Increase Aircraft Damage: Increases primary weapon Damage of carried Antonios aircraft by 15%"]
        }]
    }, {
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "B2",
        name: `Fire-Control Auxiliary Calibration System`,
        default: false,
        stats: {
            hp: 27000
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `XGC-200`,
            name: "Precision Guidance System",
            attributes: ["Increase Aircraft Hit Rate: Increases primary weapon Hit Rate of carried Antonios aircraft by 15%"]
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "C1",
        name: `Additional Aircraft System`,
        default: false,
        stats: {
            hp: 25200
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CBF-200`,
            name: "Medium Hanger",
            hanger: "Medium Fighter",
            capacity: 4
        }]
    }, {
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "C2",
        name: `Missile Defense System`,
        default: false,
        stats: {
            antiship: 5200,
            antiair: 504,
            siege: 392,
            hp: 28800
        },
        weapons: [{
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
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "C3",
        name: `Recon UAV System`,
        default: false,
        stats: {
            hp: 25200
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: "CIT-3",
            name: `Fire-Control Spotter UAV Hanger`,
            hanger: "Spotter UAV",
            capacity: 3,
            attributes: ["Ship Calibration Support: Increase the Hit Rate of the target ship by 20%"]
        }]
    }]
}, {
    name: "Solar Whale",
    title: "Armed Tactical Carrier",
    img: "/ships/solarWhale.png",
    type: "Carrier",
    cost: 45,
    row: "Middle",
    manufacturer: "NOMA Shipping",
    modules: [{
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "M1",
        name: "Corvette Dock",
        default: true,
        stats: {
            hp: 24750
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CBC-3200`,
            name: "Corvette Dock",
            hanger: "Corvette",
            capacity: 6
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "M2",
        name: "Large Aircraft System",
        default: false,
        stats: {
            hp: 24750
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CFB-1200`,
            name: "Large Aircraft Hanger",
            hanger: "Large Fighter",
            capacity: 8
        }]
    }, {
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A1",
        name: `Integrated Armory`,
        default: true,
        stats: {
            antiship: 9648,
            antiair: 589,
            siege: 959,
            hp: 27000
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A2",
        name: `Projectile Weapon Platform`,
        default: false,
        stats: {
            antiship: 8749,
            antiair: 589,
            siege: 648,
            hp: 27000
        },
        weapons: [{
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
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "A3",
        name: `Integrated Cannon Platform`,
        default: false,
        stats: {
            antiship: 8888,
            antiair: 1021,
            siege: 630,
            hp: 27000
        },
        weapons: [{
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
        img: "/weapons/jamming.png",
        type: "misc",
        identity: "B1",
        name: "Ship Maintenance System",
        default: true,
        stats: {
            hp: 25200
        },
        weapons: [{
            type: "buff",
            count: 1,
            title: `BSY-5000`,
            name: "Large Docking Jetty",
            attributes: ["Aircraft Recovery: Aircraft returning to all hangers recover 10% HP"]
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "B2",
        name: "Corvette Loading Platform",
        default: false,
        stats: {
            hp: 24750
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CBC-2000`,
            name: "Corvette Dock",
            hanger: "Corvette",
            capacity: 3
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "misc",
        identity: "C1",
        name: "Aircraft Hanger",
        default: false,
        stats: {
            hp: 24750
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CFB-600`,
            name: "Aircraft Hanger",
            hanger: "Large Fighter",
            capacity: 5
        }]
    }, {
        img: "/weapons/aircraft.png",
        type: "weapon",
        identity: "C2",
        name: "Siege UAV System",
        default: false,
        stats: {
            antiship: 0,
            antiair: 0,
            siege: 6652,
            hp: 24750
        },
        weapons: [{
            type: "hanger",
            count: 1,
            title: `CST-6`,
            name: "Siege UAV Pod",
            hanger: "Siege UAV",
            capacity: 4,
            attributes: ["Prioritized Target: Building", "Damage per Hit: 724"]
        }]
    }, {
        img: "/weapons/cannon.png",
        type: "weapon",
        identity: "C3",
        name: "Anti-Aircraft Missile Platform",
        default: false,
        stats: {
            antiship: 2618,
            antiair: 1178,
            siege: 0,
            hp: 27000
        },
        weapons: [{
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
}];

export { data };
