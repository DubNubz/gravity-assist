<template>
    <div class="title">
      <h2>Equipment Encyclopedia</h2>
    </div>
    <div class="title-description">
      <p>title description placeholder.</p>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { globalVariables } from '@/stores/global';
import { data } from '@/stores/equipment';

globalVariables.activeModule.value = "Equipment Encyclopedia";

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