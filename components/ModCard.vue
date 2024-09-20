<template>
    <div class="subsystem">
        <h3 class="name"><span>x{{ subsystem.count }}</span> | {{ subsystem.name }}</h3>
        <h3 class="title">{{ subsystem.title }}</h3>

        <div class="details">
            <div class="detail" v-if="subsystem.type == 'hanger'">
                <div class="key">
                    <img src="/weapons/types/damageType.svg" alt="Hanger Type">
                    <p>Hanger Type</p>
                </div>
                <p class="value">{{ subsystem.hanger }}</p>
            </div>
            <div class="detail" v-if="subsystem.type == 'hanger'">
                <div class="key">
                    <img src="/weapons/types/alpha.svg" alt="Capacity">
                    <p>Capacity</p>
                </div>
                <p class="value">{{ subsystem.capacity }}</p>
            </div>
            <div class="detail" v-if="subsystem.type == 'weapon' || (subsystem.type == 'hanger' && (subsystem.hanger == 'Tactical UAV' ||
            subsystem.hanger == 'Cooperative Offensive UAV' || subsystem.hanger == 'Area-Denial Anti-Aircraft UAV' || subsystem.hanger == 'Siege UAV'))">
                <div class="key">
                    <img src="/weapons/types/damageType.svg" alt="Damage Type">
                    <p>Damage Type</p>
                </div>
                <p class="value">{{ subsystem.damageType }}</p>
            </div>
            <div class="detail" v-if="subsystem.type == 'weapon' || (subsystem.type == 'hanger' && (subsystem.hanger == 'Tactical UAV' ||
            subsystem.hanger == 'Cooperative Offensive UAV' || subsystem.hanger == 'Area-Denial Anti-Aircraft UAV' || subsystem.hanger == 'Siege UAV'))">
                <div class="key">
                    <img src="/weapons/types/target.svg" alt="Prioritized Target">
                    <p>Prioritized Target</p>
                </div>
                <p class="value">{{ subsystem.target }}</p>
            </div>
            <div class="detail" v-if="subsystem.type == 'weapon' || (subsystem.type == 'hanger' && (subsystem.hanger == 'Tactical UAV' ||
            subsystem.hanger == 'Cooperative Offensive UAV' || subsystem.hanger == 'Area-Denial Anti-Aircraft UAV' || subsystem.hanger == 'Siege UAV'))">
                <div class="key">
                    <img src="/weapons/types/alpha.svg" alt="Damage Per Hit">
                    <p>Damage Per Hit</p>
                </div>
                <p class="value">{{ subsystem.alpha?.toLocaleString() }}</p>
            </div>
            <div class="detail" v-if="(subsystem.type == 'weapon' || (subsystem.type == 'hanger' && (subsystem.hanger == 'Tactical UAV' ||
            subsystem.hanger == 'Cooperative Offensive UAV' || subsystem.hanger == 'Area-Denial Anti-Aircraft UAV' || subsystem.hanger == 'Siege UAV')))
            && subsystem.lockonEfficiency">
                <div class="key">
                    <img src="/weapons/types/lockon.svg" alt="Lock-on Efficiency">
                    <p>Lock-On Efficiency</p>
                </div>
                <p class="value">{{ subsystem.lockonEfficiency.toLocaleString() }}%</p>
            </div>
        </div>

        <div class="divider" v-if="subsystem.attributes">

        </div>

        <div class="attributes">
            <p v-for="attribute in subsystem.attributes"><span>{{ attribute }}</span>: {{ attributes[attribute] }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">

type Props = {
    subsystem: WeaponSubsystem | AircraftHangerSubsystem | UavHangerSubsystem | MiscSubsystem;
}

const props = defineProps<Props> ();

</script>

<style lang="scss" scoped>

.subsystem {
    background-color: rgb(36, 36, 36);
    width: 45em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 1em;
    border-radius: 1.5em;
    margin-bottom: 1.5em;

    .name {
        font-size: 2.25em;
        text-align: center;

        span {
            color: var(--gold);
        }
    }

    .title {
        font-size: 1.75em;
        color: var(--darkGray);
        margin-bottom: 0.5em;
        text-align: center;
    }

    h3 {
        margin: 0;
        text-align: center;
    }

    p {
        font-size: 1.5em;
    }

    img {
        width: 5em;
    }

    .details {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        p {
            margin: 0;
        }

        .detail {
            width: 90%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .key {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1em;
            }

            .value {
                font-size: 2em;
                text-align: right;
            }
        }
    }

    .divider {
        width: 100%;
        background-color: rgb(50, 50, 50);
        height: 0.5em;
        border-radius: 500em;
        margin-top: 0.25em;
        margin-bottom: 0.5em;
    }

    .attributes {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;

        p {
            color: var(--normalText);
            margin-top: 0;

            span {
                color: white;
                font-size: 1.4em;
            }
        }
    }
}

</style>