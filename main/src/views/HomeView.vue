<template>
  <div class="title">
      <img src="/radiant.svg" alt="Gravity Assist Icon" id="gravityAssistIcon">
      <h2 id="gravityAssistTitle">Gravity Assist</h2>
  </div>

  <div class="title-description">
    <p>by <a href="https://discord.com/invite/9mJ9b2Bbzx" style="text-decoration: none; font-size: var(--h3);">DubNubz</a></p>
    <p style="font-size: var(--h3); color: white">Did you know: <span style="color: var(--gold); font-size: var(--p)">{{ fact }}</span></p>
  </div>

  <div class="buttonArray">
    <button class="loadAllChanges creditsButton" @click="creditsActive = !creditsActive">
      <img src="/credits.svg" alt="View a list of all contributors to this site">
      <h3>Contributors</h3>
    </button>
    <button @click="loaded = !loaded" class="loadAllChanges loadButton">
      <img src="/changes.svg" alt="View a list of all changes made to this site">
      <h3>Changelog</h3>
    </button>
  </div>

  <div class="latestChange">
    <ChangelogCard/>
  </div>

  <Transition name="credits">
    <div class="creditsBackground" v-if="creditsActive">
      <div class="creditsOverall">
        <h2>Contributors</h2>
        <div v-for="credit in credits" class="creditsCredit">
          <div class="creditsHeaderBackground">
            <h3 id="creditsHeader">{{ credit.name }}</h3>
          </div>
          <p id="creditsInfo">{{ credit.info }}</p>
        </div>
        <button @click="creditsActive = !creditsActive" class="button">Close</button>
      </div>
    </div>
  </Transition>

  <Transition name="changes">
    <div class="allChangesBackground" v-if="loaded">
      <div class="allChanges">
        <AllChangesCard v-for="change in changedChangelog"
        :key="change.version"
        :Change="change"
        />
        <button @click="loaded = !loaded" class="button" id="allChangesButton">Close</button>
      </div>
    </div>
  </Transition>

</template>

<script setup lang="ts">

import AllChangesCard from '@/components/AllChangesCard.vue';
import ChangelogCard from '@/components/ChangelogCard.vue';
import { ref } from 'vue';
import { changelog } from '@/stores/changelog';
import { globalVariables } from '@/stores/global';
import { credits } from '@/stores/credits';
import { facts } from '@/stores/facts';

globalVariables.activeModule.value === 'Home';
const loaded = ref(false);
const creditsActive = ref(false);
const fact = ref(facts[getRandomIntInclusive(0, facts.length - 1)]);

const changedChangelog = ref([...changelog]);
changedChangelog.value.reverse();

function getRandomIntInclusive(min: number, max: number) {
const minCeiled = Math.ceil(min);
const maxFloored = Math.floor(max);
return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

</script>

<style scoped>

.buttonArray {
display: flex;
justify-content: space-evenly;
width: 50%;
margin-top: 2vh;
}

a {
color: var(--deepGreen);
}

.normalText {color: var(--normalText)}

.title-description {
width: 85vw;
}

#gravityAssistIcon,
#gravityAssistTitle {
background-color: rgba(0, 0, 0, 0);
display: inline-block;
vertical-align: middle;
}

img {
height: 6vh;
width: 6vh;
margin: 0.2vw;
margin-bottom: 0;
background-color: var(--transparent);
border-radius: 3vh;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding-left: 4vh;
  padding-right: 4vh;
  border-radius: 10vh;
  background: linear-gradient(to bottom, transparent 5%, var(--darkHeader), var(--darkHeader))
}

.appButtonDisplay {
display: flex;
flex-direction: column;
align-items: center;
background-color: var(--content);
padding: 3vh;
border-radius: 5vh;
width: 30vh;
}

.appButton {
width: 25vh;
margin-bottom: 1vh;
padding: 1vh;
border-radius: 5vh;
border-width: 0.1vh;
transition: all 0.5s;
text-decoration: none;
color: black;
font-size: 1.5vh;
}

.appButton:hover {
  transform: scale(1.2);
}

.loadAllChanges {
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
margin-bottom: 3vh;
}

.creditsButton {background-color: var(--deepYellow)}
.loadButton {background-color: #50dcff}

.loadAllChanges h3 {
margin: 0;
text-align: center;
width: fit-content;
height: fit-content;
font-size: var(--h3);
}

.loadAllChanges img {
background-color: transparent;
}

.loadAllChanges > * {
width: 5vh;
height: 5vh;
margin-right: 0;
}

.loadAllChanges:hover {
filter: grayscale(0);
}

.latestChange {
padding: 2vh;
border-radius: 3vh;
margin-bottom: 3vh;
width: fit-content;
display: flex;
flex-direction: column;
align-items: center;
background-color: var(--greenContent);
}

.allChanges {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.creditsBackground {
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

.creditsOverall {
width: fit-content;
max-width: 80%;
height: fit-content;
min-height: 40%;
max-height: 80%;
display: flex;
flex-direction: column;
align-items: center;
background-color: black;
border-radius: 5vh;
padding: 3vh;
overflow-y: auto;
}

.creditsCredit {
display: flex;
flex-direction: column;
align-items: center;
}

.creditsHeaderBackground {
background: linear-gradient(to bottom right, hsla(60, 100%, 50%, 0.2), hsl(46, 100%, 50%, 0.2), hsl(60, 100%, 50%, 0.2));
padding-left: 1vw;
padding-right: 1vw;
border-radius: 2vw;
}

#creditsHeader {
margin-bottom: 0.5vh;
margin-top: 0vh;
background-image: linear-gradient(to right, #ff0000, #ffbb00, #bbff00, #00ff4c, #00ffff, #00c3ff, #ff00ff);
width: fit-content;
background-clip: text;
color: transparent;
}

#creditsInfo {
margin-top: 0;
margin-bottom: 3vh;
}

.credits-enter-active, .credits-leave-active {
transition: all 0.5s ease-in-out;
}

.credits-leave-active {
transition-delay: 0.15s;
}

.credits-enter-from,
.credits-leave-to {
opacity: 0;
}

.credits-enter-active .creditsOverall,
.credits-leave-active .creditsOverall { 
transition: all 0.25s ease-in-out;
}

.credits-enter-active .creditsOverall {
transition-delay: 0.15s;
}

.credits-enter-from .creditsOverall,
.credits-leave-to .creditsOverall {
transform: translateY(30px);
opacity: 0.001;
}

.allChangesBackground {
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

.allChanges {
width: fit-content;
max-width: 80%;
height: fit-content;
min-height: 40%;
max-height: 80%;
display: flex;
flex-direction: column;
align-items: center;
background-color: black;
border-radius: 5vh;
padding: 3vh;
overflow-y: auto;
position: relative;
}

#allChangesButton {
position: fixed;
bottom: 10vh;
}

.changes-enter-active, .changes-leave-active {
transition: all 0.5s ease-in-out;
}

.changes-leave-active {
transition-delay: 0.15s;
}

.changes-enter-from,
.changes-leave-to {
opacity: 0;
}

.changes-enter-active .allChanges,
.changes-leave-active .allChanges { 
transition: all 0.25s ease-in-out;
}

.changes-enter-active .allChanges {
transition-delay: 0.15s;
}

.changes-enter-from .allChanges,
.changes-leave-to .allChanges {
transform: translateY(30px);
opacity: 0.001;
}

.button {
  margin-top: auto;
  margin-bottom: 2vh;
  background-color: #ff5050;
  border: 0;
  font-size: var(--h2);
  width: 15vw;
  overflow: hidden;
  transition: all 0.5s;
  border-radius: 2vh;
  padding-bottom: 1vh;
}
.button:hover {
  transform: scale(1.15);
}
.button::after {
content: "";
position: absolute;
left: -100%;
width: 100%;
height: 100%;
background: linear-gradient(90deg, transparent, #ff8a8a, transparent);
transition: left 0.5s ease;
}
.button:hover::after {
left: 100%;
}

@media screen and (max-width: 1000px) {
.button {
  width: 50vw;
}

.buttonArray {
  width: 80vw;
}

.loadAllChanges {
  width: 10vh;
}

.loadAllChanges h3 {
  display: none;
}
}

</style>