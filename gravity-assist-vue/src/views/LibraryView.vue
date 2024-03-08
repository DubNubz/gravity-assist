<template>
    <div class="title">
        <h2>Module Library</h2>
    </div>
    <div class="title-description">
      <p>Choose a ship, then choose a module to inspect.</p>
      <p style="color: var(--normalText)">If you have a module that is missing here, please contact me :D</p>
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

    <div class="shipOverall">
        <div class="moveShipsButton">
            <button id="previousShipButton" @click="changeShip(0)">&lt;&lt; {{ data[globalVariables.previousShip.value].name }}</button>
            <button id="nextShipButton" @click="changeShip(1)">{{ data[globalVariables.nextShip.value].name }} >></button>
        </div>
        <div class="shipPreview">
            <img :src="data[globalVariables.currentShip.value].img" :alt="data[globalVariables.currentShip.value].name" id="modShipImg">
            <h2>{{ data[globalVariables.currentShip.value].name }} - {{ data[globalVariables.currentShip.value].title }}</h2>
            <h3>{{ data[globalVariables.currentShip.value].cost }} Command Points ({{ data[globalVariables.currentShip.value].row }} Row)</h3>
        </div>
        <div class="shipMods">

            <div class="shipModHolder" id="shipModsM">
                <button class="modButton"
                :class="{ active: globalVariables.currentMod.value[data[globalVariables.currentShip.value].name] == mod.identity }"
                v-for="mod in data[globalVariables.currentShip.value].modules.filter((mod) => mod.identity[0] == 'M')"
                @click="changeMod(mod.identity)">
                {{ mod.identity }}</button>
            </div>

            <div class="shipModHolder" id="shipModsA">
                <button class="modButton"
                :class="{ active: globalVariables.currentMod.value[data[globalVariables.currentShip.value].name] == mod.identity }"
                v-for="mod in data[globalVariables.currentShip.value].modules.filter((mod) => mod.identity[0] == 'A')"
                @click="changeMod(mod.identity)">
                {{ mod.identity }}</button>
            </div>

            <div class="shipModHolder" id="shipModsB">
                <button class="modButton"
                :class="{ active: globalVariables.currentMod.value[data[globalVariables.currentShip.value].name] == mod.identity }"
                v-for="mod in data[globalVariables.currentShip.value].modules.filter((mod) => mod.identity[0] == 'B')"
                @click="changeMod(mod.identity)">
                {{ mod.identity }}</button>
            </div>

            <div class="shipModHolder" id="shipModsC">
                <button class="modButton"
                :class="{ active: globalVariables.currentMod.value[data[globalVariables.currentShip.value].name] == mod.identity }"
                v-for="mod in data[globalVariables.currentShip.value].modules.filter((mod) => mod.identity[0] == 'C')"
                @click="changeMod(mod.identity)">
                {{ mod.identity }}</button>
            </div>

            <div class="shipModHolder" id="shipModsD">
                <button class="modButton"
                :class="{ active: globalVariables.currentMod.value[data[globalVariables.currentShip.value].name] == mod.identity }"
                v-for="mod in data[globalVariables.currentShip.value].modules.filter((mod) => mod.identity[0] == 'D')"
                @click="changeMod(mod.identity)">
                {{ mod.identity }}</button>
            </div>

            <div class="shipModHolder" id="shipModsE">
                <button class="modButton"
                :class="{ active: globalVariables.currentMod.value[data[globalVariables.currentShip.value].name] == mod.identity }"
                v-for="mod in data[globalVariables.currentShip.value].modules.filter((mod) => mod.identity[0] == 'E')"
                @click="changeMod(mod.identity)">
                {{ mod.identity }}</button>
            </div>

            <button class="copyToClipboard" @click="shareModule">Copy sharing link</button>
        </div>
    </div>

    <div class="shipModShowcase">
      <ShipModShowcase :Mod="data[globalVariables.currentShip.value].modules.find((mod) => mod.identity == globalVariables.currentMod.value[data[globalVariables.currentShip.value].name])"/>
    </div>

    <div class="modWeaponHolder">
      <ModWeaponHolder :Mod="data[globalVariables.currentShip.value].modules.find((mod) => mod.identity == globalVariables.currentMod.value[data[globalVariables.currentShip.value].name])"/>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { data } from '@/stores/mod_data';
import { globalVariables } from '@/stores/global';
import ShipModShowcase from '@/components/ShipModShowcase.vue';
import ModWeaponHolder from '@/components/ModWeaponHolder.vue';
import { useRoute } from 'vue-router';

globalVariables.activeModule.value = 'Module Library';
const route = useRoute();
const shareActive = ref(false);

if (route.params.ship) {
  globalVariables.currentShip.value = data.findIndex((ship) => ship.name == route.params.ship);
  
  if (Number(data.findIndex((ship) => ship.name == route.params.ship) - 1) < 0) {
    globalVariables.previousShip.value = data.length - 1;
  } else {
    globalVariables.previousShip.value = Number(data.findIndex((ship) => ship.name == route.params.ship) - 1);
  }

  if (Number(data.findIndex((ship) => ship.name == route.params.ship) + 1) >= data.length) {
    globalVariables.nextShip.value = 0;
  } else {
    globalVariables.nextShip.value = Number(data.findIndex((ship) => ship.name == route.params.ship) + 1);
  }
}
if (route.params.mod) {
  globalVariables.currentMod.value[data[globalVariables.currentShip.value].name] = route.params.mod;
}

function shareModule () {
  navigator.clipboard.writeText(`https://gravityassist.xyz/modules/module-library/${data[globalVariables.currentShip.value].name.replaceAll(" ", "%20")}/${globalVariables.currentMod.value[data[globalVariables.currentShip.value].name]}`).then(() => {
    shareActive.value = true;
    setTimeout(() => {
      shareActive.value = false;
    }, 1500);
  }, () => {
    alert("Link failed to copy to clipboard");
  })
}

function changeMod (mod) {
    globalVariables.currentMod.value[data[globalVariables.currentShip.value].name] = mod;
}

function changeShip (type) {
    if (type == 0) {
        globalVariables.nextShip.value = globalVariables.currentShip.value;

        globalVariables.currentShip.value--;
        if (globalVariables.currentShip.value < 0) {
            globalVariables.currentShip.value = data.length - 1;
        }

        globalVariables.previousShip.value--;
        if (globalVariables.previousShip.value < 0) {
            globalVariables.previousShip.value = data.length - 1;
        }

    } else if (type == 1) {
        globalVariables.previousShip.value = globalVariables.currentShip.value;

        globalVariables.currentShip.value += 1;
        if (globalVariables.currentShip.value > data.length - 1) {
            globalVariables.currentShip.value = 0;
        }

        globalVariables.nextShip.value += 1;
        if (globalVariables.nextShip.value > data.length - 1) {
            globalVariables.nextShip.value = 0;
        }
    }
}

</script>

<style scoped>

.copyToClipboard {
  margin-top: 2vh;
  background-color: var(--normalText);
  width: 50%;
  font-size: var(--p);
  height: 5vh;
  border-radius: 1.5vh;
  transition: all 0.35s;
  background-color: var(--deepYellow);
  filter: grayscale(0.75);
}

.copyToClipboard:hover {
  filter: grayscale(0);
  transform: scale(1.05);
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

.shipOverall {
  display: flex;
  flex-direction: column;
  background-color: var(--content);
  padding: 3vh;
  border-radius: 3vh;
  margin-bottom: 5vh;
  width: 70vw;
  align-items: center;
}

.shipModShowcase {
  background-color: var(--content);
  padding: 3vh;
  border-radius: 3vh;
  width: 70vw;
}

.modWeaponHolder {
  width: 90vw;
  margin-top: 3vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

#modShipImg {
  width: 42.0212766vh;
  height: 25vh;
  background-color: rgba(0, 0, 0, 0);
}

.shipMods {
  display: flex;
  flex-direction: column;
  width: 60vw;
  align-items: center;
}

.shipModHolder {
  margin-top: 0.5vh;
}

.modButton {
  height: 5vh;
  transition: all 0.5s;
  width: 7.5vw;
  margin-left: 1vw;
  margin-bottom: 0.5vh;
  height: 4vh;
  border-width: 0.1vh;
  font-size: var(--p);
  background-color: var(--normalText);
}

.modButton:hover {
  background-color: var(--deepGreen);
  border-color: var(--deepGreen);
  transform: scale(1.1);
}

#modStats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

#modHeader {
  display: flex;
  align-items: center;
  justify-content: center;
}

#antishipBar,
#antiairBar,
#siegeBar,
#hpBar,
#armorBar,
#shieldBar {
  width: 22vw;
  height: 3vh;
  background-color: var(--footer);
  border-radius: 3vh;
}

.fillerBar {
  height: 100%;
  background-color: var(--pastelOrange);
  border-radius: 3vh;
}

.fillerBarArmor {
  height: 100%;
  background-color: var(--pastelBlue);
  border-radius: 3vh;
}

.weaponImg {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 0;
  width: 6vh;
  height: 6vh;
}

.modWeaponStats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

#damageType,
#dph,
#prioritizedTarget,
#modWeaponLockon {
  width: 30vw;
}

.moveShipsButton {
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin-bottom: 3vh;
  background-color: var(--content);
  padding: 2vw;
  border-radius: 3vh;
}

#previousShipButton,
#nextShipButton {
  width: 50%;
  height: 5vh;
  border-radius: 2vh;
  border-width: 0.1vh;
  transition: all 0.5s;
  background-color: var(--deepYellow);
  filter: grayscale(100%);
  font-size: var(--p);
}

#previousShipButton:hover,
#nextShipButton:hover {
  filter: grayscale(0%);
}

.active {
  background-color: var(--deepGreen);
  border-color: var(--deepGreen);
  transform: scale(1.1);
}

@media screen and (max-width: 1000px) {
  .modButton {
    width: 15vw;
    height: 4vh;
    margin-right: 1vw;
  }

  .shipMods {
    width: 70vw;
  }

  .moveShipsButton {
    width: 100%;
    padding: 5%;
  }

  #previousShipButton,
  #nextShipButton {
    height: 7.5vh;
    font-size: var(--p);
  }

  .modWeaponHolder {
    width: 80vw;
    margin-top: 3vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

</style>