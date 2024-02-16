<template>
    <div id="modInfo" v-if="Mod.type == 'unknown'">
        <h2>{{ Mod.identity }}: If you have this module, please contact micromidget on discord</h2>
    </div>

    <div id="modInfo" v-if="Mod.type == 'weapon'">
        <div id="modHeader">
            <img :src="Mod.img" alt="Image of the module" class="weaponImg">
            <h2 id="modName">{{ Mod.identity }} | {{ Mod.name }}</h2>
        </div>
        <div id="modStats">
            <div id="antiship">
                <img src="/weapons/antiship-removebg-preview.png" alt="Value of this module's antiship statistic" class="weaponImg">
                <p>{{ Mod.stats.antiship }}</p>
                <div id="antishipBar">
                    <div class="fillerBar" :style="{ width: (Math.min(1, Math.max(0, (Mod.stats.antiship / getMax(Mod.stats.antiship)))) * 100) + '%' }"></div>
                </div>
            </div>
            <div id="antiair">
            <img src="/weapons/antiair-removebg-preview.png" alt="Value of this module's antiair statistic" class="weaponImg">
                <p>{{ Mod.stats.antiair }}</p>
                <div id="antiairBar">
                    <div class="fillerBar" :style="{ width: (Math.min(1, Math.max(0, (Mod.stats.antiair / getMax(Mod.stats.antiair)))) * 100) + '%' }"></div>
                </div>
            </div>
            <div id="siege">
            <img src="/weapons/siege-removebg-preview.png" alt="Value of this module's siege statistic" class="weaponImg">
                <p>{{ Mod.stats.siege }}</p>
                <div id="siegeBar">
                    <div class="fillerBar" :style="{ width: (Math.min(1, Math.max(0, (Mod.stats.siege / getMax(Mod.stats.siege)))) * 100) + '%' }"></div>
                </div>
            </div>
            <p>System HP: {{ Mod.stats.hp }}</p>
        </div>
    </div>

    <div id="modInfo" v-if="Mod.type == 'misc'">
        <div id="modHeader">
            <img :src="Mod.img" alt="Image of the module" class="weaponImg">
            <h2 id="modName">{{ Mod.identity }} | {{ Mod.name }}</h2>
        </div>
        <div id="modStats">
            <p>System HP: {{ Mod.stats.hp }}</p>
        </div>
    </div>

    <div id="modInfo" v-if="Mod.type == 'armor'">
        <div id="modHeader">
            <img :src="Mod.img" alt="Image of the module" class="weaponImg">
            <h2 id="modName">{{ Mod.identity }} | {{ Mod.name }}</h2>
        </div>
        <div id="modStats">
            <div id="hp">
                <img src="/weapons/hpStat-removebg-preview.png" alt="Value of this module's hitpoint statistic" class="weaponImg">
                <p>{{ Mod.stats.extraHP }}</p>
                <div id="hpBar">
                    <div class="fillerBarArmor" :style="{ width: (Math.min(1, Math.max(0, (Mod.stats.extraHP / getMaxHP(Mod.stats.extraHP)))) * 100) + '%' }"></div>
                </div>
            </div>
            <div id="armor">
            <img src="/weapons/armorStat-removebg-preview.png" alt="Value of this module's armor statistic" class="weaponImg">
                <p>{{ Mod.stats.armor }}</p>
                <div id="armorBar">
                    <div class="fillerBarArmor" :style="{ width: (Math.min(1, Math.max(0, (Mod.stats.armor / getMaxArmor(Mod.stats.armor)))) * 100) + '%' }"></div>
                </div>
            </div>
            <div id="shield">
            <img src="/weapons/shieldStat-removebg-preview.png" alt="Value of this module's energy shield statistic" class="weaponImg">
                <p>{{ Mod.stats.energyShield }}%</p>
                <div id="shieldBar">
                    <div class="fillerBarArmor" :style="{ width: (Mod.stats.energyShield) + '%' }"></div>
                </div>
            </div>
            <p>System HP: {{ Mod.stats.hp }}</p>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    Mod: Object,
});

function getMax (stat) {
    if (stat <= 2500) {
        return 2500;
    } else if (stat <= 5000) {
        return 5000;
    } else if (stat <= 10000) {
        return 10000;
    } else if (stat <= 15000) {
        return 15000;
    } else if (stat <= 22500) {
        return 22500;
    } else if (stat <= 30000) {
        return 30000;
    } else if (stat <= 50000) {
        return 50000;
    } else if (stat <= 100000) {
        return 100000;
    }
};

function getMaxHP (stat) {
    if (stat <= 50000) {
        return 50000;
    } else if (stat <= 100000) {
        return 100000;
    } else if (stat <= 250000) {
        return 250000;
    } else if (stat <= 500000) {
        return 500000;
    }
};

function getMaxArmor (stat) {
    if (stat <= 50) {
        return 50;
    } else if (stat <= 100) {
        return 100;
    } else if (stat <= 200) {
        return 250;
    } else if (stat <= 350) {
        return 350;
    } else if (stat <= 500) {
        return 500;
    }
}

</script>

<style scoped>

#modName {
    margin-left: 1vw;
}

.shipModShowcase {
  background-color: var(--content);
  padding: 3vh;
  border-radius: 3vh;
  width: 70vw;
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

#antishipBar,
#antiairBar,
#siegeBar,
#hpBar,
#armorBar,
#shieldBar {
  width: 22vw;
  height: 3vh;
  background-color: var(--footer);
  border-radius: 3vh;
}

#antiship,
#antiair,
#siege,
#hp,
#armor,
#shield {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3vh;
}

.fillerBar {
  height: 100%;
  background-color: var(--pastelOrange);
  border-radius: 3vh;
}

.fillerBarArmor {
  height: 100%;
  background-color: var(--pastelBlue);
  border-radius: 3vh;
}

.weaponImg {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 0;
  width: 6vh;
  height: 6vh;
}

@media screen and (max-width: 1000px) {
  #antishipBar,
  #antiairBar,
  #siegeBar,
  #hpBar,
  #armorBar,
  #shieldBar {
    width: 60vw;
    height: 2.5vh;
  }

  #modStats {
    flex-direction: column;
  }
}

</style>