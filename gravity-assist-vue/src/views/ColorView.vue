<template>
    <div class="title">
      <h2>Color Generator</h2>
    </div>
    <div class="title-description">
      <p>Click on the text below to begin editing your message.</p>
      <p>Choose your output color, copy your text, and you're good to go!</p>
    </div>

    <Transition name="share">
      <div class="shareBackground" v-if="shareActive">
        <div class="shareOverall">
          <div class="shareActual">
            <img src="/check-removebg-preview (1).png" alt="Copied to clipboard successfully" id="shareSuccess">
          </div>
          <h3 id="shareSuccessText">Link copied to clipboard!</h3>
        </div>
      </div>
    </Transition>

    <Transition name="copy">
      <div class="copyBackground" v-if="copyActive">
        <div class="copyOverall">
          <div class="copyActual">
            <img src="/check-removebg-preview (1).png" alt="Copied to clipboard successfully" id="copySuccess">
          </div>
          <h3 id="copySuccessText">Text copied to clipboard!</h3>
        </div>
      </div>
    </Transition>

    <Transition name="chooseColor">
      <div class="colorOptionMenuBackground" v-if="colorMenu">
        <div class="colorOptionMenu">

          <h2>Click on a button to change the output color</h2>

          <button class="reverse" @click="globalVariables.reversed.value = !globalVariables.reversed.value">
            <img src="/arrow-circle.png" alt="Reverse all color options">
            <p class="reverseText">Reverse</p>
          </button>

          <div class="colorButtonArrayArray">
            <div class="colorButtonArray" v-for="colorType in colorTypes">
              <h3 class="colorButtonArrayTitle" :class="{ newButtonArrayTitle: colorType == 'New Color' }">{{ colorType + 's' }}</h3>
              <div class="buttons">
                <button class="colorButton"
                  :class="getClass(color.color1, color.color2)"
                  v-for="color in colors.filter((color) => color.type.includes(colorType))"
                  @click="buttonEvent(color.name, getClass(color.color1, color.color2))">
                  {{ getButtonName(color.color1, color.color2, color.displayName) }}
                </button>
              </div>
            </div>
          </div>

        </div>
    </div>
    </Transition>

    <Transition name="chooseStep">
      <div class="colorStepMenuBackground" v-if="stepMenu">
        <div class="colorStepMenu">

          <h2 class="colorStepMenuTitle">How compressed would you like your output to be?</h2>
          <h3 class="colorStepMenuDescription">Less compressed = less characters, fluid gradient</h3>
          <h3 class="colorStepMenuDescription">More compressed = more characters, blocky gradient</h3>

          <div class="stepButtons">
            <button class="stepMenuButton" id="uncompressedStep"
            @click="changeColorStep('uncompressed')">
              <h2 class=stepMenuButtonTitle>Uncompressed</h2>
              <p class="stepMenuButtonDescription">Very fluid gradient</p>
              <p class="stepMenuButtonDescription">Very limited character output</p>
            </button>
            <button class="stepMenuButton" id="compressed"
            @click="changeColorStep('compressed')">
              <h2 class=stepMenuButtonTitle>Compressed</h2>
              <p class="stepMenuButtonDescription">Fair gradient</p>
              <p class="stepMenuButtonDescription">Fair character output</p>
            </button>
            <button class="stepMenuButton" id="veryCompressed"
            @click="changeColorStep('veryCompressed')">
              <h2 class=stepMenuButtonTitle>Very compressed</h2>
              <p class="stepMenuButtonDescription">Very blocky gradient</p>
              <p class="stepMenuButtonDescription">Large character output</p>
            </button>
          </div>

        </div>
    </div>
    </Transition>

    <p id="messageCharacterCounter" v-if="globalVariables.outputText.value.join('').length <= 280">
      <span :class="characterLimit(globalVariables.outputText.value.join('').length, 'message')">
        {{ globalVariables.outputText.value.join("").length.toLocaleString() }}
      </span>
    / 280 characters (chat message)
    </p>

    <p id="mailCharacterCounter" v-if="globalVariables.outputText.value.join('').length > 280">
      <span :class="characterLimit(globalVariables.outputText.value.join('').length, 'mail')">
        {{ globalVariables.outputText.value.join("").length.toLocaleString() }}
      </span>
    / 1,000 characters (mail)
    </p>
    
    <div class="cards">
      
      <textarea id="textBox"
      v-model="globalVariables.inputText.value"
      @keydown.enter.prevent="addNewLine"
      @input="globalVariables.outputText.value.push('')"
      placeholder="Click here to start typing!">
      </textarea>

      <div class="stepChange">
        <button class="stepButton" @click="stepMenu = !stepMenu" :id="globalVariables.currentColorStep.value">Change color compression</button>
      </div>

      <div class="colorChange">
        <button class="colorButton" id="colorButton2" @click="colorMenu = !colorMenu" :class="globalVariables.currentColorClass.value">Change color output</button>
      </div>

      <div id="outputBox">
        <div class="buttonDiv">
          <button class="copyToClipboard" @click="copyToClipboard" id="copy">
            <img src="/copy.svg" alt="Copy text to clipboard">
            <h3>Copy</h3>
          </button>
          <button class="copyToClipboard" @click="copyShareLink" id="share">
            <img src="/share.svg" alt="Share this tool">
            <h3>Share</h3>
          </button>
        </div>
        <ColorCalculator :Color="colors.find((color) => color.name == globalVariables.currentColor.value)"/>
      </div>

    </div>
    
    <p class="cyan" id="warning">If your text is flagged as inappropriate, just choose a different color</p>
</template>
<script setup>

import { ref } from 'vue';
import ColorCalculator from '@/components/ColorCalculator.vue';
import { globalVariables } from '@/stores/global';
import { colorTypes, colors } from '@/stores/colors';
import { useRoute } from 'vue-router';

globalVariables.activeModule.value = "Color Generator";
const colorMenu = ref(false);
const copyActive = ref(false);
const shareActive = ref(false);
const stepMenu = ref(false);
const route = useRoute();

if (route.params.reversed == "true") {
  globalVariables.reversed.value = true;
}

if (route.params.compression) {
  globalVariables.currentColorStep.value = route.params.compression;
}

if (route.params.colorName) {
  globalVariables.currentColor.value = route.params.colorName;
  globalVariables.currentColorClass.value = getClass(colors.find((color) => color.name == route.params.colorName).color1, colors.find((color) => color.name == route.params.colorName).color2);
}

function copyShareLink () {
  navigator.clipboard.writeText(`https://gravityassist.xyz/modules/color-generator/${globalVariables.currentColor.value}/${globalVariables.currentColorStep.value}/${globalVariables.reversed.value}`).then(() => {
    shareActive.value = true;
    setTimeout(() => {
      shareActive.value = false;
    }, 1500);
  }, () => {
    alert("Link failed to copy to clipboard");
  })
}

function changeColorStep (button) {
  globalVariables.currentColorStep.value = button;
  stepMenu.value = !stepMenu.value;
}

function copyToClipboard () {
  navigator.clipboard.writeText(globalVariables.outputText.value.join("")).then(() => {
    copyActive.value = true;
    setTimeout(() => {
      copyActive.value = false;
    }, 1500);
  }, () => {
    alert("Text failed to copy to clipbard");
  })
}

function characterLimit (num, type) {
  if (type == "message") {
    if (num >= 250) {
      return "black";
    } else if (num >= 175) {
      return "red";
    } else if (num >= 125) {
      return "orange";
    } else if (num >= 75) {
      return "yellow";
    } else {
      return "green";
    }
  } else if (type == "mail") {
    if (num > 1000) {
      return "black";
    } else if (num >= 900) {
      return "red";
    } else if (num >= 700) {
      return "orange"
    } else if (num >= 450) {
      return "yellow"
    } else if (num >= 280) {
      return "green"
    }
  }
}

function getButtonName (param1, param2, other) {
  if (other) {
    return String(other);
  }

  if (globalVariables.reversed.value) {
    return `${uppercase(param2)} >> ${uppercase(param1)}`
  } else {
    return `${uppercase(param1)} >> ${uppercase(param2)}`
  }
}

function buttonEvent (param1, param2) {
  globalVariables.currentColor.value = param1;
  globalVariables.currentColorClass.value = param2;
  colorMenu.value = false;
}

function getClass (name1, name2) {
  if (globalVariables.reversed.value) {
    return `${uppercase(name2)}To${name1}`;
  } else {
    return `${name1}To${uppercase(name2)}`;
  }
}

function uppercase (word) {
  return word[0].toUpperCase() + word.slice(1);
}

function addNewLine (event) {
  if (event.key == "Enter") {
    globalVariables.inputText.value += "\n";
  }
}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');

.colorButtonArrayArray {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
}

.newButtonArrayTitle {
  padding-left: 2vw;
  padding-right: 2vw;
  border-radius: 2vw;
  font-size: var(--h2);
  background-image: linear-gradient(to right, #ff0000, #ffbb00, #bbff00, #00ff4c, #00ffff, #00c3ff, #ff00ff);
  width: fit-content;
  background-clip: text;
  color: transparent;
}

.colorButtonArray {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  background-color: rgba(255, 255, 255, 0.125);
  margin-bottom: 3vh;
  border-radius: 4vh;
}

#messageCharacterCounter,
#mailCharacterCounter {
  margin-top: 5vh;
}

.buttonDiv {
  display: flex;
  width: 75%;
  justify-content: space-around;
}

.copyToClipboard {
  width: 50%;
  font-size: var(--p);
  height: 7.5vh;
  border-radius: 1.5vh;
  transition: all 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
  filter: grayscale(0.33);
}

#share {
  background-color: var(--cyan);
}
#copy {
  background-color: var(--deepGreen);
}

.copyToClipboard h3 {
  margin: 0;
  text-align: center;
  width: fit-content;
  height: fit-content;
  font-size: var(--h3);
}

.copyToClipboard > * {
  width: 5vh;
  height: 5vh;
  margin-right: 0;
}

.copyToClipboard:hover {
  filter: grayscale(0);
}

.black {
  color: #ff0000;
  background-color: black;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  border-radius: 1vw;
}
.red {color: #ff0000}
.orange {color: #ffa600}
.yellow {color: #ffff00}
.green {color: #00ff00}

.view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.colorChange {
  margin-bottom: 2vh;
}

.stepChange {
  margin-top: 3vh;
  margin-bottom: 2vh;
}

.cyan {color: var(--cyan)}

.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding-left: 4vh;
    padding-right: 4vh;
    border-radius: 10vh;
    background: linear-gradient(to bottom, transparent 5%, var(--darkHeader), var(--darkHeader))
}

textarea,
#outputBox {
  background-color: var(--content);
  min-height: 30vh;
  height: fit-content;
  width: 40vw;
  margin: auto;
  font-size: var(--p);
  color: white;
  resize: none;
  border-color: var(--darkHeader);
  border-radius: 5vh;
  padding: 3vh;
  outline-color: var(--cyan);
  font-family: 'Kanit', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.colorOptionMenuBackground {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 99999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.colorOptionMenu {
  width: 70vw;
  background-color: rgb(0, 0, 0);
  padding: 20px;
  border-radius: 3vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-height: 80%;
  min-height: 80%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chooseColor-enter-active, .chooseColor-leave-active {
  transition: all 0.5s ease-in-out;
}

.chooseColor-leave-active {
  transition-delay: 0.15s;
}

.chooseColor-enter-from,
.chooseColor-leave-to {
  opacity: 0;
}

.chooseColor-enter-active .colorOptionMenu,
.chooseColor-leave-active .colorOptionMenu { 
  transition: all 0.25s ease-in-out;
}

.chooseColor-enter-active .colorOptionMenu {
  transition-delay: 0.15s;
}

.chooseColor-enter-from .colorOptionMenu,
.chooseColor-leave-to .colorOptionMenu {
  transform: translateY(30px);
  opacity: 0.001;
}

.copyBackground {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 999999999;
}

.copyOverall {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  border-radius: 5vh;
  padding: 3vh;
}

.copyActual {
  width: 10vh;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5vw;
  margin-bottom: 2vh;
}

#copySuccess {
  width: 100%;
  height: 100%;
  margin-right: 0;
}

.copy-enter-active, .copy-leave-active {
  transition: all 0.75s ease-in-out;
}

.copy-enter-from,
.copy-leave-to {
  opacity: 0;
}

.copy-enter-active .copyActual,
.copy-leave-active .copyActual { 
  transition: all 0.5s ease-in-out;
}

.copy-enter-from .copyActual,
.copy-leave-to .copyActual {
  transform: rotate(720deg);
  opacity: 0.001;
}

.shareBackground {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 999999999;
}

.shareOverall {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  border-radius: 5vh;
  padding: 3vh;
}

.shareActual {
  width: 10vh;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5vw;
  margin-bottom: 2vh;
}

#shareSuccess {
  width: 100%;
  height: 100%;
  margin-right: 0;
}

.share-enter-active, .share-leave-active {
  transition: all 0.75s ease-in-out;
}

.share-enter-from,
.share-leave-to {
  opacity: 0;
}

.share-enter-active .shareActual,
.share-leave-active .shareActual { 
  transition: all 0.5s ease-in-out;
}

.share-enter-from .shareActual,
.share-leave-to .shareActual {
  transform: rotate(720deg);
  opacity: 0.001;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
}

.colorButton {
  width: 45%;
  height: 7.5vh;
  padding: 1vh;
  border-radius: 3vh;
  margin-bottom: 1vh;
  font-size: var(--p);
  transition: all 0.5s;
}

.stepButton {
  width: 25vw;
  height: 7.5vh;
  padding: 1vh;
  border-radius: 3vh;
  margin-bottom: 1vh;
  font-size: var(--h3);
  transition: all 0.5s ease;
  overflow: hidden;
}
.stepButton:hover {
  transform: scale(1.05);
}

#colorButton2 {
  width: 25vw;
  font-size: var(--h3);
  filter: grayscale(0.05);
  transition: all 0.5;
}

#colorButton2:hover {
  filter: grayscale(0);
}

.colorButton:hover {
  transform: scale(1.05);
}

.reverse {
  background-color: var(--lightContent);
  border: 0;
  margin-bottom: 4vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5vh;
  padding-left: 1vw;
  padding-right: 1vw;
  transition: all 0.5s;
  width: 17.5vw;
}

.reverse:hover {
  background-color: var(--deepGreen);
  transform: scale(1.05);
  color: black;
  img {
    transform: rotate(540deg);
  }
}

.reverseText {
  font-size: var(--h3);
}

img {
  width: 10vh;
  height: 10vh;
  margin-right: 1vw;
  transition: all 0.65s;
}

#warning {
  width: 70vw;
}

/* non-reversed */
.rainbowToRainbow {background: linear-gradient(to bottom right, #ff0000, #ffbb00, #bbff00, #00ff4c, #00ffff, #00c3ff, #ff00ff);}
.pinkToYellow {background: linear-gradient(to bottom right, #f957ff, #ffc94d, #f957ff);}
.redToOrange {background: linear-gradient(to bottom right, #e32b2b, #ff9b3c, #e32b2b);}
.redToYellow {background: linear-gradient(to bottom right, #ff0f00, #fff000, #ff0f00);}
.blueToOrange {background: linear-gradient(to bottom right, #3dcfff, #ffbd2c, #3dcfff);}
.blueToYellow {background: linear-gradient(to bottom right, #85abff, #bfffc7, #fff47a, #bfffc7, #85abff);}
.blueToGreen {background: linear-gradient(to bottom right, #00a1ff, #00fe90, #00a1ff);}
.purpleToBlue {background: linear-gradient(to bottom right, #b043ea, #42a5fb, #b043ea);}
.purpleToPurple {background: linear-gradient(to bottom right, #6ea3ff, #d16eff, #6ea3ff);}
.purpleToMint {background: linear-gradient(to bottom right, #832ef7, #61dec7, #832ef7);}
.blueToPink {background: linear-gradient(to bottom right, #11dee5, #b5d8b3, #ffd0b5, #fdaed2);}
.pinkToPink {background: linear-gradient(to bottom right, #dc6bff, #ff6bd3, #dc6bff);}
.goldToGold {background: linear-gradient(to bottom right, #ffff00, #ffc400, #ffff00);}
.blueToBlue {background: linear-gradient(to bottom right, #6bffff, #6babff, #6bffff);}
.redToWhite {background: linear-gradient(to bottom right, #ff0000, #ffd1d1);}
.yellowToWhite {background: linear-gradient(to bottom right, #ffff00, #fffad1);}
.greenToWhite {background: linear-gradient(to bottom right, #00ff00, #d2ffd1);}
.blueToWhite {background: linear-gradient(to bottom right, #00d7ff, #d1fffc);}
.purpleToWhite {background: linear-gradient(to bottom right, #e100ff, #fbd1ff);}
.redToDark {
  background: linear-gradient(to bottom right, #dc0101, #4c1010);
  color: white;
}
.orangeToPink {background: linear-gradient(to bottom right, #ffcf24, #7f243f);}
.greenToGreen {background: linear-gradient(to bottom right, #a9ff38, #29ffbf, #a9ff38);}
.orangeToOrange {background: linear-gradient(to bottom right, #ff5b0f, #fea881, #ff5b0f);}
.pinkToGreen {background: linear-gradient(to bottom right, #fd81ff, #4557f1, #00e092, #4557f1, #fd81ff);}

/* reversed */
.RainbowTorainbow {background: linear-gradient(to bottom right, #ff00ff, #00c3ff, #00ffff, #00ff4c, #bbff00, #ffbb00, #ff0000);}
.YellowTopink {background: linear-gradient(to bottom right, #ffc94d, #f957ff, #ffc94d);}
.OrangeTored {background: linear-gradient(to bottom right, #ff9b3c, #e32b2b, #ff9b3c);}
.YellowTored {background: linear-gradient(to bottom right, #fff000, #ff0f00, #fff000);}
.OrangeToblue {background: linear-gradient(to bottom right, #ffbd2c, #3dcfff, #ffbd2c);}
.YellowToblue {background: linear-gradient(to bottom right, #fff47a, #bfffc7, #85abff, #bfffc7, #fff47a);}
.GreenToblue {background: linear-gradient(to bottom right, #00fe90, #00a1ff, #00fe90);}
.BlueTopurple {background: linear-gradient(to bottom right, #42a5fb, #b043ea, #42a5fb);}
.PurpleTopurple {background: linear-gradient(to bottom right, #d16eff, #6ea3ff, #d16eff);}
.MintTopurple {background: linear-gradient(to bottom right, #61dec7, #832ef7, #61dec7);}
.PinkToblue {background: linear-gradient(to bottom right, #fdaed2, #ffd0b5, #b5d8b3, #11dee5);}
.PinkTopink {background: linear-gradient(to bottom right, #ff6bd3, #dc6bff, #ff6bd3);}
.GoldTogold {background: linear-gradient(to bottom right, #ffc400, #ffff00, #ffc400);}
.BlueToblue {background: linear-gradient(to bottom right, #6babff, #6bffff, #6babff);}
.WhiteTored {background: linear-gradient(to bottom right, #ffffff, #ff0000);}
.WhiteToyellow {background: linear-gradient(to bottom right, #ffffff, #ffff00);}
.WhiteTogreen {background: linear-gradient(to bottom right, #ffffff, #00ff00);}
.WhiteToblue {background: linear-gradient(to bottom right, #ffffff, #00d7ff);}
.WhiteTopurple {background: linear-gradient(to bottom right, #ffffff, #e100ff);}
.DarkTored {
  background: linear-gradient(to bottom right, #4c1010, #dc0101);
  color: white;
}
.PinkToorange {background: linear-gradient(to bottom right, #d37cf5, #fb8333);}
.GreenTogreen {background: linear-gradient(to bottom right, #29ffbf, #a9ff38, #29ffbf);}
.OrangeToorange {background: linear-gradient(to bottom right, #fea881, #ff5b0f, #fea881);}
.GreenTopink {background: linear-gradient(to bottom right, #00e092, #4557f1, #fd81ff, #4557f1, #00e092);}

.title-description {
  width: 85vw;
}

.colorStepMenuBackground {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 99999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.colorStepMenu {
  width: 70vw;
  background-color: rgb(0, 0, 0);
  padding: 20px;
  border-radius: 3vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-height: 80%;
  min-height: 80%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.colorStepMenuDescription {
  margin-top: 0;
  margin-bottom: 1vh;
}

.stepButtons {
  margin-top: 4vh;
  width: 65vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.stepMenuButton {
  width: 20vw;
  height: 50vh;
  border-radius: 5vh;
  overflow: hidden;
  transition: all 0.5s ease;
}
.stepMenuButton:hover {
  transform: scale(1.05);
}

#uncompressedStep {
  background: linear-gradient(to bottom right, #ff0000, #ffbb00, #bbff00, #00ff4c, #00ffff, #00c3ff, #ff00ff);
}
#uncompressedStep::after {
  content: "";
  position: absolute;
  left: -100%;
  width: 100%;
  height: 300%;
  top: 0;
  background: linear-gradient(90deg, transparent, #defffd, transparent);
  transition: left 0.35s ease;
}
#uncompressedStep:hover::after {
  left: 100%;
}

#uncompressed {
  background: linear-gradient(to bottom right, #ff0000, #ffbb00, #bbff00, #00ff95, #00ffff, #ff00ff);
}
#compressed {
  background: linear-gradient(to bottom right, #ff0000, #bbff00, #00c3ff, #ff00ff);
}
#veryCompressed {
  background: linear-gradient(to bottom right, #ff0000, #00fff2, #ff00ff);
}

.chooseStep-enter-active, .chooseStep-leave-active {
  transition: all 0.5s ease-in-out;
}

.chooseStep-leave-active {
  transition-delay: 0.15s;
}

.chooseStep-enter-from,
.chooseStep-leave-to {
  opacity: 0;
}

.chooseStep-enter-active .colorStepMenu,
.chooseStep-leave-active .colorStepMenu { 
  transition: all 0.25s ease-in-out;
}

.chooseStep-enter-active .colorStepMenu {
  transition-delay: 0.15s;
}

.chooseStep-enter-from .colorStepMenu,
.chooseStep-leave-to .colorStepMenu {
  transform: translateY(30px);
  opacity: 0.001;
}

@media screen and (max-width: 1000px) {
  textarea,
  #outputBox {
    width: 70vw;
  }

  .colorButton {
    width: 30vw;
    height: 6vh;
    font-size: var(--standard3);
  }

  .stepButton {
    width: 70vw;
    height: 6vh;
    font-size: var(--p);
  }

  #colorButton2 {
    width: 70vw;
  }

  .reverse {
    border-radius: 5vh;
    width: 50vw;
  }

  .reverseText {
    font-size: var(--h3);
  }

  img {
    width: 5vh;
    height: 5vh;
  }

  .stepButtons {
    margin-top: 2vh;
    width: 65vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stepMenuButton {
    width: 65vw;
    height: 17.5vh;
    margin-bottom: 2vh;
  }

  .colorStepMenuTitle {
    font-size: var(--p);
  }

  .colorStepMenuDescription {
    font-size: var(--standard3);
  }

  .stepMenuButtonTitle {
    font-size: var(--h3);
  }

  .stepMenuButtonDescription {
    font-size: var(--p);
    margin-top: 0;
  }

  .colorButtonArray {
    width: 100%;
  }

  .copyToClipboard {
    width: 10vh;
  }

  .copyToClipboard h3 {
    display: none;
  }
}

</style>