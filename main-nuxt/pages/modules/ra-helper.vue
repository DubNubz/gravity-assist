<template>
    <div class="holder">
        <div class="navButtonHolder">
            <button @click="browse = true" :class="{ active: browse == true }">
                <img src="/ui/openBook.svg" alt="Click to freely browse through all Research Agreement paths">
                <h3>Browse</h3>
            </button>
            <button @click="browse = false" :class="{ active: browse == false }">
                <img src="/ui/search.svg" alt="Click to search for the Research Agreemeent path of a ship">
                <h3>Search</h3>
            </button>
        </div>

        <RaBrowse v-if="browse" />
        <RaSearch v-else />
    </div>
</template>

<script setup lang="ts">

const browse = ref(true);

</script>

<style lang="scss" scoped>

.holder {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.navButtonHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100em;
    gap: 3%;

    button {
        background-color: transparent;
        border: 0;
        color: white;
        display: flex;
        width: 30%;
        align-items: center;
        justify-content: center;
        gap: 5%;
        transition: all 0.25s;
        border-radius: 2em;
        
        img {
            width: 6em;
        }
    }

    .active {
        background-color: rgb(45, 45, 45);
    }
}

@media (hover: hover) and (pointer: fine) {
    .navButtonHolder button:hover {
        background-color: rgb(55, 55, 55);
    }
}

</style>