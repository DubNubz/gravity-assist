<template>
    <div class="holder">
        <button class="openSelect" @click="openSelect = !openSelect" v-if="equipmentStore().current">
            <h3 v-if="openSelect">Close Dropdown</h3>
            <h3 v-if="!openSelect">Open Dropdown</h3>
            <img src="/ui/alt/whiteDownArrow.svg" alt="Click to open dropdown menu" :class="{ invert: openSelect }">
        </button>

        <Transition name="selectMenu">
            <div class="select" v-if="openSelect">
                <EquipmentBrowse />
            </div>
        </Transition>

        <div class="card" v-if="!openSelect">
            <EquipmentCard />
        </div>

        <button class="boxButton" @click="copyShareLink" v-if="!openSelect">
            <img src="/ui/alt/whiteShare.svg" alt="Share this tool">
            <h3>Share</h3>
        </button>
    </div>

</template>

<script setup lang="ts">

const openSelect = ref(true);
const route = useRoute();

watch(() => equipmentStore().current, () => {
    openSelect.value = false;
    useHead({
        title: `${equipmentStore().current?.displayName} - Equipment Encyclopedia`,
        meta: [{ name: "description", content: `View all stats and effects of ${equipmentStore().current?.displayName}!` }]
    })
});

useHead({
    title: "Equipment Encyclopedia",
    meta: [{ name: "description", content: "Browse through all equipment and technical blueprints and their stats in Infinite Lagrange." }]
})

onMounted(() => {
    const name = route.query.name as string;
    if (name) equipmentStore().current = equipmentData.find((equipment) => equipment.displayName == name.replaceAll("ヅ", "&"));
});

async function copyShareLink () {
    const name = equipmentStore().current?.displayName.replaceAll(" ", "%20").replaceAll("&", "ヅ");
    await navigator.clipboard.writeText(`https://gravityassist.xyz/modules/equipment-encyclopedia?name=${name}`);
    alert("Link copied!")
}

</script>

<style lang="scss" scoped>

.holder {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card {
    background-color: rgb(36, 36, 36);
    width: 72em;
    padding: 2.4em;
    border-radius: 2.4em;
    margin-top: 3.2em;
}

.openSelect {
    display: flex;
    width: 30em;
    align-items: center;
    justify-content: center;
    gap: 2em;
    color: white;
    background-color: rgb(45, 45, 45);
    border: 0;
    border-radius: 1em;
    transition: all 0.25s;

    h3 {
        margin: 0;
    }

    img {
        width: 5em;
        transition: all 0.25s;
    }

    .invert {
        transform: rotate(180deg);
    }
}

.selectMenu-enter-active, .selectMenu-leave-active {
    transition: all 0.35s ease-in-out;
}

.selectMenu-enter-from, .selectMenu-leave-to {
    opacity: 0.001;
    transform: translateY(-3em);
}

.select {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2.4em;
}

.boxButton {
    margin-top: 1.6em;
    border-radius: 1.2em;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10%;
    filter: grayscale(0.33);
    background-color: rgb(40, 40, 40);
    color: white;
    border: 0;
    padding: 1.2em;
    padding-left: 6.4em;
    padding-right: 6.4em;
          
    h3 {
        margin: 0;
        text-align: center;
        width: fit-content;
        height: fit-content;
        font-size: var(--h3);
    }
          
    img {
        width: 3.6em;
        height: 3.6em;
        background-color: transparent;
    }
}

@media screen and (max-width: 1200px) {
    .card {
        width: 60em;
        padding: 2em;
    }
}

@media screen and (max-width: 800px) {
    .openSelect {
        width: 90svw;
    }

    .card {
        width: 90svw;
        padding: 1svw;
    }
}

@media (hover: hover) and (pointer: fine) {
    .navButtonHolder button:hover {
        background-color: rgb(55, 55, 55);
    }
    .boxButton:hover {
        background-color: rgb(50, 50, 50);
    }
    .openSelect:hover {
        background-color: rgb(55, 55, 55);
    }
}

</style>