<template>
    <div class="title">
        <h2>Research Agreement Finder</h2>
        <p>Select a ship to find a research agreement path for it, or freely browse through all reseach agreement paths.</p>
    </div>

    <div class="RASearch">
        <p>Currently displaying results of: <span class="cyan" id="RASearchCurrent">{{ currentSearchShip }}</span></p>
        <button id="RASearchButton" @click="searchActive = !searchActive">SELECT A SHIP</button>
    </div>

    <div id="RASearchMenuBackground" v-if="searchActive">
        <div id="RASearchMenu">
            <label for="RASearchInput"><h2>Click on a ship to select it</h2></label>
            <input type="text" id="RASearchInput" placeholder="Click to start typing to narrow search..." @input="autocomplete">
            <button class="RASearchConfirmButton" @click="searchActive = !searchActive">CONFIRM</button>
            <div id="RASearchMenuResults">
                <div id="RASearchResults"></div>
            </div>
        </div>
    </div>
    
    <div class="RAButtons">
        <div class="manufacturers">
            <h3>Companies</h3>
            <button class="RAButton" id="jupiterIndustries" @click="changeView(0, 'Jupiter Industry', 'jupiterIndustries')">Jupiter Industry</button>
            <button class="RAButton" id="nomaShipping" @click="changeView(1, 'NOMA Shipping', 'nomaShipping')">NOMA Shipping</button>
            <button class="RAButton" id="antonios" @click="changeView(2, 'Antonios', 'antonios')">Antonios</button>
            <button class="RAButton" id="dawnAccord" @click="changeView(3, 'Dawn Accord', 'dawnAccord')">Dawn Accord</button>
            <button class="RAButton" id="emptyManufacturer" @click="changeView(4, 'No Company', 'emptyManufacturer')">No Company</button>
        </div>
        <div class="directions">
            <h3>Directions</h3>
            <button class="RAButton" id="outstandingFirepower" @click="changeView(10, 'Outstanding Firepower', 'outstandingFirepower')">Outstanding Firepower</button>
            <button class="RAButton" id="sustainedCombat" @click="changeView(11, 'Sustained Combat', 'sustainedCombat')">Sustained Combat</button>
            <button class="RAButton" id="strategySupport" @click="changeView(12, 'Strategy & Support', 'strategySupport')">Strategy & Support</button>
            <button class="RAButton" id="fighterCorvette" @click="changeView(13, 'Fighter & Corvette', 'fighterCorvette')">Fighter & Corvette</button>
            <button class="RAButton" id="emptyDirection" @click="changeView(14, 'No Direction', 'emptyDirection')">No Direction</button>
        </div>
        <div class="scopes">
            <h3>Scopes</h3>
            <button class="RAButton" id="projectile" @click="changeView(20, 'Projectile Weapon', 'projectile')">Projectile Weapon</button>
            <button class="RAButton" id="directfire" @click="changeView(21, 'Direct-Fire Weapon', 'directfire')">Direct-Fire Weapon</button>
            <button class="RAButton" id="emptyScope" @click="changeView(22, 'No Scope', 'emptyScope')">No Scope</button>
        </div>
    </div>

    <button id="resetButton">Reset</button>

    <div class="RAResultsHolder">
        <div class="RAResults">
          <ResearchResults/>
        </div>
    </div>
</template>

<script setup>

import { data } from '@/stores/ra_data';
import { ref } from 'vue';
import ResearchResults from '@/components/ResearchResults.vue';
import { globalVariables } from '@/stores/global';

const searchActive = ref(false);
const currentSearchShip = ref("Not selected");

function changeView (type, name, id) {
    if (type <= 4) {
      globalVariables.activeManufacturer.value = name;
    } else if (type >= 10 && type <= 14) {
      globalVariables.activeDirection.value = name;
    } else {
      globalVariables.activeScope.value = name;
    }

    console.log(globalVariables);
}

function autocomplete () {
    const shipList = [];
    for (const ship in data) {
        shipList.push(`${data[ship].name}-${data[ship].variant}`);
    }

    const inputValue = document.querySelector("#RASearchInput").value;
    const filteredChoices = shipList.filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()));

    document.querySelector("#RASearchResults").innerHTML = "";

    filteredChoices.forEach((choice) => {
        const listItem = document.createElement("p");
        listItem.setAttribute("id", "RASearchResultItem")
        listItem.textContent = choice;

        listItem.addEventListener("click", function () {
            document.querySelector("#RASearchInput").value = choice;
            currentSearchShip.value = choice;
            document.querySelector("#RASearchResults").innerHTML = "";
        });

        document.querySelector("#RASearchResults").appendChild(listItem);
    });
}

</script>

<style scoped>

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
  width: 70vw;
  margin: auto;
  margin-top: 3vh;
  margin-bottom: 2vh;
}

.manufacturers,
.directions,
.scopes {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10vw;
  background-color: var(--content);
  border-radius: 7vh;
  padding: 3vh;
}

.active {
  background-color: var(--deepGreen);
  border-color: var(--deepGreen);
  transform: scale(1.1);
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

::-webkit-scrollbar {
  width: 0;
}

.RASearchConfirmButton {
  margin-top: 1vh;
  background-color: var(--deepGreen);
  border-radius: 1vh;
  padding: 1vh;
}

#RASearchInput {
  width: 40vw;
  border-radius: 1vh;
  border-width: 0.1vh;
  padding: 0.5vh;
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

#RASearchResultItem {
  transition: all 0.5s;
}

#RASearchResultItem:hover {
  transform: scale(1.3);
  color: var(--gold);
  background-color: var(--lightContent);
}

</style>