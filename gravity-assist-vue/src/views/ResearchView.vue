<template>
    <div class="title">
        <h2>Research Agreement Helper</h2>
    </div>
    
    <div class="title-description">
      <p>Select a ship to find a research agreement path for it, or freely browse through all reseach agreement paths.</p>
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

    <Transition name="search">
      <div id="RASearchMenuBackground" v-if="globalVariables.searchActive.value">
        <ResearchSearch @response="searchChangeView"/>
      </div>
    </Transition>
    
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
          <button class="infoChangeButton previousChange" @click="previousButton('manufacturer')">&lt;</button>
          <p class="infoDisplay">{{ globalVariables.activeManufacturer.value }}</p>
          <button class="infoChangeButton nextChange" @click="nextButton('manufacturer')">></button>
        </div>
      </div>
      <div class="directions">
        <h3>Directions</h3>
        <div class="buttonArray">
          <button class="infoChangeButton previousChange" @click="previousButton('direction')">&lt;</button>
          <p class="infoDisplay">{{ globalVariables.activeDirection.value }}</p>
          <button class="infoChangeButton nextChange" @click="nextButton('direction')">></button>
        </div>
      </div>
      <div class="scopes">
        <h3>Scopes</h3>
        <div class="buttonArray">
          <button class="infoChangeButton previousChange" @click="previousButton('scope')">&lt;</button>
          <p class="infoDisplay">{{ globalVariables.activeScope.value }}</p>
          <button class="infoChangeButton nextChange" @click="nextButton('scope')">></button>
        </div>
      </div>

      <button class="copyToClipboard" @click="sharePath" id="share">
        <img src="/share.svg" alt="Share this tool">
        <h3>Share</h3>
      </button>
      <h3>Time required: 
        <span :class="getColor(Math.floor(Number(getTime(globalVariables.activeManufacturer.value, globalVariables.activeDirection.value, globalVariables.activeScope.value)) / 24))">
          {{ Math.floor(Number(getTime(globalVariables.activeManufacturer.value, globalVariables.activeDirection.value, globalVariables.activeScope.value)) / 24) }}
        </span> days
        <span v-if="Math.floor(Number(getTime(globalVariables.activeManufacturer.value, globalVariables.activeDirection.value, globalVariables.activeScope.value)) % 24) != 0">, 
          <span :class="getColor(Math.floor(Number(getTime(globalVariables.activeManufacturer.value, globalVariables.activeDirection.value, globalVariables.activeScope.value)) / 24))">
            {{ Math.floor(Number(getTime(globalVariables.activeManufacturer.value, globalVariables.activeDirection.value, globalVariables.activeScope.value)) % 24) }}
          </span> hours
        </span>
        <span v-if="((Number(getTime(globalVariables.activeManufacturer.value, globalVariables.activeDirection.value, globalVariables.activeScope.value)) % 24) % 1) * 60 != 0">, 
          <span :class="getColor(Math.floor(Number(getTime(globalVariables.activeManufacturer.value, globalVariables.activeDirection.value, globalVariables.activeScope.value)) / 24))">
            {{ ((Number(getTime(globalVariables.activeManufacturer.value, globalVariables.activeDirection.value, globalVariables.activeScope.value)) % 24) % 1) * 60 }}
          </span> minutes
        </span>
      </h3>

    </div>

    <div class="RAResultsHolder">
        <div class="RAResults">
          <ResearchResults :Data="filteredData"/>
        </div>
    </div>
</template>

<script setup>

import { data, difficulty } from '@/stores/ra_data';
import { ref } from 'vue';
import ResearchResults from '@/components/ResearchResults.vue';
import { globalVariables } from '@/stores/global';
import ResearchSearch from '@/components/ResearchSearch.vue';
import { useRoute } from 'vue-router';

globalVariables.activeModule.value = 'Research Agreement Helper';
const route = useRoute();
const filteredData = ref();
const shareActive = ref(false);

if (route.params.ship == "all") {
} else if (route.params.ship) {
  const shipArray = data.find((ship) => ship.name == route.params.ship[0].toUpperCase() + route.params.ship.split("").slice(1, -2).join("") && ship.variant == route.params.ship.split("").slice(-1).join(""));
  globalVariables.currentSearchShip.value = route.params.ship[0].toUpperCase() + route.params.ship.split("").slice(1).join("");
  searchChangeView(shipArray.manufacturer, ref(shipArray.direction).value, shipArray.scope);
}
if (route.params.manufacturer) {
  globalVariables.activeManufacturer.value = route.params.manufacturer;
}
if (route.params.direction) {
  globalVariables.activeDirection.value = route.params.direction;
}
if (route.params.scope) {
  globalVariables.activeScope.value = route.params.scope;
}

filteredData.value = [...data.filter((ship) => (ship.manufacturer.includes(globalVariables.activeManufacturer.value) || globalVariables.activeManufacturer.value == "Empty") && (ship.direction.includes(globalVariables.activeDirection.value) || globalVariables.activeDirection.value == "Empty") && (ship.scope.includes(globalVariables.activeScope.value) || globalVariables.activeScope.value == "Empty"))];


function sharePath () {
  if (globalVariables.currentSearchShip.value != "Click to select ship") {
    navigator.clipboard.writeText(`https://gravityassist.xyz/modules/research-agreement-helper/${globalVariables.currentSearchShip.value.replace(" ", "%20")}`).then(() => {
      shareActive.value = true;
      setTimeout(() => {
        shareActive.value = false;
      }, 1500);
    }, () => {
      alert("Link failed to copy to clipboard");
    })
  } else {
    navigator.clipboard.writeText(`https://gravityassist.xyz/modules/research-agreement-helper/all/${String(globalVariables.activeManufacturer.value).replace(" ", "%20")}/${String(globalVariables.activeDirection.value).replace(" ", "%20")}/${String(globalVariables.activeScope.value).replace(" ", "%20")}`).then(() => {
      shareActive.value = true;
      setTimeout(() => {
        shareActive.value = false;
      }, 1500);
    }, () => {
      alert("Link failed to copy to clipboard");
    })
  }
  
}

function getColor (input) {
  if (input > 20) {
    return "red";
  } else if (input >= 14.5) {
    return "orange";
  } else if (input >= 5.5) {
    return "yellow";
  } else {
    return "green";
  }
}

function getTime (manufacturer, direction, scope) {
  const allPointers = [];
  // [2.5, 3.5]

  if (manufacturer != "Empty") {
    allPointers.push(difficulty[manufacturer]);
  }
  if (direction != "Empty") {
    allPointers.push(difficulty[direction]);
  }
  if (scope != "Empty") {
    allPointers.push(difficulty[scope]);
  }

  if (allPointers.length == 1) {
    globalVariables.projectedTime.value = allPointers[0] * 10;
    return globalVariables.projectedTime.value;
  } else if (allPointers.length == 2) {
    globalVariables.projectedTime.value = (allPointers[0] * 10) + ((allPointers[0] + allPointers[1]) * 10);
    return globalVariables.projectedTime.value;
  } else if (allPointers.length == 3) {
    globalVariables.projectedTime.value = (allPointers[0] * 10) + ((allPointers[0] + allPointers[1]) * 10) + (allPointers[0] * allPointers[1] * allPointers[2] * 0.4 * 10);
    return globalVariables.projectedTime.value;
  } else {
    return 0;
  }
}

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

  let array = allPaths[allChances.indexOf(Math.max(...allChances))];
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
    globalVariables.currentSearchShip.value = "Click to select ship";
    filteredData.value = [...data.filter((ship) => (ship.manufacturer.includes(globalVariables.activeManufacturer.value) || globalVariables.activeManufacturer.value == "Empty") && (ship.direction.includes(globalVariables.activeDirection.value) || globalVariables.activeDirection.value == "Empty") && (ship.scope.includes(globalVariables.activeScope.value) || globalVariables.activeScope.value == "Empty"))];
}

</script>

<style scoped>

.copyToClipboard {
  background-color: var(--normalText);
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
  margin-top: 2vh;
}

#share {
  background-color: var(--cyan);
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

.infoChangeButton {
  width: 15%;
  border-radius: 1vh;
  border: 0;
  font-size: var(--h2);
  transition: all 0.5s;
  filter: grayscale(0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}

.previousChange {
  background-color: #ff5050;
  filter: grayscale(0.25);
}
.nextChange {background-color: var(--deepGreen)}

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.search-enter-active, .search-leave-active {
  transition: all 0.5s ease-in-out;
}

.search-leave-active {
  transition-delay: 0.15s;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
}

.search-enter-active #RASearchMenu,
.search-leave-active #RASearchMenu { 
  transition: all 0.25s ease-in-out;
}

.search-enter-active #RASearchMenu {
  transition-delay: 0.15s;
}

.search-enter-from #RASearchMenu,
.search-leave-to #RASearchMenu {
  transform: translateY(30px);
  opacity: 0.001;
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

  .copyToClipboard {
    width: 10vh;
  }

  .copyToClipboard h3 {
    display: none;
  }

}

</style>