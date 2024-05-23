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

        <button class="boxButton" @click="copyShareLink" id="share">
            <img src="/ui/alt/whiteShare.svg" alt="Share this tool">
            <h3>Share</h3>
        </button>

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
    const direction = route.query.direction as string;
    const scope = route.query.scope as ShipScope;
    const name = route.query.name as string;
    const variant = route.query.variant as string;
    const search = route.query.search as string;

    if (manufacturer) raHelperStore().manufacturer = manufacturers.includes(manufacturer) ? manufacturer : "Jupiter Industry";
    if (direction) raHelperStore().direction = directions.includes(direction.replaceAll("and", "&") as ShipDirection) ? direction.replaceAll("and", "&") as ShipDirection : "Outstanding Firepower";
    if (scope) raHelperStore().scope = scopes.includes(scope) ? scope : "Projectile Weapon";
    if (name) {
        raHelperStore().ship = shipData.find((ship) => ship.name == name && ship.variant == variant);
        browse.value = false;
        raHelperStore().search = search;
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

async function copyShareLink () {
    const ship = raHelperStore().ship;

    if (ship) {
        const name = ship.name.replaceAll(" ", "%20");
        const variant = ship.variant.replaceAll(" ", "%20");
        const search = raHelperStore().search.replaceAll(" ", "%20");

        await navigator.clipboard.writeText(`https://gravityassist.xyz/modules/ra-helper?name=${name}&variant=${variant}&search=${search}`);
        alert("Link copied!")
        return;
    }

    const manufacturer = raHelperStore().manufacturer.replaceAll(" ", "%20");
    const direction = raHelperStore().direction.replaceAll(" ", "%20").replaceAll("&", "and");
    const scope = raHelperStore().scope.replaceAll(" ", "%20");

    await navigator.clipboard.writeText(`https://gravityassist.xyz/modules/ra-helper?manufacturer=${manufacturer}&direction=${direction}&scope=${scope}`);
    alert("Link copied!");
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

.boxButton {
    margin-top: 2em;
    border-radius: 1.5em;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10%;
    filter: grayscale(0.33);
    background-color: rgb(40, 40, 40);
    color: white;
    border: 0;
    padding: 1.5em;
    padding-left: 8em;
    padding-right: 8em;
          
    h3 {
        margin: 0;
        text-align: center;
        width: fit-content;
        height: fit-content;
        font-size: var(--h3);
    }
          
    img {
        width: 4.5em;
        height: 4.5em;
        background-color: transparent;
    }
}

@media (hover: hover) and (pointer: fine) {
    .navButtonHolder button:hover {
        background-color: rgb(55, 55, 55);
    }
    .boxButton:hover {
        background-color: rgb(50, 50, 50);
    }
}

</style>