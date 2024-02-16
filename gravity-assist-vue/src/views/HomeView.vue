<template>
    <div class="title">
        <h2>Gravity Assist</h2>
        <p>Access any Gravity Assist tool here, or at the top in the header</p>

        <div class="appButtonDisplay">
            <RouterLink :to="{ path: '/modules/color-generator'}" class="appButton" id="colorGeneratorAppButton">Color Generator</RouterLink>
            <RouterLink :to="{ path: '/modules/research-agreement-helper'}" class="appButton" id="researchAgreementAppButton">Research Agreement Helper</RouterLink>
            <RouterLink :to="{ path: '/modules/module-library'}" class="appButton" id="modLibraryAppButton">Module Library</RouterLink>
        </div>
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

#colorGeneratorAppButton {background-color: var(--pastelRed)}
#researchAgreementAppButton {background-color: var(--pastelOrange)}
#modLibraryAppButton {background-color: var(--pastelYellow)}

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75vw;
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

.latestChange,
.allChange {
  padding: 2vh;
  border-radius: 3vh;
  margin-bottom: 10vh;
  margin-top: 5vh;
  width: 66vw;
}

.latestChange {
  background-color: var(--greenContent);
}

</style>