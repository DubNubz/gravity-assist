
export const shipComparisonStore = defineStore("shipComparison", () => {
    const ship1 = ref<Ship> ();
    const ship2 = ref<Ship> ();

    return { ship1, ship2 }
});
