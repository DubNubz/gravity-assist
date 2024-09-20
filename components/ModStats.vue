<template>
    <div class="outer" v-if="currentMod?.type == 'unknown'">
        <h2><span style="color: var(--darkGray);">{{ currentMod?.system }} | </span>Unknown Module</h2>
        <h3 style="margin-top: 0;">If you have this module and would like to contribute, <span style="color: var(--gold);">DM me!</span></h3>
        <h3 style="margin: 0;"><span style="color: var(--cyan);">DubNubz</span> (ingame)</h3>
        <h3 style="margin: 0; margin-bottom: 1em;"><span style="color: var(--cyan);">@micromidget</span> (discord)</h3>
    </div>

    <div class="outer" v-if="currentMod?.type == 'known'">

        <div class="stats" v-if="currentMod.stats.type == 'weapon'">
            <h3 class="modName"><span>{{ currentMod.system }} |</span> {{ currentMod.name }}</h3>
            <div class="stat" v-if="currentMod.stats.antiship != null">
                <div class="statNumbers">
                    <img src="/weapons/stats/antiship.svg" alt="Anti-ship firepower">
                    <h3>{{ currentMod.stats.antiship.toLocaleString() }}</h3>
                </div>
                <div class="statBarOutline">
                    <div class="statBarFill" :style="{ width: (Math.min(1, Math.max(0, (currentMod.stats.antiship / calculateWeaponFill(currentMod.stats.antiship)))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="stat" v-if="currentMod.stats.antiair != null">
                <div class="statNumbers">
                    <img src="/weapons/stats/antiaircraft.svg" alt="Anti-air firepower">
                    <h3>{{ currentMod.stats.antiair.toLocaleString() }}</h3>
                </div>
                <div class="statBarOutline">
                    <div class="statBarFill" :style="{ width: (Math.min(1, Math.max(0, (currentMod.stats.antiair / calculateWeaponFill(currentMod.stats.antiair)))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="stat" v-if="currentMod.stats.siege != null">
                <div class="statNumbers">
                    <img src="/weapons/stats/siege.svg" alt="Siege firepower">
                    <h3>{{ currentMod.stats.siege.toLocaleString() }}</h3>
                </div>
                <div class="statBarOutline">
                    <div class="statBarFill" :style="{ width: (Math.min(1, Math.max(0, (currentMod.stats.siege / calculateWeaponFill(currentMod.stats.siege)))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="systemHP">
                <h3>System HP: {{ currentMod.stats.hp.toLocaleString() }}</h3>
            </div>
        </div>

        <div class="stats" v-if="currentMod.stats.type == 'armor'">
            <h3 class="modName"><span>{{ currentMod.system }} |</span> {{ currentMod.name }}</h3>
            <div class="stat" v-if="currentMod.stats.extraHP != null">
                <div class="statNumbers">
                    <img src="/weapons/stats/hp.svg" alt="HP stat">
                    <h3>{{ currentMod.stats.extraHP.toLocaleString() }}</h3>
                </div>
                <div class="statBarOutline">
                    <div class="statBarFill" :style="{ width: (Math.min(1, Math.max(0, (currentMod.stats.extraHP / 40000))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="stat" v-if="currentMod.stats.armor != null">
                <div class="statNumbers">
                    <img src="/weapons/stats/armor.svg" alt="Armor stat">
                    <h3>{{ currentMod.stats.armor.toLocaleString() }}</h3>
                </div>
                <div class="statBarOutline">
                    <div class="statBarFill" :style="{ width: (Math.min(1, Math.max(0, (currentMod.stats.armor / 300))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="stat" v-if="currentMod.stats.energyShield != null">
                <div class="statNumbers">
                    <img src="/weapons/stats/energyShield.svg" alt="Energy Shield stat">
                    <h3>{{ currentMod.stats.energyShield.toLocaleString() }}%</h3>
                </div>
                <div class="statBarOutline">
                    <div class="statBarFill" :style="{ width: (Math.min(1, Math.max(0, (currentMod.stats.energyShield / 50))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="stat" v-if="currentMod.stats.hpRecovery">
                <div class="statNumbers">
                    <img src="/weapons/stats/repair.svg" alt="Repair per minute stat">
                    <h3>{{ currentMod.stats.hpRecovery.toLocaleString() }}/min</h3>
                </div>
                <div class="statBarOutline">
                    <div class="statBarFill" :style="{ width: (Math.min(1, Math.max(0, (currentMod.stats.hpRecovery / 9000))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="stat" v-if="currentMod.stats.storage">
                <div class="statNumbers">
                    <img src="/weapons/stats/storage.svg" alt="Storage stat">
                    <h3>{{ currentMod.stats.storage.toLocaleString() }}</h3>
                </div>
                <div class="statBarOutline">
                    <div class="statBarFill" :style="{ width: (Math.min(1, Math.max(0, (currentMod.stats.storage / 75000))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="systemHP">
                <h3>System HP: {{ currentMod.stats.hp.toLocaleString() }}</h3>
            </div>
        </div>

        <div class="stats" v-if="currentMod.stats.type == 'propulsion'">
            <h3 class="modName"><span>{{ currentMod.system }} |</span> {{ currentMod.name }}</h3>
            <div class="stat">
                <div class="statNumbers">
                    <img src="/weapons/stats/cruise.svg" alt="Cruise speed">
                    <h3>{{ currentMod.stats.cruise.toLocaleString() }}</h3>
                </div>
                <div class="statBarOutline">
                    <div class="statBarFill" :style="{ width: (Math.min(1, Math.max(0, (currentMod.stats.cruise / calculateWeaponFill(currentMod.stats.cruise)))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="stat">
                <div class="statNumbers">
                    <img src="/weapons/stats/cruise.svg" alt="Warp speed">
                    <h3>{{ currentMod.stats.warp.toLocaleString() }}</h3>
                </div>
                <div class="statBarOutline">
                    <div class="statBarFill" :style="{ width: (Math.min(1, Math.max(0, (currentMod.stats.warp / calculateWeaponFill(currentMod.stats.warp)))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="systemHP">
                <h3>System HP: {{ currentMod.stats.hp.toLocaleString() }}</h3>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

const shipData = useFetch("/api/ships").data.value ?? shipDataStore().shipData;

const foundShip = ref(shipData.filter((ship) => ship.modules).find((ship) => ship.name == modLibraryStore().ship?.name));
const currentMod = ref(foundShip.value?.modules?.find((mod) => mod.system == modLibraryStore().category + String(modLibraryStore().mod)));

watch(() => modLibraryStore().ship, () => foundShip.value = shipData.filter((ship) => ship.modules).find((ship) => ship.name == modLibraryStore().ship?.name));
watch(() => modLibraryStore().category, () => {
    currentMod.value = foundShip.value?.modules?.find((mod) => mod.system == modLibraryStore().category + String(modLibraryStore().mod));
    if (!foundShip.value?.modules?.filter((mod) => mod.system.slice(0, 1) == modLibraryStore().category).map((mod) => mod.system.slice(1)).includes(String(modLibraryStore().mod))) {        
        modLibraryStore().mod = 1;
    }
});
watch(() => modLibraryStore().mod, () => currentMod.value = foundShip.value?.modules?.find((mod) => mod.system == modLibraryStore().category + String(modLibraryStore().mod)));

onMounted(() => {
    if (![...new Set(foundShip.value?.modules?.map((mod) => mod.system.slice(0, 1)))].includes(modLibraryStore().category)) {
        modLibraryStore().category = "A";
    }
    if (!foundShip.value?.modules?.filter((mod) => mod.system.slice(0, 1) == modLibraryStore().category).map((mod) => mod.system.slice(1)).includes(String(modLibraryStore().mod))) {        
        modLibraryStore().mod = 1;
    }
});

function calculateWeaponFill (stat: number) {
    if (stat <= 900) {
        return 1000;
    } else if (stat <= 2300) {
        return 2500;
    } else if (stat <= 4500) {
        return 5000;
    } else if (stat <= 9000) {
        return 10000;
    } else if (stat <= 14000) {
        return 15000;
    } else if (stat <= 21500) {
        return 22500;
    } else if (stat <= 28000) {
        return 30000;
    } else if (stat <= 47000) {
        return 50000;
    } else if (stat <= 96000) {
        return 100000;
    } else if (stat <= 190000) {
        return 200000;
    } else {
        return 400000;
    }
}

</script>

<style lang="scss" scoped>

.outer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    .modName {
        font-size: 2.2em;
        margin: 0;
        margin-bottom: 0.8em;
        text-align: center;

        span {
            color: var(--darkGray);
        }
    }

    .stat {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5%;
        width: 95%;

        .statNumbers {
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;

            img {
                width: 4.8em;
            }

            h3 {
                margin-top: 0.6em;
                margin-bottom: 0.6em;
                width: 3em;
                text-align: center;
            }
        }

        .statBarOutline {
            width: 100%;
            background-color: rgb(60, 60, 60);
            height: 2.4em;
            border-radius: 500em;

            .statBarFill {
                height: 100%;
                background-color: rgb(200, 200, 200);
                border-radius: 500em;
                transition: all 0.4s ease-in-out;
            }
        }
    }
}

.systemHP {
    h3 {
        margin: 0;
        margin-bottom: 0.2em;
    }
}

@media screen and (max-width: 800px) {
    .stats {
        .stat {
            .statBarOutline {
                height: 1.95em;
            }
        }
    }
}

</style>