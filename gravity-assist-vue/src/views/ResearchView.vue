<template>
    <div class="title">
        <h2>Research Agreement Helper</h2>
    </div>
    
    <div class="title-description">
      <p>Select a ship to find a research agreement path for it, or freely browse through all reseach agreement paths.</p>
    </div>

    <div id="RASearchMenuBackground" v-if="globalVariables.searchActive.value">
        <ResearchSearch @response="searchChangeView"/>
    </div>
    
    <div class="RAButtons">

      <div class="RASearch">
        <p>Currently displaying results of:</p>
        <div class="searchDisplay">
          <button id="RASearchButton" @click="globalVariables.searchActive.value = !globalVariables.searchActive.value"><img src="/arrow-circle.png" alt="Reverse all color options"></button>
          <p class="gold" id="RASearchCurrent" @click="globalVariables.searchActive.value = !globalVariables.searchActive.value">{{ globalVariables.currentSearchShip.value }}</p>
        </div>
      </div>

        <div class="manufacturers">
            <h3>Companies</h3>
            <div class="buttonArray">
              <button class="infoChangeButton previousChange" @click="previousButton('manufacturer')">&lt;&lt;</button>
              <p class="infoDisplay">{{ globalVariables.activeManufacturer.value }}</p>
              <button class="infoChangeButton nextChange" @click="nextButton('manufacturer')">>></button>
            </div>
        </div>
        <div class="directions">
            <h3>Directions</h3>
            <div class="buttonArray">
              <button class="infoChangeButton previousChange" @click="previousButton('direction')">&lt;&lt;</button>
              <p class="infoDisplay">{{ globalVariables.activeDirection.value }}</p>
              <button class="infoChangeButton nextChange" @click="nextButton('direction')">>></button>
            </div>
          </div>
        <div class="scopes">
            <h3>Scopes</h3>
            <div class="buttonArray">
              <button class="infoChangeButton previousChange" @click="previousButton('scope')">&lt;&lt;</button>
              <p class="infoDisplay">{{ globalVariables.activeScope.value }}</p>
              <button class="infoChangeButton nextChange" @click="nextButton('scope')">>></button>
            </div>
          </div>
    </div>

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

function previousButton (type) {
  if (type == "manufacturer") {
    globalVariables.currentManufacturer.value--;
    if (globalVariables.currentManufacturer.value < 0) {
      globalVariables.currentManufacturer.value = globalVariables.allManufacturers.value.length - 1;
    }

    changeView(0, globalVariables.allManufacturers.value[globalVariables.currentManufacturer.value]);
    

  } else if (type == "direction") {
    globalVariables.currentDirection.value--;
    if (globalVariables.currentDirection.value < 0) {
      globalVariables.currentDirection.value = globalVariables.allDirections.value.length - 1;
    }

    changeView(1, globalVariables.allDirections.value[globalVariables.currentDirection.value]);

  } else if (type == "scope") {
    globalVariables.currentScope.value--;
    if (globalVariables.currentScope.value < 0) {
      globalVariables.currentScope.value = globalVariables.allScopes.value.length - 1;
    }

    changeView(2, globalVariables.allScopes.value[globalVariables.currentScope.value]);
  }
}

function nextButton (type) {
  if (type == "manufacturer") {
    globalVariables.currentManufacturer.value++;
    if (globalVariables.currentManufacturer.value > globalVariables.allManufacturers.value.length - 1) {
      globalVariables.currentManufacturer.value = 0;
    }

    changeView(0, globalVariables.allManufacturers.value[globalVariables.currentManufacturer.value]);

  } else if (type == "direction") {
    globalVariables.currentDirection.value++;
    if (globalVariables.currentDirection.value > globalVariables.allDirections.value.length - 1) {
      globalVariables.currentDirection.value = 0;
    }

    changeView(1, globalVariables.allDirections.value[globalVariables.currentDirection.value]);

  } else if (type == "scope") {
    globalVariables.currentScope.value++;
    if (globalVariables.currentScope.value > globalVariables.allScopes.value.length - 1) {
      globalVariables.currentScope.value = 0;
    }

    changeView(2, globalVariables.allScopes.value[globalVariables.currentScope.value]);
  }
}

function searchChangeView (manufacturer, direction, scope) {
  globalVariables.activeManufacturer.value = manufacturer;
  globalVariables.activeScope.value = scope;
  globalVariables.currentManufacturer.value = globalVariables.allManufacturers.value.indexOf(manufacturer);
  globalVariables.currentScope.value = globalVariables.allScopes.value.indexOf(scope);

  let trueDirection;
  const allPaths = [];
  const allChances = [];

  for (let i in direction) {
    const path = [...data.filter((ship) => (ship.manufacturer.includes(globalVariables.activeManufacturer.value) || globalVariables.activeManufacturer.value == "Empty") && (ship.direction.includes(direction[i]) || direction[i] == "Empty") && (ship.scope.includes(globalVariables.activeScope.value) || globalVariables.activeScope.value == "Empty"))]
    allPaths.push(path);
    for (let ship in path) {
      if ((path[ship].name + "-" + path[ship].variant) == globalVariables.currentSearchShip.value) {
        const chance = Number(((path[ship].weight / (Object.values(path).reduce((acc, item) => acc + item.weight, 0))) * 100).toFixed(2));
        allChances.push(chance);
      }
    }
  }

  let array = allPaths[allChances.indexOf(Math.max(...allChances))]
  for (let i in array) {
    if ((array[i].name + "-" + array[i].variant) == globalVariables.currentSearchShip.value) {
      trueDirection = array[i].direction[allChances.indexOf(Math.max(...allChances))];
    }
  }

  globalVariables.activeDirection.value = trueDirection;
  globalVariables.currentDirection.value = globalVariables.allDirections.value.indexOf(trueDirection);
  filteredData.value = [...data.filter((ship) => (ship.manufacturer.includes(globalVariables.activeManufacturer.value) || globalVariables.activeManufacturer.value == "Empty") && (ship.direction.includes(globalVariables.activeDirection.value) || globalVariables.activeDirection.value == "Empty") && (ship.scope.includes(globalVariables.activeScope.value) || globalVariables.activeScope.value == "Empty"))]
}

function changeView (type, name) {
    if (type == 0) {
      globalVariables.activeManufacturer.value = name;
    } else if (type == 1) {
      globalVariables.activeDirection.value = name;
    } else {
      globalVariables.activeScope.value = name;
    }
    globalVariables.currentSearchShip.value = "Not selected";
    filteredData.value = [...data.filter((ship) => (ship.manufacturer.includes(globalVariables.activeManufacturer.value) || globalVariables.activeManufacturer.value == "Empty") && (ship.direction.includes(globalVariables.activeDirection.value) || globalVariables.activeDirection.value == "Empty") && (ship.scope.includes(globalVariables.activeScope.value) || globalVariables.activeScope.value == "Empty"))]
}

</script>

<style scoped>

.gold {color: var(--gold)}

.searchDisplay {
  display: flex;
  justify-content: center;
  align-items: center;
}

#RASearchCurrent {
  font-size: var(--h3);
  margin-left: 1vw;
  transition: all 0.5s;
}

#RASearchCurrent:hover {
  color: var(--deepGreen);
}

img {
  width: 5vh;
  height: 5vh;
}

.RASearch {
  margin-bottom: 3vh;
}

.buttonArray {
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: fit-content;
}

h3 {
  margin-bottom: 1vh;
}

.infoDisplay {
  background-color: var(--darkHeader);
  padding: 2vh;
  margin-top: 0;
  margin-bottom: 0;
  width: 50%;
  border-radius: 2vh;
  font-size: var(--h3);
}

.previousChange {background-color: var(--pastelRed)}
.nextChange {background-color: var(--pastelGreen)}

.infoChangeButton {
  width: 15%;
  border-radius: 1vh;
  border: 0;
  font-size: var(--h2);
  transition: all 0.5s;
  filter: grayscale(0.75);
}

.previousChange:hover {
  filter: grayscale(0);
  transform: translate(-0.5vw);
}

.nextChange:hover {
  filter: grayscale(0);
  transform: translate(0.5vw);
}

.title-description {
  width: 85vw;
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
  width: 60vw;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 5vh;
}

.RAResults {
  border-radius: 5vw;
  width: 90%;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 5vh;
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
  transition: all 0.5s;
  border-width: 0.1s;
  border-color: 0.1s;
}

.RAButton:hover {
  transform: scale(1.1);
}

.RAButtons {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;
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
  width: 100%;
}

.active {
  background-color: var(--deepGreen);
  border-color: var(--deepGreen);
  transform: scale(1.1);
}

#RASearchButton {
  background-color: var(--gold);
  border-radius: 3vh;
  width: 6vh;
  height: 6vh;
  transition: all 0.65s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0;
}

#RASearchButton:hover {
  background-color: var(--deepGreen);
  transform: rotate(540deg);
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
    width: 90vw;
  }

  .RAResults {
    width: 80vw;
  }

  .RAButtons {
    width: 80vw;
    border-radius: 3vh;
  }

  .infoDisplay {
    font-size: var(--p);
  }

  .infoChangeButton {
    font-size: var(--h3);
  }

}

</style>