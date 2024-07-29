<template>
    <div class="holder" v-if="shipData">
        
        <Transition name="selectShipTransition">
            <div class="selectShipBackground" v-if="showShipSelection">
                <div class="selectShip">
                    <div class="searchDiv">
                        <input type="text" v-model="search" placeholder="Search">
                        <button @click="showShipSelection = false">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="shipCardHolder">
                        <div v-for="ship in filteredChoices" class="shipCard" @click="selectShip(ship)">
                            <h3>{{ ship.name }} <span>({{ ship.variant }})</span></h3>
                            <h4>{{ ship.variant_name }}</h4>
                            <img :src="ship.img" :alt="'An image of the ship ' + ship.name">
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <div class="shipHolder">
            <div class="compareCard" :class="{ unselected: !ship1 }">
                <button class="add" @click="openShipSelector('ship1')">
                    <svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z" stroke-width="2"></path>
                    </svg>
                </button>
                <h2 style="margin: 0;" v-if="!ship1">Click to add a ship!</h2>
                <h3 style="margin: 0;" v-else>Click to change ship</h3>
                <CompareShip v-if="ship1" :ship1="ship1" :ship2="ship2" />
            </div>
            <div class="compareCard" :class="{ unselected: !ship2 }" v-if="ship1">
                <button class="add" @click="openShipSelector('ship2')">
                    <svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z" stroke-width="2"></path>
                    </svg>
                </button>
                <h2 style="margin: 0;" v-if="!ship2">Now add a ship to compare!</h2>
                <h3 style="margin: 0;" v-else>Click to change ship</h3>
                <CompareShip v-if="ship2" :ship1="ship2" :ship2="ship1" />
            </div>
        </div>

        <div style="margin-bottom: 40em;" v-if="!ship1 && !ship2"></div>
        
    </div>
</template>

<script setup lang="ts">

const shipData = useFetch("/api/ships").data.value ?? shipDataStore().shipData;
const filteredChoices = ref<Ship[]> ([]);

const showShipSelection = ref(false);

const ship1 = ref<Ship> ();
const ship2 = ref<Ship> ();
const search = ref("");
watch(() => search.value, () => autocomplete());

const currentSelection = ref<"ship1" | "ship2"> ("ship1");

onMounted(() => {
    if (shipComparisonStore().ship1) ship1.value = shipComparisonStore().ship1;
    if (shipComparisonStore().ship2) ship2.value = shipComparisonStore().ship2;
    autocomplete();
});

function openShipSelector (ship: "ship1" | "ship2") {
    currentSelection.value = ship;
    search.value = "";
    showShipSelection.value = true;
}

function autocomplete () {
    if (search.value) filteredChoices.value = shipData.filter((ship) => ship.name.toLowerCase().includes(search.value.toLowerCase()));
    else filteredChoices.value = shipData;
}

function selectShip (ship: Ship) {
    if (currentSelection.value == "ship1") {
        ship1.value = ship;
        shipComparisonStore().ship1 = ship;
    } else {
        ship2.value = ship;
        shipComparisonStore().ship2 = ship;
    }
    showShipSelection.value = false;
}

</script>

<style lang="scss" scoped>

.holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.shipHolder {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 2em;
}

.compareCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 45em;
    background-color: rgb(36, 36, 36);
    padding: 2em;
    border-radius: 2em;

    .add {
        border: 0;
        background-color: transparent;
        border-radius: 5em;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        transition: all 0.15s;

        svg {
            width: 5em;
            height: 5em;
            fill: white;
            transition: all 0.15s;
        }
    }
}

.unselected {
    background-color: transparent;
}

.selectShipBackground {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    width: calc(100% - 32em);
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 5;
    overflow: scroll;
}

.selectShip {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100em;
    margin-top: 7.5em;
    height: calc(100vh - 7.5em);

    .searchDiv {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2em;

        button {
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
    }

    input {
        font-size: var(--h3);
        width: 40%;
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

.shipCardHolder {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    margin-top: 4em;
    width: 95%;
    gap: 2%;

    .shipCard {
        width: 30%;
        background-color: rgb(45, 45, 45);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 24em;
        margin-bottom: 2.4em;
        border-radius: 2.4em;
        text-align: center;
        transition: all 0.25s;

        h3 {
            margin: 0;

            span {
                color: var(--gold);
                font-size: 1em;
            }
        }

        h4 {
            color: var(--normalText);
            margin-top: 0;
            margin-bottom: 0.4em;
        }

        img {
            width: 60%;
        }
    }
}

.selectShipTransition-enter-active, .selectShipTransition-leave-active {
    transition: all 0.5s ease-in-out;

    .selectShipBackground {
        transition: all 0.15s ease-in-out;
    }

    .selectShip {
        transition: all 0.25s ease-in-out;
    }
}

.selectShipTransition-enter-from, .selectShipTransition-leave-to {
    opacity: 0.001;

    .selectShipBackground {
        opacity: 0.001;
    }

    .selectShip {
        opacity: 0.001;
        transform: translateY(-30px);
    }
}

@media screen and (max-width: 1400px) {
    .outer {
        input {
            width: 70%;
        }
    }

    .shipCardHolder {
        .shipCard {
            width: 45%;
            height: 18em;
        }
    }
}

@media screen and (max-width: 1000px) {
    .shipCardHolder {
        width: 44em;

        .shipCard {
            width: 48%;
        }
    }
}

@media screen and (max-width: 800px) {
    .shipCardHolder {
        width: 100%;

        .shipCard {
            width: 45%;
            height: 16em;
            border-radius: 2svh;
        }
    }
}

@media screen and (max-width: 550px) {
    .shipCardHolder {
        .shipCard {
            height: 20em;
            width: 100%;
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .compareCard {
        .add:hover {
            background-color: rgba(64, 255, 64, 0.15);

            svg {
                fill: rgb(64, 255, 64);
            }
        }
    }

    .selectShip {
        .searchDiv {
            button:hover {
                background-color: rgba(255, 38, 0, 0.3);
            }
        }
    }

    .shipCardHolder {
        .shipCard:hover {
            background-color: rgb(70, 70, 70);
        }
    }
}

</style>