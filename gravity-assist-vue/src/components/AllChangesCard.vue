<template>
    <div class="card">
        <h2>Version {{ Change.version }}</h2>
        <h3>Release: {{ Change.release }}</h3>
            <div class="changeNotes">
                <p v-for="change in Change.notes">► {{ change }}</p>
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
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--redContent);
}

.changeNotes {
    padding: 2vh;
    border-radius: 3vh;
    margin-top: 2vh;
    width: fit-content;
    background-color: var(--redContent);
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