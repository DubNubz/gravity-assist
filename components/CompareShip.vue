<template>
    <div class="outer">
        <Transition name="tpMenuTransition">
            <div class="tpMenuBackground" v-if="showTpMenu">
                <EditShip :ship="ship1" @close="handleClose" />
            </div>
        </Transition>

        <img class="shipImg" :src="ship1.img" :alt="'Image of ' + ship1.name">
        <h2 style="margin: 0;">{{ ship1.name }}</h2>
        <h4 style="margin: 0;">{{ ship1.title }}</h4>
        <button class="editSystemsButton" @click="showTpMenu = true">
            <img src="/ui/wrench.svg" alt="Click to edit this ship's systems">
            <h3>Tech Points</h3>
        </button>
        <div>{{ updateStats(ship1) }}</div>
        <div class="statOuter">
            <div class="statHolder" v-for="stat in stats">
                <h4>
                    {{ stat.name }}
                    <span class="tooltip" v-if="stat.tooltip">{{ stat.tooltip }}</span>
                </h4>
                <div class="stat">
                    <h3 v-if="!stat.time">{{ (stat.raw ? stat.stat : Math.round(stat.stat)).toLocaleString() }}</h3>
                    <h3 v-else>{{ addZeroToTime(Math.floor(stat.stat / 60 / 60)) }}:{{ addZeroToTime(Math.floor(stat.stat / 60) % 60) }}:{{ addZeroToTime(Math.floor(stat.stat % 60)) }}</h3>
                    <img :src="stat.img" :alt="stat.name">
                </div>
                <div class="comparisonImgs" v-if="!['Command Points', 'Metal', 'Crystal', 'Deuterium', 'Build Time'].includes(stat.name)">
                    <img class="comparison" v-if="stat.stat > stat.comparisonStat" src="/ui/greenUp.svg" alt="This ship's stat is better than the comparison.">
                    <span class="statTooltip" v-if="stat.stat > stat.comparisonStat">This ship has a <span v-if="stat.comparisonStat != 0 && !stat.raw">{{ Math.abs(Math.round(((stat.stat / stat.comparisonStat) - 1) * 100)) + '%' }}</span> higher <span>{{ stat.name }}</span> value than the comparison</span>
                    <img class="comparison" v-if="stat.stat < stat.comparisonStat" src="/ui/redDown.svg" alt="This ship's stat is worse than the comparison.">
                    <span class="statTooltip" v-if="stat.stat < stat.comparisonStat">This ship has a <span v-if="stat.stat != 0 && !stat.raw">{{ Math.abs(Math.round(((stat.comparisonStat / stat.stat) - 1) * 100)) + '%' }}</span> lower <span>{{ stat.name }}</span> value than the comparison</span>
                </div>
                <div class="comparisonImgs" v-else>
                    <img class="comparison" v-if="stat.stat < stat.comparisonStat" src="/ui/greenUp.svg" alt="This ship's stat is better than the comparison.">
                    <span class="statTooltip" v-if="stat.stat < stat.comparisonStat">This ship has a <span v-if="stat.comparisonStat != 0 && !stat.raw">{{ Math.abs(Math.round(((stat.stat / stat.comparisonStat) - 1) * 100)) + '%' }}</span> lower <span>{{ stat.name }}</span> value than the comparison</span>
                    <img class="comparison" v-if="stat.stat > stat.comparisonStat" src="/ui/redDown.svg" alt="This ship's stat is worse than the comparison.">
                    <span class="statTooltip" v-if="stat.stat > stat.comparisonStat">This ship has a <span v-if="stat.stat != 0 && !stat.raw">{{ Math.abs(Math.round(((stat.comparisonStat / stat.stat) - 1) * 100)) + '%' }}</span> higher <span>{{ stat.name }}</span> value than the comparison</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

type Stat = {
    name: string;
    img: string;
    stat: any;
    comparisonStat: any;
    tooltip?: string;
    raw?: true;
    time?: true;
}

type Props = {
    ship1: Ship;
    ship2: Ship | undefined;
}
const props = defineProps<Props> ();

const showTpMenu = ref(false);

const stats = ref<Stat[]> ([]);

function handleClose () {
    console.log(props.ship1)
    showTpMenu.value = false;
    updateStats(props.ship1)
}

function addZeroToTime (num: number) {
    if (String(num).length == 1) return "0" + num;
    else return num;
}

function updateStats (ship: Ship) {
    stats.value = [{
        name: "Command Points",
        img: "/fleet/command_point.svg",
        stat: props.ship1.cp,
        comparisonStat: props.ship2?.cp
    }, {
        name: "Metal",
        img: "/weapons/stats/metal.svg",
        stat: props.ship1.production.metal,
        comparisonStat: props.ship2?.production.metal,
        tooltip: "Amount of metal required to build this ship"
    }, {
        name: "Crystal",
        img: "/weapons/stats/crystal.svg",
        stat: props.ship1.production.crystal,
        comparisonStat: props.ship2?.production.crystal,
        tooltip: "Amount of crystals required to build this ship"
    }, {
        name: "Deuterium",
        img: "/weapons/stats/deuterium.svg",
        stat: props.ship1.production.deuterium,
        comparisonStat: props.ship2?.production.deuterium,
        tooltip: "Amount of deuterium required to build this ship"
    }, {
        name: "Build Time",
        img: "/weapons/stats/time.svg",
        stat: !["Battlecruiser", "Carrier", "Auxiliary Ship", "Battleship"].includes(props.ship1.type) ? props.ship1.production.timeSeconds * (1 + ((props.ship1.systems?.map((system) => system.upgrades.map((upgrade) => upgrade.tpAllocated ?? 0)).flat().reduce((acc, curr) => acc + curr, 0) ?? 0) * 0.005)) : props.ship1.production.timeSeconds,
        comparisonStat: !["Battlecruiser", "Carrier", "Auxiliary Ship", "Battleship"].includes(props.ship2?.type ?? "") ? (props.ship2?.production.timeSeconds ?? 1) * (1 + ((props.ship2?.systems?.map((system) => system.upgrades.map((upgrade) => upgrade.tpAllocated ?? 0)).flat().reduce((acc, curr) => acc + curr, 0) ?? 0) * 0.005)) : props.ship2?.production.timeSeconds,
        time: true,
        tooltip: "Amount of time required to build this ship"
    }, {
        name: "Storage",
        img: "/weapons/stats/storage.svg",
        stat: props.ship1.production.storage,
        comparisonStat: props.ship2?.production.storage
    }, {
        name: "Storage per CP",
        img: "/weapons/stats/storage.svg",
        stat: props.ship1.production.storage / props.ship1.cp,
        comparisonStat: (props.ship2?.production.storage ?? 0) / (props.ship2?.cp ?? 1),
        tooltip: "Calculated by dividing the Storage / Command Point values"
    }, {
        name: "Anti-Ship Fire",
        img: "/weapons/stats/antiship.svg",
        stat: ((props.ship1.systems?.map((system) => system.type == 'weapon' ? (system.modifiedAntiship ?? system.baseAntiship) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0) * (props.ship1.aircraftPerSquadron ?? 1)),
        comparisonStat: ((props.ship2?.systems?.map((system) => system.type == 'weapon' ? (system.modifiedAntiship ?? system.baseAntiship) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0) * (props.ship2?.aircraftPerSquadron ?? 1))
    }, {
        name: "Anti-Ship Fire per CP",
        img: "/weapons/stats/antiship.svg",
        stat: (((props.ship1.systems?.map((system) => system.type == 'weapon' ? (system.modifiedAntiship ?? system.baseAntiship) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0) * (props.ship1.aircraftPerSquadron ?? 1)) / props.ship1.cp),
        comparisonStat: (((props.ship2?.systems?.map((system) => system.type == 'weapon' ? (system.modifiedAntiship ?? system.baseAntiship) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0) * (props.ship2?.aircraftPerSquadron ?? 1)) / (props.ship2?.cp ?? 1)),
        tooltip: "Calculated by dividing the Anti-Ship Fire / Command Point values"
    }, {
        name: "Air Defense",
        img: "/weapons/stats/antiaircraft.svg",
        stat: ((props.ship1.systems?.map((system) => system.type == 'weapon' ? (system.modifiedAntiair ?? system.baseAntiair) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0) * (props.ship1.aircraftPerSquadron ?? 1)),
        comparisonStat: ((props.ship2?.systems?.map((system) => system.type == 'weapon' ? (system.modifiedAntiair ?? system.baseAntiair) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0) * (props.ship2?.aircraftPerSquadron ?? 1))
    }, {
        name: "Air Defense per CP",
        img: "/weapons/stats/antiaircraft.svg",
        stat: (((props.ship1.systems?.map((system) => system.type == 'weapon' ? (system.modifiedAntiair ?? system.baseAntiair) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0) * (props.ship1.aircraftPerSquadron ?? 1)) / props.ship1.cp),
        comparisonStat: (((props.ship2?.systems?.map((system) => system.type == 'weapon' ? (system.modifiedAntiair ?? system.baseAntiair) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0) * (props.ship2?.aircraftPerSquadron ?? 1)) / (props.ship2?.cp ?? 1)),
        tooltip: "Calculated by dividing the Air Defense / Command Point values"
    }, {
        name: "Siege Fire",
        img: "/weapons/stats/siege.svg",
        stat: ((props.ship1.systems?.map((system) => system.type == 'weapon' ? (system.modifiedSiege ?? system.baseSiege) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0) * (props.ship1.aircraftPerSquadron ?? 1)),
        comparisonStat: ((props.ship2?.systems?.map((system) => system.type == 'weapon' ? (system.modifiedSiege ?? system.baseSiege) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0) * (props.ship2?.aircraftPerSquadron ?? 1))
    }, {
        name: "Siege Fire per CP",
        img: "/weapons/stats/siege.svg",
        stat: (((props.ship1.systems?.map((system) => system.type == 'weapon' ? (system.modifiedSiege ?? system.baseSiege) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0) * (props.ship1.aircraftPerSquadron ?? 1)) / props.ship1.cp),
        comparisonStat: (((props.ship2?.systems?.map((system) => system.type == 'weapon' ? (system.modifiedSiege ?? system.baseSiege) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0) * (props.ship2?.aircraftPerSquadron ?? 1)) / (props.ship2?.cp ?? 1)),
        tooltip: "Calculated by dividing the Siege Fire / Command Point values"
    }, {
        name: "Hitpoints",
        img: "/weapons/stats/hp.svg",
        stat: props.ship1.systems?.map((system) => system.type == 'armor' ? (system.modifiedHp ?? system.baseHp) : 0).reduce((acc, curr) => acc + curr, 0),
        comparisonStat: props.ship2?.systems?.map((system) => system.type == 'armor' ? (system.modifiedHp ?? system.baseHp) : 0).reduce((acc, curr) => acc + curr, 0)
    }, {
        name: "Hitpoints per CP",
        img: "/weapons/stats/hp.svg",
        stat: (props.ship1.systems?.map((system) => system.type == 'armor' ? (system.modifiedHp ?? system.baseHp) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 / props.ship1.cp),
        comparisonStat: (props.ship2?.systems?.map((system) => system.type == 'armor' ? (system.modifiedHp ?? system.baseHp) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 / (props.ship2?.cp ?? 1)),
        tooltip: "Calculated by dividing the Hitpoints / Command Point values"
    }, {
        name: "Armor",
        img: "/weapons/stats/armor.svg",
        stat: props.ship1.systems?.map((system) => system.type == 'armor' ? (system.modifiedArmor ?? system.baseArmor) : 0).reduce((acc, curr) => acc + curr, 0),
        comparisonStat: props.ship2?.systems?.map((system) => system.type == 'armor' ? (system.modifiedArmor ?? system.baseArmor) : 0).reduce((acc, curr) => acc + curr, 0)
    }, {
        name: "Energy Shield",
        img: "/weapons/stats/energyShield.svg",
        stat: (props.ship1.systems?.map((system) => system.type == 'armor' ? (system.modifiedEnergyShield ?? system.baseEnergyShield) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 * 100) + "%",
        comparisonStat: (props.ship2?.systems?.map((system) => system.type == 'armor' ? (system.modifiedEnergyShield ?? system.baseEnergyShield) : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 * 100) + "%",
        raw: true
    }, {
        name: "Cruise Speed",
        img: "/weapons/stats/cruise.svg",
        stat: props.ship1.systems?.map((system) => system.type == 'propulsion' ? (system.modifiedCruise ?? system.baseCruise) : 0).reduce((acc, curr) => acc + curr, 0),
        comparisonStat: props.ship2?.systems?.map((system) => system.type == 'propulsion' ? (system.modifiedCruise ?? system.baseCruise) : 0).reduce((acc, curr) => acc + curr, 0)
    }, {
        name: "Warp Speed",
        img: "/weapons/stats/cruise.svg",
        stat: props.ship1.systems?.map((system) => system.type == 'propulsion' ? (system.modifiedWarp ?? system.baseWarp) : 0).reduce((acc, curr) => acc + curr, 0),
        comparisonStat: props.ship2?.systems?.map((system) => system.type == 'propulsion' ? (system.modifiedWarp ?? system.baseWarp) : 0).reduce((acc, curr) => acc + curr, 0)
    }]
}

</script>

<style lang="scss" scoped>

.outer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 2em;
}

.tpMenuBackground {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    width: calc(100% - 32em);
    height: 100%;
    background-color: rgba(30, 30, 30);
    z-index: 5;
}

.tpMenuTransition-enter-active, .tpMenuTransition-leave-active {
    transition: all 0.25s ease-in-out;

    .tpMenuBackground {
        transition: all 0.15s ease-in-out;
    }

    .tpMenu {
        transition: all 0.25s ease-in-out;
    }
}

.tpMenuTransition-enter-from, .tpMenuTransition-leave-to {
    opacity: 0;

    .tpMenuBackground {
        opacity: 0;
    }

    .tpMenu {
        opacity: 0;
    }
}

.editSystemsButton {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5em;
    color: white;
    border: 0;
    padding-left: 3em;
    padding-right: 3em;
    border-radius: 1em;
    height: 6em;
    background-color: rgb(55, 55, 55);
    transition: all 0.15s;
    margin-top: 1.5em;

    img {
        width: 5em;
    }
}

.shipImg {
    width: 75%;
}

.statOuter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin-top: 1em;
    width: 100%;
}

.statHolder {
    width: 100%;
    display: grid;
    grid-template-columns: 50% 35% 15%;
    align-items: center;
    position: relative;
    cursor: pointer;

    .tooltip {
        font-size: 0.65em;
    }

    .statTooltip {
        span {
            font-weight: bolder;
        }
    }

    .tooltip, .statTooltip {
        visibility: hidden;
        max-width: 20em;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 1em;
        padding: 0.5em;
        position: absolute;
        z-index: 1;
        left: 50%;
        margin-left: -5em;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .stat {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1em;

        img {
            width: 4.5em;
        }
    }

    .comparisonImgs {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .comparison {
        width: 5em;
    }
}

@media (hover: hover) and (pointer: fine) {
    .editSystemsButton:hover {
        background-color: rgba(0, 183, 255, 0.514);
    }

    .statHolder {
        h4:hover {
            .tooltip {
                visibility: visible;
                opacity: 1;
            }
        }
    }

    .comparisonImgs:hover {
        .statTooltip {
            visibility: visible;
            opacity: 1;
        }
    }
}


</style>
