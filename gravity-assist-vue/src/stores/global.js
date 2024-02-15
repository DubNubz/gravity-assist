
import { ref } from "vue";

const globalVariables = {
    activeModule: ref("Home"),
    searchActive: ref(false),
    currentSearchShip: ref("Not selected"),
    activeManufacturer: ref("Antonios"),
    activeDirection: ref("Fighter & Corvette"),
    activeScope: ref("Direct-Fire Weapon"),
};

export { globalVariables }
