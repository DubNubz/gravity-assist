
/* data needed:
cruiser exclusive shipyard
202 - Resource Request Beacon

*/

const data = [{
    type: "Equipment",
    displayName: "Advanced Military Operation Center",
    nameVariants: null,
    effectName: "Operation Quantity Expansion",
    effectDescription: ["Increases the number of usable operations by ", "."],
    effectDescriptionVariants: ["X"],
    loadWeight: 6,
    class: "Information"
}, {
    type: "Equipment",
    displayName: "Advanced Trade Communication Relay Station",
    nameVariants: null,
    effectName: "Commissioned Production",
    effectDescription: ["Allows commissioned galactic factions to produce ", " with a production time reduction of ", " and a production interval of ", "."],
    effectDescriptionVariants: ["[Fighters/Frigates/Cruisers]", "X%", "X hours"],
    loadWeight: 6,
    class: "Information"
}, {
    type: "Equipment",
    displayName: "Arbiter Planning Center",
    nameVariants: null,
    effectName: "Strategic Reserves",
    effectDescription: ["Increases the storage limit of Action Points by ", "."],
    effectDescriptionVariants: ["X"],
    loadWeight: 7,
    class: "Information"
}, {
    type: "Equipment",
    displayName: "Armed Outpost Control Core",
    nameVariants: null,
    effectName: "Outpost Weaponization Plan",
    effectDescription: ["Unlocks the construction of Armed Outposts. Number of outposts that can be built: ", "."],
    effectDescriptionVariants: ["X"],
    loadWeight: 6,
    class: "Engineering"
}, {
    type: "Equipment",
    displayName: "Auto-repairing Armor",
    nameVariants: null,
    effectName: "Base Maintenance and Upgrades",
    effectDescription: ["Increases the HP Recovery speed of the Base by ", "."],
    effectDescriptionVariants: ["X%"],
    loadWeight: 5,
    class: "Engage"
}, {
    type: "Equipment",
    displayName: "BVR Aircraft Guidance Device",
    nameVariants: null,
    effectName: "Base Strategic Strike",
    effectDescription: ["The Base can execute Strategic Strike ", " to command the Aircraft Defense Fleet in the base to launch a strategic strike on the targets within a ", " fan-shaped area with a ", " radius."],
    effectDescriptionVariants: ["I or II", "X°", "X Gm"],
    loadWeight: 7,
    class: "Engage"
}, {
    type: "Equipment",
    displayName: "Base Defense & Tracking System",
    nameVariants: null,
    effectName: "Base Defense: Multi-Target Counterattack",
    effectDescription: ["When defending the Base, all deployed Flagships in the Defense Fleet gain the flagship skill: Multi-Target Counterattack - When multiple fleets attack the fleet simultaneously, it launches a counterattack against ", " sub-target fleet(s) with a counterattack efficiency of ", "."],
    effectDescriptionVariants: ["X", "X%"],
    loadWeight: 6,
    class: "Engage"
}, {
    type: "Equipment",
    displayName: "Base Platform Fire Control Radar",
    nameVariants: null,
    effectName: "Base Defense: Aggressive Loss",
    effectDescription: ["When defending the base, all Flagships in the Defense Fleet gain the flagship skill: Agressive Loss - All fleet launch a focused and coordinated strike that prioritizes attacking ", " target(s) within range of the selectable target."],
    effectDescriptionVariants: ["X"],
    loadWeight: 6,
    class: "Engage"
}, {
    type: "Equipment",
    displayName: "Battlecruiser Assembly Workshop",
    nameVariants: null,
    effectName: "Battlecruiser Special Assembly Process",
    effectDescription: ["Reduces the building time by ", " when building Battlecruisers in the Base."],
    effectDescriptionVariants: ["X%"],
    loadWeight: 6,
    class: "Efficiency"
}, {
    type: "Equipment",
    displayName: "Combat Microchip Center",
    nameVariants: null,
    effectName: "Combat Microchip Output",
    effectDescription: ["Produces 1 Combat Microchip ", " at the Base every ", ", up to ", "."],
    effectDescriptionVariants: ["(S/M/L)", "X hours", "X"],
    loadWeight: 6,
    class: "Information"
}, {
    type: "Equipment",
    displayName: "Component Integration Platform",
    nameVariants: ["Central District", "Port District", "Industrial District"],
    effectName: "Modular Integration",
    effectDescription: ["Increases the construction speed of ", " facilities by ", "."],
    effectDescriptionVariants: ["nameVariants", "X%"],
    loadWeight: 6,
    class: "Efficiency"
}, {
    type: "Equipment",
    displayName: "Core Module",
    nameVariants: ["Central District", "Port District", "Industrial District"],
    effectName: "Facility Protection Construction Engineering",
    effectDescription: ["Reduces resource consumption by ", " when building and upgrading facilities in the Base ", "."],
    effectDescriptionVariants: ["X%", "nameVariants"],
    loadWeight: 6,
    class: "Logistics"
}, {
    type: "Equipment",
    displayName: "Cruiser Exclusive Shipyard",
    nameVariants: null,
    effectName: "Cruiser Special Assembly Process",
    effectDescription: ["Installs a dedicated shipyard that produces dedicated Company Cruisers with a production speed of ", "."],
    effectDescriptionVariants: ["X%"],
    loadWeight: 6,
    class: "Efficiency"
}, {
    type: "Equipment",
    displayName: "Large Outpost Control Core",
    nameVariants: null,
    effectName: "Outpost Region Control Plan",
    effectDescription: ["Unlocks the construction of ", " Large Outpost(s) (Operation Area 2x2)."],
    effectDescriptionVariants: ["X"],
    loadWeight: 6,
    class: "Engineering"
}, {
    type: "Equipment",
    displayName: "Quick Outpost Control Core",
    nameVariants: null,
    effectName: "Outpost Coordinating Production Engineering",
    effectDescription: ["Unlock the construction of Quick Outposts. Number of outposts of this type that can be built: ", "."],
    effectDescriptionVariants: ["X"],
    loadWeight: 6,
    class: "Engineering"
}, {
    type: "Equipment",
    displayName: "Resource Mining UAV Squadron",
    nameVariants: null,
    effectName: "Interstellar Space Dust Fixation Technology",
    effectDescription: ["Increases the ", " yield by ", " when the Base is in a Scattered Asteroid Belt."],
    effectDescriptionVariants: ["[Metal/Crytal/Deuterium]", "X%"],
    loadWeight: 6,
    class: "Engineering"
}, {
    type: "Equipment",
    displayName: "Ship Production Coordination Controller",
    nameVariants: null,
    effectName: "Shipyard Queue Coordination Technology",
    effectDescription: ["Increases the production queue limit of the Base shipyard by ", ", which can be allocated to build ships of ", "."],
    effectDescriptionVariants: ["X", "[either Jupiter Industries, NOMA Shipping, Antonios, or Dawn Accord]"],
    loadWeight: 5,
    class: "Efficiency"
}, {
    type: "Equipment",
    displayName: "Standard Parts Assembly Facility",
    nameVariants: ["Jupiter Industries", "NOMA Shipping", "Antonios", "Dawn Accord"],
    effectName: "Ship Production Process Optimization",
    effectDescription: ["Reduces resource consumption by ", " when building ", " ships in the Base."],
    effectDescriptionVariants: ["X%", "nameVariants"],
    loadWeight: 6,
    class: "Logistics"
}, {
    type: "Technical Blueprint",
    displayName: "Hector Remote-Control Mining UAV",
    effectName: "Remote Mining",
    effectDescription: ["Makes a delivery to any of your operations and mines a resource node inside the operation once, collecting ", " resources."],
    effectDescriptionVariants: ["X"],
    deliveryTarget: "Range",
    itemMass: "Heavy",
    activeService: 5,
    productionInterval: 2,
    class: "Supply"
}, {
    type: "Technical Blueprint",
    displayName: "202 - Resource Request Beacon",
    effectName: "Resource Supply",
    effectDescription: "Requests a rather small amount of random resource packs from a Neutral or Ally-controlled Space Station.",
    effectDescriptionVariants: null,
    deliveryTarget: "",
    itemMass: "",
    activeService: 0,
    productionInterval: 0,
    class: ""
}, {
    
}];

export { data }
