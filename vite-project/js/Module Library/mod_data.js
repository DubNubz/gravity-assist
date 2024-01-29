
const data = [{
    name: "Constantine the Great",
    title: "Multi-Role Battlecruiser",
    img: "/ships/constantineTheGreat.png",
    type: "Battlecruiser",
    cost: 35,
    row: "Middle",
    manufacturer: "Antonios",
    modules: [{
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
            name: `CI-2x700T "Helium Flash" Dual-Gun Super-Heavy Ion Turret`,
            damageType: "Energy",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 400,
            attributes: null
        }]
    }, {
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
            name: `CI-2x600T "Gamma Storm" Energy Torpedo Launching System`,
            damageType: "Energy",
            target: "Large Ship",
            alpha: 1740,
            lockonEfficiency: 10,
            attributes: ["Crit"]
        }]
    }, {
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
            name: `CM-8x608A "Gamma Storm" Generic Missile Launching System`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 850,
            attributes: null
        }]
    }, {
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
            name: `CM-8x608 "Gamma Storm" Pulse Energy Missile Launching System`,
            damageType: "Energy",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 945,
            attributes: null
        }, {
            type: "weapon",
            count: 2,
            name: `CM-12x550 Dodeca-Fire Anti-Ship Missile System`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: 10,
            alpha: 437,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `CG-1350 350mm Dual-Cannon Anti-Ship Battery`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: null,
            alpha: 250,
            attributes: null
        }, {
            type: "weapon",
            count: 4,
            name: `CG-1160B Generic Cannon`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: null,
            alpha: 50,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
        type: "weapon",
        identity: "B2",
        name: `Pulse Anti-Aircraft System`,
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
            name: `CP-3x220 Triple-Fire Anti-Aircraft Pulse`,
            damageType: "Energy",
            target: "Aircraft",
            lockonEfficiency: 60,
            alpha: 40,
            attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
        }, {
            type: "weapon",
            count: 4,
            name: `CP-120 Anti-Missile Pulse Array`,
            damageType: "Energy",
            target: "Aircraft",
            lockonEfficiency: 60,
            alpha: 40,
            attributes: ["Interception Capability", "Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `MK2-CM-4x200B \"Storm\" Missile Launcher Nest`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: 60,
            alpha: 35,
            attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Cycle", "Anti-Aircraft Support"]
        }, {
            type: "weapon",
            count: 2,
            name: `CM-2x188B Missile Launcher Array`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: 60,
            alpha: 25,
            attributes: ["Interception Capability", "Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `RIT-650 Energy Compression Device`,
            attributes: ["Increase Energy Weapon Damage: Increases the damage of the ship's energy weapon by 10%"]
        }]
    }, {
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
            name: `CBF-200 Medium Hanger`,
            hanger: "Medium",
            aircraft: "Fighter",
            capacity: 1
        }, {
            type: "buff",
            count: 1,
            name: `XAC-2000 Aviation Bridge`,
            attributes: ["No attributes"]
        }]
    }, {
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
            name: `CIT-1 Fire-Control Spotter UAV Hanger`,
            hanger: "Spotter UAV",
            aircraft: "UAV",
            capacity: 3,
            attributes: ["Ship Calibration Support: Increase the Hit Rate of the target ship by 20%"]
        }]
    }, {
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
            name: `Short-Range Anti-Aircraft Missile`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: 60,
            alpha: 40,
            attributes: ["Anti-Aircraft Critical Strike", "Anti-Aircraft Special Ammom", "Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `ASM-220 Critical-System Reinforced Armor`,
            attributes: ["Reduce System Crit Damage Taken: Reduces Crit Damage taken by all systems by 15%"]
        }]
    }, {
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
            name: `AST-50 Damage Monitoring System`,
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
            name: `AI-900A "Viggen" Ion Cannon`,
            damageType: "Energy",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 1200,
            attributes: null
        }]
    }, {
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
            name: `AIM-850T Plasma Caster`,
            damageType: "Energy",
            target: "Large Ship",
            lockonEfficiency: 10,
            alpha: 850,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `MK3-AT-800A "Supernova-White" Anti-Ship Torpedo`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 1600,
            attributes: null
        }, {
            type: "weapon",
            count: 2,
            name: `MK2-AM-8x300B "Eternal Polaris K" Cluster Missile`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: 10,
            alpha: 55,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `MK3-AT-750C "Supernova-White" Siege Torpedo Launcher Array`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 1200,
            attributes: null
        }]
    }, {
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
            name: `MK4-AT-1-800AT "Supernova-White" Energy Torpedo`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 1600,
            attributes: null
        }, {
            type: "weapon",
            count: 2,
            name: `MK2-AM-16x150B "Eternal Polaris K" Anti-Aircraft Missile Array`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: 60,
            alpha: 40,
            attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `AG-2580 Dual-Cannon Heavy Battery`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 350,
            attributes: null
        }, {
            type: "weapon",
            count: 2,
            name: `AG-1120B Rapid-Fire Cannon`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: null,
            alpha: 35,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `AG-1105B Generic Cannon`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: null,
            alpha: 25,
            attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `NT-1 Anti-Aircraft UAV Rack`,
            hanger: "Area-Denial Anti-Aircraft UAV",
            aircraft: "UAV",
            capacity: 3,
            attributes: ["Damage Type: Projectile", "Prioritized Target: Aircraft", "Damage per Hit: 15"]
        }]
    }, {
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
            name: `SNT-1 Shielded UAV Rack`,
            hanger: "Shield UAV",
            aircraft: "UAV",
            capacity: 2,
            attributes: [`Ship Shielding Support: "Initiate Shielding Support to the target and increase the Evasion of the target ship to the energy weapon by 15%"`]
        }]
    }, {
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
            name: `RIR-220 Experimental Energy Compensation Armor`,
            attributes: ["Energy Damage Reduction: Reduces the Damage taken from energy weapon attacks by 15%", "Physical Damage Reduction: Reduces the Damage taken from projectile weapon attacks by 15%", "Crit Damage Reduction: Reduces Crit Damage received by 30%"]
        }]
    }, {
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
            name: `AI-450A Experimental Ion Turret`,
            damageType: "Energy",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 800,
            attributes: null
        }]
    }, {
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
            name: `AP-130B Rapid-Fire Near-Defense Pulse Cannon`,
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
            name: `BR-1950C "Ruby" Bow-Mounted Siege Railgun`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 2600,
            attributes: null
        }]
    }, {
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
            name: `BI-850 Dual-Fire Heavy Ion Turret`,
            damageType: "Energy",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 750,
            attributes: null
        }]
    }, {
        type: "weapon",
        identity: "A1",
        name: `"Fortress" Battery System`,
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
            name: `BG-1850 Heavy Cannon`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 950,
            attributes: null
        }, {
            type: "weapon",
            count: 3,
            name: `BG-2240 Anti-Ship Cannon`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: 10,
            alpha: 100,
            attributes: ["Anti-Aircraft Counterattack"]
        }, {
            type: "weapon",
            count: 4,
            name: `BG-340B Anti-Aircraft Cannon`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: 45,
            alpha: 10,
            attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
        }]
    }, {
        type: "weapon",
        identity: "A2",
        name: `"Fortress" Battery System`,
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
            name: `BG-1950 Heavy Cannon`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 1200, 
            attributes: null
        }, {
            type: "weapon",
            count: 4,
            name: `BG-340B Anti-Aircraft Cannon`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: 45,
            alpha: 10,
            attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
        }]
    }, {
        type: "weapon",
        identity: "A3",
        name: `"Fortress" Battery System`,
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
            name: `BG-2350 Anti-Ship Cannon`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: 10,
            alpha: 200,
            attributes: ["Anti-Aircraft Counterattack"]
        }, {
            type: "weapon",
            count: 4,
            name: `BG-340B Anti-Aircraft Cannon`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: 45,
            alpha: 10,
            attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `BM-12x250 Generic Missile Launching Array`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: null,
            alpha: 120,
            attributes: ["Interception Capability", "Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `CBC-2300 Corvette Mounting Dock`,
            hanger: "Corvette",
            aircraft: "Corvette",
            capacity: 3
        }]
    }, {
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
            name: `CRT-3 Engineering UAV Maintenance Pod`,
            hanger: "Repair UAV",
            aircraft: "UAV",
            capacity: 2
        }]
    }, {
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
            name: "XI-1200 Distributed Fire Control Radar",
            attributes: ["Increase Hit Rate: Increases the Hit Rate of all weapons on the ship by 5%"]
        }]
    }, {
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
            name: "ASX-150 Energized Nano Armor",
            attributes: ["Additional HP Auto-Repair: Automatically repairs the damaged portion of additional HP after each battle"]
        }]
    }, {
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
            name: `BG-625C Area Anti-Missile Cannon`,
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
            name: `SR-2600 Heavy Railgun`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 735,
            attributes: null
        }]
    }, {
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
            name: `SG-2400 Dual-Cannon Rapid-Fire Battery`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: null,
            alpha: 200,
            attributes: null
        }]
    }, {
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
            name: `ST-2600 Heavy Torpedo Launcher`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 850,
            attributes: ["Crit"]
        }]
    }, {
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
            name: `MK4-SG-2580 "Thunderbolt" Dual-Cannon Heavy Battery`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: null,
            alpha: 280,
            attributes: null
        }, {
            type: "weapon",
            count: 4,
            name: `SG-1120 Generic Cannon`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: null,
            alpha: 40,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `SR-1425 Railgun Turret`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 450,
            attributes: null
        }]
    }, {
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
            name: `SP-430 Pulse Turret`,
            damageType: "Energy",
            target: "Small Ship",
            lockonEfficiency: 10,
            alpha: 250,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `K-ST-12-255A 3x4 Cluster Torpedo Launching System`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 300,
            attributes: null
        }]
    }, {
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
            name: "CBF-305 Medium Hanger",
            hanger: "Medium",
            aircraft: "Fighter",
            capacity: 2
        }]
    }, {
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
            name: `CIT-1 Fire-Control Spotter UAV Hanger`,
            hanger: "Spotter UAV",
            aircraft: "UAV",
            capacity: 3,
            attributes: ["Ship Calibration Support: Increase the Hit Rate of the target ship by 20%"]
        }]
    }, {
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
            name: "ASX-100 Additional Armor",
            attributes: ["Extra HP: 20%"]
        }]
    }, {
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
            name: "AEX-120 EM Armor",
            attributes: ["Energy Shield: 20%"]
        }]
    }, {
        type: "armor",
        identity: "C3",
        name: `C3`,
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
            name: "ASX-130 Additional Armor",
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
            name: `HR-1850 Long-Rail Railgun`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: null,
            alpha: 2775,
            attributes: null
        }]
    }, {
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
            name: "HT-1-850 High Energy Torpedo Launcher",
            damageType: "Energy",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 2070,
            attributes: ["Crit"]
        }]
    }, {
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
            name: `HT-1250T Experimental Super High-Energy Ion Cannon`,
            damageType: "Energy",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 2760,
            attributes: null
        }]
    }, {
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
            name: "HG-1220 Rapid-Fire Artillery Array",
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: null,
            alpha: 97,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: "HG-2280 Dual-Cannon Stationary Heavy Battery",
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: null,
            alpha: 207,
            attributes: null
        }]
    }, {
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
            name: "HM-4x60B Mid-Range Anti-Aircraft Missile Array",
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: 60,
            alpha: 28,
            attributes: ["Anti-Aircraft Support"]
        }]
    }, {
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
            name: "HP-100B Anti-Aircraft Pulse Array",
            damageType: "Energy",
            target: "Aircraft",
            lockonEfficiency: 60,
            alpha: 28,
            attributes: ["Interception Capability", "Anti-Aircraft Support"]
        }]
    }, {
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
            name: "HNI-260 Weapon Activation Device",
            attributes: ["Oscillatory Excitation: Triggers one of the onboard weapons to initiate an extra shot every 6s."]
        }]
    }, {
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
            name: "HNA-240 Real-Time Target Callibration Module",
            attributes: ["Collaborative Calibration: Calibrates the fire control of an onboard weapon once every 15s, increasing the Hit Rate by 30% for 15s."]
        }]
    }, {
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
            name: "HM-1x220A Mid-Range Anti-Ship Missile",
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: 10,
            alpha: 172,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: "HT-1-450 Large Torpedo Launcher",
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 631,
            attributes: ["Crit"]
        }]
    }, {
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
            name: "HG-1220A Multi-Target Anti-Ship Battery",
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: null,
            alpha: 126,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: "HG-1120B Multi-Target Anti-Aircraft Turret",
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
            tpye: "weapon",
            count: 1,
            name: `"Fortress" MK4-BG-2560 Dual-Cannon Heavy Bow Battery`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 650,
            attributes: null
        }, {
            type: "weapon",
            count: 2,
            name: `BG-1260 Anti-Ship Turret`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: 10,
            alpha: 105,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `"Fortress" MK4-BG-1850A Bow-Mounted Assault Heavy Railgun`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 2250,
            attributes: ["Crit"]
        }, {
            type: "weapon",
            count: 2,
            name: `2 x BM-2x280B Anti-Aircraft Missile Launcher Array`,
            damageType: "Projectile",
            target: "Aircraft",
            localStorage: 45,
            alpha: 25,
            attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: "MF-2500 Frigates Independent Production Facility",
            attributes: ["Self-holding Capability: Provides self-held command points for the auxiliary ship by 80", "Frigate Production Facility: Can produce frigates"]
        }, {
            type: "buff",
            count: 1,
            name: "BMP-60 Production Line Modification Module",
            attributes: ["Increase Production Speed: Increases Shipbuilding Speed of Auxiliary Ship by 10%"]
        }]
    }, {
        type: "unknown",
        identity: "A2"
    }, {
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
            name: "MD-2500 Destroyer Independent Production Facility",
            attributes: ["Self-holding Capability: Provides self-held command points for the auxiliary ship by 80", "Destroyer Production Facility: Can produce destroyers"]
        }, {
            type: "buff",
            count: 1,
            name: "BMP-60 Production Line Modification Module",
            attributes: ["Increase Production Speed: Increases Shipbuilding Speed of Auxiliary Ship by 10%"]
        }]
    }, {
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
            name: `CAT/R-6 Area-Denial Anti-Aircraft UAV Pod`,
            hanger: "Area-Denial Anti-Aircraft UAV",
            aircraft: "UAV",
            capacity: 4,
            attributes: ["Damage Type: Projectile", "Prioritized Target: Aircraft", "Damage per Hit: 15", "Anti-Aircraft Counterattack"]
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
            name: "CBC-2000 Corvette Dock",
            hanger: "Corvette",
            aircraft: "Corvette",
            capacity: 3
        }]
    }, {
        type: "armor",
        identity: "D1",
        name: `Heave Additional Armor System`,
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
            name: "ASX-90 Heavy Additional Armor",
            attributes: ["Armor: 80", "Extra HP: 15%"]
        }]
    }, {
        type: "unknown",
        identity: "D2"
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
            name: "XE-1250AM Frigates Independent Production Facility",
            attributes: ["Self-holding Capability: Provides self-held command points for the auxiliary ship by 60", "Frigate Production Facility: Can produce frigates"]
        }]
    }, {
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
            name: "XE-1250AG Corvette Independent Build Facility",
            attributes: [`Corvette Production Facility: "Increases cannon Damage of back-row ships in the fleet"`]
        }]
    }, {
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
            name: "MFG-1500 Fighter Independent Production Facility",
            attributes: ["Fighter Production Facility: Can build fighters"]
        }]
    }, {
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
            name: "XE-1250AW Situational Awareness System",
            attributes: ["Back-Row Torpedo Hit Evasion: +8% torpedo evasion to back-row ships in the fleet", "Back-Row Missile Hit Evasion: +8% missile evasion to back-row ships in the fleet"]
        }, {
            type: "buff",
            count: 1,
            name: "XC-4500 Bridge",
            attributes: ["No attributes"]
        }]
    }, {
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
            name: "XCE-1250AI Assisted Lock-On Radar",
            attributes: [`Increase Back-Row Missile Hit Rate: "Increase weapon Hit Rate of back-row ships in the fleet by 12%"`, `Increase Back-Row Torpedo Hit Rate: "Raise torpedo weapon hit rate of back-row ships by 12%"`]
        }, {
            type: "buff",
            count: 1,
            name: "XC-4500 Bridge",
            attributes: ["No attributes"]
        }]
    }, {
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
            name: "XS-1250AC Field Signal Disguise Module",
            attributes: [`Ship Disguise: "When itself is selected as an attack target, it will be mislabeled as a carrier by the enemy."`]
        }, {
            type: "buff",
            count: 1,
            name: "XC-4500 Bridge",
            attributes: ["No attributes"]
        }]
    }, {
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
            name: "BSR-200 Quick Repair Device",
            attributes: ["Increase Repair Speed: When using the auxiliary ship to conduct repairs, increases the repair speed by 20%"]
        }]
    }, {
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
            name: "W-500 Loading Platform",
            attributes: ["Increases storage by 60,000"]
        }]
    }, {
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
            name: "CBF-255 Medium Hanger",
            hanger: "Medium",
            aircraft: "Fighter",
            capacity: 2
        }]
    }, {
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
            name: "CRT-3 Engineering UAV Maintenance Pod",
            hanger: "Repair UAV",
            aircraft: "UAV",
            capacity: 2
        }]
    }, {
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
            name: "SM-4x40B Anti-Arcraft Missile Silo",
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: 45,
            alpha: 35,
            attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Support"]
        }]
    }, {
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
            name: "CBC-2000 Corvette Dock",
            hanger: "Corvette",
            aircraft: "Corvette",
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
            name: "CFB-605 Large Aircraft Hanger",
            hanger: "Large",
            aircraft: "Fighter",
            capacity: 5
        }, {
            type: "hanger",
            count: 1,
            name: "CBC-2100 Corvette Dock",
            hanger: "Corvette",
            aircraft: "Corvette",
            capacity: 3
        }]
    }, {
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
            name: "CFB-605 Large Aircraft Hanger",
            hanger: "Large",
            aircraft: "Fighter",
            capacity: 5
        }, {
            type: "hanger",
            count: 1,
            name: "CIT-5 Field Support UAV Hanger",
            hanger: "Tactical UAV",
            aircraft: "UAV",
            capacity: 5,
            attributes: ["Damage Type: Projectile", "Prioritized Target: Small Ship", "Damage per Hit: 27", "Attack Against Systems (01: Primary Weapon System, low)"]
        }]
    }, {
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
            name: "CFB-605 Large Aircraft Hanger",
            hanger: "Large",
            aircraft: "Fighter",
            capacity: 5
        }, {
            type: "hanger",
            count: 1,
            name: "CFB-400 Aircraft Hanger",
            hanger: "Large",
            aircraft: "Fighter",
            capacity: 3
        }]
    }, {
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
            name: `MK4-C/SG-3480A "Dragoon" Triple-Cannon Heavy Battery`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: null,
            alpha: 200,
            attributes: null
        }, {
            type: "weapon",
            count: 4,
            name: `C/SG-190B "Dragoon" Generic Rapid-Fire Cannon`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: null,
            alpha: 55,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `Bm-12x180T Missile Defense System`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: 60,
            alpha: 52,
            attributes: ["Interception Capability", "Anti-Aircraft Support"]
        }]
    }, {
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
            name: `MK3-SM-6x400B/C "Starfire" Missile Launcher Array`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: null,
            alpha: 70,
            attributes: ["Interception Capability", "Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: "CBC-2100 Corvette Dock",
            hanger: "Corvette",
            aircraft: "Corvette",
            capacity: 3
        }]
    }, {
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
            name: "CITA-2 Field Support UAV Pod",
            hanger: "Info UAV",
            aircraft: "UAV",
            capacity: 3,
            attributes: ["Ship Calibration Support: Increase the Hit Rate of the target ship by 20%"]
        }]
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
            name: `CI-600T Heavy Ion Turret`,
            damageType: "Energy",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 450,
            attributes: null
        }, {
            type: "weapon",
            count: 2,
            name: `CG-2220 Generic Dual-Cannon Battery`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: 10,
            alpha: 120,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `CR-1650 Railgun`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 1000,
            attributes: null
        }, {
            type: "weapon",
            count: 6,
            name: `CG-1105B Generic Cannon`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: null,
            alpha: 20,
            attributes: ["Anti-Aircraft Special Ammo", "Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: "CFB-700 Large Aircraft Hanger",
            hanger: "Large",
            aircraft: "Fighter",
            capacity: 6
        }]
    }, {
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
            name: "CBC-3200 Corvette Dock",
            hanger: "Corvette",
            aircraft: "Corvette",
            capacity: 6
        }]
    }, {
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
            name: "RET-200 Energy Amplification Device",
            attributes: ["Increase Aircraft Damage: Increases primary weapon Damage of carried Antonios aircraft by 15%"]
        }]
    }, {
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
            name: "XGC-200 Precision Guidance System",
            attributes: ["Increase Aircraft Hit Rate: Increases primary weapon Hit Rate of carried Antonios aircraft by 15%"]
        }]
    }, {
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
            name: "CBF-200 Medium Hanger",
            hanger: "Medium",
            aircraft: "Fighter",
            capacity: 4
        }]
    }, {
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
            name: `MK2-CM-4x250A "Storm" Missile Launcher Nest`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: 10,
            alpha: 140,
            attributes: ["Anti-Aircraft Support"]
        }]
    }, {
        type: "unknown",
        identity: "C3"
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
            name: "CBC-3200 Corvette Dock",
            hanger: "Corvette",
            aircraft: "Corvette",
            capacity: 6
        }]
    }, {
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
            name: "CFB-1200 Large Aircraft Hanger",
            hanger: "Large",
            aircraft: "Fighter",
            capacity: 8
        }]
    }, {
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
            name: `BG-2450A Dual-Cannon Heavy Battery`,
            damageType: "Projectile",
            target: "Large Ship",
            lockonEfficiency: null,
            alpha: 320,
            attributes: null
        }, {
            type: "weapon",
            count: 2,
            name: `MK3-BM-8x320 "Lightning Field" Dodeca-Fire Anti-Ship Missile System`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: 10,
            alpha: 220,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `MK5-BM-16x180 "Lightning Field" Anti-Ship Missile Array`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: null,
            alpha: 120,
            attributes: null
        }, {
            type: "weapon",
            count: 2,
            name: `MK3-BM-8x320 "Lightning Field" Dodeca-Fire Anti-Ship Missile System`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: 10,
            alpha: 220,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: `MK3-BM-8x320 "Lightning Field" Dodeca-Fire Anti-Ship Missile System`,
            damageType: "Projectile",
            target: "Small Ship",
            lockonEfficiency: 10,
            alpha: 220,
            attributes: ["Anti-Aircraft Counterattack"]
        }, {
            type: "weapon",
            count: 2,
            name: `BG-2180 Anti-Ship Cannon`,
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: null,
            alpha: 80,
            attributes: ["Anti-Aircraft Counterattack"]
        }]
    }, {
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
            name: "BSY-5000 Large Docking Jetty",
            attributes: ["Aircraft Recovery: Aircraft returning to all hangers recover 10% HP"]
        }]
    }, {
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
            name: "CBC-2000 Corvette Dock",
            hanger: "Corvette",
            aircraft: "Corvette",
            capacity: 3
        }]
    }, {
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
            name: "CFB-600 Aircraft Hanger",
            hanger: "Large",
            aircraft: "Fighter",
            capacity: 5
        }]
    }, {
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
            name: "CST-6 Siege UAV Pod",
            hanger: "Siege UAV",
            aircraft: "UAV",
            capacity: 4,
            attributes: ["Prioritized Target: Building", "Damage per Hit: 724"]
        }]
    }, {
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
            name: "BM-12x180T Missile Defense System",
            damageType: "Projectile",
            target: "Aircraft",
            lockonEfficiency: 60,
            alpha: 50,
            attributes: ["Interception Capability", "Anti-Aircraft Special Ammo", "Anti-Aircraft Support"]
        }]
    }]
}];

export { data };
