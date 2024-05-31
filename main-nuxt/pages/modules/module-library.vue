<template>
    <div class="holder">
        <div class="navButtonHolder">
            <button @click="switchToModules" :class="{ active: select == true }">
                <img src="/ui/solarSystem.svg" alt="Click to freely browse through all Research Agreement paths">
                <h3>Ships</h3>
            </button>
            <button @click="select = !select" :class="{ active: select == false, disabled: !modLibraryStore().ship }">
                <img src="/ui/wrench.svg" alt="Click to search for the Research Agreemeent path of a ship">
                <h3>Modules</h3>
            </button>
        </div>

        <div class="card" :class="{ search: !select }">
            <ModBrowse v-if="select" @done="switchToModules" />
            <ModSelect v-else />
        </div>

        <button class="boxButton" @click="copyShareLink" v-if="!select">
            <img src="/ui/alt/whiteShare.svg" alt="Share this tool">
            <h3>Share</h3>
        </button>

        <div class="modStats" v-if="!select">
            <ModStats />
        </div>

        <div class="modCards" v-if="!select && currentMod?.type == 'known'">
            <ModCard v-for="subsystem in currentMod.subsystems" :subsystem="subsystem" />
        </div>
    </div>
</template>

<script setup lang="ts">

const route = useRoute();
const select = ref(modLibraryStore().ship ? false : true);

const foundShip = ref(shipData.filter((ship) => ship.modules).find((ship) => ship.name == modLibraryStore().ship?.name));
const currentMod = ref(foundShip.value?.modules?.find((mod) => mod.system == modLibraryStore().category + String(modLibraryStore().mod)));

watch(() => modLibraryStore().ship, () => {
    foundShip.value = shipData.filter((ship) => ship.modules).find((ship) => ship.name == modLibraryStore().ship?.name);
    currentMod.value = foundShip.value?.modules?.find((mod) => mod.system == modLibraryStore().category + String(modLibraryStore().mod));
    useHead({
        title: `${foundShip.value?.name} - Module Library`,
        meta: [{ name: "description", content: `Browse through all ${foundShip.value?.modules?.length} modules of ${foundShip.value?.name}!` }]
    })
});
watch(() => modLibraryStore().category, () => currentMod.value = foundShip.value?.modules?.find((mod) => mod.system == modLibraryStore().category + String(modLibraryStore().mod)));
watch(() => modLibraryStore().mod, () => currentMod.value = foundShip.value?.modules?.find((mod) => mod.system == modLibraryStore().category + String(modLibraryStore().mod)));

useHead({
    title: "Module Library",
    meta: [{ name: "description", content: "Browse through all modules available on all ships in Infinite Lagrange!" }]
})

onMounted(() => {
    if (modLibraryStore().ship) {
        useHead({
            title: `${modLibraryStore().ship?.name} - Module Library`,
            meta: [{ name: "description", content: `Browse through all ${modLibraryStore().ship?.modules?.length} modules of ${modLibraryStore().ship?.name}!` }]
        })
    }

    const ship = route.query.ship as string;
    const category = route.query.system as string;
    const mod = route.query.module as string;
    
    if (ship) {
        modLibraryStore().ship = shipData.find((ship2) => ship2.name == ship);
        select.value = false;
    };
    if (category) modLibraryStore().category = category;
    if (mod) modLibraryStore().mod = Number(mod);
});

async function switchToModules () {
    if (!modLibraryStore().ship) return;
    select.value = !select.value;

    const fromLocalStorage = localStorage.getItem("first-use-mod-library");
    let counter: number = 0;
    if (fromLocalStorage) counter = JSON.parse(fromLocalStorage);
    if (!fromLocalStorage || counter < 5) {
        await delay(50);
        const scrollTo = document.querySelector(".boxButton");
        if (scrollTo) scrollTo.scrollIntoView({ behavior: "smooth" });
        localStorage.setItem("first-use-mod-library", JSON.stringify(fromLocalStorage ? counter += 1 : 1));
    }
}

async function copyShareLink () {
    let link = "";

    const ship = modLibraryStore().ship;
    if (ship) link += `ship=${ship.name.replaceAll(" ", "%20")}&`;

    link += `system=${modLibraryStore().category}&`;
    link += `module=${modLibraryStore().mod}`;

    await navigator.clipboard.writeText(`https://gravityassist.xyz/modules/module-library?${link}`);
    alert("Link copied!");
}

</script>

<style lang="scss" scoped>

.holder {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.navButtonHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85em;
    gap: 3%;
    margin-top: 1.6em;

    button {
        background-color: transparent;
        border: 0;
        color: white;
        display: flex;
        width: 30%;
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

    .disabled {
        display: none;
        width: 0;
        height: 0;
        font-size: 0;
    }
}

.card {
    background-color: transparent;
    width: 96em;
    padding: 2.4em;
    border-radius: 2.4em;
    margin-top: 3.2em;
}

.search {
    background-color: rgb(36, 36, 36);
    width: 64em;
    padding: 4em;
}

.modStats {
    background-color: rgb(36, 36, 36);
    width: 85em;
    padding: 2.4em;
    border-radius: 3.2em;
    margin-top: 3.2em;
}

.modCards {
    display: flex;
    width: 100em;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    gap: 2%;
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

    .modStats {
        width: 62em;
        padding: 1em;
    }

    .modCards {
        width: 60em;
    }
}

@media screen and (max-width: 800px) {
    .navButtonHolder {
        width: 90svw;

        button {
            width: 45%;
            height: 6em;
            border-radius: 2svh;

            h3 {
                font-size: 0;
                width: 0;
                display: none;
            }
        }
    }
    
    .card {
        width: 90svw;
        padding: 1svw;
        border-radius: 2svh;
    }

    .search {
        padding-top: 1em;
        padding-bottom: 1em;
    }

    .modStats {
        width: 90svw;
        padding: 1svw;
        border-radius: 2svh;
    }

    .modCards {
        width: 90svw;
    }
}

@media (hover: hover) and (pointer: fine) {
    .navButtonHolder button:hover {
        background-color: rgb(55, 55, 55);
    }

    .boxButton:hover {
        background-color: rgb(50, 50, 50);
    }
}

</style>