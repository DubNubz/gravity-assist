<template>
    <div class="card" 
    v-for="blueprint in data.filter((item) => item.type == 'Technical Blueprint')"
    @click="showDetailCard(blueprint)">
        <img :src="blueprint.displayImg" :alt="'Image of ' + blueprint.displayName">
        <h3>{{ blueprint.displayName }}</h3>
        <div class="cardStats">
            <p id="cardInfo">Effect: {{ blueprint.effectName }}</p>
            <p id="cardInfo">Class: {{ blueprint.class }}</p>
        </div>
        <p id="cardFooter">Click for more information</p>
    </div>

    <Transition name="detail">
        <div class="detailCardBackground"
        v-if="showCard">
            <div class="detailCard">
                <img :src="detailResult.displayImg" :alt="'Image of ' + detailResult.displayName" id="detailImg">
                <h2 id="detailCardheader">{{ detailResult.displayName }}</h2>
                <div class="detailCarddescription">
                    <h3><span class="Mlogo">M</span> <span class="darkGray"> || </span> {{ detailResult.effectName }}</h3>
                    <p id="detailCardp"><span v-for="string in detailResult.effectDescription"
                        :class="getDescriptionColor(string)">{{ string }}</span></p>
                    <div class="detailCardStats">
                        <p class="detailCardStat" id="detailCardp"><span class="darkGray">Delivery:</span> {{ detailResult.deliveryTarget }}</p>
                        <p class="detailCardStat" id="detailCardp"><span class="darkGray">Mass:</span> {{ detailResult.itemMass }}</p>
                        <p class="detailCardStat" id="detailCardp"><span class="darkGray">Limit:</span> {{ detailResult.activeService }}</p>
                        <p class="detailCardStat" id="detailCardp"><span class="darkGray">Cooldown:</span> {{ detailResult.productionInterval }}</p>
                    </div>
                </div>
                <button @click="showCard = !showCard" class="button">Close</button>
            </div>
        </div>
    </Transition>
</template>

<script setup>

import { ref } from 'vue';
import { data } from '@/stores/equipment';
import { globalVariables } from '@/stores/global';

const showCard = ref(false);
const detailResult = ref();

function showDetailCard (card) {
    showCard.value = !showCard.value;
    detailResult.value = card;
}

function getDescriptionColor (string) {
    if (Number(detailResult.value.effectDescription.indexOf(string)) % 2 == 1) {
        return "gold";
    } else {
        return "normalText";
    }
}

</script>

<style scoped>

.gold {
    color: var(--gold);
    font-size: var(--h3);    
}
.normalText {color: var(--normalText)}
.darkGray {color: var(--darkGray)}
.Mlogo {
    color: black;
    background-color: rgb(244, 160, 0);
    padding-left: 1vh;
    padding-right: 1vh;
}

.card {
    background: linear-gradient(to bottom right, var(--content), rgba(0, 0, 0, 0.3));
    width: 32.5vw;
    height: 55vh;
    padding: 1vh;
    border-radius: 5vh;
    margin-bottom: 2vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.5s ease;
    overflow: hidden;
}
.card:hover {
    transform: scale(1.025);
}

#cardInfo {
    margin-top: 0;
    margin-bottom: 1vh;
    color: var(--normalText);
}

#cardFooter {
    margin-top: auto;
    color: var(--gold);
}

.cardStats {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30vw;
}

.detailCardBackground {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 99999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detailCard {
  width: 50vw;
  background-color: rgb(10, 10, 10);
  padding: 20px;
  border-radius: 3vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-height: 80%;
  min-height: 80%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
    /* 374 x 178  || 1vw : 0.475935829vw*/
    width: 30vw;
    height: 14.2780749vw;
    margin-top: 1vh;
    background-color: var(--content);
    border-radius: 4vh;
}

#detailImg {
    margin-top: 3vh;
}

#detailCardp {
    margin-top: 0;
}

.button {
    margin-top: auto;
    margin-bottom: 2vh;
    background-color: #ff5050;
    border: 0;
    font-size: var(--h2);
    width: 15vw;
    overflow: hidden;
    transition: all 0.5s;
    border-radius: 2vh;
    padding-bottom: 1vh;
}
.button:hover {
    transform: scale(1.15);
}
.button::after {
  content: "";
  position: absolute;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, #ff8a8a, transparent);
  transition: left 0.5s ease;
}
.button:hover::after {
  left: 100%;
}

#detailCardheader {
    background-color: var(--pastelOrange);
    color: black;
    padding-left: 2vh;
    padding-right: 2vh;
    border-radius: 3vh;
    margin-top: 1vh;
    margin-bottom: 1vh;
    width: 40vw;
}

.detailCarddescription {
    background-color: black;
    padding: 2vh;
    border-radius: 3vh;
    width: 42.5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1vh;
}

.detailCardStats {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.detailCardStat {
    width: 20vw;
}

.detail-enter-active, .detail-leave-active {
  transition: all 0.5s ease-in-out;
}

.detail-leave-active {
  transition-delay: 0.15s;
}

.detail-enter-from,
.detail-leave-to {
  opacity: 0;
}

.detail-enter-active .detailCard,
.detail-leave-active .detailCard { 
  transition: all 0.25s ease-in-out;
}

.detail-enter-active .detailCard {
  transition-delay: 0.15s;
}

.detail-enter-from .detailCard,
.detail-leave-to .detailCard {
  transform: translateY(30px);
  opacity: 0.001;
}

@media screen and (max-width: 1000px) {
    .card {
        width: 80vw;
        height: 45vh;
    }

    .cardStats {
        width: 75vw;
    }
    
    .detailCard {
        width: 80vw;
    }

    #detailCardheader {
        width: 67.5vw;
    }

    .detailCarddescription {
        width: 70vw;
    }

    .detailCardStat {
        width: 32.5vw;
    }

    .button {
        width: 40vw;
    }

    img {
        /* 374 x 178  || 1vw : 0.475935829vw*/
        width: 60vw;
        height: 28.5561497vw;
    }
}

</style>