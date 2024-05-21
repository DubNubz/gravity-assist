<template>
    <div class="holder">
        <div class="title">
            <h1>Color Generator</h1>
        </div>

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
                        <button class="boxButton" @click="copyToClipboard" id="copy">
                            <img src="/copy.svg" alt="Copy text to clipboard">
                            <h3>Copy</h3>
                        </button>
                        <button class="boxButton" @click="copyShareLink" id="share">
                            <img src="/share.svg" alt="Share this tool">
                            <h3>Share</h3>
                        </button>
                    </div>
                    <ColorCalculator/>
                </div>
            </div>
        </div>

        <div class="title">
            <h1>Options</h1>
        </div>

        <div class="colorPicker">
            <div class="colorPick">
                <input type="color" v-model="colorGeneratorStore().color1">
                <img src="/rightArrow.svg" alt="The color on the left will be the start of the color gradient, and the color on the right will be the end.">
                <input type="color" v-model="colorGeneratorStore().color2">
            </div>
            <div class="presetPick">
                <h3>Or, pick from my selection of preset gradients</h3>
                <button>Preset options</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

function addNewLine (event: KeyboardEvent) {
    if (event.key == "Enter") {
        colorGeneratorStore().inputText += "\n";
    }
}

function copyToClipboard () {

}

function copyShareLink () {

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
    margin-bottom: 7em;

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

        #copy {
            background-color: var(--deepGreen);
        }
        #share {
            background-color: var(--cyan);
        }
    }
}

.colorPicker {
    background-color: rgb(60, 60, 60);
    width: 100em;
    height: 25em;

    input {
        width: 15em;
        height: 15em;
        padding: 0;
        border: 0;
        background-color: transparent;
    }

    img {
        width: 10em;
    }
}

@media (hover: hover) and (pointer: fine) {
    .boxes .buttonDiv .boxButton:hover {
        filter: grayscale(0);
    }
}

</style>