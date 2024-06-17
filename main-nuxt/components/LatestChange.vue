<template>
    <div class="card">
        <h2 v-if="['bugifx', 'minor release'].includes(mostRecentVersion.type)">Version <span>{{ getLatestChanges() }} - {{ mostRecentVersion.version }}</span></h2>
        <h2 v-else>Version <span>{{ mostRecentVersion.version }}</span></h2>

        <h3 style="margin-top: 0.4em;">Latest Release: <span>{{ mostRecentVersion.release }}</span></h3>

        <div class="changeNotes">
            <p v-for="change in getNotes().slice(0, 5)">► {{ change }}<span v-if="change != getNotes()[getNotes().length - 1]">,</span></p>
            <p v-if="getNotes().length > 5" style="color: var(--darkGray)">...and more!</p>
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
    background-color: rgb(45, 45, 45);
    border-radius: 3em;
    padding: 3em;
    width: 50em;
    min-height: 40em;

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
        h3, p {
            font-size: 1.85em;
            margin-top: 0;
            margin-bottom: 0.5em;

            span {
                color: white;
            }
        }
    }
}

</style>