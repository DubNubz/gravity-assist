import type { ShipDirection, ShipScope, ShipManufacturer } from "~/utils/shipData";

export const raHelperStore = defineStore("raHelper", () => {
    const manufacturer = ref<ShipManufacturer>("Jupiter Industry");
    const direction = ref<ShipDirection>("Outstanding Firepower");
    const scope = ref<ShipScope>("Projectile Weapon");
    const ship = ref<Ship>();
    const variant = ref<"A" | "B" | "C" | "D">("A");
    const search = ref("");

    return { manufacturer, direction, scope, ship, variant, search }
});
