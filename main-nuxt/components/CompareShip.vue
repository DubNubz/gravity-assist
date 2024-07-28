<template>
    <div class="outer">
        <img class="shipImg" :src="ship1.img" :alt="'Image of ' + ship1.name">
        <h2 style="margin: 0;">{{ ship1.name }}</h2>
        <h4 style="margin: 0;">{{ ship1.title }}</h4>
        <div>{{ updateStats(ship1) }}</div>
        <div class="statOuter">
            <div class="statHolder" v-for="stat in stats">
                <h4>{{ stat.name }}</h4>
                <div class="stat">
                    <h3>{{ stat.stat }}</h3>
                    <img :src="stat.img" :alt="stat.name">
                </div>
                <div class="comparisonImgs">
                    <img class="comparison" v-if="stat.stat > stat.comparisonStat" src="/ui/greenUp.svg" alt="This ship's stat is better than the comparison.">
                    <img class="comparison" v-else-if="stat.stat < stat.comparisonStat" src="/ui/redDown.svg" alt="This ship's stat is worse than the comparison.">
                    <img class="comparison" v-else src="/ui/yellowLine.svg" alt="This ship's stat is the same as the comparison.">
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
}

type Props = {
    ship1: Ship;
    ship2: Ship | undefined;
}
const props = defineProps<Props> ();

const stats = ref<Stat[]> ([]);

function updateStats (ship: Ship) {
    stats.value = [{
        name: "Command Points (CP)",
        img: "/fleet/command_point.svg",
        stat: props.ship1.cp,
        comparisonStat: props.ship2?.cp
    }, {
        name: "Anti-Ship Fire",
        img: "/weapons/stats/antiship.svg",
        stat: props.ship1.systems?.map((system) => system.type == 'weapon' ? system.baseAntiship : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString(),
        comparisonStat: props.ship2?.systems?.map((system) => system.type == 'weapon' ? system.baseAntiship : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString()
    }, {
        name: "Air Defense",
        img: "/weapons/stats/antiaircraft.svg",
        stat: props.ship1.systems?.map((system) => system.type == 'weapon' ? system.baseAntiair : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString(),
        comparisonStat: props.ship2?.systems?.map((system) => system.type == 'weapon' ? system.baseAntiair : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString()
    }, {
        name: "Siege Fire",
        img: "/weapons/stats/siege.svg",
        stat: props.ship1.systems?.map((system) => system.type == 'weapon' ? system.baseSiege : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString(),
        comparisonStat: props.ship2?.systems?.map((system) => system.type == 'weapon' ? system.baseSiege : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString()
    }, {
        name: "Hitpoints",
        img: "/weapons/stats/hp.svg",
        stat: props.ship1.systems?.map((system) => system.type == 'armor' ? system.baseHp : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString(),
        comparisonStat: props.ship2?.systems?.map((system) => system.type == 'armor' ? system.baseHp : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString()
    }, {
        name: "Armor",
        img: "/weapons/stats/armor.svg",
        stat: props.ship1.systems?.map((system) => system.type == 'armor' ? system.baseArmor : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString(),
        comparisonStat: props.ship2?.systems?.map((system) => system.type == 'armor' ? system.baseArmor : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString()
    }, {
        name: "Energy Shield",
        img: "/weapons/stats/energyShield.svg",
        stat: Math.round((props.ship1.systems?.map((system) => system.type == 'armor' ? system.baseEnergyShield : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 * 100)).toLocaleString() + "%",
        comparisonStat: Math.round((props.ship2?.systems?.map((system) => system.type == 'armor' ? system.baseEnergyShield : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 * 100)).toLocaleString() + "%"
    }, {
        name: "Anti-Ship Fire per CP",
        img: "/weapons/stats/antiship.svg",
        stat: (props.ship1.systems?.map((system) => system.type == 'weapon' ? system.baseAntiship : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 / props.ship1.cp).toLocaleString(),
        comparisonStat: (props.ship2?.systems?.map((system) => system.type == 'weapon' ? system.baseAntiship : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 / (props.ship2?.cp ?? 1)).toLocaleString()
    }, {
        name: "Air Defense per CP",
        img: "/weapons/stats/antiaircraft.svg",
        stat: (props.ship1.systems?.map((system) => system.type == 'weapon' ? system.baseAntiair : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 / props.ship1.cp).toLocaleString(),
        comparisonStat: (props.ship2?.systems?.map((system) => system.type == 'weapon' ? system.baseAntiair : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 / (props.ship2?.cp ?? 1)).toLocaleString()
    }, {
        name: "Siege Fire per CP",
        img: "/weapons/stats/siege.svg",
        stat: (props.ship1.systems?.map((system) => system.type == 'weapon' ? system.baseSiege : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 / props.ship1.cp).toLocaleString(),
        comparisonStat: (props.ship2?.systems?.map((system) => system.type == 'weapon' ? system.baseSiege : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 / (props.ship2?.cp ?? 1)).toLocaleString()
    }, {
        name: "Hitpoints per CP",
        img: "/weapons/stats/hp.svg",
        stat: (props.ship1.systems?.map((system) => system.type == 'armor' ? system.baseHp : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 / props.ship1.cp).toLocaleString(),
        comparisonStat: (props.ship2?.systems?.map((system) => system.type == 'armor' ? system.baseHp : 0).reduce((acc, curr) => acc + curr, 0) ?? 0 / (props.ship2?.cp ?? 1)).toLocaleString()
    }, {
        name: "Cruise Speed",
        img: "/weapons/stats/cruise.svg",
        stat: props.ship1.systems?.map((system) => system.type == 'propulsion' ? system.baseCruise : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString(),
        comparisonStat: props.ship2?.systems?.map((system) => system.type == 'propulsion' ? system.baseCruise : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString()
    }, {
        name: "Warp Speed",
        img: "/weapons/stats/cruise.svg",
        stat: props.ship1.systems?.map((system) => system.type == 'propulsion' ? system.baseWarp : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString(),
        comparisonStat: props.ship2?.systems?.map((system) => system.type == 'propulsion' ? system.baseWarp : 0).reduce((acc, curr) => acc + curr, 0).toLocaleString()
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
    grid-template-columns: 55% 30% 15%;
    align-items: center;

    .stat {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1em;

        img {
            width: 5em;
        }
    }

    .comparisonImgs {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .comparison {
        width: 5em;
    }
}

</style>