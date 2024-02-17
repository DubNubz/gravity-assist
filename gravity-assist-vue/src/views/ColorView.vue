<template>
    <div class="title">
    <h2>Color Generator</h2>
    </div>
    <div class="title-description">
      <p>Click on the text below to begin editing your message.</p>
      <p>Choose your output color, copy your text, and you're good to go!</p>
    </div>

    <div class="colorOptionMenuBackground" v-if="colorMenu">
      <div class="colorOptionMenu">

        <h2>Click on a button to change the output color</h2>

        <button class="reverse" @click="globalVariables.reversed.value = !globalVariables.reversed.value">
          <img src="/arrow-circle.png" alt="Reverse all color options">
          <p class="reverseText">Reverse</p>
        </button>

        <div class="buttons">
          <button class="colorButton"
            :class="getClass(color.color1, color.color2)"
            v-for="color in colors"
            @click="buttonEvent(color.name, getClass(color.color1, color.color2))">
            {{ getButtonName(color.color1, color.color2) }}
          </button>
        </div>

      </div>
    </div>

    <p id="messageCharacterCounter" v-if="globalVariables.outputText.value.join('').length.toLocaleString() < 280">
      <span :class="characterLimit(globalVariables.outputText.value.join('').length.toLocaleString(), 'message')">
        {{ globalVariables.outputText.value.join("").length.toLocaleString() }}
      </span>
    / 280 characters (chat message)
    </p>

    <p id="mailCharacterCounter" v-if="globalVariables.outputText.value.join('').length.toLocaleString() > 280">
      <span :class="characterLimit(globalVariables.outputText.value.join('').length.toLocaleString(), 'mail')">
        {{ globalVariables.outputText.value.join("").length.toLocaleString() }}
      </span>
    / 1,000 characters (mail)
    </p>
    
    <div class="cards">
      
      <textarea id="textBox"
      v-model="globalVariables.inputText.value"
      @keydown.enter.prevent="addNewLine"
      @input="globalVariables.outputText.value.push('')">
      </textarea>

      <div class="colorChange">
        <button class="colorButton" id="colorButton2" @click="colorMenu = !colorMenu" :class="globalVariables.currentColorClass.value">Change color output</button>
      </div>

      <div id="outputBox">
        <button class="copyToClipboard" @click="copyToClipboard">Copy to clipboard</button>
        <ColorCalculator :Color="colors.find((color) => color.name == globalVariables.currentColor.value)"
        @response="changeOutput"/>
      </div>

    </div>
    
    <p class="cyan" id="warning">If your text is flagged as inappropriate, just choose a different color</p>
</template>
<script setup>

import { ref } from 'vue';
import ColorCalculator from '@/components/ColorCalculator.vue';
import { globalVariables } from '@/stores/global';
import { colors } from '@/stores/colors';

globalVariables.activeModule.value = "Color Generator";
const colorMenu = ref(false);

function copyToClipboard () {
  navigator.clipboard.writeText(globalVariables.outputText.value.join("")).then(() => {
    alert("Text copied to clipboard!");
  }, () => {
    alert("Text failed to copy to clipbard");
  })
}

function characterLimit (num, type) {
  if (type == "message") {
    if (num >= 250) {
      return "red";
    } else if (num >= 200) {
      return "orange";
    } else if (num >= 100) {
      return "yellow";
    } else {
      return "green";
    }
  } else if (type == "mail") {
    if (num >= 900) {
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

function getButtonName (param1, param2) {
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

function changeOutput (output) {
  globalVariables.outputText.value = output;
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

#messageCharacterCounter,
#mailCharacterCounter {
  margin-top: 5vh;
}

.copyToClipboard {
  background-color: var(--normalText);
  width: 70%;
  font-size: var(--p);
  height: 5vh;
  border-radius: 5vh;
  transition: all 0.25s;
}

.copyToClipboard:hover {
  background-color: var(--deepGreen);
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
}

.colorOptionMenu {
  width: 70vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

.buttons {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  justify-content: space-evenly;
}

.colorButton {
  width: 20vw;
  height: 7.5vh;
  padding: 1vh;
  border-radius: 3vh;
  margin-bottom: 1vh;
  font-size: var(--p);
  transition: all 0.5s;
}

#colorButton2 {
  width: 20vw;
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
.pinkToYellow {background: linear-gradient(to bottom right, #f957ff, #ffc94d, #f957ff);}
.redToYellow {background: linear-gradient(to bottom right, #ff0f00, #fff000, #ff0f00);}
.blueToPurple {background: linear-gradient(to bottom right, #6ea3ff, #d16eff, #6ea3ff);}
.pinkToPink {background: linear-gradient(to bottom right, #dc6bff, #ff6bd3, #dc6bff);}
.goldToGold {background: linear-gradient(to bottom right, #ffff00, #ffc400, #ffff00);}
.blueToBlue {background: linear-gradient(to bottom right, #6bffff, #6babff, #6bffff);}
.redToWhite {background: linear-gradient(to bottom right, #ff0000, #ffffff);}
.yellowToWhite {background: linear-gradient(to bottom right, #ffff00, #ffffff);}
.greenToWhite {background: linear-gradient(to bottom right, #00ff00, #ffffff);}
.blueToWhite {background: linear-gradient(to bottom right, #00d7ff, #ffffff);}
.purpleToWhite {background: linear-gradient(to bottom right, #e100ff, #ffffff);}

/* reversed */
.YellowTopink {background: linear-gradient(to bottom right, #ffc94d, #f957ff, #ffc94d);}
.YellowTored {background: linear-gradient(to bottom right, #fff000, #ff0f00, #fff000);}
.PurpleToblue {background: linear-gradient(to bottom right, #d16eff, #6ea3ff, #d16eff);}
.PinkTopink {background: linear-gradient(to bottom right, #ff6bd3, #dc6bff, #ff6bd3);}
.GoldTogold {background: linear-gradient(to bottom right, #ffc400, #ffff00, #ffc400);}
.BlueToblue {background: linear-gradient(to bottom right, #6babff, #6bffff, #6babff);}
.WhiteTored {background: linear-gradient(to bottom right, #ffffff, #ff0000);}
.WhiteToyellow {background: linear-gradient(to bottom right, #ffffff, #ffff00);}
.WhiteTogreen {background: linear-gradient(to bottom right, #ffffff, #00ff00);}
.WhiteToblue {background: linear-gradient(to bottom right, #ffffff, #00d7ff);}
.WhiteTopurple {background: linear-gradient(to bottom right, #ffffff, #e100ff);}

.title-description {
  width: 85vw;
}

@media screen and (max-width: 1000px) {
  textarea,
  #outputBox {
    width: 70vw;
  }

  .colorButton {
    width: 30vw;
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
}

</style>