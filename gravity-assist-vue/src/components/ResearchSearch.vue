<template>
    <div id="RASearchMenu">
      <label for="RASearchInput"><h2>Click on a ship to select it</h2></label>
      <div class="RASearchDiv">
        <input type="text" id="RASearchInput" placeholder="Click to start typing..." @input="autocomplete">
        <button class="RASearchConfirmButton" @click="globalVariables.searchActive.value = !globalVariables.searchActive.value">CANCEL</button>
      </div>
        <div id="RASearchMenuResults">
            <div id="RASearchResults" v-for="option in filteredChoices">
              <p id="RASearchResultItem" @click="updateChoice(option.name, option.variant, option.manufacturer, option.direction, option.scope)">{{ option.name }}-{{ option.variant }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { data } from '@/stores/ra_data';
import { globalVariables } from '@/stores/global';

const filteredChoices = ref([...data]);
const emit = defineEmits(['response']);

function updateChoice (name, variant, manufacturer, direction, scope) {
  globalVariables.searchActive.value = !globalVariables.searchActive.value;
  globalVariables.currentSearchShip.value = `${name}-${variant}`;
  emit('response', manufacturer, direction, scope);
}

function autocomplete (event) {
    const inputValue = event.target.value;
    filteredChoices.value = data.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));
}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');

#RASearchMenu {
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
}

#RASearchMenuResults {
  max-height: 100%;
  overflow-y: auto;
}

.RASearchConfirmButton {
  background-color: var(--pastelRed);
  border-radius: 1vh;
  padding: 1vh;
  height: 6vh;
  font-size: var(--h3);
  padding-left: 4vh;
  padding-right: 4vh;
  transition: all 0.5s;
  margin-bottom: 1vh;
}

.RASearchConfirmButton:hover {
  background-color: #ff4a4a;
  transform: scale(1.1);
}

#RASearchInput {
  width: 60%;
  border-radius: 1vh;
  border-width: 0.1vh;
  padding: 0.5vh;
  height: 3vh;
  color: black;
  font-size: var(--p);
  font-family: 'Kanit', sans-serif;
  outline-color: var(--pastelGreen);
  background-color: var(--deepGreen);
  margin-bottom: 1vh;
}

#RASearchResultItem {
  transition: all 0.5s;
  font-size: var(--h3);
  margin-top: 1vh;
  margin-bottom: 1vh;
}

#RASearchResultItem:hover {
  transform: scale(1.3);
  color: var(--gold);
  background-color: var(--lightContent);
}

.RASearchDiv {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

@media screen and (max-width: 1000px) {
  .RASearchInput {
    font-size: var(--standard2);
  }

  #RASearchResultItem {
    font-size: var(--p);
  }

  .RASearchConfirmButton {
    font-size: var(--p);
  }

  .RASearchDiv {
    flex-direction: column;
  }
}

</style>