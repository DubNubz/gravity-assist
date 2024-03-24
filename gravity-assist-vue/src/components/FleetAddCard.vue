<template>
    <Transition name="search">
        <div id="RASearchMenuBackground" v-if="showSelection == true">
            <div id="RASearchMenu">
                <label for="RASearchInput"><h2>Click on a ship to select it</h2></label>
                <div class="RASearchDiv">
                    <input type="text" id="RASearchInput" placeholder="Click to start typing..." @input="autocomplete">
                    <button class="RASearchConfirmButton" @click="showSelection = false">Close</button>
                </div>
                <div id="RASearchMenuResults">
                    <div id="RASearchResults" v-for="option in filteredChoices">
                        <p id="RASearchResultItem" @click="addShip(option.name, option.variant)">{{ option.name }}-{{ option.variant }}</p>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

    <Transition name="search">
        <div id="RASearchMenuBackground" v-if="showReinforcements == true">
            <div id="RASearchMenu">
                <label for="RASearchInput"><h2>Click on a ship to select it</h2></label>
                <div class="RASearchDiv">
                    <input type="text" id="RASearchInput" placeholder="Click to start typing..." @input="autocompleteReinforcement">
                    <button class="RASearchConfirmButton" @click="showReinforcements = false">Close</button>
                </div>
                <div id="RASearchMenuResults">
                    <div id="RASearchResults" v-for="option in filteredReinforcements">
                        <p id="RASearchResultItem" @click="addShipReinforcement(option)">{{ option.name }}-{{ option.variant }}</p>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

    <Transition name="search">
        <div id="RASearchMenuBackground" v-if="showFlagship == true">
            <div id="RASearchMenu">
                <h2>Click on a ship to select it</h2>
                <div class="RASearchDiv">
                    <button class="RASearchConfirmButton" @click="showFlagship = false">Close</button>
                </div>
                <div id="RASearchMenuResults">
                    <div id="RASearchResults" v-for="option in allFlagships">
                        <p id="RASearchResultItem" @click="addShipFlagship(option)">{{ option }}<span style="color: var(--darkGray)" v-if="option != 'Focus Fire'"> ({{ filteredFlagships.find((ship) => ship.flagship.includes(option)).name }}-{{ filteredFlagships.find((ship) => ship.flagship.includes(option)).variant }})</span></p>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

    <Transition name="search">
        <div id="RASearchMenuBackground" v-if="showAircraft == true">
            <div id="RASearchMenu">
                <h2>Click on a ship to select it</h2>
                <div class="RASearchDiv">
                    <button class="RASearchConfirmButton" @click="showAircraft = false">Close</button>
                </div>
                <div id="RASearchMenuResults">
                    <div id="RASearchResults" v-for="option in filteredAircraft">
                        <p id="RASearchResultItem" @click="addShipAircraft(option)">{{ option.name }}-{{ option.variant }}</p>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

    <Transition name="search">
        <div id="RASearchMenuBackground" v-if="showMods == true">
            <div id="RASearchMenu">
                <h2>Click on a module to select it</h2>
                <div class="RASearchDiv">
                    <button class="RASearchConfirmButton" @click="showMods = false">Close</button>
                </div>
                <div id="RASearchMenuResults">
                    <div id="ModResult">
                        <button @click="changeMod(mod)" class="modButton"
                        v-for="mod in data.find((item) => item.name == currentModShip).modules.filter((mod) => mod.name[0] == 'M')"
                        :class="{ active: Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name),
                        grayscaleImg: (mod.hasOwnProperty('aircraft_capacity')) && !Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name) && (!currentModShipObject.reinforcement) && (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].hasOwnProperty('aircraft_capacity')) && (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).hasOwnProperty('childShip')) && (mod.aircraft_capacity < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].aircraft_capacity && mod.aircraft_capacity * globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).inFleetCount < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) ||
                        (mod.hasOwnProperty('aircraft_capacity')) && !Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name) && (currentModShipObject.reinforcement) && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].hasOwnProperty('aircraft_capacity')) && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).hasOwnProperty('childShip')) && (mod.aircraft_capacity < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].aircraft_capacity && mod.aircraft_capacity * globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).inFleetCount < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) }">
                            <img v-if="mod.antiship || mod.antiair || mod.siege"
                            src="/weapons/cannon.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <img v-else-if="mod.aircraft_capacity || mod.aircraft_type"
                            src="/weapons/aircraft.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <img v-else
                            src="/weapons/jamming.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <p>{{ mod.name }}</p>
                        </button>
                    </div>
                    <div id="ModResult">
                        <button @click="changeMod(mod)" class="modButton"
                        v-for="mod in data.find((item) => item.name == currentModShip).modules.filter((mod) => mod.name[0] == 'A')"
                        :class="{ active: Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name),
                        grayscaleImg: (mod.hasOwnProperty('aircraft_capacity')) && !Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name) && (!currentModShipObject.reinforcement) && (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].aModule)[0].hasOwnProperty('aircraft_capacity')) && (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).hasOwnProperty('childShip')) && (mod.aircraft_capacity < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].aircraft_capacity && mod.aircraft_capacity * globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).inFleetCount < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) ||
                        (mod.hasOwnProperty('aircraft_capacity')) && !Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name) && (currentModShipObject.reinforcement) && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].aModule)[0].hasOwnProperty('aircraft_capacity')) && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).hasOwnProperty('childShip')) && (mod.aircraft_capacity < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].aircraft_capacity && mod.aircraft_capacity * globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).inFleetCount < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) }">
                            <img v-if="mod.antiship || mod.antiair || mod.siege"
                            src="/weapons/cannon.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <img v-else-if="mod.aircraft_capacity || mod.aircraft_type"
                            src="/weapons/aircraft.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <img v-else
                            src="/weapons/jamming.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <p>{{ mod.name }}</p>
                        </button>
                    </div>
                    <div id="ModResult">
                        <button @click="changeMod(mod)" class="modButton"
                        v-for="mod in data.find((item) => item.name == currentModShip).modules.filter((mod) => mod.name[0] == 'B')"
                        :class="{ active: Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name),
                        grayscaleImg: (mod.hasOwnProperty('aircraft_capacity')) && !Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name) && (!currentModShipObject.reinforcement) && (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].bModule)[0].hasOwnProperty('aircraft_capacity')) && (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).hasOwnProperty('childShip')) && (mod.aircraft_capacity < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].aircraft_capacity && mod.aircraft_capacity * globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).inFleetCount < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) ||
                        (mod.hasOwnProperty('aircraft_capacity')) && !Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name) && (currentModShipObject.reinforcement) && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].bModule)[0].hasOwnProperty('aircraft_capacity')) && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).hasOwnProperty('childShip')) && (mod.aircraft_capacity < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].aircraft_capacity && mod.aircraft_capacity * globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).inFleetCount < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) }">
                            <img v-if="mod.antiship || mod.antiair || mod.siege"
                            src="/weapons/cannon.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <img v-else-if="mod.aircraft_capacity || mod.aircraft_type"
                            src="/weapons/aircraft.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <img v-else
                            src="/weapons/jamming.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <p>{{ mod.name }}</p>
                        </button>
                    </div>
                    <div id="ModResult">
                        <button @click="changeMod(mod)" class="modButton"
                        v-for="mod in data.find((item) => item.name == currentModShip).modules.filter((mod) => mod.name[0] == 'C')"
                        :class="{ active: Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name),
                        grayscaleImg: (mod.hasOwnProperty('aircraft_capacity')) && !Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name) && (!currentModShipObject.reinforcement) && (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].cModule)[0].hasOwnProperty('aircraft_capacity')) && (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).hasOwnProperty('childShip')) && (mod.aircraft_capacity < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].aircraft_capacity && mod.aircraft_capacity * globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).inFleetCount < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) ||
                        (mod.hasOwnProperty('aircraft_capacity')) && !Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name) && (currentModShipObject.reinforcement) && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].cModule)[0].hasOwnProperty('aircraft_capacity')) && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).hasOwnProperty('childShip')) && (mod.aircraft_capacity < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].aircraft_capacity && mod.aircraft_capacity * globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).inFleetCount < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) }">
                            <img v-if="mod.antiship || mod.antiair || mod.siege"
                            src="/weapons/cannon.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <img v-else-if="mod.aircraft_capacity || mod.aircraft_type"
                            src="/weapons/aircraft.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <img v-else
                            src="/weapons/jamming.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <p>{{ mod.name }}</p>
                        </button>
                    </div>
                    <div id="ModResult">
                        <button @click="changeMod(mod)" class="modButton"
                        v-for="mod in data.find((item) => item.name == currentModShip).modules.filter((mod) => mod.name[0] == 'D')"
                        :class="{ active: Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name),
                        grayscaleImg: (mod.hasOwnProperty('aircraft_capacity')) && !Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name) && (!currentModShipObject.reinforcement) && (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].dModule)[0].hasOwnProperty('aircraft_capacity')) && (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).hasOwnProperty('childShip')) && (mod.aircraft_capacity < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].aircraft_capacity && mod.aircraft_capacity * globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).inFleetCount < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) ||
                        (mod.hasOwnProperty('aircraft_capacity')) && !Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name) && (currentModShipObject.reinforcement) && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].dModule)[0].hasOwnProperty('aircraft_capacity')) && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).hasOwnProperty('childShip')) && (mod.aircraft_capacity < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].aircraft_capacity && mod.aircraft_capacity * globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).inFleetCount < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) }">
                            <img v-if="mod.antiship || mod.antiair || mod.siege"
                            src="/weapons/cannon.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <img v-else-if="mod.aircraft_capacity || mod.aircraft_type"
                            src="/weapons/aircraft.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <img v-else
                            src="/weapons/jamming.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <p>{{ mod.name }}</p>
                        </button>
                    </div>
                    <div id="ModResult">
                        <button @click="changeMod(mod)" class="modButton"
                        v-for="mod in data.find((item) => item.name == currentModShip).modules.filter((mod) => mod.name[0] == 'E')"
                        :class="{ active: Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name),
                        grayscaleImg: (mod.hasOwnProperty('aircraft_capacity')) && !Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name) && (!currentModShipObject.reinforcement) && (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].eModule)[0].hasOwnProperty('aircraft_capacity')) && (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).hasOwnProperty('childShip')) && (mod.aircraft_capacity < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].aircraft_capacity && mod.aircraft_capacity * globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).inFleetCount < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) ||
                        (mod.hasOwnProperty('aircraft_capacity')) && !Object.values(globalVariables.modTracker.value[currentModShip]).includes(mod.name) && (currentModShipObject.reinforcement) && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].eModule)[0].hasOwnProperty('aircraft_capacity')) && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).hasOwnProperty('childShip')) && (mod.aircraft_capacity < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip].mModule)[0].aircraft_capacity && mod.aircraft_capacity * globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).inFleetCount < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) }">
                            <img v-if="mod.antiship || mod.antiair || mod.siege"
                            src="/weapons/cannon.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <img v-else-if="mod.aircraft_capacity || mod.aircraft_type"
                            src="/weapons/aircraft.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <img v-else
                            src="/weapons/jamming.png" style="height: var(--standard2ImgHeight); width: var(--standard2ImgHeight)">
                            <p>{{ mod.name }}</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

    <div class="fleetTotal">
        <div class="commandPoints" style="margin-bottom: 2vh" v-if="flagship">
            <img src="/weapons/flagship.svg" alt="Flagship ability" class="statImg" style="margin-right: 1vw">
            <h3 style="color: var(--gold)" class="flagshipName">{{ flagship }} <span style="color: var(--darkGray)">({{ flagshipShip }})</span></h3>
            <button @click="showFlagship = true" class="changeButton"><img src="/arrow-circle.png" alt="Change flagship" class="commandPointsImg"></button>
        </div>
        <div class="totalStats">
            <div class="totalStat barStat">
                <div class="statStat">
                    <img src="/weapons/antiship.svg" alt="Anti-ship damage" class="statImg">
                    <p>{{ allStats(0).toLocaleString() }}</p>
                </div>
                <div id="antishipBar">
                    <div class="fillerBar" :style="{ width: (Math.min(1, Math.max(0, (allStats(0) / getMax(allStats(0))))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="totalStat barStat">
                <div class="statStat">
                    <img src="/weapons/antiaircraft.svg" alt="Anti-aircraft damage" class="statImg">
                    <p>{{ allStats(1).toLocaleString() }}</p>
                </div>
                <div id="antishipBar">
                    <div class="fillerBar" :style="{ width: (Math.min(1, Math.max(0, (allStats(1) / getMax(allStats(1))))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="totalStat barStat">
                <div class="statStat">
                    <img src="/weapons/siege.svg" alt="Siege damage" class="statImg">
                    <p>{{ allStats(2).toLocaleString() }}</p>
                </div>
                <div id="antishipBar">
                    <div class="fillerBar" :style="{ width: (Math.min(1, Math.max(0, (allStats(2) / getMax(allStats(2))))) * 100) + '%' }"></div>
                </div>
            </div>
            <div class="totalStat">
                <div class="commandPoints">
                    <p>{{ (globalVariables.fleetBuild.value.reduce((totalHP, current) => totalHP + current.hitpoints * current.inFleetCount, 0) + globalVariables.reinforcementCounter.value.reduce((totalHP, current) => totalHP + current.hitpoints * current.inFleetCount, 0)).toLocaleString() }}<span style="color: var(--darkGray)"> HP</span></p>
                    <img src="/health.svg" class="commandPointsImg">
                </div>
            </div>
            <div class="totalStat">
                <div class="commandPoints">
                    <p>{{ (globalVariables.fleetBuild.value.reduce((totalHP, current) => totalHP + current.storage * current.inFleetCount, 0) + globalVariables.reinforcementCounter.value.reduce((totalHP, current) => totalHP + current.storage * current.inFleetCount, 0)).toLocaleString() }}<span style="color: var(--darkGray)"> Storage</span></p>
                    <img src="/storage.svg" class="commandPointsImg">
                </div>
            </div>
            <div class="totalStat" v-if="allStats(3) != 0">
                <div class="commandPoints">
                    <p>{{ allStats(3).toLocaleString() }}<span style="color: var(--darkGray)">/400</span></p>
                    <img src="/command_point.svg" class="commandPointsImg">
                </div>
            </div>
            <div class="totalStat" v-if="allStats(4) != 0 || allStats(5) != 0">
                <div class="commandPoints">
                    <p>{{ allStats(4).toLocaleString() }}<span style="color: var(--darkGray)">/{{ allStats(5).toLocaleString() }}</span></p>
                    <img src="/aircraft.svg" class="commandPointsImg">
                </div>
            </div>
            <div class="totalStat" v-if="allStats(6) != 999999999999">
                <div class="commandPoints">
                    <p>{{ allStats(6).toLocaleString() }}/{{ Math.round(allStats(7)).toLocaleString() }}</p>
                    <img src="/cruise.svg" class=commandPointsImg>
                </div>
            </div>
            <div class="totalStat" v-if="globalVariables.reinforcementCounter.value.length != 0">
                <div class="commandPoints">
                    <p>{{ globalVariables.reinforcementCounter.value.filter((item) => item.type != 'Small Fighter' && item.type != 'Medium Fighter' && item.type != 'Large Fighter' && item.type != 'Corvette').reduce((totalShips, current) => totalShips + current.inFleetCount, 0) }}<span style="color: var(--darkGray)">/9</span></p>
                    <img src="/reinforcement.svg" class=commandPointsImg>
                </div>
            </div>
        </div>
    </div>
    
    <button @click="showSelection = true" class="addShip">
        <img src="/addShipButton.svg" id="addShipPlus"/>
        <p id="addShipText">Add a ship</p>
    </button>

    <div class="allShips">
        <div class="allShipsCard" v-for="ship in globalVariables.fleetBuild.value" :class="{ aircraft: ship.type == 'Small Fighter' || ship.type == 'Medium Fighter' || ship.type == 'Large Fighter' || ship.type == 'Corvette' }">
            <div class="allShipsCardData">
                <div class="allShipsCardText">
                    <p class="RAData"><img :src="ship.img" :alt="'Image of ' + ship.name" class="RADataImg"><span>{{ ship.name }}-{{ ship.variant }}</span></p>
                    <div class="shipPointData">
                        <div class="commandPoints" v-if="ship.type != 'Small Fighter' && ship.type != 'Medium Fighter' && ship.type != 'Large Fighter' && ship.type != 'Corvette'">
                            <h3>{{ getCP(ship, 'number') }}</h3>
                            <img src="/command_point.svg" class="commandPointsImg">
                        </div>
                        <div class="commandPoints" v-if="ship.aircraft_capacity">
                            <h3><span v-if="ship.childShip">{{ ship.childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0) }}/</span><span v-if="!ship.childShip">0/</span>{{ ship.aircraft_capacity * ship.inFleetCount }}</h3>
                            <img src="/aircraft.svg" class="commandPointsImg">
                        </div>
                    </div>
                    <div class="editButtons">
                        <button v-if="ship.aircraft_capacity" @click="editAircraft(ship)" class="editAircraftButton"
                        :class="{ grayscale: (ship.hasOwnProperty('childShip') && ship.childShip.reduce((totalAircraft, aircraft) => totalAircraft + aircraft.aircraft_space * aircraft.inFleetCount, 0) == ship.inFleetCount * ship.aircraft_capacity) }">
                            <img src="/aircraft.svg" class="commandPointsImg">
                            Load Aircraft
                        </button>
                        <button v-if="ship.modules" @click="editMod(ship)" class="editAircraftButton" style="background-color: #ffb963;">
                            <img src="/modules.svg" class="commandPointsImg">
                            Edit Modules
                        </button>
                    </div>
                </div>
                <div class="buttonArray">
                    <div class="incrementButtons">
                        <button @click="decrement(ship)" class="incrementButton" :class="{ grayscale: ship.inFleetCount == 1 ||
                            (ship.hasOwnProperty('childShip') && (ship.inFleetCount - 1) * ship.aircraft_capacity < ship.childShip.reduce((totalAircraft, aircraft) => totalAircraft + (aircraft.aircraft_space * aircraft.inFleetCount), 0)) }"><img src="/minus.svg" class="incrementButtonImg"></button>
                        <h3 class="incrementText">{{ ship.inFleetCount }}<span style="color: var(--darkGray)">/{{ ship.maxCount }}</span></h3>
                        <button @click="increment(ship)" class="incrementButton" :class="{ grayscale: ship.inFleetCount == ship.maxCount || 
                            allStats(3) + ship.command_points > 400 || 
                            (ship.hasOwnProperty('parentShip') && ship.parentShip.aircraft_capacity * ship.parentShip.inFleetCount == ship.inFleetCount ) ||
                            (ship.hasOwnProperty('parentShip') && (ship.parentShip.childShip.reduce((totalAircraft, aircraft) => totalAircraft + (aircraft.aircraft_space * aircraft.inFleetCount), 0) + 1 > ship.parentShip.aircraft_capacity * ship.parentShip.inFleetCount)) ||
                            (ship.hasOwnProperty('parentShip') && (globalVariables.aircraftCounter.value.find((aircraft) => ship.name == aircraft.name && ship.variant == aircraft.variant).inFleetCount + 1 > globalVariables.aircraftCounter.value.find((aircraft) => ship.name == aircraft.name && ship.variant == aircraft.variant).maxCount)) ||
                            (globalVariables.reinforcementCounter.value.find((item) => item.name == ship.name && item.variant == ship.variant) != undefined && ship.inFleetCount + globalVariables.reinforcementCounter.value.find((item) => item.name == ship.name && item.variant == ship.variant).inFleetCount == ship.maxCount) }"><img src="/plus.svg" class="incrementButtonImg"></button>
                    </div>
                    <button @click="remove(ship)" class="cancelButton">
                        <img src="/cancel.svg" id="cancelButtonImg">
                        <p id="cancelButtonText">Remove</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <button @click="showReinforcements = true" class="addShip" style="background-color: var(--deepYellow);">
        <img src="/addShipButton.svg" id="addShipPlus"/>
        <p id="addShipText">Add reinforcements</p>
    </button>

    <div class="allShips">
        <div class="allShipsCard" v-for="ship in globalVariables.reinforcementCounter.value" :class="{ aircraft: ship.type == 'Small Fighter' || ship.type == 'Medium Fighter' || ship.type == 'Large Fighter' || ship.type == 'Corvette' }">
            <div class="allShipsCardData">
                <div class="allShipsCardText">
                    <p class="RAData"><img :src="ship.img" :alt="'Image of ' + ship.name" class="RADataImg"><span>{{ ship.name }}-{{ ship.variant }}</span></p>
                    <div class="shipPointData">
                        <div class="commandPoints" v-if="ship.type != 'Small Fighter' && ship.type != 'Medium Fighter' && ship.type != 'Large Fighter' && ship.type != 'Corvette'">
                            <h3>{{ ship.inFleetCount }}</h3>
                            <img src="/reinforcement.svg" class="commandPointsImg">
                        </div>
                        <div class="commandPoints" v-if="ship.aircraft_capacity">
                            <h3><span v-if="ship.childShip">{{ ship.childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0) }}/</span><span v-if="!ship.childShip">0/</span>{{ ship.aircraft_capacity * ship.inFleetCount }}</h3>
                            <img src="/aircraft.svg" class="commandPointsImg">
                        </div>
                    </div>
                    <button v-if="ship.aircraft_capacity" @click="editAircraft(ship)" class="editAircraftButton"
                    :class="{ grayscale: (ship.hasOwnProperty('childShip') && ship.childShip.reduce((totalAircraft, aircraft) => totalAircraft + aircraft.aircraft_space * aircraft.inFleetCount, 0) == ship.inFleetCount * ship.aircraft_capacity) }">
                        <img src="/aircraft.svg" class="commandPointsImg">
                        Load Aircraft
                    </button>
                    <button v-if="ship.modules" @click="editMod(ship)" class="editAircraftButton" style="background-color: #ffb963;">
                        <img src="/modules.svg" class="commandPointsImg">
                        Edit Modules
                    </button>
                </div>
                <div class="buttonArray">
                    <div class="incrementButtons">
                        <button @click="decrement(ship)" class="incrementButton" :class="{ grayscale: ship.inFleetCount == 1 ||
                            (ship.hasOwnProperty('childShip') && (ship.inFleetCount - 1) * ship.aircraft_capacity < ship.childShip.reduce((totalAircraft, aircraft) => totalAircraft + (aircraft.aircraft_space * aircraft.inFleetCount), 0)) }"><img src="/minus.svg" class="incrementButtonImg"></button>
                        <h3 class="incrementText">{{ ship.inFleetCount }}<span style="color: var(--darkGray)">/{{ ship.maxCount }}</span></h3>
                        <button @click="increment(ship)" class="incrementButton" :class="{ grayscale: ship.inFleetCount == ship.maxCount || 
                            (allStats(3) + ship.command_points > 400 && !ship.reinforcement) || 
                            (ship.hasOwnProperty('parentShip') && ship.parentShip.aircraft_capacity * ship.parentShip.inFleetCount == ship.inFleetCount ) ||
                            (ship.hasOwnProperty('parentShip') && (ship.parentShip.childShip.reduce((totalAircraft, aircraft) => totalAircraft + (aircraft.aircraft_space * aircraft.inFleetCount), 0) + 1 > ship.parentShip.aircraft_capacity * ship.parentShip.inFleetCount)) ||
                            (ship.hasOwnProperty('parentShip') && (globalVariables.aircraftCounter.value.find((aircraft) => ship.name == aircraft.name && ship.variant == aircraft.variant).inFleetCount + 1 > globalVariables.aircraftCounter.value.find((aircraft) => ship.name == aircraft.name && ship.variant == aircraft.variant).maxCount)) ||
                            (globalVariables.reinforcementCounter.value.filter((item) => item.type != 'Small Fighter' && item.type != 'Medium Fighter' && item.type != 'Large Fighter' && item.type != 'Corvette').reduce((totalShips, current) => totalShips + current.inFleetCount, 0) == 9 && ship.type != 'Small Fighter' && ship.type != 'Medium Fighter' && ship.type != 'Large Fighter' && ship.type != 'Corvette') ||
                            (globalVariables.fleetBuild.value.find((item) => item.name == ship.name && item.variant == ship.variant) != undefined && ship.inFleetCount + globalVariables.fleetBuild.value.find((item) => item.name == ship.name && item.variant == ship.variant).inFleetCount == ship.maxCount) }"><img src="/plus.svg" class="incrementButtonImg"></button>
                    </div>
                    <button @click="remove(ship)" class="cancelButton">
                        <img src="/cancel.svg" id="cancelButtonImg">
                        <p id="cancelButtonText">Remove</p>
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

import { ref } from 'vue';
import { data } from '@/stores/fleet';
import { globalVariables } from '@/stores/global';

const showSelection = ref(false);
const showReinforcements = ref(false);
const showFlagship = ref(false);
const showAircraft = ref(false);
const showMods = ref(false);
const currentModShip = ref("CV3000");
const currentModShipObject = ref({});
const filteredChoices = ref([...data].filter((ship) => ship.type != "Small Fighter" && ship.type != "Medium Fighter" && ship.type != "Large Fighter" && ship.type != "Corvette"));
const filteredReinforcements = ref([...data].filter((ship) => ship.type != "Small Fighter" && ship.type != "Medium Fighter" && ship.type != "Large Fighter" && ship.type != "Corvette"));
const filteredFlagships = ref([...data].filter((ship) => ship.flagship != null && globalVariables.fleetBuild.value.includes(ship)));
const filteredAircraft = ref([...data].filter((ship) => ship.type == "Small Fighter" || ship.type == "Medium Fighter" || ship.type == "Large Fighter" || ship.type == "Corvette"));
const allFlagships = ref(["Focus Fire"]);
const flagship = ref();
const flagshipShip = ref();
const activeShip = ref();

function editMod (ship) {
    currentModShip.value = ship.name;
    currentModShipObject.value = ship;

    showMods.value = true;
}

function changeMod (mod) {
    if (!currentModShipObject.value.reinforcement) {
        if (mod.name[0] == "M") {
            if (mod.aircraft_capacity) {
                for (let activeMod of globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip.value].mModule)) {
                    if (activeMod.aircraft_capacity) {
                        if (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).childShip) {
                            if (mod.aircraft_capacity < activeMod.aircraft_capacity && mod.aircraft_capacity * globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).inFleetCount < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) {
                                return;
                            }
                        }
                    }
                }
            }
            globalVariables.modTracker.value[currentModShip.value].mModule = mod.name;
        } else if (mod.name[0] == "A") {
            if (mod.aircraft_capacity) {
                for (let activeMod of globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip.value].aModule)) {
                    if (activeMod.aircraft_capacity) {
                        if (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).childShip) {
                            if (mod.aircraft_capacity < activeMod.aircraft_capacity && mod.aircraft_capacity * globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).inFleetCount < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) {
                                return;
                            }
                        }
                    }
                }
            }
            globalVariables.modTracker.value[currentModShip.value].aModule = mod.name;
        } else if (mod.name[0] == "B") {
            if (mod.aircraft_capacity) {
                for (let activeMod of globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip.value].bModule)) {
                    if (activeMod.aircraft_capacity) {
                        if (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).childShip) {
                            if (mod.aircraft_capacity < activeMod.aircraft_capacity && mod.aircraft_capacity * globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).inFleetCount < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) {
                                return;
                            }
                        }
                    }
                }
            }
            globalVariables.modTracker.value[currentModShip.value].bModule = mod.name;
        } else if (mod.name[0] == "C") {
            if (mod.aircraft_capacity) {
                for (let activeMod of globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip.value].cModule)) {
                    if (activeMod.aircraft_capacity) {
                        if (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).childShip) {
                            if (mod.aircraft_capacity < activeMod.aircraft_capacity && mod.aircraft_capacity * globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).inFleetCount < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) {
                                return;
                            }
                        }
                    }
                }
            }
            globalVariables.modTracker.value[currentModShip.value].cModule = mod.name;
        } else if (mod.name[0] == "D") {
            if (mod.aircraft_capacity) {
                for (let activeMod of globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip.value].dModule)) {
                    if (activeMod.aircraft_capacity) {
                        if (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).childShip) {
                            if (mod.aircraft_capacity < activeMod.aircraft_capacity && mod.aircraft_capacity * globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).inFleetCount < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) {
                                return;
                            }
                        }
                    }
                }
            }
            globalVariables.modTracker.value[currentModShip.value].dModule = mod.name;
        } else if (mod.name[0] == "E") {
            if (mod.aircraft_capacity) {
                for (let activeMod of globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip.value].eModule)) {
                    if (activeMod.aircraft_capacity) {
                        if (globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).childShip) {
                            if (mod.aircraft_capacity < activeMod.aircraft_capacity && mod.aircraft_capacity * globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).inFleetCount < globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) {
                                return;
                            }
                        }
                    }
                }
            }
            globalVariables.modTracker.value[currentModShip.value].eModule = mod.name;
        }
    
        const activeMods = Object.values(globalVariables.modTracker.value[currentModShip.value]);
    
        let antiship = 0;
        let antiair = 0;
        let siege = 0;
        let aircraft_capacity = 0;
        let aircraft_type;
    
        for (let mod of globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).modules) {
            if (Object.values(activeMods).includes(mod.name)) {
                if (mod.antiship) {
                    antiship += mod.antiship;
                }
                if (mod.antiair) {
                    antiair += mod.antiair;
                }
                if (mod.siege) {
                    siege += mod.siege;
                }
                if (mod.aircraft_capacity) {
                    aircraft_capacity += mod.aircraft_capacity;
                }
                if (mod.aircraft_type) {
                    if (aircraft_type) {
                        aircraft_type.push(mod.aircraft_type);
                    } else {
                        aircraft_type = mod.aircraft_type;
                    }
                }
            }
        }
    
        if (antiship == 0) {
            antiship = null;
        }
        if (antiair == 0) {
            antiair = null;
        }
        if (siege == 0) {
            siege = null;
        }
        if (aircraft_capacity == 0) {
            aircraft_capacity = null;
        }
    
        globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).antiship = antiship;
        globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).antiair = antiair;
        globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).siege = siege;
        globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).aircraft_capacity = aircraft_capacity;
        globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).aircraft_space = null;
        if (aircraft_type != undefined) {
            globalVariables.fleetBuild.value.find((ship) => ship.name == currentModShip.value).aircraft_type = aircraft_type;
        }
    } else {
        if (mod.name[0] == "M") {
            if (mod.aircraft_capacity) {
                for (let activeMod of globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip.value].mModule)) {
                    if (activeMod.aircraft_capacity) {
                        if (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).childShip) {
                            if (mod.aircraft_capacity < activeMod.aircraft_capacity && mod.aircraft_capacity * globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).inFleetCount < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) {
                                return;
                            }
                        }
                    }
                }
            }
            globalVariables.modTracker.value[currentModShip.value].mModule = mod.name;
        } else if (mod.name[0] == "A") {
            if (mod.aircraft_capacity) {
                for (let activeMod of globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip.value].aModule)) {
                    if (activeMod.aircraft_capacity) {
                        if (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).childShip) {
                            if (mod.aircraft_capacity < activeMod.aircraft_capacity && mod.aircraft_capacity * globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).inFleetCount < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) {
                                return;
                            }
                        }
                    }
                }
            }
            globalVariables.modTracker.value[currentModShip.value].aModule = mod.name;
        } else if (mod.name[0] == "B") {
            if (mod.aircraft_capacity) {
                for (let activeMod of globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip.value].bModule)) {
                    if (activeMod.aircraft_capacity) {
                        if (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).childShip) {
                            if (mod.aircraft_capacity < activeMod.aircraft_capacity && mod.aircraft_capacity * globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).inFleetCount < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) {
                                return;
                            }
                        }
                    }
                }
            }
            globalVariables.modTracker.value[currentModShip.value].bModule = mod.name;
        } else if (mod.name[0] == "C") {
            if (mod.aircraft_capacity) {
                for (let activeMod of globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip.value].cModule)) {
                    if (activeMod.aircraft_capacity) {
                        if (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).childShip) {
                            if (mod.aircraft_capacity < activeMod.aircraft_capacity && mod.aircraft_capacity * globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).inFleetCount < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) {
                                return;
                            }
                        }
                    }
                }
            }
            globalVariables.modTracker.value[currentModShip.value].cModule = mod.name;
        } else if (mod.name[0] == "D") {
            if (mod.aircraft_capacity) {
                for (let activeMod of globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip.value].dModule)) {
                    if (activeMod.aircraft_capacity) {
                        if (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).childShip) {
                            if (mod.aircraft_capacity < activeMod.aircraft_capacity && mod.aircraft_capacity * globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).inFleetCount < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) {
                                return;
                            }
                        }
                    }
                }
            }
            globalVariables.modTracker.value[currentModShip.value].dModule = mod.name;
        } else if (mod.name[0] == "E") {
            if (mod.aircraft_capacity) {
                for (let activeMod of globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).modules.filter((item) => item.name == globalVariables.modTracker.value[currentModShip.value].eModule)) {
                    if (activeMod.aircraft_capacity) {
                        if (globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).childShip) {
                            if (mod.aircraft_capacity < activeMod.aircraft_capacity && mod.aircraft_capacity * globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).inFleetCount < globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).childShip.reduce((totalAircraft, current) => totalAircraft + current.inFleetCount, 0)) {
                                return;
                            }
                        }
                    }
                }
            }
            globalVariables.modTracker.value[currentModShip.value].eModule = mod.name;
        }
    
        const activeMods = Object.values(globalVariables.modTracker.value[currentModShip.value]);
    
        let antiship = 0;
        let antiair = 0;
        let siege = 0;
        let aircraft_capacity = 0;
        let aircraft_type;
    
        for (let mod of globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).modules) {
            if (Object.values(activeMods).includes(mod.name)) {
                if (mod.antiship) {
                    antiship += mod.antiship;
                }
                if (mod.antiair) {
                    antiair += mod.antiair;
                }
                if (mod.siege) {
                    siege += mod.siege;
                }
                if (mod.aircraft_capacity) {
                    aircraft_capacity += mod.aircraft_capacity;
                }
                if (mod.aircraft_type) {
                    if (aircraft_type) {
                        aircraft_type.push(mod.aircraft_type);
                    } else {
                        aircraft_type = mod.aircraft_type;
                    }
                }
            }
        }
    
        if (antiship == 0) {
            antiship = null;
        }
        if (antiair == 0) {
            antiair = null;
        }
        if (siege == 0) {
            siege = null;
        }
        if (aircraft_capacity == 0) {
            aircraft_capacity = null;
        }
    
        globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).antiship = antiship;
        globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).antiair = antiair;
        globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).siege = siege;
        globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).aircraft_capacity = aircraft_capacity;
        globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).aircraft_space = null;
        if (aircraft_type != undefined) {
            globalVariables.reinforcementCounter.value.find((ship) => ship.name == currentModShip.value).aircraft_type = aircraft_type;
        }
    }
}

function getMax (value) {
    if (value <= 5000) {
        return 5000;
    } else if (value <= 10000) {
        return 10000;
    } else if (value <= 25000) {
        return 25000;
    } else if (value <= 50000) {
        return 50000;
    } else if (value <= 50000) {
        return 50000;
    } else if (value <= 100000) {
        return 100000;
    } else if (value <= 200000) {
        return 200000;
    } else if (value <= 350000) {
        return 350000;
    } else if (value <= 750000) {
        return 750000;
    } else if (value <= 1000000) {
        return 1000000;
    }
}

function getCP (ship, type) {
    if (ship.type == "Small Fighter" || ship.type == "Medium Fighter" || ship.type == "Large Fighter" || ship.type == "Corvette") {
        if (type == "number") {
            return ship.inFleetCount * ship.aircraft_space;
        } else {
            return "/aircraft.svg";
        }
    } else {
        if (type == "number") {
            return ship.inFleetCount * ship.command_points;
        } else if (type == "reinforcement") {
            return "/reinforcement.svg";
        } else {
            return "/command_point.svg";
        }
    }
}

function remove (ship) {
    if (ship.parentShip) {
        if (!globalVariables.reinforcementCounter.value.includes(ship)) {
            globalVariables.aircraftCounter.value.find((item) => item.name == ship.name && item.variant == ship.variant).inFleetCount += -(ship.inFleetCount);
            if (globalVariables.aircraftCounter.value.find((item) => item.name == ship.name && item.variant == ship.variant).inFleetCount == 0) {
                const index = globalVariables.aircraftCounter.value.findIndex((item) => item.name == ship.name && item.variant == ship.variant);
                globalVariables.aircraftCounter.value.splice(index, 1);
            }
            const index = globalVariables.fleetBuild.value.findIndex((item) => item.name == ship.name && item.variant == ship.variant && item.parentShip == ship.parentShip);
            globalVariables.fleetBuild.value.splice(index, 1);
            const index2 = globalVariables.fleetBuild.value.find((item) => item.name == ship.parentShip.name && item.variant == ship.parentShip.variant).childShip.findIndex((item) => item.name == ship.name && item.variant == ship.variant);
            globalVariables.fleetBuild.value.find((item) => item.name == ship.parentShip.name && item.variant == ship.parentShip.variant).childShip.splice(index2, 1);
            return;
        } else {
            globalVariables.aircraftCounter.value.find((item) => item.name == ship.name && item.variant == ship.variant).inFleetCount += -(ship.inFleetCount);
            if (globalVariables.aircraftCounter.value.find((item) => item.name == ship.name && item.variant == ship.variant).inFleetCount == 0) {
                const index = globalVariables.aircraftCounter.value.findIndex((item) => item.name == ship.name && item.variant == ship.variant);
                globalVariables.aircraftCounter.value.splice(index, 1);
            }
            const index = globalVariables.reinforcementCounter.value.findIndex((item) => item.name == ship.name && item.variant == ship.variant && item.parentShip == ship.parentShip);
            globalVariables.reinforcementCounter.value.splice(index, 1);
            const index2 = globalVariables.reinforcementCounter.value.find((item) => item.name == ship.parentShip.name && item.variant == ship.parentShip.variant).childShip.findIndex((item) => item.name == ship.name && item.variant == ship.variant);
            globalVariables.reinforcementCounter.value.find((item) => item.name == ship.parentShip.name && item.variant == ship.parentShip.variant).childShip.splice(index2, 1);
            return;
        }
    }

    if (ship.childShip) {
        while (ship.childShip.length != 0) {
            for (let aircraft of ship.childShip) {
                if (!globalVariables.reinforcementCounter.value.includes(ship)) {
                    globalVariables.aircraftCounter.value.find((item) => item.name == aircraft.name && item.variant == aircraft.variant).inFleetCount += -(aircraft.inFleetCount);
                    if (globalVariables.aircraftCounter.value.find((item) => item.name == aircraft.name && item.variant == aircraft.variant).inFleetCount == 0) {
                        const index = globalVariables.aircraftCounter.value.findIndex((item) => item.name == aircraft.name && item.variant == aircraft.variant);
                        globalVariables.aircraftCounter.value.splice(index, 1);
                    }
                    const index = globalVariables.fleetBuild.value.findIndex((item) => item.name == aircraft.name && item.variant == aircraft.variant && item.parentShip == aircraft.parentShip);
                    globalVariables.fleetBuild.value.splice(index, 1);
                    const index2 = ship.childShip.findIndex((item) => item.name == aircraft.name && item.variant == aircraft.variant);
                    ship.childShip.splice(index2, 1);
                } else {
                    globalVariables.aircraftCounter.value.find((item) => item.name == aircraft.name && item.variant == aircraft.variant).inFleetCount += -(aircraft.inFleetCount);
                    if (globalVariables.aircraftCounter.value.find((item) => item.name == aircraft.name && item.variant == aircraft.variant).inFleetCount == 0) {
                        const index = globalVariables.aircraftCounter.value.findIndex((item) => item.name == aircraft.name && item.variant == aircraft.variant);
                        globalVariables.aircraftCounter.value.splice(index, 1);
                    }
                    const index = globalVariables.reinforcementCounter.value.findIndex((item) => item.name == aircraft.name && item.variant == aircraft.variant && item.parentShip == aircraft.parentShip);
                    globalVariables.reinforcementCounter.value.splice(index, 1);
                    const index2 = ship.childShip.findIndex((item) => item.name == aircraft.name && item.variant == aircraft.variant);
                    ship.childShip.splice(index2, 1);
                }
            }
        }
    }

    if (globalVariables.reinforcementCounter.value.includes(ship)) {
        const index = globalVariables.reinforcementCounter.value.findIndex((item) => item.name == ship.name && item.variant == ship.variant);
        globalVariables.reinforcementCounter.value.splice(index, 1);
        return;
    }

    if (globalVariables.fleetBuild.value.includes((ship))) {
        if (flagshipShip.value == `${ship.name}-${ship.variant}`) {
            if (globalVariables.fleetBuild.value.includes(globalVariables.fleetBuild.value.find((item) => item.flagship.includes(flagship.value) && item != ship))) {
                flagshipShip.value = `${globalVariables.fleetBuild.value.find((item) => item.flagship.includes(flagship.value) && item != ship).name}-${globalVariables.fleetBuild.value.find((item) => item.flagship.includes(flagship.value) && item != ship).variant}`;
            } else {
                flagshipShip.value = null;
                flagship.value = null;
                for (let flagship of ship.flagship.filter((name) => name != "Focus Fire")) {
                    allFlagships.value.splice(allFlagships.value.findIndex((name) => name == flagship), 1);
                }
            }
        }
    }

    console.log(allFlagships.value, flagship.value, flagshipShip.value)

    const index = globalVariables.fleetBuild.value.findIndex((item) => item.name == ship.name && item.variant == ship.variant);
    globalVariables.fleetBuild.value.splice(index, 1);
}

function allStats (type) {
    if (type == 0) {
        // antiship
        let total = 0;
        for (let ship of globalVariables.fleetBuild.value) {
            total += ship.inFleetCount * ship.antiship;
        }
        for (let ship of globalVariables.reinforcementCounter.value) {
            total += ship.inFleetCount * ship.antiship;
        }
        return total;

    } else if (type == 1) {
        // antiair
        let total = 0;
        for (let ship of globalVariables.fleetBuild.value) {
            total += ship.inFleetCount * ship.antiair;
        }
        for (let ship of globalVariables.reinforcementCounter.value) {
            total += ship.inFleetCount * ship.antiair;
        }
        return total;

    } else if (type == 2) {
        // siege
        let total = 0;
        for (let ship of globalVariables.fleetBuild.value) {
            total += ship.inFleetCount * ship.siege;
        }
        for (let ship of globalVariables.reinforcementCounter.value) {
            total += ship.inFleetCount * ship.siege;
        }
        return total;

    } else if (type == 3) {
        // command points
        let total = 0;
        for (let ship of globalVariables.fleetBuild.value) {
            total += ship.inFleetCount * ship.command_points;
        }
        return total;

    } else if (type == 4) {
        // aircraft space taken up
        let total = 0;
        for (let ship of globalVariables.fleetBuild.value) {
            total += ship.inFleetCount * ship.aircraft_space;
        }
        for (let ship of globalVariables.reinforcementCounter.value) {
            total += ship.inFleetCount * ship.aircraft_space;
        }
        return total;

    } else if (type == 5) {
        // aircraft space capacity
        let total = 0;
        for (let ship of globalVariables.fleetBuild.value) {
            total += ship.inFleetCount * ship.aircraft_capacity;
        }
        for (let ship of globalVariables.reinforcementCounter.value) {
            total += ship.inFleetCount * ship.aircraft_capacity;
        }
        return total;

    } else if (type == 6) {
        // cruise speed
        
        let total = [999999999999];
        for (let ship of globalVariables.fleetBuild.value) {
            if (ship.cruise_speed != null) {
                total.push(ship.cruise_speed);
            }
        }
        total.sort((a, b) => a - b);
        return total[0];

    } else if (type == 7) {
        // warp speed
        let total = 0;
        let total2 = 0;
        for (let ship of globalVariables.fleetBuild.value) {
            if (ship.type != "Small Fighter" && ship.type != "Medium Fighter" && ship.type != "Large Fighter" && ship.type != "Corvette") {
                total += ship.inFleetCount * ship.warp_speed;
                total2 += ship.inFleetCount;
            }
        }
        const cruise = total / total2;
        return cruise;
    }
}

function addShip (name, variant) {
    globalVariables.fleetBuild.value.push({...data.find((ship) => ship.name == name && ship.variant == variant)});
    globalVariables.fleetBuild.value.find((ship) => ship.name == name && ship.variant == variant).inFleetCount = 1;

    if (globalVariables.fleetBuild.value.find((ship) => ship.name == name && ship.variant == variant).modules) {
        const activeMods = Object.values(globalVariables.modTracker.value[name]);

        let antiship = 0;
        let antiair = 0;
        let siege = 0;
        let aircraft_capacity = 0;
        let aircraft_type;

        for (let mod of globalVariables.fleetBuild.value.find((ship) => ship.name == name && ship.variant == variant).modules) {
            if (Object.values(activeMods).includes(mod.name)) {
                if (mod.antiship) {
                    antiship += mod.antiship;
                }
                if (mod.antiair) {
                    antiair += mod.antiair;
                }
                if (mod.siege) {
                    siege += mod.siege;
                }
                if (mod.aircraft_capacity) {
                    aircraft_capacity += mod.aircraft_capacity;
                }
                if (mod.aircraft_type) {
                    if (aircraft_type) {
                        aircraft_type.push(mod.aircraft_type);
                    } else {
                        aircraft_type = mod.aircraft_type;
                    }
                }
            }
        }

        if (antiship == 0) {
            antiship = null;
        }
        if (antiair == 0) {
            antiair = null;
        }
        if (siege == 0) {
            siege = null;
        }
        if (aircraft_capacity == 0) {
            aircraft_capacity = null;
        }

        globalVariables.fleetBuild.value.find((ship) => ship.name == name && ship.variant == variant).antiship = antiship;
        globalVariables.fleetBuild.value.find((ship) => ship.name == name && ship.variant == variant).antiair = antiair;
        globalVariables.fleetBuild.value.find((ship) => ship.name == name && ship.variant == variant).siege = siege;
        globalVariables.fleetBuild.value.find((ship) => ship.name == name && ship.variant == variant).aircraft_capacity = aircraft_capacity;
        globalVariables.fleetBuild.value.find((ship) => ship.name == name && ship.variant == variant).aircraft_space = null;
        if (aircraft_type != undefined) {
            globalVariables.fleetBuild.value.find((ship) => ship.name == name && ship.variant == variant).aircraft_type = aircraft_type;
        }
    }

    filteredChoices.value = [...data].filter((item) => (globalVariables.fleetBuild.value.find((ship) => ship.name == item.name && ship.variant == item.variant) == undefined) && item.type != "Small Fighter" && item.type != "Medium Fighter" && item.type != "Large Fighter" && item.type != "Corvette");
    filteredFlagships.value = [...data].filter((ship) => ship.flagship != null && globalVariables.fleetBuild.value.find((item) => item.name == ship.name && item.variant == ship.variant) != undefined);

    showSelection.value = false;

    let currentShip;
    currentShip = data.find((ship) => ship.name == name && ship.variant == variant);
    if (currentShip.flagship) {
        if (!flagship.value || flagship.value == "Focus Fire") {
            flagship.value = currentShip.flagship[currentShip.flagship.length - 1];
            flagshipShip.value = `${name}-${variant}`;
        }

        for (let ability of currentShip.flagship) {
            if (!allFlagships.value.includes(ability)) {
                allFlagships.value.push(ability);
            }
        }
    }
}

function addShipReinforcement (ship) {
    const newReinforcement = {...data.find((item) => item.name == ship.name && item.variant == ship.variant)};

    if (!globalVariables.reinforcementCounter.value.includes(newReinforcement)) {
        globalVariables.reinforcementCounter.value.push(newReinforcement);
        globalVariables.reinforcementCounter.value.find((item) => item.name == newReinforcement.name && item.variant == newReinforcement.variant).inFleetCount = 1;
        globalVariables.reinforcementCounter.value.find((item) => item.name == newReinforcement.name && item.variant == newReinforcement.variant).reinforcement = true;
    } else {
        globalVariables.reinforcementCounter.value.find((item) => item.name == newReinforcement.name && item.variant == newReinforcement.variant).inFleetCount++;
        globalVariables.reinforcementCounter.value.find((item) => item.name == newReinforcement.name && item.variant == newReinforcement.variant).reinforcement = true;
    }

    if (globalVariables.reinforcementCounter.value.find((item) => ship.name == item.name && ship.variant == item.variant).modules) {
        const activeMods = Object.values(globalVariables.modTracker.value[ship.name]);

        let antiship = 0;
        let antiair = 0;
        let siege = 0;
        let aircraft_capacity = 0;
        let aircraft_type;

        for (let mod of globalVariables.reinforcementCounter.value.find((item) => ship.name == item.name && ship.variant == item.variant).modules) {
            if (Object.values(activeMods).includes(mod.name)) {
                if (mod.antiship) {
                    antiship += mod.antiship;
                }
                if (mod.antiair) {
                    antiair += mod.antiair;
                }
                if (mod.siege) {
                    siege += mod.siege;
                }
                if (mod.aircraft_capacity) {
                    aircraft_capacity += mod.aircraft_capacity;
                }
                if (mod.aircraft_type) {
                    if (aircraft_type) {
                        aircraft_type.push(mod.aircraft_type);
                    } else {
                        aircraft_type = mod.aircraft_type;
                    }
                }
            }
        }

        if (antiship == 0) {
            antiship = null;
        }
        if (antiair == 0) {
            antiair = null;
        }
        if (siege == 0) {
            siege = null;
        }
        if (aircraft_capacity == 0) {
            aircraft_capacity = null;
        }

        globalVariables.reinforcementCounter.value.find((item) => ship.name == item.name && ship.variant == item.variant).antiship = antiship;
        globalVariables.reinforcementCounter.value.find((item) => ship.name == item.name && ship.variant == item.variant).antiair = antiair;
        globalVariables.reinforcementCounter.value.find((item) => ship.name == item.name && ship.variant == item.variant).siege = siege;
        globalVariables.reinforcementCounter.value.find((item) => ship.name == item.name && ship.variant == item.variant).aircraft_capacity = aircraft_capacity;
        globalVariables.reinforcementCounter.value.find((item) => ship.name == item.name && ship.variant == item.variant).aircraft_space = null;
        if (aircraft_type != undefined) {
            globalVariables.reinforcementCounter.value.find((item) => ship.name == item.name && ship.variant == item.variant).aircraft_type = aircraft_type;
        }
    }

    filteredReinforcements.value = [...data].filter((item) => (item.type != "Small Fighter" && item.type != "Medium Fighter" && item.type != "Large Fighter" && item.type != "Corvette") && (!item.inFleetCount || (item.inFleetCount && (item.inFleetCount < item.maxCount))) && !item.reinforcement);

    showReinforcements.value = false;
}

function addShipFlagship (ability) {
    showFlagship.value = false;
    flagship.value = `${ability}`;
    flagshipShip.value = `${filteredFlagships.value.find((ship) => ship.flagship.includes(ability)).name}-${filteredFlagships.value.find((ship) => ship.flagship.includes(ability)).variant}`;
}

function editAircraft (ship) {
    if (ship.childShip) {
        if (ship.childShip.reduce((totalAircraft, aircraft) => totalAircraft + aircraft.aircraft_space * aircraft.inFleetCount, 0) == ship.inFleetCount * ship.aircraft_capacity) {
            return;
        }
    }

    activeShip.value = ship;

    if (ship.childShip) {
        filteredAircraft.value = [...data].filter((item) => (item.type == "Small Fighter" || item.type == "Medium Fighter" || item.type == "Large Fighter" || item.type == "Corvette") && (ship.childShip.find((ship) => ship.name == item.name && ship.variant == item.variant) == undefined) && (ship.aircraft_type.includes(item.type)));
    } else {
        filteredAircraft.value = [...data].filter((item) => (item.type == "Small Fighter" || item.type == "Medium Fighter" || item.type == "Large Fighter" || item.type == "Corvette") && (ship.aircraft_type.includes(item.type)));
    }

    showAircraft.value = true;
}

function addShipAircraft (aircraft) {
    showAircraft.value = false;
    const newAircraft = {...aircraft};

    if (!globalVariables.aircraftCounter.value.includes(aircraft)) {
        globalVariables.aircraftCounter.value.push(aircraft);
        globalVariables.aircraftCounter.value.find((ship) => ship.name == aircraft.name && ship.variant == aircraft.variant).inFleetCount = 1;
    } else {
        globalVariables.aircraftCounter.value.find((ship) => ship.name == aircraft.name && ship.variant == aircraft.variant).inFleetCount++;
    }

    if (!activeShip.value.reinforcement) {
        const index = globalVariables.fleetBuild.value.findIndex((ship) => ship.name == activeShip.value.name && ship.variant == activeShip.value.variant);
        globalVariables.fleetBuild.value.splice(index + 1, 0, newAircraft);
        newAircraft.inFleetCount = 1;
        newAircraft.parentShip = activeShip.value;
        if (!globalVariables.fleetBuild.value.find((ship) => ship.name == activeShip.value.name && ship.variant == activeShip.value.variant).childShip) {
            globalVariables.fleetBuild.value.find((ship) => ship.name == activeShip.value.name && ship.variant == activeShip.value.variant).childShip = [];
        }
        globalVariables.fleetBuild.value.find((ship) => ship.name == activeShip.value.name && ship.variant == activeShip.value.variant).childShip.push(newAircraft);
        filteredAircraft.value = [...data].filter((item) => (item.type == "Small Fighter" || item.type == "Medium Fighter" || item.type == "Large Fighter" || item.type == "Corvette") && (globalVariables.fleetBuild.value.find((ship) => ship.name == activeShip.value.name && ship.variant == activeShip.value.variant).childShip.find((ship) => ship.name == item.name && ship.variant == item.variant) == undefined));
    } else {
        const index = globalVariables.reinforcementCounter.value.findIndex((ship) => ship.name == activeShip.value.name && ship.variant == activeShip.value.variant);
        globalVariables.reinforcementCounter.value.splice(index + 1, 0, newAircraft);
        newAircraft.inFleetCount = 1;
        newAircraft.parentShip = activeShip.value;
        if (!globalVariables.reinforcementCounter.value.find((ship) => ship.name == activeShip.value.name && ship.variant == activeShip.value.variant).childShip) {
            globalVariables.reinforcementCounter.value.find((ship) => ship.name == activeShip.value.name && ship.variant == activeShip.value.variant).childShip = [];
        }
        globalVariables.reinforcementCounter.value.find((ship) => ship.name == activeShip.value.name && ship.variant == activeShip.value.variant).childShip.push(newAircraft);
        filteredAircraft.value = [...data].filter((item) => (item.type == "Small Fighter" || item.type == "Medium Fighter" || item.type == "Large Fighter" || item.type == "Corvette") && (globalVariables.reinforcementCounter.value.find((ship) => ship.name == activeShip.value.name && ship.variant == activeShip.value.variant).childShip.find((ship) => ship.name == item.name && ship.variant == item.variant) == undefined));
    }

    
}

function autocomplete (event) {
    const inputValue = event.target.value;
    let filter1 = data.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));
    let filter2 = filter1.filter((item) => item.type != "Small Fighter" && item.type != "Medium Fighter" && item.type != "Large Fighter" && item.type != "Corvette")
    filteredChoices.value = filter2.filter((item) => globalVariables.fleetBuild.value.find((ship) => ship.name == item.name && ship.variant == item.variant) == undefined);
}

function autocompleteReinforcement (event) {
    const inputValue = event.target.value;
    let filter1 = data.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));
    let filter2 = filter1.filter((item) => item.type != "Small Fighter" && item.type != "Medium Fighter" && item.type != "Large Fighter" && item.type != "Corvette")
    filteredReinforcements.value = filter2.filter((item) => (!item.inFleetCount) || (item.inFleetCount && item.inFleetCount < item.maxCount));
}

function increment (ship) {
    if (ship.inFleetCount + 1 > ship.maxCount) {
        return;
    }

    if (allStats(3) + ship.command_points > 400 && !ship.reinforcement) {
        return;
    }
    
    if (globalVariables.fleetBuild.value.find((item) => item.name == ship.name && item.variant == ship.variant) != undefined && globalVariables.reinforcementCounter.value.find((item) => item.name == ship.name && item.variant == ship.variant) != undefined) {
        const inFleet = globalVariables.fleetBuild.value.find((item) => item.name == ship.name && item.variant == ship.variant);
        const reinforceFleet = globalVariables.reinforcementCounter.value.find((item) => item.name == ship.name && item.variant == ship.variant);
        if (inFleet.inFleetCount + reinforceFleet.inFleetCount + 1 > inFleet.maxCount && (ship.type != "Small Fighter" && ship.type != "Medium Fighter" && ship.type != "Large Fighter" && ship.type != "Corvette")) {
            return;
        }
    }
    
    if (ship.type == "Small Fighter" || ship.type == "Medium Fighter" || ship.type == "Large Fighter" || ship.type == "Corvette") {
        if ((ship.parentShip.childShip.reduce((totalAircraft, aircraft) => totalAircraft + (aircraft.aircraft_space * aircraft.inFleetCount), 0) + 1 > ship.parentShip.aircraft_capacity * ship.parentShip.inFleetCount) ||
        (globalVariables.aircraftCounter.value.find((aircraft) => ship.name == aircraft.name && ship.variant == aircraft.variant).inFleetCount + 1 > globalVariables.aircraftCounter.value.find((aircraft) => ship.name == aircraft.name && ship.variant == aircraft.variant).maxCount)) {
            return;
        }
        globalVariables.aircraftCounter.value.find((aircraft) => ship.name == aircraft.name && ship.variant == aircraft.variant).inFleetCount++;
    }
    
    if (globalVariables.reinforcementCounter.value.includes(ship)) {
        if (globalVariables.reinforcementCounter.value.filter((item) => item.type != "Small Fighter" && item.type != "Medium Fighter" && item.type != "Large Fighter" && item.type != "Corvette").reduce((totalShips, current) => totalShips + current.inFleetCount, 0) + 1 > 9 && ship.type != "Small Fighter" && ship.type != "Medium Fighter" && ship.type != "Large Fighter" && ship.type != "Corvette") {
            return;
        }
    }
    
    ship.inFleetCount++;
}

function decrement (ship) {
    if (ship.inFleetCount - 1 < 1) {
        return;
    }

    if (ship.childShip) {
        if ((ship.inFleetCount - 1) * ship.aircraft_capacity < ship.childShip.reduce((totalAircraft, aircraft) => totalAircraft + (aircraft.aircraft_space * aircraft.inFleetCount), 0)) {
            return;
        }
    }

    if (ship.type == "Small Fighter" || ship.type == "Medium Fighter" || ship.type == "Large Fighter" || ship.type == "Corvette") {
        globalVariables.aircraftCounter.value.find((aircraft) => ship.name == aircraft.name && ship.variant == aircraft.variant).inFleetCount--;
    }

    ship.inFleetCount--;
}

</script>

<style scoped>

#ModResult {
    display: flex;
    justify-content: center;
    gap: 1.5vw;
    margin-top: 2vh;
}

.modButton {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7.5vh;
  transition: all 0.5s;
  width: fit-content;
  gap: 1vw;
  padding-left: 1vw;
  padding-right: 1vw;
  border-width: 0.1vh;
  font-size: var(--p);
  background-color: var(--normalText);
}

.modButton p {
    font-size: var(--h3);
}

.modButton:hover {
  background-color: var(--deepGreen);
  border-color: var(--deepGreen);
  transform: scale(1.1);
}

.active {
  background-color: var(--deepGreen);
  border-color: var(--deepGreen);
  transform: scale(1.1);
}

.grayscaleImg {
    filter: grayscale(1) brightness(0.5);
}

#antishipBar,
#antiairBar,
#siegeBar,
#hpBar,
#armorBar,
#shieldBar {
  width: 100%;
  height: 3vh;
  background-color: var(--footer);
  border-radius: 3vh;
}

.fillerBar {
  height: 100%;
  background-color: var(--pastelOrange);
  border-radius: 3vh;
  transition: all 0.4s ease-in-out;
}

.grayscale {
    filter: grayscale(1) brightness(0.75);
}

.statStat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.statImg {
    width: var(--standard2ImgHeight);
    height: var(--standard2ImgHeight);
}

.commandPoints {
    display: flex;
    justify-content: center;
    align-items: center;
    text-wrap: nowrap;
    width: fit-content;
}

.commandPointsImg {
    width: var(--standard2ImgHeight);
    height: var(--standard2ImgHeight);
    margin-left: 0.5vw;
}

.addShip {
    background-color: var(--deepGreen);
    width: fit-content;
    padding-left: 2vw;
    padding-right: 4vw;
    margin-top: 3vh;
    height: 10vh;
    border-radius: 5vh;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: all 0.5s;
}
.addShip:hover {
    transform: scale(1.1);
}

#addShipPlus {
    width: var(--standard2ImgWidth);
    height: var(--standard2ImgHeight);
}

#addShipText {
    font-size: var(--h3);
    margin: 0;
}

.cancelButton {
    background-color: #ff5050;
    width: fit-content;
    padding-left: 1vw;
    padding-right: 2vw;
    padding-top: 1vh;
    padding-bottom: 1vh;
    height: fit-content;
    border-radius: 5vh;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: all 0.5s;
}
.cancelButton:hover {
    transform: scale(1.1);
}

#cancelButtonImg {
    width: var(--standard2ImgWidth);
    height: var(--standard2ImgHeight);
}

#cancelButtonText {
    font-size: var(--h3);
    margin: 0;
}

.fleetTotal {
    background-color: var(--content);
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5vh;
    padding: 2vh;
    margin-bottom: 3vh;
}

.totalStats {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 50vw;
}

.totalStat {
    width: 28%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.allShipsCard {
    background-color: var(--content);
    width: 75vw;
    border-radius: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2vh;
}

.allShipsCardData {
    width: 70vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.allShipsCardText {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.buttonArray {
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: center;
}

.shipPointData {
    display: flex;
    gap: 3vw;
    margin-top: 0;
}

.changeButton {
    border: 0;
    width: calc(var(--standard2ImgHeight) + 1vh);
    height: calc(var(--standard2ImgHeight) + 1vh);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: calc((var(--standard2ImgHeight) + 1vh)/2);
    margin-left: 1vw;
    transition: all 0.5s;
    background-color: var(--darkGray);
}
.changeButton img {
    margin-left: 0;
}

.changeButton:hover {
    background-color: var(--gold);
    transform: rotate(540deg);
}

.aircraft {
    margin-top: 0;
    background-color: rgba(0, 0, 0, 0.25);
}

.editAircraftButton {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2vw;
    padding-left: 1vw;
    padding-right: 2vw;
    border-radius: 3vh;
    background-color: var(--pastelBlue);
    border: 0;
    font-size: var(--p);
    margin-bottom: 1vh;
    transition: all 0.5s;
}

.editAircraftButton:hover {
    transform: scale(1.05);
}

.incrementButtons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: fit-content;
}

.incrementButton {
    width: 8vh;
    height: 8vh;
    background-color: transparent;
    border: 0;
    border-radius: 2.5vh;
    transition: all 0.5s;
}
.incrementButton:hover {
    transform: scale(1.1);
}

.incrementButtonImg {
    width: 100%;
    height: 100%;
}

.incrementText {
    width: fit-content;
    text-wrap: nowrap;
}

.RAData {
  display: flex;
  align-items: center;
  font-size: var(--h3);
}

#RASearchMenuBackground {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 99999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#RASearchMenu {
  width: 70vw;
  background-color: rgb(0, 0, 0);
  padding: 20px;
  border-radius: 3vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-height: 80%;
  min-height: 80%;
  overflow: auto;
}

#RASearchMenuResults {
  max-height: 100%;
  overflow-y: auto;
}

#RASearchInput {
  width: 60%;
  border-radius: 1vh;
  border-width: 0.1vh;
  padding: 0.5vh;
  height: 3vh;
  color: black;
  font-size: var(--p);
  font-family: 'Kanit', sans-serif;
  outline-color: var(--pastelGreen);
  background-color: var(--deepGreen);
  margin-bottom: 1vh;
}

#RASearchResultItem {
  transition: all 0.5s;
  font-size: var(--h3);
  margin-top: 1vh;
  margin-bottom: 1vh;
}

#RASearchResultItem:hover {
  transform: scale(1.3);
  color: var(--gold);
  background-color: var(--lightContent);
}

.RASearchDiv {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.RASearchConfirmButton {
  background-color: #ff5050;
  border-radius: 1vh;
  padding: 1vh;
  height: 6vh;
  width: 10vw;
  font-size: var(--h3);
  padding-left: 4vh;
  padding-right: 4vh;
  transition: all 0.5s;
  margin-bottom: 1vh;
  overflow: hidden;
  text-align: center;
}
.RASearchConfirmButton:hover {
  transform: scale(1.1);
}
.RASearchConfirmButton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, #ff8a8a, transparent);
  transition: left 0.5s ease;
}
.RASearchConfirmButton:hover::after {
  left: 100%;
}

.RADataImg {
  display: flex;
  width: var(--pImgWidth);
  height: var(--pImgHeight);
  background-color: rgba(0, 0, 0, 0);
  margin-right: 2vw;
}

.search-enter-active, .search-leave-active {
  transition: all 0.5s ease-in-out;
}

.search-leave-active {
  transition-delay: 0.15s;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
}

.search-enter-active #RASearchMenu,
.search-leave-active #RASearchMenu { 
  transition: all 0.25s ease-in-out;
}

.search-enter-active #RASearchMenu {
  transition-delay: 0.15s;
}

.search-enter-from #RASearchMenu,
.search-leave-to #RASearchMenu {
  transform: translateY(30px);
  opacity: 0.001;
}

.flagshipName {
    text-wrap: wrap;
}

#RASearchInput {
    background-color: var(--lightContent);
    color: white;
}

@media screen and (max-width: 1000px) {
    .RADataImg {
        width: var(--standard2ImgWidth);
        height: var(--standard2ImgHeight);
    }

    .fleetTotal, .totalStats {
        width: 85vw;
    }

    .totalStat {
        width: 40%;
    }

    .barStat {
        width: 80%;
        margin-bottom: 2vh;
    }

    #antishipBar {
        height: 2.5vh;
        background-color: black;
    }

    .addShip {
        height: fit-content;
    }

    #addShipPlus {
        width: calc(var(--standard2ImgWidth) + 2vh);
        height: calc(var(--standard2ImgHeight) + 2vh);
    }

    .allShipsCard, .allShips {
        width: 85vw;
    }

    .allShipsCard {
        background-color: rgba(0, 0, 0, 0.25);
    }

    .aircraft {
        background-color: rgba(0, 0, 0, 0.5);
    }
    
    .allShipsCardData {
        width: 82.5vw;
        flex-direction: column;
    }

    .allShipsCardText {
        width: 95%;
    }

    .buttonArray {
        width: 95%;
        justify-content: space-around;
    }

    .incrementButton {
        width: 7vh;
        height: 7vh;
    }

    #cancelButtonImg {
        width: calc(var(--standard2ImgWidth) - 1vh);
        height: calc(var(--standard2ImgHeight) - 1vh);
    }

    .editButtons {
        width: 95%;
        display: flex;
        justify-content: space-around;
    }

    .editAircraftButton {
        border-radius: 1.5vh;
    }

    .RASearchDiv {
        flex-direction: column;
    }
    
    .RASearchConfirmButton {
        width: fit-content;
    }

    #ModResult {
        justify-content: center;
        gap: 3vw;
    }

    .modButton {
        padding-left: 2vw;
        padding-right: 2vw;
    }
}

</style>