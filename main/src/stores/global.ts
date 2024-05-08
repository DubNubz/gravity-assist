
import { ref } from "vue";
import type { Equipment, TechnicalBlueprint } from "./equipment";
import type { ShipScope, ShipDirection, ShipManufacturer } from "./ra_data";

const globalVariables = {
    // Home
    activeModule: ref("Home"),

    // Color Generator
    inputText: ref(""),
    outputText: ref([""]),
    currentColor: ref("pinkToYellow"),
    currentColorClass: ref("pinkToYellow"),
    reversed: ref(false),
    currentColorStep: ref("uncompressed"),

    // RA Helper
    searchActive: ref(false),
    currentSearchShip: ref("Click to select ship"),
    activeManufacturer: ref<ShipManufacturer>("Jupiter Industry"),
    activeDirection: ref<ShipDirection>("Outstanding Firepower"),
    activeScope: ref<ShipScope>("Projectile Weapon"),
    currentManufacturer: ref(0),
    currentDirection: ref(0),
    currentScope: ref(0),
    allManufacturers: ref<ShipManufacturer[]>(["Jupiter Industry", "NOMA Shipping", "Antonios", "Dawn Accord", "Empty"]),
    allDirections: ref<ShipDirection[]>(["Outstanding Firepower", "Sustained Combat", "Strategy & Support", "Fighter & Corvette", "Empty"]),
    allScopes: ref<ShipScope[]>(["Projectile Weapon", "Direct-Fire Weapon", "Empty"]),
    projectedTime: ref(0),

    // Mod Library
    currentShip: ref(0),
    previousShip: ref(9),
    nextShip: ref(1),
    currentMod: ref({
        "Constantine the Great": "M1",
        "Eternal Storm": "M1",
        "Spear of Uranus": "M1",
        "ST59": "M1",
        "Thunderbolt Star": "M1",
        "Ediacaran": "M1",
        "FSV830": "A1",
        "CV3000": "M1",
        "Eternal Heavens": "M1",
        "Marshal Crux": "M1",
        "Solar Whale": "M1"
    }),

    // Equipment Encyclopedia
    showCard: ref(false),
    currentEquipmentView: ref("Equipment"),
    currentDetailCard: ref<Equipment | TechnicalBlueprint>({
        displayImg: "/equipment/advancedMilitaryOperationCenter.png",
        type: "Equipment",
        displayName: "Advanced Military Operation Center",
        effectName: "Operation Quantity Expansion",
        effectDescription: ["Increases the number of usable operations by ", "X", "."],
        loadWeight: 6,
        class: "Information"
    }),

    // Fleet Builder
    fleetBuild: ref([]),
    aircraftCounter: ref([]),
    reinforcementCounter: ref([]),
    modTracker: ref({
        "Constantine the Great": {
            mModule: "M1",
            aModule: "A1",
            bModule: "B1",
            cModule: "C1",
            dModule: "D1"
        }, "Eternal Storm": {
            mModule: "M1",
            aModule: "A1",
            bModule: "B1",
            cModule: "C1",
            dModule: "D1"
        }, "Spear of Uranus": {
            mModule: "M1",
            aModule: "A1",
            bModule: "B1",
            cModule: "C1"
        }, "ST59": {
            mModule: "M1",
            aModule: "A1",
            bModule: "B1",
            cModule: "C1"
        }, "Thunderbolt Star": {
            mModule: "M1",
            aModule: "A1",
            bModule: "B1",
            cModule: "C1",
            dModule: "D1",
            eModule: "E1"
        }, "Ediacaran": {
            mModule: "M1",
            aModule: "A1",
            bModule: "B1",
            cModule: "C1",
            dModule: "D1"
        }, "FSV830": {
            aModule: "A1",
            bModule: "B1",
            cModule: "C1",
            dModule: "D1",
            eModule: "E1"
        }, "CV3000": {
            mModule: "M1",
            aModule: "A1",
            bModule: "B1"
        }, "Eternal Heavens": {
            mModule: "M1",
            aModule: "A1",
            bModule: "B1",
            cModule: "C1"
        }, "Marshal Crux": {
            mModule: "M1",
            aModule: "A1",
            bModule: "B1",
            cModule: "C1"
        }, "Solar Whale": {
            mModule: "M1",
            aModule: "A1",
            bModule: "B1",
            cModule: ""
        }
    }),
};

export { globalVariables }
