
export const modLibraryStore = defineStore("modLibrary", () => {
    const ship = ref<Ship>();
    const category = ref("M");
    const mod = ref(1);

    return { ship, category, mod }
});
