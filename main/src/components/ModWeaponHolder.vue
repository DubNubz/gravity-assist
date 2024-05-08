<template>
    <div v-for="mod in Mod.weapons">
        <div class="modWeapon" v-if="mod.type == 'weapon'">
        <h3><span class="gold">x{{ mod.count }}</span> <span class="darkGray">|</span> <span class="normalText">{{ mod.title }}</span></h3>
        <h3>{{ mod.name }}</h3>

        <div class="modWeaponStats">

            <div id="damageType">
                <img src="/weapons/damageType-removebg-preview.png" alt="Damage Type" class="weaponImg">
                <p><span class="cyan">{{ mod.damageType }}</span> damage</p>
            </div>

            <div id="dph">
                <img src="/weapons/dph-removebg-preview.png" alt="Damage per Hit" class="weaponImg">
                <p><span class="pastelOrange">{{ mod.alpha }}</span> damage per hit</p>
            </div>

            <div id="prioritizedTarget">
                <img src="/weapons/prioritizedTarget-removebg-preview.png" alt="Prioritized Target" class="weaponImg">
                <p>Target: <span class="deepGreen">{{ mod.target }}</span></p>
            </div>

            <div id="modWeaponLockon" v-if="mod.lockonEfficiency != null">
                <img src="/weapons/lockonEfficiency-removebg-preview.png" alt="Lock-on Efficiency" class="weaponImg">
                <p><span class="pastelPink">{{mod.lockonEfficiency }}%</span> lock-on efficiency</p>
            </div>

        </div>

        <div class="modWeaponAttributes" v-if="mod.attributes != null">
            <div v-for="attribute in mod.attributes">

                <div id="crit" v-if="attribute == 'Crit'">
                    <img src="/weapons/crit.png" alt="Crit Attribute" class="weaponImg">
                    <p>{{ attribute }}</p>
                </div>

                <div id="interception" v-else-if="attribute == 'Interception Capability'">
                    <img src="/weapons/interception.png" alt="Interception Attribute" class="weaponImg">
                    <p>{{ attribute }}</p>
                </div>

                <div id="antiaircraft" v-else-if="attribute == 'Anti-Aircraft Counterattack' || attribute == 'Anti-Aircraft Support'">
                    <img src="/weapons/antiaircraft.png" alt="Anti-Aircraft Attribute" class="weaponImg">
                    <p>{{ attribute }}</p>
                </div>

                <div id="else" v-else>
                    <p>{{ attribute }}</p>
                </div>

            </div>
        </div>
        </div>

        <div class="modWeapon" v-if="mod.type == 'buff'">
        <h3><span class="gold">x{{ mod.count }}</span> <span class="darkGray">|</span> <span class="normalText">{{ mod.title }}</span></h3>
        <h3>{{ mod.name }}</h3>

        <div class="modWeaponAttributes" v-if="mod.attributes != null">
            <div v-for="attribute in mod.attributes">
                <p>{{ attribute }}</p>
            </div>
        </div>
        </div>

        <div class="modWeapon" v-if="mod.type == 'hanger'">
        <h3><span class="gold">x{{ mod.count }}</span> <span class="darkGray">|</span> <span class="normalText">{{ mod.title }}</span></h3>
        <h3>{{ mod.name }}</h3>

        <div class="modWeaponStats">
            <div id="damageType">
                <img src="/weapons/damageType-removebg-preview.png" alt="Hanger Type" class="weaponImg">
                <p>Carries <span class="cyan">{{ mod.capacity }}</span> <span class="deepGreen">{{ mod.hanger }}s</span></p>
            </div>
        </div>

        <div class="modWeaponAttributes" v-if="mod.attributes != null">
            <div v-for="attribute in mod.attributes">
                <p>{{ attribute }}</p>
            </div>
        </div>

        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    Mod: Object,
});

</script>

<style scoped>

.gold {color: var(--gold)}
.darkGray {color: var(--darkGray)}
.cyan {color: var(--cyan)}
.pastelOrange {color: var(--pastelOrange)}
.deepGreen {color: var(--deepGreen)}
.pastelPink {color: var(--pastelPink)}

.modWeapon {
  background-color: var(--content);
  padding: 3vh;
  border-radius: 3vh;
  width: 35vw;
  margin-top: 3vh;
}

#modShipImg {
  width: 36.1842vh;
  height: 25vh;
  background-color: rgba(0, 0, 0, 0);
}

.shipMods {
  display: flex;
  flex-direction: column;
  width: 20vh;
}

.shipModHolder {
  margin-top: 0.5vh;
}

.modButton {
  height: 5vh;
  transition: all 0.5s;
  width: 3vw;
  height: 3vh;
  border-radius: 1vh;
  border-width: 0.1vh;
}

.modButton:hover {
  transform: scale(1.05);
}

#modStats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

#modHeader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.weaponImg {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 0;
  width: 6vh;
  height: 6vh;
}

.modWeaponStats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

#damageType,
#dph,
#prioritizedTarget,
#modWeaponLockon {
  width: 15vw;
}

@media screen and (max-width: 1000px) {
  #damageType,
  #dph,
  #prioritizedTarget,
  #modWeaponLockon {
    width: 30vw;
  }

  .modWeapon {
    background-color: var(--content);
    padding: 3vh;
    border-radius: 3vh;
    width: 70vw;
    margin-top: 3vh;
  }
}

</style>