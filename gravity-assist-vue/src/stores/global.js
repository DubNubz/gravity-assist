
import { ref } from "vue";

const globalVariables = {
    activeModule: ref("Home"),
    searchActive: ref(false),
    currentSearchShip: ref("Not selected"),
    activeManufacturer: ref("Jupiter Industry"),
    activeDirection: ref("Outstanding Firepower"),
    activeScope: ref("Projectile Weapon"),
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
