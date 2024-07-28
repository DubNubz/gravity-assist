
export const shipDataStore = defineStore("shipData", () => {
    const shipData = ref<Ship[]>([]);

    return { shipData }
});
