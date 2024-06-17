<template>
    <div class="titleHolder">
        <div class="navigation">
            <h2 class="title">Filters</h2>
            <div class="navButtonHolder">
                <button @click="switchFilter('Equipment')" :class="{ active: filterByEquipment }">
                    <img src="/ui/wrench.svg" alt="Click to filter by equipment">
                    <h3>Equipment</h3>
                </button>
                <button @click="switchFilter('Blueprint')" :class="{ active: filterByBlueprint }">
                    <img :src="blueprint" alt="Click to filter by technical blueprints">
                    <h3>Blueprints</h3>
                </button>
            </div>
        </div>
        <input type="text" v-model="equipmentStore().search" placeholder="Search">
    </div>

    <div class="outer">
        <div class="equipmentCard" v-for="equipment in filteredData" @click="selectItem(equipment)"
        :class="{ active: compareObjectsSingle(equipmentStore().current, equipment) }">
            <div class="content">
                <img :src="equipment.displayImg" :alt="'Image of ' + equipment.displayName" :class="{ bpImg: equipment.type == 'Technical Blueprint' }">
                <h3>{{ equipment.displayName }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const blueprint = "/ui/blueprint.svg";

const filterByEquipment = ref(false);
const filterByBlueprint = ref(false);

const filterButton = ref(equipmentData);
const filteredData = ref(filterButton.value);

const emit = defineEmits(["select"])

watch(() => equipmentStore().search, () => autocomplete());

onMounted(() => {
    const filter = equipmentStore().filter;
    if (filter) {
        if (filter == 'Equipment') switchFilter("Equipment");
        else switchFilter("Blueprint");
    }
});

function autocomplete () {
    if (equipmentStore().search != "") filteredData.value = [...filterButton.value].filter((item) => item.displayName.toLowerCase().includes(equipmentStore().search.toLowerCase()));
    else filteredData.value = filterButton.value;
}

function selectItem (equipment: Equipment | TechnicalBlueprint) {
    equipmentStore().current = equipment;
    emit("select");
}

function switchFilter (type: 'Equipment' | 'Blueprint') {
    if (type == 'Equipment') {
        filterByEquipment.value = !filterByEquipment.value;
        filterByBlueprint.value = false;
        equipmentStore().filter = "Equipment";
        
        if (filterByEquipment.value) filterButton.value = equipmentData.filter((item) => item.type == 'Equipment');
        else filterButton.value = equipmentData;
        equipmentStore().search = "";
        autocomplete();
    } else {
        filterByBlueprint.value = !filterByBlueprint.value;
        filterByEquipment.value = false;
        equipmentStore().filter = "Blueprints";

        if (filterByBlueprint.value) filterButton.value = equipmentData.filter((item) => item.type == 'Technical Blueprint');
        else filterButton.value = equipmentData;
        equipmentStore().search = "";
        autocomplete();
    }
}

</script>

<style lang="scss" scoped>

.outer {
    width: 96em;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    gap: 1.6em;
    margin-top: 1em;
}

.titleHolder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 72em;
    margin-bottom: 1.6em;
    background-color: rgb(36, 36, 36);
    padding: 1em;
    border-radius: 1.5em;

    .navigation {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 2em;
        margin-bottom: 1em;
    }

    .title {
        margin: 0;
    }

    input {
        font-size: var(--h3);
        width: 60%;
        background-color: rgb(55, 55, 55);
        border-radius: 0.4em;
        color: white;
        border-color: #48005e;
        border-style: solid;
        border-width: 0.04em;
        text-align: center;
        height: 2em;
    }
    input::placeholder {
        color: white;
    }
    input:focus {
        outline: none;
    }
}

.navButtonHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50em;
    gap: 3%;

    button {
        background-color: transparent;
        border: 0;
        color: white;
        display: flex;
        width: 20em;
        align-items: center;
        justify-content: center;
        gap: 5%;
        transition: all 0.25s;
        border-radius: 1.6em;
        
        img {
            width: 4.8em;
        }
    }

    .active {
        background-color: rgb(45, 45, 45);
    }
}

.equipmentCard {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(36, 36, 36);
    width: 40em;
    padding: 1em;
    border-radius: 1.5em;
    text-align: center;
    transition: all 0.25s;

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        filter: grayscale(0.33);
        transition: all 0.25s;

        img {
            width: 35em;
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 1.5em;
            margin-top: 1em;
        }

        .bpImg {
            width: 32.5em;
            background-color: transparent;
        }

        h3 {
            margin-top: 0.5em;
            margin-bottom: 1em;
        }
    }
}

.active {
    background-color: rgb(55, 55, 55);
}

@media screen and (max-width: 1200px) {
    .titleHolder {
        width: 60em;
    }

    .outer {
        width: 62em;
    }

    .equipmentCard {
        width: 28em;

        .content {
            img {
                width: 28em;
            }
            .bpImg {
                width: 28em;
            }
        }
    }
}

@media screen and (max-width: 800px) {
    .titleHolder {
        width: 90svw;
        padding: 1svw;

        .navigation {
            h2 {
                width: 0;
                font-size: 0;
                display: none;
            }
        }

        .navButtonHolder {
            width: 100%;
            
            button {
                height: 6em;

                h3 {
                    width: 0;
                    font-size: 0;
                    display: none;
                }
            }
        }
    }

    .outer {
        width: 90svw;
    }

    .equipmentCard {
        width: 95%;

        .content {
            img {
                width: 97.5%;
            }
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .navButtonHolder button:hover {
        background-color: rgb(55, 55, 55);
    }

    .equipmentCard:hover {
        background-color: rgb(60, 60, 60);

        .content {
            filter: grayscale(0);
        }
    }
}

</style>