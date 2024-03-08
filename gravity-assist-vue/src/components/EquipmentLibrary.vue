<template>
    <div class="card" 
    v-for="equipment in data.filter((item) => item.type == 'Equipment')"
    @click="showDetailCard(equipment)">
        <img :src="equipment.displayImg" :alt="'Image of ' + equipment.displayName">
        <h3>{{ equipment.displayName }}</h3>
        <div class="cardStats">
            <p id="cardInfo">Class: {{ equipment.class }}</p>
            <p id="cardInfo">Weight: {{ equipment.loadWeight }} storage</p>
        </div>
        <p id="cardFooter">Click for more information</p>
    </div>

    <Transition name="share">
      <div class="shareBackground" v-if="shareActive">
        <div class="shareOverall">
          <div class="shareActual">
            <img src="/check-removebg-preview (1).png" alt="Copied to clipboard successfully" id="shareSuccess">
          </div>
          <h3 id="shareSuccessText">Link copied to clipboard!</h3>
        </div>
      </div>
    </Transition>

    <Transition name="detail">
        <div class="detailCardBackground"
        v-if="globalVariables.showCard.value == true">
            <div class="detailCard">
                <img :src="globalVariables.currentDetailCard.value.displayImg" :alt="'Image of ' + globalVariables.currentDetailCard.value.displayName" id="detailImg">
                <h2 id="detailCardheader">{{ globalVariables.currentDetailCard.value.displayName }}</h2>
                <div class="detailCarddescription">
                    <h3><span class="Mlogo">M</span> <span class="darkGray"> || </span> {{ globalVariables.currentDetailCard.value.effectName }}</h3>
                    <p id="detailCardp"><span v-for="string in globalVariables.currentDetailCard.value.effectDescription"
                        :class="getDescriptionColor(string)">{{ string }}</span></p>
                    <div class="detailCardStats">
                        <p class="detailCardStat" id="detailCardp"><span class="darkGray">Class:</span> {{ globalVariables.currentDetailCard.value.class }}</p>
                        <p class="detailCardStat" id="detailCardp"><span class="darkGray">Weight:</span> {{ globalVariables.currentDetailCard.value.loadWeight }} storage</p>
                    </div>
                </div>
            </div>
            <button @click="shareEquipment" class="copyToClipboard">Copy sharing link</button>
            <button @click="globalVariables.showCard.value = false" class="button">Close</button>
        </div>
    </Transition>
</template>

<script setup>

import { ref } from 'vue';
import { data } from '@/stores/equipment';
import { globalVariables } from '@/stores/global';

const shareActive = ref(false);

function showDetailCard (card) {
    globalVariables.showCard.value = true;
    globalVariables.currentDetailCard.value = card;
}

function getDescriptionColor (string) {
    if (Number(globalVariables.currentDetailCard.value.effectDescription.indexOf(string)) % 2 == 1) {
        return "gold";
    } else {
        return "normalText";
    }
}

function shareEquipment () {
    navigator.clipboard.writeText(`https://gravityassist.xyz/modules/equipment-encyclopedia/${globalVariables.currentEquipmentView.value.replaceAll(" ", "%20")}/${globalVariables.currentDetailCard.value.displayName.replaceAll(" ", "%20")}`).then(() => {
        shareActive.value = true;
        setTimeout(() => {
            shareActive.value = false;
        }, 1500);
    }, () => {
        alert("Link failed to copy to clipboard");
    })
}

</script>

<style scoped>

.copyToClipboard {
  margin-top: 2vh;
  background-color: var(--normalText);
  width: 15vw;
  font-size: var(--p);
  height: 5vh;
  border-radius: 1.5vh;
  transition: all 0.35s;
  background-color: var(--deepYellow);
  filter: grayscale(0.75);
}

.copyToClipboard:hover {
  filter: grayscale(0);
  transform: scale(1.05);
}

.shareBackground {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 999999999;
}

.shareOverall {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  border-radius: 5vh;
  padding: 3vh;
}

.shareActual {
  width: 10vh;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5vw;
  margin-bottom: 2vh;
}

#shareSuccess {
  width: 100%;
  height: 100%;
  margin-right: 0;
}

.share-enter-active, .share-leave-active {
  transition: all 0.75s ease-in-out;
}

.share-enter-from,
.share-leave-to {
  opacity: 0;
}

.share-enter-active .shareActual,
.share-leave-active .shareActual { 
  transition: all 0.5s ease-in-out;
}

.share-enter-from .shareActual,
.share-leave-to .shareActual {
  transform: rotate(720deg);
  opacity: 0.001;
}

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
  width: fit-content;
  min-width: 30%;
  max-width: 70%;
  background-color: rgb(15, 15, 15);
  padding: 20px;
  border-radius: 3vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  height: fit-content;
  min-height: 30%;
  max-height: 85%;
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
    margin-top: 3vh;
    margin-bottom: 1vh;
    background-color: #ff5050;
    border: 0;
    font-size: var(--h2);
    width: 15vw;
    height: fit-content;
    overflow: hidden;
    transition: all 0.5s;
    border-radius: 2vh;
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
    margin-bottom: 2vh;
    width: 40vw;
    font-size: var(--h2);
}

.detailCarddescription {
    background-color: black;
    padding: 2vh;
    border-radius: 3vh;
    width: 42.5vw;
    margin-bottom: 3vh;
    display: flex;
    flex-direction: column;
    align-items: center;
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
        width: 85vw;
        max-width: 85%;
        min-height: 30svh;
        max-height: 90svh;
    }

    #detailCardheader {
        width: 72.5vw;
        font-size: var(--h3);
    }

    .detailCarddescription {
        width: 80vw;
    }

    .detailCardStat {
        width: 40vw;
    }

    .button {
        width: 60vw;
        min-height: 5svh;
        max-height: 10svh;
    }

    img {
        /* 374 x 178  || 1vw : 0.475935829vw*/
        width: 60vw;
        height: 28.5561497vw;
    }
}

</style>