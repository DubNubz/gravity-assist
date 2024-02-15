<template>
    <div class="card">
        <h2>Version {{ Change.version }}</h2>
        <h3>Latest Release: {{ Change.release }}</h3>
            <div class="changeNotes" v-for="change in Change.notes">
                <p>► {{ change }}</p>
            </div>
    </div>
</template>

<script setup>

const props = defineProps({
    Change: Object,
})

</script>

<style scoped>

.card {
  padding: 2vh;
  border-radius: 3vh;
  margin-bottom: 10vh;
  margin-top: 5vh;
  width: 66vw;
  background-color: var(--redContent);
}

</style>