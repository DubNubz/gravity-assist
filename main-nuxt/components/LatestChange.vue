<template>
    <div class="card">
        <h2 v-if="['bugifx', 'minor release'].includes(mostRecentVersion.type)">Version <span>{{ getLatestChanges() }} - {{ mostRecentVersion.version }}</span></h2>
        <h2 v-else>Version <span>{{ mostRecentVersion.version }}</span></h2>

        <h3>Latest Release: <span>{{ mostRecentVersion.release }}</span></h3>

        <div class="changeNotes">
            <h3 v-for="change in getNotes().slice(0, 5)">► {{ change }}<span v-if="change != getNotes()[getNotes().length - 1]">,</span></h3>
            <h3 v-if="getNotes().length > 5" style="color: var(--darkGray)">...and more!</h3>
        </div>
    </div>
</template>

<script setup lang="ts">

const mostRecentVersion = changelog[changelog.length - 1];

const latestVersion = ref("");
const latestVersionIndex = ref(0);

function getLatestChanges () {
    let counter = 1;

    while (changelog.length < counter) {
        counter++;
        const increment = changelog.length - counter;

        if (changelog[increment].type == "release") {
            latestVersion.value = changelog[increment].version;
            latestVersionIndex.value = increment;
            break;
        }
    }

    return latestVersion.value;
}

function getNotes () {
    const allNotes: string[] = [];
    allNotes.push(...mostRecentVersion.notes);

    if (latestVersion.value == "") return allNotes;

    for (let i = latestVersionIndex.value; i <= changelog.length - 1; i++) {
        allNotes.push(...changelog[i].notes);
    }

    return allNotes;
}

</script>

<style lang="scss" scoped>

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: rgb(36, 36, 36);
    border-radius: 3em;
    padding: 3em;
    margin-top: 5em;
    width: 50em;

    h2 {
        margin-bottom: 0;
        
        span {
            color: var(--gold);
        }
    }

    h3 span {
        color: var(--cyan);
    }

    .changeNotes {
        h3 {
            font-size: 1.85em;

            span {
                color: white;
            }
        }
    }
}

</style>