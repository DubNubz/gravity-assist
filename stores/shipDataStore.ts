
export const shipDataStore = defineStore("shipData", () => {
    const shipData = ref<Ship[]>();
    const equipmentData = ref<(Equipment | TechnicalBlueprint)[]>();

    return { shipData, equipmentData }
});
