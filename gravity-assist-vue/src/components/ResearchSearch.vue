<template>
    <div id="RASearchMenu">
        <label for="RASearchInput"><h2>Click on a ship to select it</h2></label>
        <input type="text" id="RASearchInput" placeholder="Click to start typing to narrow search..." @input="autocomplete">
        <button class="RASearchConfirmButton" @click="globalVariables.searchActive.value = !globalVariables.searchActive.value">CANCEL</button>
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
  margin-top: 1vh;
  background-color: var(--pastelRed);
  border-radius: 1vh;
  padding: 1vh;
}

#RASearchInput {
  width: 40vw;
  border-radius: 1vh;
  border-width: 0.1vh;
  padding: 0.5vh;
}

#RASearchResultItem {
  transition: all 0.5s;
}

#RASearchResultItem:hover {
  transform: scale(1.3);
  color: var(--gold);
  background-color: var(--lightContent);
}

</style>