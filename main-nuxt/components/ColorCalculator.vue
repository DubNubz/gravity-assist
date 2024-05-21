<template>
    <div class="holder2">
        <p><span v-for="char in output" :style="{ color: getColor(char) }">{{ char }}</span></p>
    </div>
</template>

<script setup lang="ts">

const output = ref<string[]> ([]);
const gradientColors = ref<string[]> ([]);

onMounted(() => generateGradient());

watch(() => colorGeneratorStore().inputText, () => generateText());
watch(() => colorGeneratorStore().compression, () => generateText());
watch(() => colorGeneratorStore().color1, () => {
    generateGradient();
    generateText();
});
watch(() => colorGeneratorStore().color2, () => {
    generateGradient();
    generateText();
});
watch(() => colorGeneratorStore().intensity, () => {
    generateGradient();
    generateText();
});

let previousColor = "";

function getColor (char: string) {
    if (char.length == 1) return previousColor;
    const color = "#" + char.slice(2, -1);
    previousColor = color;
    return color;
}

function generateText () {
    output.value.length = 0;
    previousColor = "";
    const inputText = colorGeneratorStore().inputText;

    let counter = colorGeneratorStore().compression + 1;
    let gradientCounter = 0;
    let reversed = false;

    for (let i = 0; i < inputText.length; i++) {
        if (counter <= colorGeneratorStore().compression) {
            counter++;
            output.value.push(`${inputText[i]}`);
        } else {
            counter = 0;
            output.value.push(`#c${gradientColors.value[gradientCounter].slice(1)}${inputText[i]}`);
            reversed ? gradientCounter-- : gradientCounter++;
            if (gradientCounter == gradientColors.value.length - 1 || gradientCounter == 0) reversed = !reversed;
        }
    }
}

function generateGradient () {
    const startColor = hexToRgb(colorGeneratorStore().color1);
    const endColor = hexToRgb(colorGeneratorStore().color2);
    const step = colorGeneratorStore().intensity;

    const gradient: string[] = [];

    for (let i = 0; i <= step; i++) {
        const ratio = i / step;
        const r = Math.round(startColor.r * (1 - ratio) + endColor.r * ratio);
        const g = Math.round(startColor.g * (1 - ratio) + endColor.g * ratio);
        const b = Math.round(startColor.b * (1 - ratio) + endColor.b * ratio);
        gradient.push(rgbToHex(r, g, b));
    }

    gradientColors.value = gradient;
}

function hexToRgb (hex: string) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

function rgbToHex (r: number, g: number, b: number) {
    function toHex (color: number) {
        const hex = color.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

</script>

<style lang="scss" scoped>

.holder2 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: center;

    p {
        display: flex;
        margin: 0;
        flex-wrap: wrap;
        justify-content: center;
    }
}

</style>