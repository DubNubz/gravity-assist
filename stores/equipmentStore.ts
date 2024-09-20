
export const equipmentStore = defineStore("equipment", () => {
    const filter = ref<"Equipment" | "Blueprints" | null>(null);
    const current = ref<Equipment | TechnicalBlueprint>();
    const search = ref("");

    return { filter, current, search }
});
