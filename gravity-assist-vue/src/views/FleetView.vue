<template>
    <div class="title">
      <h2>Fleet Builder</h2>
    </div>
    <div class="title-description">
      <p>Play around with fleet compositions and build the fleet of your dreams!</p>
      <p style="color: var(--normalText)">(dreams sold separately)</p>
    </div>

    <FleetAddCard/>

</template>

<script setup>

import { ref } from 'vue';
import { data } from '@/stores/fleet';
import { globalVariables } from '@/stores/global';
import FleetAddCard from '@/components/FleetAddCard.vue';

globalVariables.activeModule.value = "Fleet Builder";

</script>

<style scoped>

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

.title-description {
  width: 85vw;
}

</style>