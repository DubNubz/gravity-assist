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

        <div class="card" :class="{ search: !browse }">
            <RaBrowse v-if="browse" />
            <RaSearch v-else @done="browse = true" />
        </div>

        <div class="resultHolder" v-if="browse">
            <div class="result" v-for="ship in data" :class="{ searched: raHelperStore().ship && ship == raHelperStore().ship }">
                <h3>{{ship.name}} <span>({{ ship.variant }})</span></h3>
                <img :src="ship.img" :alt="'Image of ' + ship.name">
                <h3>{{ ((ship.weight / (Object.values(data).reduce((acc, item) => acc + item.weight, 0))) * 100).toFixed(2) }}%</h3>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Ship, ShipDirection, ShipManufacturer, ShipScope } from '~/utils/shipData';

const browse = ref(true);
const data = ref(highlightSearched(shipData.filter((shipObj) => [shipObj.manufacturer, "Empty"].includes(raHelperStore().manufacturer) &&
    [...shipObj.direction, "Empty"].includes(raHelperStore().direction) &&
    [shipObj.scope, "Empty"].includes(raHelperStore().scope))));
const route = useRoute();

watch(() => raHelperStore().manufacturer, () => refilterData());
watch(() => raHelperStore().direction, () => refilterData());
watch(() => raHelperStore().scope, () => refilterData());

onMounted(() => {
    const manufacturer = route.query.manufacturer as ShipManufacturer;
    const direction = route.query.direction as ShipDirection;
    const scope = route.query.direction as ShipScope;
    const shipName = route.query.search as string;

    if (manufacturer) raHelperStore().manufacturer = manufacturers.includes(manufacturer) ? manufacturer : "Jupiter Industry";
    if (direction) raHelperStore().direction = directions.includes(direction) ? direction : "Outstanding Firepower";
    if (scope) raHelperStore().scope = scopes.includes(scope) ? scope : "Projectile Weapon";
    if (shipName) {
        raHelperStore().ship = shipData.find((ship) => ship.name == shipName);
        browse.value = false;
        raHelperStore().search = shipName;
    }
});

function refilterData () {
    data.value = highlightSearched(shipData.filter((shipObj) => [shipObj.manufacturer, "Empty"].includes(raHelperStore().manufacturer) &&
    [...shipObj.direction, "Empty"].includes(raHelperStore().direction) &&
    [shipObj.scope, "Empty"].includes(raHelperStore().scope)));
}

function highlightSearched (array: Ship[]) {
    const searchedShip = raHelperStore().ship;
    if (searchedShip) {
        const newArray = [...array];
        const findInArrayIndex = newArray.findIndex((ship) => ship.name + ship.variant == searchedShip.name + searchedShip.variant);

        newArray.splice(findInArrayIndex, 1);
        newArray.splice(0, 0, searchedShip);
        return newArray;
    }
    return array;
}

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

.card {
    background-color: rgb(36, 36, 36);
    width: 65em;
    padding: 3em;
    border-radius: 3em;
    margin-top: 4em;
    transition: all 0.25s;
}

.search {
    width: 120em;
}

.resultHolder {
    width: 120em;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    margin-top: 7em;

    .result {
        width: 30%;
        background-color: rgb(45, 45, 45);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 30em;
        margin-bottom: 3em;
        border-radius: 3em;

        h3 {
            margin: 0.5em;

            span {
                color: var(--gold);
                font-size: 1.25em;
            }
        }

        img {
            width: 60%;
        }
    }

    .searched {
        background-color: rgb(70, 70, 70);
    }
}

@media (hover: hover) and (pointer: fine) {
    .navButtonHolder button:hover {
        background-color: rgb(55, 55, 55);
    }
}

</style>