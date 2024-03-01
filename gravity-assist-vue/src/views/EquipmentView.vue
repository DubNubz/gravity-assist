<template>
    <div class="title">
      <h2>Equipment Encyclopedia</h2>
    </div>
    <div class="title-description">
      <p>Click on a card to view more details about the item.</p>
    </div>

    <div class="buttons">
      <button @click="globalVariables.currentEquipmentView.value = 'Equipment'"
      :class="{ active: globalVariables.currentEquipmentView.value == 'Equipment', notActive: globalVariables.currentEquipmentView.value == 'Technical Blueprints' }">
      Equipment</button>

      <button @click="globalVariables.currentEquipmentView.value = 'Technical Blueprints'"
      :class="{ active: globalVariables.currentEquipmentView.value == 'Technical Blueprints', notActive: globalVariables.currentEquipmentView.value == 'Equipment' }">
      Technical Blueprints</button>
    </div>

    <div class="library">
      <EquipmentLibrary v-if="globalVariables.currentEquipmentView.value == 'Equipment'"/>
      <TechBlueprintLibrary v-if="globalVariables.currentEquipmentView.value == 'Technical Blueprints'"/>
    </div>
</template>

<script setup>

import { globalVariables } from '@/stores/global';
import EquipmentLibrary from '@/components/EquipmentLibrary.vue';
import TechBlueprintLibrary from '@/components/TechBlueprintLibrary.vue';
import { useRoute } from 'vue-router';
import { data } from '@/stores/equipment';

globalVariables.activeModule.value = "Equipment Encyclopedia";
const route = useRoute();

if (route.params.type) {
  globalVariables.currentEquipmentView.value = route.params.type;
}

if (route.params.item) {
  globalVariables.currentDetailCard.value = data.find((item) => item.displayName == route.params.item);
  globalVariables.showCard.value = true;
}

</script>

<style scoped>

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

.title-description {
  width: 85vw;
}

.library {
  margin-top: 5vh;
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  justify-content: space-evenly;
  align-items: flex-start;
}

.buttons {
  margin-top: 3vh;
  width: 70vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

button {
  width: 35vw;
  height: 5vh;
  border: 0;
  font-size: var(--h3);
  transition: all 0.5s ease;
}

button:hover {
    transform: scale(1.05);
}

.active {
  background-color: var(--deepGreen);
  transform: scale(1.05);
  z-index: 9999;
}

.notActive {
  color: #464646;
  background-color: var(--darkGray);
}
.notActive:hover {
  color: black;
  background-color: var(--normalText);
}

@media screen and (max-width: 1000px) {
  .buttons {
    width: 80vw;
  }
  button {
    font-size: var(--p);
    width: 40vw;
  }
}

</style>