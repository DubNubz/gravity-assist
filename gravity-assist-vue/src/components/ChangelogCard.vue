<template>
    <h2 v-if="changelog[changelog.length - 1].type == 'bugfix'">Version {{ getChangelogVersion() }} - {{ changelog[changelog.length - 1].version }}</h2>
    <h2 v-else>Version {{ changelog[changelog.length - 1].version }}</h2>
    <h3>Latest Release: {{ changelog[changelog.length - 1].release }}</h3>
        <div class="changeNotes">
            <p v-for="change in getNotes()">► {{ change }}</p>
        </div>
</template>

<script setup>

import { changelog } from '@/stores/changelog';

let latestVersion;
let latestVersionIndex;

function getChangelogVersion () {
    let found = false;
    let counter = 1;
    if (changelog[changelog.length - 1].type == "bugfix") {
        while (found == false) {
            counter++;
            if (changelog[changelog.length - counter].type == "release") {
                latestVersion = changelog[changelog.length - counter].version;
                latestVersionIndex = changelog.length - counter;
                found = true;
            }
        }
    }
    return latestVersion;
}

function getNotes () {
    const allNotes = [];
    allNotes.push(...changelog[changelog.length - 1].notes);
    if (latestVersion != changelog[changelog.length - 1].version) {
        for (let i = latestVersionIndex; i <= changelog.length - 1; i++) {
            allNotes.push(...changelog[i].notes);
        }
    }
    return allNotes;
}

</script>

<style scoped>

.changeNotes {
    padding: 2vh;
    border-radius: 3vh;
    margin-top: 2vh;
    width: fit-content;
    background-color: var(--greenContent);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: start;
    max-width: 66vw;
}

p {
    margin-bottom: 0;
}

</style>