<template>
    <div class="holder">
        <div v-for="change in [...changelog].reverse()" class="card">
            <h2>Version <span>{{ change.version }}</span> ({{ change.type }})</h2>
            <h3>Date: <span>{{ change.release }}</span></h3>
            <div class="changeNotes">
                <p v-for="note in change.notes">► {{ note }}<span v-if="note != change.notes[change.notes.length - 1]">,</span></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

useSeoMeta({
    title: "Changelog - Gravity Assist",
    description: "View all changes made to Gravity Assist."
});

</script>

<style lang="scss" scoped>

.holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
}

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
        h3, p {
            font-size: 1.65em;
            margin-top: 0;
            margin-bottom: 0.5em;

            span {
                color: white;
            }
        }
    }
}

@media screen and (max-width: 800px) {
    .card {
        width: 90svw;
        padding: 2svw;
        border-radius: 2svh;
    }
}

</style>