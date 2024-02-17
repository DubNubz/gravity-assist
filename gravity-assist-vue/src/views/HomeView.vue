<template>
    <div class="title">
        <img src="/radiant1-removebg-preview.png" alt="Gravity Assist Icon" id="gravityAssistIcon">
        <h2 id="gravityAssistTitle">Gravity Assist</h2>
    </div>

    <div class="title-description">
      <p><span class="normalText">by DubNubz</span></p>
    </div>

    <div class="latestChange">
        <ChangelogCard/>
    </div>

    <button @click="changeButton" class="loadAllChanges" :class="{ load: loaded == false, unload: loaded == true }">{{ loadFlavorText }} all changes</button>
    <div class="allChanges" v-if="loaded">
        <AllChangesCard v-for="change in changedChangelog"
        :key="change.version"
        :Change="change"
        />
    </div>

</template>

<script setup>

import AllChangesCard from '@/components/AllChangesCard.vue';
import ChangelogCard from '@/components/ChangelogCard.vue';
import { ref } from 'vue';
import { changelog } from '@/stores/changelog';
import { globalVariables } from '@/stores/global';

globalVariables.activeModule.value === 'Home';
const loaded = ref(false);
const loadFlavorText = ref("View");

const changedChangelog = ref(changelog.slice(0, changelog.length - 1));
changedChangelog.value.reverse();

function changeButton () {
    loaded.value = !loaded.value;
    if (loaded.value == false) {
        loadFlavorText.value = "View";
    } else {
        loadFlavorText.value = "Hide";
    }
}

</script>

<style scoped>

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

.load {background-color: var(--deepGreen)}
.unload {background-color: var(--pastelRed)}

.loadAllChanges {
    margin-bottom: 3vh;
    border-radius: 2vh;
    padding: 2vh;
    border-width: 0.1vh;
    transition: all 0.5s;
    width: 20vh;
}

.loadAllChanges:hover {
    transform: scale(1.2);
}

.latestChange {
  padding: 2vh;
  border-radius: 3vh;
  margin-bottom: 10vh;
  margin-top: 5vh;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.allChanges {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.latestChange {
  background-color: var(--greenContent);
}

</style>