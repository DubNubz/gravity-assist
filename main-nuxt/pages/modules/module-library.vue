<template>
    <div class="holder">
        <div class="navButtonHolder">
            <button @click="select = true" :class="{ active: select == true }">
                <img src="/ui/solarSystem.svg" alt="Click to freely browse through all Research Agreement paths">
                <h3>Ships</h3>
            </button>
            <button @click="select = false" :class="{ active: select == false }">
                <img src="/ui/wrench.svg" alt="Click to search for the Research Agreemeent path of a ship">
                <h3>Modules</h3>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

const select = ref(true);

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
    margin-top: 2em;

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