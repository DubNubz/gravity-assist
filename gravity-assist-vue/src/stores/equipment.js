
/* data needed:
arbiter
bvr aircraft
armed outpost
*/

const data = [{
    displayImg: "/equipment/advancedMilitaryOperationCenter.png",
    type: "Equipment",
    displayName: "Advanced Military Operation Center",
    effectName: "Operation Quantity Expansion",
    effectDescription: ["Increases the number of usable operations by ", "X", "."],
    loadWeight: 6,
    class: "Information"
}, {
    displayImg: "/equipment/antoniosStandardPartsAssemblyFacility.png",
    type: "Equipment",
    displayName: "Antonios Standard Parts Assembly Facility",
    effectName: "Ship Production Process Optimization",
    effectDescription: ["Reduces resource consumption by ", "X%", " when building Antonios Consortium ships in the Base."],
    loadWeight: 6,
    class: "Logistics"
}, {
    displayImg: "/equipment/arbiterPlanningCenter.png",
    type: "Equipment",
    displayName: "Arbiter Planning Center",
    effectName: "Strategic Reserves",
    effectDescription: ["Increases the storage limit of Action Points by ", "X", "."],
    loadWeight: 7,
    class: "Information"
}, {
    displayImg: "/equipment/armedOutpostControlCore.png",
    type: "Equipment",
    displayName: "Armed Outpost Control Core",
    effectName: "Outpost Weaponization Plan",
    effectDescription: ["Unlocks the construction of Armed Outposts. Number of outposts that can be built: ", "X", "."],
    loadWeight: 6,
    class: "Engineering"
}, {
    displayImg: "/equipment/autoRepairingArmor.png",
    type: "Equipment",
    displayName: "Auto-repairing Armor",
    effectName: "Base Maintenance and Upgrades",
    effectDescription: ["Increases the HP Recovery speed of the Base by ", "X%", "."],
    loadWeight: 5,
    class: "Engage"
}, {
    displayImg: "/equipment/bvrAircraftGuidanceDevice.png",
    type: "Equipment",
    displayName: "BVR Aircraft Guidance Device",
    effectName: "Base Strategic Strike",
    effectDescription: ["The Base can execute Strategic Strike ", "[I or II]", 
    " to command the Aircraft Defense Fleet in the base to launch a strategic strike on the targets within a ", "X°", 
    " fan-shaped area with a ", "X Gm", " radius."],
    loadWeight: 7,
    class: "Engage"
}, {
    displayImg: "/equipment/baseDefenseAndTrackingSystem.png",
    type: "Equipment",
    displayName: "Base Defense & Tracking System",
    effectName: "Base Defense: Multi-Target Counterattack",
    effectDescription: ["When defending the Base, all deployed Flagships in the Defense Fleet gain the flagship skill: Multi-Target Counterattack - When multiple fleets attack the fleet simultaneously, it launches a counterattack against ", 
    "X", " sub-target fleet(s) with a counterattack efficiency of ", "X%", "."],
    loadWeight: 6,
    class: "Engage"
}, {
    displayImg: "/equipment/basePlatformFireControlRadar.png",
    type: "Equipment",
    displayName: "Base Platform Fire Control Radar",
    effectName: "Base Defense: Aggressive Loss",
    effectDescription: ["When defending the base, all Flagships in the Defense Fleet gain the flagship skill: Agressive Loss - All fleet launch a focused and coordinated strike that prioritizes attacking ", 
    "X", " target(s) within range of the selectable target."],
    loadWeight: 6,
    class: "Engage"
}, {
    displayImg: "/equipment/battlecruiserAssemblyWorkshop.png",
    type: "Equipment",
    displayName: "Battlecruiser Assembly Workshop",
    effectName: "Battlecruiser Special Assembly Process",
    effectDescription: ["Reduces the building time by ", "X%", " when building Battlecruisers in the Base."],
    loadWeight: 6,
    class: "Efficiency"
}, {
    displayImg: "/equipment/centralDistrictComponentIntegrationPlatform.png",
    type: "Equipment",
    displayName: "Central District Component Integration Platform",
    effectName: "Modular Integration",
    effectDescription: ["Increases the construction speed of Central District facilities by ", "X%", "."],
    loadWeight: 6,
    class: "Efficiency"
}, {
    displayImg: "/equipment/centralDistrictCoreModule.png",
    type: "Equipment",
    displayName: "Central District Core Module",
    effectName: "Facility Protection Construction Engineering",
    effectDescription: ["Reduces resource consumption by ", "X%", " when building and upgrading facilities in the Base Central District."],
    loadWeight: 6,
    class: "Logistics"
}, {
    displayImg: "/equipment/combatMicrochipCenter.png",
    type: "Equipment",
    displayName: "Combat Microchip Center",
    effectName: "Combat Microchip Output",
    effectDescription: ["Produces 1 Combat Microchip ", "(S/M/L)", " at the Base every ", "X hours", ", up to ", "X", "."],
    loadWeight: 6,
    class: "Information"
}, {
    displayImg: "/equipment/cruiserExclusiveShipyard.png",
    type: "Equipment",
    displayName: "Cruiser Exclusive Shipyard",
    effectName: "Cruiser Special Assembly Process",
    effectDescription: ["Installs a dedicated shipyard that produces dedicated Company Cruisers with a production speed of ", "X%", "."],
    loadWeight: 6,
    class: "Efficiency"
}, {
    displayImg: "/equipment/industrialDistrictComponentIntegrationPlatform.png",
    type: "Equipment",
    displayName: "Industrial District Component Integration Platform",
    effectName: "Modular Integration",
    effectDescription: ["Increases the construction speed of Industrial District facilities by ", "X%", "."],
    loadWeight: 6,
    class: "Efficiency"
}, {
    displayImg: "/equipment/industrialDistrictCoreModule.png",
    type: "Equipment",
    displayName: "Industrial District Core Module",
    effectName: "Facility Protection Construction Engineering",
    effectDescription: ["Reduces resource consumption by ", "X%", " when building and upgrading facilities in the Base Industrial District."],
    loadWeight: 6,
    class: "Logistics"
}, {
    displayImg: "/equipment/jupiterStandardPartsAssemblyFacility.png",
    type: "Equipment",
    displayName: "Jupiter Industries Standard Parts Assembly Facility",
    effectName: "Ship Production Process Optimization",
    effectDescription: ["Reduces resource consumption by ", "X%", " when building Jupiter Industries ships in the Base."],
    loadWeight: 6,
    class: "Logistics"
}, {
    displayImg: "/equipment/largeOutpostControlCore.png",
    type: "Equipment",
    displayName: "Large Outpost Control Core",
    effectName: "Outpost Region Control Plan",
    effectDescription: ["Unlocks the construction of ", "X", " Large Outpost(s) (Operation Area 2x2)."],
    loadWeight: 6,
    class: "Engineering"
}, {
    displayImg: "/equipment/nomaStandardPartsAssemblyFacility.png",
    type: "Equipment",
    displayName: "NOMA Standard Parts Assembly Facility",
    effectName: "Ship Production Process Optimization",
    effectDescription: ["Reduces resource consumption by ", "X%", " when building NOMA Shipping Group ships in the Base."],
    loadWeight: 6,
    class: "Logistics"
}, {
    displayImg: "/equipment/portDistrictComponentIntegrationPlatform.png",
    type: "Equipment",
    displayName: "Port District Component Integration Platform",
    effectName: "Modular Integration",
    effectDescription: ["Increases the construction speed of Port District facilities by ", "X%", "."],
    loadWeight: 6,
    class: "Efficiency"
}, {
    displayImg: "/equipment/portDistrictCoreModule.png",
    type: "Equipment",
    displayName: "Port District Core Module",
    effectName: "Facility Protection Construction Engineering",
    effectDescription: ["Reduces resource consumption by ", "X%", " when building and upgrading facilities in the Base Port District."],
    loadWeight: 6,
    class: "Logistics"
}, {
    displayImg: "/equipment/quickOutpostControlCore.png",
    type: "Equipment",
    displayName: "Quick Outpost Control Core",
    effectName: "Outpost Coordinating Production Engineering",
    effectDescription: ["Unlock the construction of Quick Outposts. Number of outposts of this type that can be built: ", "X", "."],
    loadWeight: 6,
    class: "Engineering"
}, {
    displayImg: "/equipment/resourceMiningUAVSquadron.png",
    type: "Equipment",
    displayName: "Resource Mining UAV Squadron",
    effectName: "Interstellar Space Dust Fixation Technology",
    effectDescription: ["Increases the ", "[Metal/Crytal/Deuterium]", " yield by ", "X%", " when the Base is in a Scattered Asteroid Belt."],
    loadWeight: 6,
    class: "Engineering"
}, {
    displayImg: "/equipment/dawnStandardPartsAssemblyFacility.png",
    type: "Equipment",
    displayName: "SPL Dawn Standardized Module Assembly Facility",
    effectName: "Ship Production Process Optimization",
    effectDescription: ["Reduces resource consumption by ", "X%", " when building Dawn Accord Organization ships in the Base."],
    loadWeight: 6,
    class: "Logistics"
}, {
    displayImg: "/equipment/productionCoordinationController.png",
    type: "Equipment",
    displayName: "Ship Production Coordination Controller",
    effectName: "Shipyard Queue Coordination Technology",
    effectDescription: ["Increases the production queue limit of the Base shipyard by ", "X", 
    ", which can be allocated to build ships of ", "[a Manufacturing Company]", "."],
    loadWeight: 5,
    class: "Efficiency"
}, {
    displayImg: "/equipment/tradeCommunicationRelayStation.png",
    type: "Equipment",
    displayName: "Trade Communication Relay Station",
    effectName: "Commissioned Production",
    effectDescription: ["Allows commissioned galactic factions to produce ", "[Fighters/Frigates/Cruisers]", 
    " with a production time reduction of ", "X%", " and a production interval of ", "X hours", "."],
    loadWeight: 6,
    class: "Information"
}, {
    displayImg: "/techBlueprints/aircraftLogisticsDevice.png",
    type: "Technical Blueprint",
    displayName: "Aircraft Logistics Device",
    effectName: "Reinforcement Aircraft",
    effectDescription: ["Makes a delivery to your own fleets, reinforcing up to ", "X [Aircraft/Corvette]", " squadron(s)."],
    deliveryTarget: "Single",
    itemMass: "Heavy",
    activeService: 5,
    productionInterval: "2 days",
    class: "Supply"
}, {
    displayImg: "/techBlueprints/hectorRemoteControlMiningUAV.png",
    type: "Technical Blueprint",
    displayName: "Hector Remote-Control Mining UAV",
    effectName: "Remote Mining",
    effectDescription: ["Makes a delivery to any of your operations and mines a resource node inside the operation once, collecting ", "X", " resources."],
    deliveryTarget: "Range",
    itemMass: "Heavy",
    activeService: 5,
    productionInterval: "2 days",
    class: "Supply"
}, {
    displayImg: "/techBlueprints/highIntensityWarpStabilizer.png",
    type: "Technical Blueprint",
    displayName: "High-Intensity Warp Stabilizer",
    effectName: "Warp Sharing",
    effectDescription: ["This can be launched anywhere within your activated Operation Area to generate a temporary Warping Stability Zone in the operation the target belong to. Friendly ships can warp drive to this operation at the speed of ",
    "X%", ". The warp stabilizing effect lasts for ", "X hours", "."],
    deliveryTarget: "Range",
    itemMass: "Light",
    activeService: 2,
    productionInterval: "2 days",
    class: "Strategy"
}, {
    displayImg: "/techBlueprints/highPowerBroadcastBeacon.png",
    type: "Technical Blueprint",
    displayName: "High Power Broadcast Beacon",
    effectName: "Star System Broadcast",
    effectDescription: ["Allows information to be broadcast in the airspace within, ", "X Gm", " for ", "X hours", " after this is launched to an activated Operation."],
    deliveryTarget: "Range",
    itemMass: "Light",
    activeService: 5,
    productionInterval: "2 days",
    class: "Communicate"
}, {
    displayImg: "/techBlueprints/militaryInformationConcealmentEquipment.png",
    type: "Technical Blueprint",
    displayName: "Military Information Concealment Equipment",
    effectName: "Vision Obscuration",
    effectDescription: ["Generates a temporary information and communication barrier with a radius of ", "X Gm", " at the activated operation. Up to ", "X",
    " fleet(s) of the same Squad/Community members in the barrier airspace will not be exposed to the direct vision of the opposing fleet for ", "X hours", "."],
    deliveryTarget: "Range",
    itemMass: "Light",
    activeService: 2,
    productionInterval: "2 days",
    class: "Strategy"
}, {
    displayImg: "/techBlueprints/operationCoordinationSatellite.png",
    type: "Technical Blueprint",
    displayName: "Operation Coordination Satellite",
    effectName: "Operation Expansion",
    effectDescription: ["Expands the scope of your activated Fleet Operation Area by ", "X%", " for ", "X hours", "."],
    deliveryTarget: "Range",
    itemMass: "Light",
    activeService: 2,
    productionInterval: "2 days",
    class: "Strategy"
}, {
    displayImg: "/techBlueprints/festivePlasmaUAVSquadron.png",
    type: "Technical Blueprint",
    displayName: "Plasma UAV Squadron",
    effectName: "Festival Fireworks",
    effectDescription: ["Performs plasma UAV shows in the airspace around your buildings this is launched to for ", "X hours", "."],
    deliveryTarget: "Single",
    itemMass: "Light",
    activeService: 2,
    productionInterval: "2 days",
    class: "Communicate"
}, {
    displayImg: "/techBlueprints/prefabModuleTransporationUAV.png",
    type: "Technical Blueprint",
    displayName: "Prefab Module Transportation UAV",
    effectName: "Prefab Module Delivery",
    effectDescription: ["Makes a delivery to your own fleets, delivering up to ", "X", " Prefab Module(s) from the Base."],
    deliveryTarget: "Single",
    itemMass: "Heavy",
    activeService: 5,
    productionInterval: "2 days",
    class: "Supply"
}, {
    displayImg: "/techBlueprints/privateerInfoRecognitionJammer.png",
    type: "Technical Blueprint",
    displayName: "Privateer Info Recognition Jammer",
    effectName: "Fleet Recognition Jammer",
    effectDescription: ["Can be used on a friendly fleet to change its Expanse Livery to the Privateer fleet version for ", "X hours", "."],
    deliveryTarget: "Single",
    itemMass: "Light",
    activeService: 2,
    productionInterval: "2 days",
    class: "Command"
}, {
    displayImg: "/techBlueprints/reconnaissanceSatellite.png",
    type: "Technical Blueprint",
    displayName: "Reconnaissance Satellite",
    effectName: "Battlefield Reconnaissance",
    effectDescription: ["Makes a delivery to the operation, immediately conducting reconnaissance on up to ", "X",
    " non-friendly fleet(s) in the operation receiving the delivery, and generating corresponding reconnaissance battle reports. The chance of the reconnaissance being detected is ",
    "X%", "."],
    deliveryTarget: "Range",
    itemMass: "Light",
    activeService: 2,
    productionInterval: "2 days",
    class: "Command"
}, {
    displayImg: "/techBlueprints/resourceRequestBeacon.png",
    type: "Technical Blueprint",
    displayName: "Resource Request Beacon",
    effectName: "Resource Supply",
    effectDescription: ["Requests a rather small amount of random resource packs from a Neutral or Ally-controlled Space Station."],
    deliveryTarget: "Single",
    itemMass: "Heavy",
    activeService: 5,
    productionInterval: "2 days",
    class: "Supply"
}, {
    displayImg: "/techBlueprints/spaceOperationPlanningCoordinator.png",
    type: "Technical Blueprint",
    displayName: "Space Operation Planning Coordinator",
    effectName: "Strategic Planning",
    effectDescription: ["Reduces the Action Points consumed by the next ", "X", " delivery operation(s) of fleets by ", "X", " for ", "X hours", "."],
    deliveryTarget: "Range",
    itemMass: "Light",
    activeService: 2,
    productionInterval: "2 days",
    class: "Command"
}];

export { data }
