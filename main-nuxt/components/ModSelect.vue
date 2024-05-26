<template>
    <div class="outer">
        <img class="shipImg" :src="foundShip?.img" :alt="'Image of' + foundShip?.name">

        <div class="categoryButtons">
            <button v-for="category in [...new Set(foundShip?.modules?.map((mod) => mod.system.slice(0, 1)))]" @click="modLibraryStore().category = category" :class="{ active: modLibraryStore().category == category }">
                <p>{{ category }}</p>
            </button>
        </div>

        <div class="divider"></div>

        <div class="moduleButtons">
            <button v-for="mod in foundShip?.modules?.filter((mod) => mod.system.slice(0, 1)[0] == modLibraryStore().category)"
            @click="modLibraryStore().mod = Number(mod.system.slice(1))" :class="{ active: modLibraryStore().mod == Number(mod.system.slice(1)) }">
                <img v-if="mod.img" :src="mod.img" :alt="'Image of' + mod.system">
                <p>{{ mod.system }}</p>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

const foundShip = ref(shipData.filter((ship) => ship.modules).find((ship) => ship.name == modLibraryStore().ship?.name));

</script>

<style lang="scss" scoped>

.outer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.shipImg {
    width: 45%;
    margin-bottom: 1.6em;
}

.categoryButtons {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    gap: 2%;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10em;
        height: 3.6em;
        padding: 1.6em;
        border-radius: 0.8em;
        border: 0;
        color: white;
        background-color: rgb(50, 50, 50);
        transition: all 0.25s;

        p {
            font-size: 2.2em;
        }
    }

    .active {
        background-color: rgb(70, 70, 70);
    }
}

.divider {
    width: 100%;
    height: 0.4em;
    margin-top: 1.5em;
    background-color: rgb(50, 50, 50);
    border-radius: 500em;
}

.moduleButtons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 90%;
    margin-top: 2.4em;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 14em;
        height: 4.8em;
        padding: 1.6em;
        border-radius: 0.8em;
        border: 0;
        color: white;
        background-color: rgb(50, 50, 50);
        transition: all 0.25s;
        gap: 0.8em;

        img {
            width: 4em;
        }

        p {
            font-size: 2.2em;
        }
    }

    .active {
        background-color: rgb(70, 70, 70);
    }
}

@media (hover: hover) and (pointer: fine) {
    .categoryButtons button:hover {
        background-color: rgb(75, 75, 75);
    }

    .moduleButtons button:hover {
        background-color: rgb(75, 75, 75);
    }
}

</style>