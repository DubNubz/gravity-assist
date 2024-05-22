<template>
    <div class="holder">
        <div class="boxes">
            <div class="boxArea">
                <h2>Input</h2>
                <textarea class="textBox"
                v-model="colorGeneratorStore().inputText"
                @keydown.enter.prevent="addNewLine"
                placeholder="Click here to start typing!"></textarea>
            </div>
            <div class="boxArea">
                <h2>Output</h2>
                <div class="textBox">
                    <div class="buttonDiv">
                        <button class="boxButton" @click="copyToClipboard" id="copy" :class="{ disabledButton: colorGeneratorStore().outputText.length == 0 }">
                            <img src="/copy.svg" alt="Copy text to clipboard">
                            <h3>Copy</h3>
                        </button>
                        <button class="boxButton" @click="copyShareLink" id="share">
                            <img src="/share.svg" alt="Share this tool">
                            <h3>Share</h3>
                        </button>
                    </div>
                    <ColorCalculator/>
                    <h3 class="characterCounter"><span :style="determineCounterColor()">{{ colorGeneratorStore().outputText.join('').length }}</span> /
                        <span v-if="colorGeneratorStore().outputText.join('').length <= 280">280 characters (chat message)</span>
                        <span v-else>1000 characters (mail)</span>
                    </h3>
                </div>
            </div>
        </div>

        <div class="colorPicker">
            <div class="colorPick">
                <div class="colorPickTitle">
                    <h3>Start</h3>
                    <input type="color" v-model="colorGeneratorStore().color1">
                </div>
                <img src="/rightArrow.svg" alt="The color on the left will be the start of the color gradient, and the color on the right will be the end.">
                <div class="colorPickTitle">
                    <h3>End</h3>
                    <input type="color" v-model="colorGeneratorStore().color2">
                </div>
            </div>
            <div class="presetPick">
                <h3>Or, pick from my selection of <span>preset gradients</span></h3>
                <button @click="openPresets = !openPresets" :class="{ close: openPresets }">
                    <h3 v-if="!openPresets">Open</h3>
                    <h3 v-else>Close</h3>
                </button>
            </div>
        </div>

        <div class="recentColors" v-if="recentColors.length != 0" :style="determineBorder()">
            <h2>Your previous colors</h2>
            <div class="recentColorsButtons">
                <button v-for="color in recentColors"
                @click="changeColor(color)"
                :style="{ background: `linear-gradient(to bottom right, ${color.color1}, ${color.color2})` }"></button>
            </div>
        </div>

        <Transition name="recentColorsTransition">
            <div class="recentColors preset" v-if="openPresets">
                <h2>Preset gradients</h2>
                <div class="presetColorsButtons">
                    <button v-for="color in presetColors"
                    @click="changeColor(color)"
                    :style="{ background: `linear-gradient(to bottom right, ${color.color1}, ${color.color2})` }"></button>
                </div>
            </div>
        </Transition>

        <div class="title" style="margin-top: 5em; margin-bottom: 3em;">
            <h1>Advanced Options</h1>
        </div>

        <div class="advanced">
            <div class="sampleText">
                <h2>Sample Text</h2>
                <SampleText />
            </div>

            <div class="options">
                <div class="option">
                    <h2>Intensity</h2>
                    <h3>Number of colors between start and end</h3>
                    <input type="range" min="1" max="29" v-model="colorGeneratorStore().intensity">
                    <input type="number" min="1" max="29" v-model="colorGeneratorStore().intensity">
                </div>
                <div class="option">
                    <h2>Compression</h2>
                    <h3>Number of characters per color</h3>
                    <input type="range" min="1" max="5" v-model="colorGeneratorStore().compression">
                    <input type="number" min="1" max="5" v-model="colorGeneratorStore().compression">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const route = useRoute();
const openPresets = ref(false);
const recentColors = ref<Color[]>([]);

onMounted(() => {
    const lastColors = localStorage.getItem("recent-colors");
    if (lastColors) recentColors.value = JSON.parse(lastColors);

    const color1 =  route.query.start as string;
    const color2 = route.query.end as string;
    const intensity = route.query.intensity as string;
    const compression = route.query.compression as string;
    const text = route.query.text as string;
    if (color1) colorGeneratorStore().color1 = "#" + color1;
    if (color2) colorGeneratorStore().color2 = "#" + color2;
    if (intensity) colorGeneratorStore().intensity = Number(intensity);
    if (compression) colorGeneratorStore().compression = Number(compression);
    if (text) colorGeneratorStore().inputText = text;
});

function determineCounterColor () {
    const outputLength = colorGeneratorStore().outputText.join("").length;

    const green = { color: "#00ff00" };
    const yellow = { color: "#ffff00" };
    const orange = { color: "#ffa600" };
    const red = { color: "#ff0000" };
    const black = { color: "#ff0000", backgroundColor: "black", paddingLeft: "0.5em", paddingRight: "0.5em", borderRadius: "1em" };

    if (outputLength > 1000) return black;
    else if (outputLength >= 900) return red;
    else if (outputLength >= 700) return orange;
    else if (outputLength >= 450) return yellow;
    else if (outputLength > 280) return green;

    else if (outputLength >= 250) return black;
    else if (outputLength >= 175) return red;
    else if (outputLength >= 125) return yellow;
    else if (outputLength >= 75) return orange;
    else return green;
}

function determineBorder () {
    if (openPresets.value == true) return {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    }
}

function changeColor (color: Color) {
    colorGeneratorStore().color1 = color.color1;
    colorGeneratorStore().color2 = color.color2;
    colorGeneratorStore().intensity = color.intensity;
    colorGeneratorStore().compression = color.compression;
}

function addNewLine (event: KeyboardEvent) {
    if (event.key == "Enter") colorGeneratorStore().inputText += "\n";
}

async function copyToClipboard () {
    const text = colorGeneratorStore().outputText.join("");
    if (text == "") return;
    await navigator.clipboard.writeText(text);
    alert("Text copied!")

    const colorObject: Color = {
        color1: colorGeneratorStore().color1,
        color2: colorGeneratorStore().color2,
        intensity: colorGeneratorStore().intensity,
        compression: colorGeneratorStore().compression
    }

    let fromLocalStorage: Color[] | null = JSON.parse(localStorage.getItem("recent-colors") as string);
    if (fromLocalStorage) {
        if (fromLocalStorage.some((obj) => compareObjects(obj, colorObject))) return;
        if (fromLocalStorage.length >= 4) fromLocalStorage = fromLocalStorage.slice(1, 4);

        fromLocalStorage.push(colorObject);
        console.log(fromLocalStorage)

        localStorage.setItem("recent-colors", JSON.stringify(fromLocalStorage));
        recentColors.value = fromLocalStorage;
        return;
    }

    localStorage.setItem("recent-colors", JSON.stringify([colorObject]));
    recentColors.value = [colorObject];
}

async function copyShareLink () {
    const color1 = colorGeneratorStore().color1.slice(1);
    const color2 = colorGeneratorStore().color2.slice(1);
    const intensity = colorGeneratorStore().intensity;
    const compression = colorGeneratorStore().compression;
    const text = colorGeneratorStore().inputText.replaceAll(" ", "%20");
    await navigator.clipboard.writeText(`https://gravityassist.xyz/modules/color-generator?start=${color1}&end=${color2}&intensity=${intensity}&compression=${compression}&text=${text}`);
    alert("Link copied!");
}

</script>

<style lang="scss" scoped>

.holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title {
    display: flex;
    justify-content: center;
    width: 100vw;
    background: linear-gradient(to bottom, transparent, rgb(36, 36, 36), transparent);
}

.boxArea {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.boxes {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3em;
    margin-bottom: 2em;

    .textBox {
      background-color: rgb(60, 60, 60);
      min-height: 12.5em;
      height: fit-content;
      width: 25em;
      margin: auto;
      font-size: var(--h3);
      color: white;
      resize: none;
      border-color: #48005e;
      border-radius: 2em;
      padding: 1em;
      outline-color: #48005e;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 5em;
      }
    }
    .textBox::placeholder {
        color: white;
    }

    .buttonDiv {
        display: flex;
        width: 75%;
        justify-content: space-around;
        margin-bottom: 1em;

        .boxButton {
            width: 45%;
            height: 6em;
            border-radius: 1.5em;
            transition: all 0.25s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10%;
            filter: grayscale(0.33);
          
            h3 {
              margin: 0;
              text-align: center;
              width: fit-content;
              height: fit-content;
              font-size: var(--h3);
            }
          
            img {
              width: 4.5em;
              height: 4.5em;
              background-color: transparent;
            }
        }

        .disabledButton {
            filter: grayscale(1);
        }

        #copy {
            background-color: var(--deepGreen);
        }
        #share {
            background-color: var(--cyan);
        }
    }
}

.colorPicker {
    background-color: rgb(50, 50, 50);
    width: 100em;
    height: 25em;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 3em;
    border-radius: 4em;
    padding-left: 7em;
    padding-right: 7em;
    z-index: 5001;
    
    .colorPick {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45%;
        height: 90%;

        .colorPickTitle {
            display: flex;
            flex-direction: column;
            align-items: center;

            h3 {
                margin: 0.25em;
                font-size: 2.5em;
            }
        }
    }

    .presetPick {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        width: 45%;
        height: 90%;

        h3 {
            font-size: 2.75em;
            text-align: center;
            margin: 0;
            width: 90%;

            span {
                color: transparent;
                background: linear-gradient(to right, #ff4646, #ffbb00, #bbff00, #00ff4c, #00ffff, #00c3ff, #ff3eff);
                background-clip: text;
                width: fit-content;
            }
        }

        button {
            width: 60%;
            height: 6em;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--deepGreen);
            filter: grayscale(0.33);
            transition: all 0.25s;
            border-radius: 1.5em;
        }

        .close {
            background-color: #ff5050;
            filter: grayscale(0.15);
        }
    }

    input {
        width: 12.5em;
        height: 12.5em;
        padding: 0;
        border: 0;
        background-color: transparent;
        transition: all 0.25s;
    }
    input::-webkit-color-swatch {
        border-radius: 2em;
    }
    input::-moz-color-swatch {
        border-radius: 2em;
    }
    
    img {
        width: 10em;
    }
}

.recentColorsTransition-enter-active, .recentColorsTransition-leave-active {
    transition: all 0.5s ease-in-out;
}

.recentColorsTransition-enter-from, .recentColorsTransition-leave-to {
    opacity: 0.001;
    transform: translateY(-27em);
}

.recentColors {
    background-color: rgb(40, 40, 40);
    width: 100em;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 4em;
    border-bottom-right-radius: 4em;
    padding-top: 2em;
    padding-bottom: 3em;
    z-index: 5000;

    h2 {
        margin-top: 0;
        margin-bottom: 0.5em;
    }

    .recentColorsButtons {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;

        button {
            width: 18em;
            height: 6em;
            border-style: solid;
            border-width: 0.15em;
            border-radius: 1.5em;
            transition: all 0.25s;
        }
    }

    .presetColorsButtons {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        width: 90%;

        button {
            width: 18em;
            height: 6em;
            border-style: solid;
            border-width: 0.15em;
            border-radius: 1.5em;
            transition: all 0.25s;
            margin-bottom: 1em;
        }
    }
}

.preset {
    z-index: 4999;
}

.characterCounter {
    font-size: 0.85em;
    margin: 0;
    margin-top: auto;
}

.advanced {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 7em;

    .sampleText {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgb(35, 35, 35);
        width: 100em;
        padding: 2em;
        border-radius: 4em;
        height: 20em;

        h2 {
            margin: 0;
            margin-bottom: 0.5em;
        }
    }

    .options {
        margin-top: 3em;
        display: flex;
        width: 100em;
        align-items: center;
        justify-content: center;
        gap: 5%;

        .option {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 40%;
            padding: 3em;
            border-radius: 3em;
            background-color: rgb(35, 35, 35);

            h2 {
                margin: 0;
            }

            input[type="range"] {
                width: 90%;
            }

            input[type="number"] {
                margin-top: 0.75em;
                font-size: 2em;
                text-align: center;
                border-radius: 0.35em;
                border-width: 0.1em;
                border-style: solid;
            }
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .boxes .buttonDiv .boxButton:hover {
        filter: grayscale(0);
    }

    .boxes .buttonDiv .disabledButton:hover {
        filter: grayscale(1);
    }
    
    .colorPicker .presetPick button:hover {
        filter: grayscale(0);
    }

    .colorPick input:hover {
        transform: scale(1.05);
    }

    .recentColors .recentColorsButtons button:hover {
        transform: scale(1.05);
    }

    .recentColors .presetColorsButtons button:hover {
        transform: scale(1.05);
    }
}

</style>