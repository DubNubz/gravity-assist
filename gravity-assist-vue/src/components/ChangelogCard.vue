<template>
    <h2>Version {{ changelog[changelog.length - 1].version }}</h2>
    <h3>Latest Release: {{ changelog[changelog.length - 1].release }}</h3>
        <div class="changeNotes">
            <p v-for="change in changelog[changelog.length - 1].notes">► {{ change }}</p>
        </div>
</template>

<script setup>

import { changelog } from '@/stores/changelog';

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