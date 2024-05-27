
export const colorGeneratorStore = defineStore("colorGenerator", () => {
    const inputText = ref("");
    const outputText = ref<string[]> ([]);

    const color1 = ref("#f957ff");
    const color2 = ref("#ffc94d");
    const intensity = ref(15);
    const compression = ref(3);

    return { inputText, outputText, color1, color2, intensity, compression }
});
