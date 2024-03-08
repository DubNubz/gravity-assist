<template>
    <p>{{ resetEverything() }}<span v-for="char in globalVariables.inputText.value" :style="{ color: convertInput(0, char) }">{{ convertInput(1, char) }}</span>{{ emitStuff() }}</p>
</template>

<script setup>

import { globalVariables } from '@/stores/global';

const props = defineProps({
    Color: Object,
});

let startIndex = 0;
let stepCounter = 0;
const output = [];
let reverse = false;
let stepType = 0;

function resetEverything () {
    startIndex = 0;
    output.length = 0;
    if (globalVariables.reversed.value) {
        reverse = true;
    } else {
        reverse = false;
    }
    if (globalVariables.currentColorStep.value == "uncompressed") {
        stepType = 1;
        stepCounter = 1;
    } else if (globalVariables.currentColorStep.value == "compressed") {
        stepType = 2;
        stepCounter = 2;
    } else {
        stepType = 3;
        stepCounter = 3;
    }
}

function convertInput (type, input) {
    let color;

    if (reverse) {
        color = props.Color.colorPalette.slice().reverse()[startIndex];
    } else {
        color = props.Color.colorPalette[startIndex];
    }

    if (type == 0) {
        if (input == "\n") {
            return "#ffffff";
        } else if (input == " ") {
            return "#ffffff";
        } else {
            return color.slice(0, 1) + color.slice(2);
        }
    } else {
        if (input == "\n") {
            input = "#r";
            output.push(input);
            return input;

        } else if (input == " ") {
            input = " ";
            output.push(input);
            return input;

        } else {
            if (stepType == 2 || stepType == 3) {
                stepCounter++;

                if (stepCounter >= stepType) {
                    startIndex++;
                    stepCounter = 0;

                    if (startIndex >= props.Color.colorPalette.length) {
                        startIndex = 0;
                        reverse = !reverse;
                    }

                    output.push(color + input);
                    return color + input;
                } else {
                    output.push(input);
                    return input;
                }

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
    }
    
}

const emit = defineEmits(['response']);

function emitStuff () {
    globalVariables.outputText.value = output;
    globalVariables.outputText.value.push("");
}

</script>

<style scoped>

p {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

</style>