<template>
    <h2>Version {{ changelog[changelog.length - 1].version }}</h2>
    <h3>Latest Release: {{ changelog[changelog.length - 1].release }}</h3>
        <div class="changeNotes" v-for="change in changelog[changelog.length - 1].notes">
            <p>► {{ change }}</p>
        </div>
</template>

<script setup>

import { changelog } from '@/stores/changelog';

</script>

<style scoped>

</style>