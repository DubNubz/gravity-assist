<template>
    <div class="outer">
        <div class="sort">
            <h3 class="sortTitle">Company</h3>
            <div class="sortOption">
                <button @click="scrollSortLeft(manufacturers)"><img src="/ui/leftArrow.svg" alt="Click to scroll left"></button>
                <h3>{{ raHelperStore().manufacturer }}</h3>
                <button @click="scrollSortRight(manufacturers)"><img src="/ui/rightArrow.svg" alt="Click to scroll right"></button>
            </div>
        </div>
        <div class="sort">
            <h3 class="sortTitle">Direction</h3>
            <div class="sortOption">
                <button @click="scrollSortLeft(directions)"><img src="/ui/leftArrow.svg" alt="Click to scroll left"></button>
                <h3>{{ raHelperStore().direction }}</h3>
                <button @click="scrollSortRight(directions)"><img src="/ui/rightArrow.svg" alt="Click to scroll right"></button>
            </div>
        </div>
        <div class="sort">
            <h3 class="sortTitle">Scope</h3>
            <div class="sortOption">
                <button @click="scrollSortLeft(scopes)"><img src="/ui/leftArrow.svg" alt="Click to scroll left"></button>
                <h3>{{ raHelperStore().scope }}</h3>
                <button @click="scrollSortRight(scopes)"><img src="/ui/rightArrow.svg" alt="Click to scroll right"></button>
            </div>
        </div>

        <h3 class="timeCounter" :class="getTimeColor(timeReqiredHours)">Time required: <span>{{ Math.floor(timeReqiredHours / 24) }}</span> days<span
        v-if="Math.floor(timeReqiredHours % 24)">, {{ Math.floor(timeReqiredHours % 24) }} hours</span><span
        v-if="Math.floor(timeReqiredHours % 24 % 1 * 60)">, {{ Math.floor(timeReqiredHours % 24 % 1 * 60) }} minutes</span></h3>
    </div>
</template>

<script setup lang="ts">
import type { ShipDirection, ShipManufacturer, ShipScope } from '~/utils/shipData';

const timeReqiredHours = ref(getTime(raHelperStore().manufacturer, raHelperStore().direction, raHelperStore().scope));

watch(() => raHelperStore().manufacturer, () => timeReqiredHours.value = getTime(raHelperStore().manufacturer, raHelperStore().direction, raHelperStore().scope));
watch(() => raHelperStore().direction, () => timeReqiredHours.value = getTime(raHelperStore().manufacturer, raHelperStore().direction, raHelperStore().scope));
watch(() => raHelperStore().scope, () => timeReqiredHours.value = getTime(raHelperStore().manufacturer, raHelperStore().direction, raHelperStore().scope));

function scrollSortLeft (option: ShipManufacturer[] | ShipDirection[] | ShipScope[]) {
    raHelperStore().ship = undefined;
    const array = [...option];
    
    if (array.includes(manufacturers[0])) {
        const filteredArray = array as ShipManufacturer[];
        const currentFocus = raHelperStore().manufacturer;
        const findInArray = filteredArray.findIndex((option) => option == currentFocus);
        raHelperStore().manufacturer = findInArray == 0 ? filteredArray[filteredArray.length - 1] : filteredArray[findInArray - 1];
    }
    else if (array.includes(directions[0])) {
        const filteredArray = array as ShipDirection[];
        const currentFocus = raHelperStore().direction;
        const findInArray = filteredArray.findIndex((option) => option == currentFocus);
        raHelperStore().direction = findInArray == 0 ? filteredArray[filteredArray.length - 1] : filteredArray[findInArray - 1];
    }
    else {
        const filteredArray = array as ShipScope[];
        const currentFocus = raHelperStore().scope;
        const findInArray = filteredArray.findIndex((option) => option == currentFocus);
        raHelperStore().scope = findInArray == 0 ? filteredArray[filteredArray.length - 1] : filteredArray[findInArray - 1];
    }
}

function scrollSortRight (option: ShipManufacturer[] | ShipDirection[] | ShipScope[]) {
    raHelperStore().ship = undefined;
    const array = [...option];
    
    if (array.includes(manufacturers[0])) {
        const filteredArray = array as ShipManufacturer[];
        const currentFocus = raHelperStore().manufacturer;
        const findInArray = filteredArray.findIndex((option) => option == currentFocus);
        raHelperStore().manufacturer = findInArray == filteredArray.length - 1 ? filteredArray[0] : filteredArray[findInArray + 1];
    }
    else if (array.includes(directions[0])) {
        const filteredArray = array as ShipDirection[];
        const currentFocus = raHelperStore().direction;
        const findInArray = filteredArray.findIndex((option) => option == currentFocus);
        raHelperStore().direction = findInArray == filteredArray.length - 1 ? filteredArray[0] : filteredArray[findInArray + 1];
    }
    else {
        const filteredArray = array as ShipScope[];
        const currentFocus = raHelperStore().scope;
        const findInArray = filteredArray.findIndex((option) => option == currentFocus);
        raHelperStore().scope = findInArray == filteredArray.length - 1 ? filteredArray[0] : filteredArray[findInArray + 1];
    }
}

function getTime (manufacturer: ShipManufacturer, direction: ShipDirection, scope: ShipScope) {
  const allPointers: number[] = [];

  if (manufacturer != "Empty") allPointers.push(difficulty[manufacturer]);
  if (direction != "Empty") allPointers.push(difficulty[direction]);
  if (scope != "Empty") allPointers.push(difficulty[scope]);

  let timeAccumulator = 0;
  if ([1, 2, 3].includes(allPointers.length)) timeAccumulator += (allPointers[0] * 10);
  if ([2, 3].includes(allPointers.length)) timeAccumulator += ((allPointers[0] + allPointers[1]) * 10);
  if ([3].includes(allPointers.length)) timeAccumulator += (allPointers[0] * allPointers[1] * allPointers[2] * 0.4 * 10);
  
  return timeAccumulator;
}

function getTimeColor (hours: number) {
    const days = hours / 24;

    if (days > 20) return "red";
    else if (days >= 14.5) return "orange";
    else if (days >= 5.5) return "yellow";
    else return "green";
}

</script>

<style lang="scss" scoped>

.outer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.sort {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3em;
    width: 100%;

    h3 {
        margin: 0;
    }

    .sortTitle {
        font-size: 2.75em;
    }

    .sortOption {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;

        h3 {
            text-align: center;
            width: 15em;
            background-color: rgb(55, 55, 55);
            padding: 0.75em;
            border-radius: 0.75em;
        }
    
        button {
            background-color: rgb(55, 55, 55);
            border: 0;
            border-radius: 1em;
            transition: all 0.25s;
            
            img {
                width: 6em;
                padding: 0;
            }
        }
    }
}

.timeCounter {
    font-size: 3em;
    margin: 0;
}

.red { color: #ff0000; }
.orange { color: #ffa600; }
.yellow { color: #ffff00; }
.green { color: #00ff00; }

@media (hover: hover) and (pointer: fine) {
    .sort {
        .sortOption {
            button:hover {
                background-color: rgb(70, 70, 70);
            }
        } 
    }
        
}

</style>