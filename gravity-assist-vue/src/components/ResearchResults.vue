<template>
    <div class="RAResult" v-for="ship in Data">
            <p class="RAData"><img :src="ship.img" :alt="ship.name" class="RADataImg"><span>{{ ship.name }}-{{ ship.variant }}</span></p>
            <p class="RADataPercent">{{ ((ship.weight / (Object.values(Data).reduce((acc, item) => acc + item.weight, 0))) * 100).toFixed(2) }}%</p>
        </div>
</template>

<script setup>

const props = defineProps({
  Data: Array,
})

</script>

<style scoped>

span {
  margin-left: 2vw;
}

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

  span {
    margin-left: 4vw;
  }

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

  span {
    margin-left: 5vw;
  }

}

</style>