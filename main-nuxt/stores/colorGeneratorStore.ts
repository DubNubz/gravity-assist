
export const colorGeneratorStore = defineStore("colorGenerator", () => {
    const inputText = ref("");

    function changeInputText (newText: string) {
        inputText.value = newText;
    }

    const color1 = ref("#ffffff");
    const color2 = ref("#000000");
    const intensity = ref(16);
    const compression = ref(1);

    return { inputText, changeInputText, color1, color2, intensity, compression }
});
