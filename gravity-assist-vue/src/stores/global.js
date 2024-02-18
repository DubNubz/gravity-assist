
import { ref } from "vue";

const globalVariables = {
    // Home
    activeModule: ref("Home"),

    // Color Generator
    inputText: ref(""),
    outputText: ref([""]),
    currentColor: ref("pinkToYellow"),
    currentColorClass: ref("pinkToYellow"),
    reversed: ref(false),

    // RA Helper
    searchActive: ref(false),
    currentSearchShip: ref("Not selected"),
    activeManufacturer: ref("Jupiter Industry"),
    activeDirection: ref("Outstanding Firepower"),
    activeScope: ref("Projectile Weapon"),
    currentManufacturer: ref(0),
    currentDirection: ref(0),
    currentScope: ref(0),
    allManufacturers: ref(["Jupiter Industry", "NOMA Shipping", "Antonios", "Dawn Accord", "Empty"]),
    allDirections: ref(["Outstanding Firepower", "Sustained Combat", "Strategy & Support", "Fighter & Corvette", "Empty"]),
    allScopes: ref(["Projectile Weapon", "Direct-Fire Weapon", "Empty"]),

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
    })
};

export { globalVariables }
