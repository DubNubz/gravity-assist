<template>
    <p>{{ resetEverything() }}<span v-for="char in globalVariables.inputText.value">{{ convertInput(char) }}</span>{{ emitStuff() }}</p>
</template>

<script setup>

import { globalVariables } from '@/stores/global';

const props = defineProps({
    Color: Object,
});

let startIndex = 0;
const output = [];
let reverse = false;

function resetEverything () {
    startIndex = 0;
    output.length = 0;
    if (globalVariables.reversed.value) {
        reverse = true;
    } else {
        reverse = false;
    }
}

function convertInput (input) {
    let color;

    if (reverse) {
        color = props.Color.colorPalette.toReversed()[startIndex];
    } else {
        color = props.Color.colorPalette[startIndex];
    }

    if (input == "\n") {
        input = "#r";
        output.push(input);
        return input;

    } else {
        startIndex++;
        if (startIndex >= props.Color.colorPalette.length) {
            startIndex = 0;
            reverse = !reverse;
        }

        output.push(color + input);
        return color + input;
    }
    
}

const emit = defineEmits(['response']);

function emitStuff () {
    emit('response', output);
}

</script>

<style scoped>

p {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

</style>