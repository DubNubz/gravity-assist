<template>
    <Transition name="systemTransition">
        <div class="systemBackground" v-if="showSystem">
            <div class="systemMenu" v-if="currentSystem">
                <h3 style="margin: 0;">Currently editing</h3>
                <div style="display: flex; align-items: center; justify-content: center; gap: 1.5em;">
                    <img style="width: 6em;" :src="currentSystem.img" alt="">
                    <h2 style="margin: 0;"><span v-if="currentSystem.main">(Main) </span>{{ currentSystem.name }}</h2>
                    <button class="closeButton" @click="closeSystem">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"/>
                        </svg>
                    </button>
                </div>
                <div class="stats">
                    <div class="stat">
                        <span class="tooltip">Tech Points</span>
                        <h4>{{ systemTechPoints }}</h4>
                        <img :src="'/fleet/techPoint.svg'" alt="Amount of Tech Points allocated">
                    </div>
                    <div class="stat" v-if="currentSystem.type == 'weapon' && currentSystem.modifiedAntiship">
                        <span class="tooltip">Anti-Ship Fire</span>
                        <h4>{{ Math.round(currentSystem.modifiedAntiship).toLocaleString() }}</h4>
                        <img :src="'/weapons/stats/antiship.svg'" alt="Amount of anti-ship damage">
                    </div>
                    <div class="stat" v-if="currentSystem.type == 'weapon' && currentSystem.modifiedAntiair">
                        <span class="tooltip">Air Defense</span>
                        <h4>{{ Math.round(currentSystem.modifiedAntiair).toLocaleString() }}</h4>
                        <img :src="'/weapons/stats/antiaircraft.svg'" alt="Amount of anti-air damage">
                    </div>
                    <div class="stat" v-if="currentSystem.type == 'weapon' && currentSystem.modifiedSiege">
                        <span class="tooltip">Siege Fire</span>
                        <h4>{{ Math.round(currentSystem.modifiedSiege).toLocaleString() }}</h4>
                        <img :src="'/weapons/stats/siege.svg'" alt="Amount of siege damage">
                    </div>
                    <div class="stat" v-if="currentSystem.type == 'armor' && currentSystem.modifiedHp">
                        <span class="tooltip">Hitpoints</span>
                        <h4>{{ Math.round(currentSystem.modifiedHp).toLocaleString() }}</h4>
                        <img :src="'/weapons/stats/hp.svg'" alt="Amount of hitpoints">
                    </div>
                    <div class="stat" v-if="currentSystem.type == 'armor' && currentSystem.modifiedArmor">
                        <span class="tooltip">Armor</span>
                        <h4>{{ Math.round(currentSystem.modifiedArmor).toLocaleString() }}</h4>
                        <img :src="'/weapons/stats/armor.svg'" alt="Amount of armor">
                    </div>
                    <div class="stat" v-if="currentSystem.type == 'armor' && currentSystem.modifiedEnergyShield">
                        <span class="tooltip">Energy Shield</span>
                        <h4>{{ Math.round(currentSystem.modifiedEnergyShield * 100) + '%' }}</h4>
                        <img :src="'/weapons/stats/energyShield.svg'" alt="Energy Shield">
                    </div>
                    <div class="stat" v-if="currentSystem.type == 'propulsion' && currentSystem.modifiedCruise">
                        <span class="tooltip">Cruise Speed</span>
                        <h4>{{ Math.round(currentSystem.modifiedCruise).toLocaleString() }}</h4>
                        <img :src="'/weapons/stats/cruise.svg'" alt="Cruise speed">
                    </div>
                    <div class="stat" v-if="currentSystem.type == 'propulsion' && currentSystem.modifiedWarp">
                        <span class="tooltip">Warp Speed</span>
                        <h4>{{ Math.round(currentSystem.modifiedWarp).toLocaleString() }}</h4>
                        <img :src="'/weapons/stats/cruise.svg'" alt="Warp speed">
                    </div>
                    <div class="stat" v-if="currentSystem.type == 'propulsion' && currentSystem.modifiedEvasion">
                        <span class="tooltip">Evasion</span>
                        <h4>{{ Math.round((currentSystem.modifiedEvasion - 1) * 100) + '%' }}</h4>
                        <img :src="'/weapons/stats/cruise.svg'" alt="Evasion">
                    </div>
                    <div class="stat" v-if="currentSystem.type == 'energy' && currentSystem.baseDmgBuff">
                        <span class="tooltip">Damage Increase</span>
                        <h4>{{ Math.round((currentSystem.baseDmgBuff - 1) * 100) + '%' }}</h4>
                        <img :src="'/weapons/stats/antiship.svg'" alt="Damage Increase">
                    </div>
                </div>
                <div class="upgradeShowcase">
                    <h3>Upgrades: {{ getUsedUpgrades().filter((value) => value != 0).length }}/{{ currentSystem.maxUpgradeSlots }}</h3>
                    <div class="upgrade" v-for="upgrade in currentUpgrades">
                        <img v-if="!upgrade" src="/weapons/icons/plus.svg">
                        <img v-else :src="upgrade.img">
                    </div>
                    <button class="closeButton" @click="resetSystem">
                        <svg style="width: 3.5em; height: 3.5em;" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"/>
                        </svg>
                    </button>
                </div>
                <div class="systemsHolder">
                    <div class="system upgradeCard" :class="{ gold: upgrade.maxTiers == upgrade.tiersUpgraded }" v-for="upgrade in currentSystem.upgrades" @click="handleUpgrade(upgrade)">
                        <img class="systemImg" :src="upgrade.img">
                        <h3>{{ upgrade.name }}</h3>
                        <p><span v-for="part in upgrade.description" :class="descriptionColor(upgrade.description, part)">{{ part }}</span></p>
                        <div class="tp">
                            <h4 v-if="upgrade.tiersUpgraded != upgrade.maxTiers" style="margin: 0;">{{ typeof upgrade.tpPerTier == 'number' ? upgrade.tpPerTier : upgrade.tpPerTier[upgrade.tiersUpgraded ?? 0] }}</h4>
                            <img v-if="upgrade.tiersUpgraded != upgrade.maxTiers" :src="'/fleet/techPoint.svg'" alt="Number of tech points required for the next level of this upgrade">
                        </div>
                        <div class="upgrades">
                            <div class="upgradeSlot" :class="{ upgraded: upgrade.tiersUpgraded != undefined && upgrade.tiersUpgraded >= tier }" v-for="tier in upgrade.maxTiers"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

    <div class="tpMenu">
        <h3 style="margin: 0;">Currently editing</h3>
        <div style="display: flex; align-items: center; justify-content: center; gap: 1.5em;">
            <h1 style="margin: 0;">{{ currentShip.name }} - {{ currentShip.title }}</h1>
            <button class="closeButton" @click="emit('close')">
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"/>
                </svg>
            </button>
        </div>
        <div class="tpCounter">
            <h3>Tech Points allocated:</h3>
            <div class="tp">
                <h4>{{ techPoints }}</h4>
                <img :src="'/fleet/techPoint.svg'" alt="Number of tech points allocated to this ship">
            </div>
        </div>
        <div class="constructionStats">
            <div class="tp">
                <h4>{{ currentShip.production.metal.toLocaleString() }}</h4>
                <img :src="'/weapons/stats/metal.svg'" alt="Amount of metal required to build this ship">
            </div>
            <div class="tp">
                <h4>{{ currentShip.production.crystal.toLocaleString() }}</h4>
                <img :src="'/weapons/stats/crystal.svg'" alt="Amount of crystal required to build this ship">
            </div>
            <div class="tp">
                <h4>{{ currentShip.production.deuterium.toLocaleString() }}</h4>
                <img :src="'/weapons/stats/deuterium.svg'" alt="Amount of deuterium required to build this ship">
            </div>
            <div class="tp">
                <h4>{{ addZeroToTime(Math.floor(calculateTime(currentShip.production.timeSeconds) / 60 / 60)) }}:{{ addZeroToTime(Math.floor(calculateTime(currentShip.production.timeSeconds) / 60) % 60) }}:{{ addZeroToTime(Math.floor(calculateTime(currentShip.production.timeSeconds)) % 60) }}</h4>
                <img :src="'/weapons/stats/time.svg'" alt="Amount of time required to build this ship">
            </div>
            <div class="tp">
                <h4>{{ (currentShip.production.storage || "--").toLocaleString() }}</h4>
                <img src="/weapons/stats/storage.svg" alt="Amount of storage this ship has">
            </div>
        </div>
        <h2 style="margin-top: 2em;">Click on a system to allocate TP</h2>
        <div class="systemsHolder">
            <div class="system" @click="openSystem(system)" v-for="system in currentShip.systems">
                <img class="systemImg" :src="system.img" alt="">
                <h3>{{ system.name }}</h3>
                <div class="upgrades">
                    <div class="upgradeSlot" :class="{ upgraded: system.upgrades.map((upgrade) => upgrade.tiersUpgraded == upgrade.maxTiers ? 1 : 0).filter((value) => value != 0)[index] != undefined }" v-for="(upgrade, index) in system.maxUpgradeSlots"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

type Props = {
    ship: Ship;
}
const props = defineProps<Props> ();
const emit = defineEmits(["close"]);

const showSystem = ref(false);

const currentShip = ref({...props.ship});
const currentSystem = ref<ShipSystemAll> ();
const currentUpgrades = ref<(SystemUpgrade | 0)[]> ([]);

const systemTechPoints = ref(0);
const techPoints = ref(0);

function resetSystem () {
    if (!currentSystem.value) return;

    if (currentSystem.value.type == "weapon") {
        currentSystem.value.modifiedAntiship = currentSystem.value.baseAntiship;
        currentSystem.value.modifiedAntiair = currentSystem.value.baseAntiair;
        currentSystem.value.modifiedSiege = currentSystem.value.baseSiege;

    } else if (currentSystem.value.type == "armor") {
        currentSystem.value.modifiedHp = currentSystem.value.baseHp;
        currentSystem.value.modifiedArmor = currentSystem.value.baseArmor;
        currentSystem.value.modifiedEnergyShield = currentSystem.value.baseEnergyShield;

    } else if (currentSystem.value.type == "propulsion") {
        currentSystem.value.modifiedCruise = currentSystem.value.baseCruise;
        currentSystem.value.modifiedWarp = currentSystem.value.baseWarp;
        currentSystem.value.modifiedEvasion = currentSystem.value.baseEvasion;
    }

    systemTechPoints.value = 0;
    currentUpgrades.value = [];

    for (let upgrade of currentSystem.value.upgrades) {
        upgrade.tpAllocated = 0;
        upgrade.tiersUpgraded = 0;
    }
}

/* This section needs to be updated according to https://www.infinitelagrange.com/news/preview/upgrade/20240816/37809_1174787.html
Ship type and version number affects production cost and production time.
*/
function calculateTime (time: number) {
    if (!["Battlecruiser", "Carrier", "Auxiliary Ship", "Battleship"].includes(currentShip.value.type)) {
        return time * (1 + (techPoints.value * 0.005));
    } else {
        return time
    }
}

function openSystem (system: ShipSystemAll) {
    showSystem.value = true;
    currentSystem.value = system;
    systemTechPoints.value = system.upgrades.map((upgrade) => upgrade.tpAllocated ?? 0).reduce((acc, curr) => acc + curr, 0);
    if (!currentSystem.value.tpAllocated) currentSystem.value.tpAllocated = 0;
    for (let upgrade of currentSystem.value.upgrades) {
        if (!upgrade.tiersUpgraded) upgrade.tiersUpgraded = 0;
        if (!upgrade.tpAllocated) upgrade.tpAllocated = 0;
    }
}

function getUsedUpgrades () {
    if (!currentSystem.value) return [];
    const upgrades = currentSystem.value.upgrades.map((upgrade) => upgrade.tiersUpgraded != undefined && upgrade.tiersUpgraded != 0 ? upgrade : 0);
    currentUpgrades.value = upgrades.filter((value) => value != 0);
    return upgrades;
}

function closeSystem () {
    techPoints.value = currentShip.value.systems?.map((system) => system.upgrades.map((upgrade) => upgrade.tpAllocated ?? 0)).flat().reduce((acc, curr) => acc + curr, 0) ?? 0;
    showSystem.value = false;
    console.log(props.ship)
}

function handleStatChange (upgrade: SystemUpgrade) {
    const stat = upgrade.affectedStat;
    const buff = upgrade.percentBuffPerTier;
    const system = currentSystem.value;

    if (!stat || !buff || !system) return;
    if (typeof stat != 'string' || typeof buff != 'number') {
        handleStatArrayChange(upgrade);
        return;
    }

    if (stat == "damage") {
        if (system.type == "weapon") {
            system.modifiedAntiship = (system.modifiedAntiship ?? system.baseAntiship) * buff;
            system.modifiedAntiair = (system.modifiedAntiair ?? system.baseAntiair) * buff;
            system.modifiedSiege = (system.modifiedSiege ?? system.baseSiege) * buff;

        } else if (system.type == "energy") {

        }

    } else if (stat == "siegeDamage") {
        if (system.type == "weapon") {
            system.modifiedSiege = (system.modifiedSiege ?? system.baseSiege) * buff;
        }

    } else if (stat == "hp") {
        if (system.type == "armor") {
            system.modifiedHp = (system.modifiedHp ?? system.baseHp) * buff;
        }

    } else if (stat == "armor") {
        if (system.type == "armor") {
            if (!system.modifiedArmor) system.modifiedArmor = system.baseArmor;
            system.modifiedArmor += buff;
        }

    } else if (stat == "energyShield") {
        if (system.type == "armor") {
            if (!system.modifiedEnergyShield) system.modifiedEnergyShield = system.baseArmor;
            system.modifiedEnergyShield += buff - 1;
        }

    } else if (stat == "cruise") {
        if (system.type == "propulsion") {
            system.modifiedCruise = (system.modifiedCruise ?? system.baseCruise) * buff;
        }

    } else if (stat == "warp") {
        if (system.type == "propulsion") {
            system.modifiedWarp = (system.modifiedWarp ?? system.baseWarp) * buff;
        }

    } else if (stat == "generalEvasion") {
        if (system.type == "propulsion" && system.baseEvasion) {
            if (!system.modifiedEvasion) system.modifiedEvasion = system.baseEvasion;
            system.modifiedEvasion += buff - 1;
        }
    }
}

function handleStatArrayChange (upgrade: SystemUpgrade) {

}

function handleUpgrade (upgrade: SystemUpgrade) {
    const find = findObjectInArray(currentUpgrades.value.filter((value) => value != 0), upgrade);
    if (find && find.tiersUpgraded != undefined && find.tpAllocated != undefined) {
        if (find.maxTiers == find.tiersUpgraded) return;

        if (typeof find.tpPerTier == 'number') {
            find.tpAllocated += find.tpPerTier;
            systemTechPoints.value += find.tpPerTier;
            handleStatChange(find);
        } else {
            find.tpAllocated += find.tpPerTier[find.tiersUpgraded];
            systemTechPoints.value += find.tpPerTier[find.tiersUpgraded];
            handleStatChange(find);
        }
        find.tiersUpgraded++;

    } else if (upgrade.tiersUpgraded != undefined && upgrade.tpAllocated != undefined) {
        if (upgrade.maxTiers == upgrade.tiersUpgraded) return;
        if (currentSystem.value?.maxUpgradeSlots && currentUpgrades.value.length >= currentSystem.value.maxUpgradeSlots) return;

        if (typeof upgrade.tpPerTier == 'number') {
            upgrade.tpAllocated += upgrade.tpPerTier;
            systemTechPoints.value += upgrade.tpPerTier;
            handleStatChange(upgrade);
        } else {
            upgrade.tpAllocated += upgrade.tpPerTier[upgrade.tiersUpgraded];
            systemTechPoints.value += upgrade.tpPerTier[upgrade.tiersUpgraded];
            handleStatChange(upgrade);
        }
        upgrade.tiersUpgraded++;
        currentUpgrades.value.push(upgrade);
    }
}

function addZeroToTime (num: number) {
    if (String(num).length == 1) return "0" + num;
    else return num;
}

function descriptionColor (full: string[], part: string) {
    if (Number(full.indexOf(part)) % 2 == 1) return "gold";
}

</script>

<style lang="scss" scoped>

.systemBackground {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(50, 50, 50);
    z-index: 5;
}

.systemMenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 7.5em;
    height: calc(100vh - 7.5em);

    .stats {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 2em;
        margin-top: 2em;

        h3, h4 {
            margin: 0;
        }

        .stat {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5em;

            img {
                width: 4em;
                height: 4em;
            }

            .tooltip {
                visibility: hidden;
                max-width: 20em;
                background-color: black;
                color: #fff;
                text-align: center;
                border-radius: 1em;
                padding: 0.5em;
                position: absolute;
                z-index: 1;
                margin-left: 10em;
                opacity: 0;
                transition: opacity 0.3s;
            }
        }
    }
}

.upgradeShowcase {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin-top: 2.5em;
    margin-bottom: 2.5em;
    background-color: rgb(36, 36, 36);
    padding: 1em;
    padding-left: 3em;
    padding-right: 3em;
    border-radius: 1em;

    .upgrade {
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid rgb(150, 150, 150) 0.1em;

        img {
            width: 7em;
        }
    }
}

.systemTransition-enter-active, .systemTransition-leave-active {
    transition: all 0.25s ease-in-out;

    .systemBackground {
        transition: all 0.15s ease-in-out;
    }

    .systemMenu {
        transition: all 0.25s ease-in-out;
    }
}

.systemTransition-enter-from, .systemTransition-leave-to {
    opacity: 0;

    .systemBackground {
        opacity: 0;
    }

    .systemMenu {
        opacity: 0;
        transform: scale(0.1);
    }
}

.closeButton {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: 50%;
    padding: 0;
    border: 0;
    transition: all 0.15s;

    svg {
        width: 5em;
        height: 5em;
        fill: #ff2600;
        transition: all 0.15s;
    }
}

.tpMenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 7.5em;
    height: calc(100vh - 7.5em);

    .tpCounter, .constructionStats {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2em;
        margin-top: 2em;

        h3, h4 {
            margin: 0;
        }
    }

    .constructionStats {
        margin-top: 1em;
    }
}

.tp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;

    img {
        width: 4em;
        height: 4em;
    }
}

.systemsHolder {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 2em;
    flex-wrap: wrap;
    width: 70%;
    text-align: center;

    .system {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 30em;
        padding-top: 1.5em;
        border-radius: 1.5em;
        background-color: rgb(45, 45, 45);
        transition: all 0.15s;

        .systemImg {
            width: 7em;
        }

        h3 {
            margin: 0;
        }

        .upgrades {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2%;
            width: 100%;
            height: 1em;
            margin-top: 2em;
            border-bottom-left-radius: 1em;
            border-bottom-right-radius: 1em;
            background-color: rgb(50, 50, 50);
            
            .upgradeSlot {
                width: 100%;
                height: 1em;
                background-color: rgb(75, 75, 75);
            }

            .upgraded {
                background-color: var(--gold);
            }

            .upgradeSlot:first-child {
                border-bottom-left-radius: 1em;
            }

            .upgradeSlot:last-child {
                border-bottom-right-radius: 1em;
            }
        }
    }

    .upgradeCard {
        background-color: rgb(40, 40, 40);

        .gold {
            color: var(--gold);
        }
    }

    .gold:not(span) {
        background-color: rgba(255, 215, 0, 0.075);
    }
}

@media (hover: hover) and (pointer: fine) {
    .closeButton:hover {
        background-color: rgba(255, 38, 0, 0.3);
    }

    .systemsHolder {
        .system:hover {
            background-color: rgb(55, 55, 55);
        }
        .upgradeCard:hover {
            background-color: rgb(30, 30, 30);
        }
        .gold:not(span):hover {
            background-color: rgba(255, 215, 0, 0.15);
        }
    }

    .systemMenu {
        .stats {
            .stat:hover {
                .tooltip {
                    visibility: visible;
                    opacity: 1;
                }
            }
        }
    }
}

</style>
