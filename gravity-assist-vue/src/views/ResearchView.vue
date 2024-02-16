<template>
    <div class="title">
        <h2>Research Agreement Finder</h2>
        <p>Select a ship to find a research agreement path for it, or freely browse through all reseach agreement paths.</p>
    </div>

    <div class="RASearch">
        <p>Currently displaying results of: <span class="cyan" id="RASearchCurrent">{{ globalVariables.currentSearchShip.value }}</span></p>
        <button id="RASearchButton" @click="globalVariables.searchActive.value = !globalVariables.searchActive.value">SELECT A SHIP</button>
    </div>

    <div id="RASearchMenuBackground" v-if="globalVariables.searchActive.value">
        <ResearchSearch @response="searchChangeView"/>
    </div>
    
    <div class="RAButtons">
        <div class="manufacturers">
            <h3>Companies</h3>
            <button class="RAButton" :class="{ active: globalVariables.activeManufacturer.value === 'Jupiter Industry' }" id="jupiterIndustries" @click="changeView(0, 'Jupiter Industry')">Jupiter Industry</button>
            <button class="RAButton" :class="{ active: globalVariables.activeManufacturer.value === 'NOMA Shipping' }" id="nomaShipping" @click="changeView(1, 'NOMA Shipping')">NOMA Shipping</button>
            <button class="RAButton" :class="{ active: globalVariables.activeManufacturer.value === 'Antonios' }" id="antonios" @click="changeView(2, 'Antonios')">Antonios</button>
            <button class="RAButton" :class="{ active: globalVariables.activeManufacturer.value === 'Dawn Accord' }" id="dawnAccord" @click="changeView(3, 'Dawn Accord')">Dawn Accord</button>
            <button class="RAButton" :class="{ active: globalVariables.activeManufacturer.value === 'Empty' }" id="emptyManufacturer" @click="changeView(4, 'Empty')">No Company</button>
        </div>
        <div class="directions">
            <h3>Directions</h3>
            <button class="RAButton" :class="{ active: globalVariables.activeDirection.value === 'Outstanding Firepower' }" id="outstandingFirepower" @click="changeView(10, 'Outstanding Firepower')">Outstanding Firepower</button>
            <button class="RAButton" :class="{ active: globalVariables.activeDirection.value === 'Sustained Combat' }" id="sustainedCombat" @click="changeView(11, 'Sustained Combat')">Sustained Combat</button>
            <button class="RAButton" :class="{ active: globalVariables.activeDirection.value === 'Strategy & Support' }" id="strategySupport" @click="changeView(12, 'Strategy & Support')">Strategy & Support</button>
            <button class="RAButton" :class="{ active: globalVariables.activeDirection.value === 'Fighter & Corvette' }" id="fighterCorvette" @click="changeView(13, 'Fighter & Corvette')">Fighter & Corvette</button>
            <button class="RAButton" :class="{ active: globalVariables.activeDirection.value === 'Empty' }" id="emptyDirection" @click="changeView(14, 'Empty')">No Direction</button>
        </div>
        <div class="scopes">
            <h3>Scopes</h3>
            <button class="RAButton" :class="{ active: globalVariables.activeScope.value === 'Projectile Weapon' }" id="projectile" @click="changeView(20, 'Projectile Weapon')">Projectile Weapon</button>
            <button class="RAButton" :class="{ active: globalVariables.activeScope.value === 'Direct-Fire Weapon' }" id="directfire" @click="changeView(21, 'Direct-Fire Weapon')">Direct-Fire Weapon</button>
            <button class="RAButton" :class="{ active: globalVariables.activeScope.value === 'Empty' }" id="emptyScope" @click="changeView(22, 'Empty')">No Scope</button>
        </div>
    </div>

    <button id="resetButton" @click="reset">Reset</button>

    <div class="RAResultsHolder">
        <div class="RAResults">
          <ResearchResults :Data="filteredData"/>
        </div>
    </div>
</template>

<script setup>

import { data } from '@/stores/ra_data';
import { ref } from 'vue';
import ResearchResults from '@/components/ResearchResults.vue';
import { globalVariables } from '@/stores/global';
import ResearchSearch from '@/components/ResearchSearch.vue';

globalVariables.activeModule.value = 'Research Agreement Helper';
const filteredData = ref([...data.filter((ship) => (ship.manufacturer.includes(globalVariables.activeManufacturer.value) || globalVariables.activeManufacturer.value == "Empty") && (ship.direction.includes(globalVariables.activeDirection.value) || globalVariables.activeDirection.value == "Empty") && (ship.scope.includes(globalVariables.activeScope.value) || globalVariables.activeScope.value == "Empty"))]);

function reset () {
  globalVariables.activeManufacturer.value = "Jupiter Industry";
  globalVariables.activeDirection.value = "Outstanding Firepower";
  globalVariables.activeScope.value = "Projectile Weapon";
}

function searchChangeView (manufacturer, direction, scope) {
  globalVariables.activeManufacturer.value = manufacturer;
  globalVariables.activeDirection.value = direction[0];
  globalVariables.activeScope.value = scope;
  filteredData.value = [...data.filter((ship) => (ship.manufacturer.includes(globalVariables.activeManufacturer.value) || globalVariables.activeManufacturer.value == "Empty") && (ship.direction.includes(globalVariables.activeDirection.value) || globalVariables.activeDirection.value == "Empty") && (ship.scope.includes(globalVariables.activeScope.value) || globalVariables.activeScope.value == "Empty"))]
}

function changeView (type, name) {
    if (type <= 4) {
      globalVariables.activeManufacturer.value = name;
    } else if (type >= 10 && type <= 14) {
      globalVariables.activeDirection.value = name;
    } else {
      globalVariables.activeScope.value = name;
    }
    globalVariables.currentSearchShip.value = "Not selected";
    filteredData.value = [...data.filter((ship) => (ship.manufacturer.includes(globalVariables.activeManufacturer.value) || globalVariables.activeManufacturer.value == "Empty") && (ship.direction.includes(globalVariables.activeDirection.value) || globalVariables.activeDirection.value == "Empty") && (ship.scope.includes(globalVariables.activeScope.value) || globalVariables.activeScope.value == "Empty"))]
}

</script>

<style scoped>

.title {
  width: 75vw;
}

.cyan {color: var(--cyan)}

#resetButton {
  height: 7vh;
  width: 15vh;
  border-radius: 4vh;
  border-color: black;
  color: black;
  background-color: var(--pastelRed);
  transition: all 0.5s;
}

#resetButton:hover {
  transform: scale(1.33);
  border-color: red;
  border-width: 0.5vw;
}

.RAResultsHolder {
  background-color: var(--content);
  border-radius: 5vw;
  width: 40vw;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 5vh;
}

.RAResults {
  border-radius: 5vw;
  width: 30vw;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 5vh;
}

.RAResult {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.RAData {
  display: flex;
  align-items: center;
}

.RADataPercent {
  display: flex;
}

.RADataImg {
  display: flex;
  width: var(--pImgWidth);
  height: var(--pImgHeight);
  background-color: rgba(0, 0, 0, 0);
}

.RAButton {
  padding: 0.75vh;
  margin: 0.5vh;
  border-radius: 3vh;
  border-width: 0.1vh;
  transition: all 0.5s, border-width 0.1s, border-color 0.1s;
}

.RAButton:hover {
  transform: scale(1.1);
}

.RAButtons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 75vw;
  margin: auto;
  margin-top: 3vh;
  margin-bottom: 2vh;
  background-color: var(--content);
  border-radius: 7vh;
  padding: 3vh;
}

.manufacturers,
.directions,
.scopes {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22.5vw;
}

.active {
  background-color: var(--deepGreen);
  border-color: var(--deepGreen);
  transform: scale(1.1);
}

#RASearchButton {
  background-color: var(--cyan);
  border-radius: 1vh;
  padding: 1vh;
  border-width: 0.1vh;
  transition: all 0.5s;
}

#RASearchButton:hover {
  transform: scale(1.2);
}

#RASearchMenuBackground {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 99999999;
}

@media screen and (max-width: 1000px) {
  .RAResultsHolder {
    width: 75vw;
  }

  .RAResults {
    width: 60vw;
  }

}

</style>