<template>
    <div class="outer">
        <div class="content" v-if="item?.type == 'Equipment'">
            <img :src="item.displayImg" :alt="'Image of ' + item.displayName">
            <h2>{{ item.displayName }}</h2>

            <div class="description">
                <h3><span class="bigM">M</span> <span style="color: var(--darkGray);">||</span> {{ item.effectName }}</h3>
                <p><span v-for="part in item.effectDescription" :class="descriptionColor(item.effectDescription, part)">{{ part }}</span></p>
            </div>

            <div class="stats">
                <h3>Class: <span>{{ item.class }}</span></h3>
                <h3>Weight: <span>{{ item.loadWeight }} storage</span></h3>
            </div>
        </div>

        <div class="content" v-if="item?.type == 'Technical Blueprint'">
            <img :src="item.displayImg" :alt="'Image of ' + item.displayName" class="bpImg">
            <h2>{{ item.displayName }}</h2>

            <div class="description">
                <h3><span class="bigM">M</span> <span style="color: var(--darkGray);">||</span> {{ item.effectName }}</h3>
                <p><span v-for="part in item.effectDescription" :class="descriptionColor(item.effectDescription, part)">{{ part }}</span></p>
            </div>

            <div class="stats">
                <h3>Delivery: <span>{{ item.deliveryTarget }}</span></h3>
                <h3>Mass: <span>{{ item.itemMass }}</span></h3>
                <h3>Limit: <span>{{ item.activeService }}</span></h3>
                <h3>Cooldown: <span>{{ item.productionInterval }}</span></h3>
                <h3>Class: <span>{{ item.class }}</span></h3>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const item = ref(equipmentStore().current);

watch(() => equipmentStore().current, () => item.value = equipmentStore().current);

function descriptionColor (full: string[], part: string) {
    if (Number(full.indexOf(part)) % 2 == 1) return "bold";
    return "normal";
}

</script>

<style lang="scss" scoped>

.outer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    img {
        width: 50em;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 1.5em;
    }

    .bpImg {
        background-color: transparent;
    }

    h2 {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        text-align: center;
    }

    .description {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: rgb(45, 45, 45);
        padding: 1em;
        border-radius: 1.5em;
        width: 90%;

        h3 {
            margin: 0;
            margin-top: 0.5em;
        }

        .bigM {
            background-color: orange;
            color: black;
            padding-left: 0.4em;
            padding-right: 0.4em;
        }

        p {
            font-size: 1.5em;
            width: 95%;
            color: var(--normalText);

            .bold {
                font-size: 1.25em;
                color: var(--gold);
            }
        }
    }

    .stats {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 75%;
        gap: 2%;
        margin-top: 1.5em;

        h3 {
            width: 45%;
            text-align: center;
            color: var(--normalText);
            margin: 0;
            margin-bottom: 0.5em;

            span {
                color: white;
            }
        }
    }
}

@media screen and (max-width: 800px) {
    .content {
        img {
            width: 100%;
        }

        .description {
            padding: 1svw;
        }

        .stats {
            width: 100%;
            flex-direction: column;

            h3 {
                width: 100%;
            }
        }
    }
}

</style>