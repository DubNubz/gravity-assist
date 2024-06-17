<template>
    <div class="outer">
        <input type="text" v-model="raHelperStore().search" placeholder="Search">
        <div class="shipCardHolder">
            <div v-for="ship in filteredChoices" class="shipCard" @click="translateShip(ship)">
                <h3>{{ ship.name }} <span>({{ ship.variant }})</span></h3>
                <h4>{{ ship.variant_name }}</h4>
                <img :src="ship.img" :alt="'An image of the ship ' + ship.name">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Ship } from '~/utils/shipData';

const filteredChoices = ref<Ship[]> ([]);
const emit = defineEmits(["done"]);

watch(() => raHelperStore().search, () => autocomplete());

onMounted(() => {
    autocomplete();
});

function autocomplete () {
    if (raHelperStore().search) filteredChoices.value = shipData.filter((ship) => ship.name.toLowerCase().includes(raHelperStore().search.toLowerCase()));
    else filteredChoices.value = shipData;
}

function translateShip (ship: Ship) {
    raHelperStore().ship = ship;
    raHelperStore().manufacturer = ship.manufacturer;
    raHelperStore().scope = ship.scope;

    if (ship.direction.length == 1) {
        raHelperStore().direction = ship.direction[0];
        emit("done");
        return;
    }

    let trueDirection: ShipDirection = "Empty";
    const allPaths: Ship[][] = [];
    const allChances: number[] = [];

    for (let i in ship.direction) {
        const path = shipData.filter((shipObj) => [ship.manufacturer, "Empty"].includes(shipObj.manufacturer) &&
        (ship.direction[i] == "Empty" || shipObj.direction.includes(ship.direction[i])) &&
        [ship.scope, "Empty"].includes(shipObj.scope));

        allPaths.push(path);

        const shipInPath = path.find((ship2) => ship2.name + ship2.variant == ship.name + ship.variant);

        if (shipInPath) {
            const chance = Number(((shipInPath.weight / (Object.values(path).reduce((acc, item) => acc + item.weight, 0))) * 100).toFixed(2));
            allChances.push(chance);
        }
    }

    let array = allPaths[allChances.indexOf(Math.max(...allChances))];
    const shipInArray = array.find((ship2) => ship2.name + ship2.variant == ship.name + ship.variant);
    if (shipInArray) trueDirection = shipInArray.direction[allChances.indexOf(Math.max(...allChances))];

    raHelperStore().direction = trueDirection;
    emit("done");
}

</script>

<style lang="scss" scoped>

.outer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    input {
        font-size: var(--h3);
        width: 40%;
        background-color: rgb(55, 55, 55);
        border-radius: 0.4em;
        color: white;
        border-color: #48005e;
        border-style: solid;
        border-width: 0.04em;
        text-align: center;
        height: 2em;
    }
    input::placeholder {
        color: white;
    }
    input:focus {
        outline: none;
    }
}

.shipCardHolder {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    margin-top: 4em;
    width: 95%;
    gap: 2%;

    .shipCard {
        width: 30%;
        background-color: rgb(45, 45, 45);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 24em;
        margin-bottom: 2.4em;
        border-radius: 2.4em;
        text-align: center;

        h3 {
            margin: 0;

            span {
                color: var(--gold);
                font-size: 1em;
            }
        }

        h4 {
            color: var(--normalText);
            margin-top: 0;
            margin-bottom: 0.4em;
        }

        img {
            width: 60%;
        }
    }
}

@media screen and (max-width: 1200px) {
    .outer {
        input {
            width: 70%;
        }
    }

    .shipCardHolder {
        .shipCard {
            width: 45%;
            height: 18em;
        }
    }
}

@media screen and (max-width: 800px) {
    .shipCardHolder {
        width: 100%;

        .shipCard {
            width: 45%;
            height: 16em;
            border-radius: 2svh;
        }
    }
}

@media screen and (max-width: 550px) {
    .shipCardHolder {
        .shipCard {
            height: 20em;
            width: 100%;
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .shipCardHolder {
        .shipCard:hover {
            background-color: rgb(70, 70, 70);
        }
    }
}

</style>