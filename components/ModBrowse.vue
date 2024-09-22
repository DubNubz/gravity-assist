<template>
    <div class="shipCardHolder">
        <div class="divider">
            <h3>Battlecruisers</h3>
            <div class="shipCardDiv">
                <div v-for="ship in shipData.filter((ship2) => ship2.type == 'Battlecruiser')" class="shipCard"
                @click="handleClick(ship)" :class="{ active: compareObjectsSingle(ship, (modLibraryStore().ship as Ship)) }">
                    <h3>{{ ship.name }}</h3>
                    <img :src="ship.img" :alt="'An image of the ship ' + ship.name">
                </div>
            </div>
        </div>
        <div class="divider">
            <h3>Auxiliary Ships</h3>
            <div class="shipCardDiv">
                <div v-for="ship in shipData.filter((ship2) => ship2.type == 'Auxiliary Ship')" class="shipCard"
                @click="handleClick(ship)" :class="{ active: compareObjectsSingle(ship, (modLibraryStore().ship as Ship)) }">
                    <h3>{{ ship.name }}</h3>
                    <img :src="ship.img" :alt="'An image of the ship ' + ship.name">
                </div>
            </div>
        </div>
        <div class="divider">
            <h3>Carriers</h3>
                <div class="shipCardDiv">
                <div v-for="ship in shipData.filter((ship2) => ship2.type == 'Carrier')" class="shipCard"
                @click="handleClick(ship)" :class="{ active: compareObjectsSingle(ship, (modLibraryStore().ship as Ship)) }">
                    <h3>{{ ship.name }}</h3>
                    <img :src="ship.img" :alt="'An image of the ship ' + ship.name">
                </div>
            </div>
        </div>
        <div class="divider">
            <h3>Battleships</h3>
            <div class="shipCardDiv">
                <div v-for="ship in shipData.filter((ship2) => ship2.type == 'Battleship')" class="shipCard"
                @click="handleClick(ship)" :class="{ active: compareObjectsSingle(ship, (modLibraryStore().ship as Ship)) }">
                    <h3>{{ ship.name }}</h3>
                    <img :src="ship.img" :alt="'An image of the ship ' + ship.name">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const shipData = await $fetch("/api/ships");
const emit = defineEmits(["done"]);

function handleClick (ship: Ship) {
    modLibraryStore().ship = ship;
    emit("done");
}

</script>

<style lang="scss" scoped>

.shipCardHolder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 2%;

    .divider {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        h3 {
            font-size: 2.9em;
            margin-top: 0;
            margin-bottom: 0.4em;
        }
    }

    .shipCardDiv {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 2%;
        margin-bottom: 1.2em;
    }

    .shipCard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 31%;
        height: 20em;
        margin-bottom: 1.6em;
        background-color: rgb(45, 45, 45);
        border-radius: 1.6em;
        transition: all 0.25s;

        h3 {
            text-align: center;
            font-size: 2em;
        }

        img {
            width: 60%;
        }
    }

    .active {
        background-color: rgb(60, 60, 60);
    }
}

@media screen and (max-width: 1400px) {
    .shipCardHolder {
        .shipCard {
            width: 49%;
            height: 17.5em;
        }
    }
}

@media screen and (max-width: 800px) {
    .shipCardHolder {
        .shipCard {
            width: 100%;
            height: 22.5em;

            img {
                width: 40%;
            }
        }
    }
}

@media screen and (max-width: 500px) {
    .shipCardHolder {
        .shipCard {
            height: 17.5em;
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .shipCardHolder {
        .shipCard:hover {
            background-color: rgb(65, 65, 65);
        }
    }
}

</style>