<template>
    <div class="RAResult" v-for="ship in filteredData">
            <p class="RAData"><img :src="ship.img" :alt="ship.name" class="RADataImg">{{ ship.name }}-{{ ship.variant }}</p>
            <p class="RADataPercent">{{ ((ship.weight / (Object.values(filteredData).reduce((acc, item) => acc + item.weight, 0))) * 100).toFixed(2) }}%</p>
        </div>
</template>

<script setup>

import { ref } from 'vue';
import { data } from '@/stores/ra_data';
import { globalVariables } from '@/stores/global';

const filteredData = ref([]);

for (let ship in data) {
    if (data[ship].manufacturer.includes(globalVariables.activeManufacturer.value) || globalVariables.activeManufacturer.value == "No Company") {
        if (data[ship].direction.includes(globalVariables.activeDirection.value) || globalVariables.activeDirection.value == "No Direction") {
            if (data[ship].scope.includes(globalVariables.activeScope.value) || globalVariables.activeScope.value == "No Scope") {
                filteredData.value.push(data[ship]);
            }
        }
    }
}

</script>

<style scoped>

.RAResult {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.RAData {
  display: flex;
  align-items: center;
}

.RADataPercent {
  display: flex;
}

.RADataImg {
  display: flex;
  width: var(--pImgWidth);
  height: var(--pImgHeight);
  background-color: rgba(0, 0, 0, 0);
}

@media screen and (max-width: 1300px) {
  .RAResultsHolder {
    width: 70vw;
  }

  .RAResults {
    width: 40vw;
  }
  .RAData {
    font-size: var(--standard2);
  }

  .RADataImg {
    width: var(--standard2ImgWidth);
    height: var(--standard2ImgHeight);
  }
}

@media screen and (max-width: 800px) {
  .RADataImg {
    width: var(--standardImgWidth);
    height: var(--standardImgHeight);
  }
}

</style>