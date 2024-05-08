<template>
    <div class="RAResult" v-for="ship in Data">
            <p class="RAData" :class="{ active: globalVariables.currentSearchShip.value == ship.name + '-' + ship.variant }"><img :src="ship.img" :alt="ship.name" class="RADataImg"><span>{{ ship.name }}-{{ ship.variant }}</span></p>
            <p class="RADataPercent" :class="{ active: globalVariables.currentSearchShip.value == ship.name + '-' + ship.variant }">{{ ((ship.weight / (Object.values(Data).reduce((acc, item) => acc + item.weight, 0))) * 100).toFixed(2) }}%</p>
        </div>
</template>

<script setup>
import { globalVariables } from '@/stores/global';

const props = defineProps({
  Data: Array,
})

</script>

<style scoped>

.active {
  color: var(--gold);
}

span {
  margin-left: 2vw;
}

.RAResult {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
}

.RAData {
  display: flex;
  align-items: center;
  font-size: var(--h3);
}

.RADataPercent {
  display: flex;
  font-size: var(--h3);
}

.RADataImg {
  display: flex;
  width: var(--pImgWidth);
  height: var(--pImgHeight);
  background-color: rgba(0, 0, 0, 0);
}

@media screen and (max-width: 1000px) {

  span {
    margin-left: 4vw;
  }

  .RAResultsHolder {
    width: 80vw;
  }

  .RAResults {
    width: 40vw;
  }

  .RAResult {
    width: 100%;
  }

  .RAData {
    font-size: var(--p);
  }

  .RADataPercent {
    font-size: var(--p);
  }

  .RADataImg {
    width: var(--standard2ImgWidth);
    height: var(--standard2ImgHeight);
  }
}

</style>