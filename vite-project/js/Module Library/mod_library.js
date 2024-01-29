
import { DOMSelectors } from "../domselectors";
import { data } from "./mod_data";

const allShips = ["Constantine the Great", "Eternal Storm", "Spear of Uranus", "ST59", "Thunderbolt Star", "Ediacaran", "FSV830", "CV3000", "Marshal Crux", "Solar Whale"];
let currentShip = 0;

function getShip (ship) {
    switch (ship) {
        case "Constantine the Great":
            return 0;
        case "Eternal Storm":
            return 1;
        case "Spear of Uranus":
            return 2;
        case "ST59":
            return 3;
        case "Thunderbolt Star":
            return 4;
        case "Ediacaran":
            return 5;
        case "FSV830":
            return 6;
        case "CV3000":
            return 7;
        case "Marshal Crux":
            return 8;
        case "Solar Whale":
            return 9;
    };
};

function insertShip (ship) {
    const shipArray = data[getShip(ship)];
    const moduleArray = shipArray.modules;

    const shipName = shipArray.name;
    const shipTitle = shipArray.title;
    const shipImg = shipArray.img;
    const shipType = shipArray.type;
    const shipCost = shipArray.cost;
    const shipRow = shipArray.row;
    const shipManufacturer = shipArray.manufacturer;

    document.querySelector(".shipPreview").insertAdjacentHTML("beforeend",
    `<img src=${shipImg} alt="Image of ${shipName}" id="modShipImg">
    <h2>${shipName} - ${shipTitle}</h2>
    <h3>${shipCost} Command Points (${shipRow} Row)</h3>`)

    for (const mod in moduleArray) {
        document.querySelector(`.shipMods`).insertAdjacentHTML("beforeend",
        `<button class="modButton" id="${moduleArray[mod].identity}">${moduleArray[mod].identity}</button>`)
        document.querySelector(`#${moduleArray[mod].identity}`).addEventListener("click", function () {
            const buttonArray = document.querySelectorAll(".modButton");
            buttonArray.forEach((button) => button.classList.remove("active"));
            document.querySelector(`#${moduleArray[mod].identity}`).classList.add("active");
            insertMods(shipName, moduleArray[mod].identity);
        })
    }
};

function insertMods (ship, module) {
    const shipArray = data[getShip(ship)];
    const getModule = shipArray.modules.find((mod) => mod.identity == module);

    if (getModule.type == "unknown") {
        document.querySelector(".shipModShowcase").innerHTML = "";
        document.querySelector(".shipModShowcase").insertAdjacentHTML("beforeend",
        `<div id="modInfo">
        <h2>${getModule.identity}: If you have this module, please contact micromidget on discord</h2>
        </div>`);
        return;
    }

    const moduleStats = getModule.stats;
    const moduleWeapons = getModule.weapons;

    const moduleIdentity = getModule.identity;
    const moduleName = getModule.name;
    let moduleDefault;

    if (getModule.default == true) {
        moduleDefault = "✅";
    } else {
        moduleDefault = "❌";
    }

    const hp = moduleStats.hp;

    document.querySelector(".shipModShowcase").innerHTML = "";

    if (getModule.type == "weapon") {
        document.querySelector(".shipModShowcase").insertAdjacentHTML("beforeend",
        `<div id="modInfo">
        <h2>${moduleIdentity}: ${moduleName}</h2>
        <h3>Default Module: ${moduleDefault}</h3>
        <p>System HP: ${hp}</p>
        <p>Anti-ship damage: ${moduleStats.antiship}</p>
        <p>Anti-air damage: ${moduleStats.antiair}</p>
        <p>Siege damage: ${moduleStats.siege}</p>
        </div>
        
        <div class="modWeaponInfo">
        </div>`)

    } else if (getModule.type == "misc") {
        document.querySelector(".shipModShowcase").insertAdjacentHTML("beforeend",
        `<div id="modInfo">
        <h2>${moduleIdentity}: ${moduleName}</h2>
        <h3>Default Module: ${moduleDefault}</h3>
        <p>System HP: ${hp}</p>
        </div>
        
        <div class="modWeaponInfo">
        </div>`)

    } else if (getModule.type == "armor") {
        document.querySelector(".shipModShowcase").insertAdjacentHTML("beforeend",
        `<div id="modInfo">
        <h2>${moduleIdentity}: ${moduleName}</h2>
        <h3>Default Module: ${moduleDefault}</h3>
        <p>System HP: ${hp}</p>
        <p>Extra HP: ${moduleStats.extraHP}</p>
        <p>Armor: ${moduleStats.armor}</p>
        <p>Energy Shield: ${moduleStats.energyShield}</p>
        </div>
        
        <div class="modWeaponInfo">
        </div>`)
    }

    for (const weapon in moduleWeapons) {

        if (moduleWeapons[weapon].type == "weapon") {
            document.querySelector(".modWeaponInfo").insertAdjacentHTML("beforeend",
            `<div id="modWeapon${weapon}">
            <h3>${moduleWeapons[weapon].count} x ${moduleWeapons[weapon].name}</h3>
            <p>Damage Type: ${moduleWeapons[weapon].damageType}</p>
            <p>Damage per Hit: ${moduleWeapons[weapon].alpha}</p>
            <p>Prioritized Target: ${moduleWeapons[weapon].target}</p>
            <div id="modWeapon${weapon}Lockon"></div>
            <div id="modWeapon${weapon}Attributes"></div>
            </div>`)
    
            if (moduleWeapons[weapon].lockonEfficiency != null) {
                document.querySelector(`#modWeapon${weapon}Lockon`).insertAdjacentHTML("beforeend",
                `<p>Lock-on Efficiency: ${moduleWeapons[weapon].lockonEfficiency}.0%</p>`)
            }
    
            if (moduleWeapons[weapon].attributes != null) {
                for (const attribute in moduleWeapons[weapon].attributes) {
                    document.querySelector(`#modWeapon${weapon}Attributes`).insertAdjacentHTML("beforeend",
                    `<p>${moduleWeapons[weapon].attributes[attribute]}<p>`)
                }
            }

        } else if (moduleWeapons[weapon].type == "buff") {
            document.querySelector(".modWeaponInfo").insertAdjacentHTML("beforeend",
            `<div id="modWeapon${weapon}">
            <h3>${moduleWeapons[weapon].count} x ${moduleWeapons[weapon].name}</h3>
            <div id="modWeapon${weapon}Attributes"></div>
            </div>`)
    
            if (moduleWeapons[weapon].attributes != null) {
                for (const attribute in moduleWeapons[weapon].attributes) {
                    document.querySelector(`#modWeapon${weapon}Attributes`).insertAdjacentHTML("beforeend",
                    `<p>${moduleWeapons[weapon].attributes[attribute]}<p>`)
                }
            }
            
        } else if (moduleWeapons[weapon].type == "hanger") {
            document.querySelector(".modWeaponInfo").insertAdjacentHTML("beforeend",
            `<div id="modWeapon${weapon}">
            <h3>${moduleWeapons[weapon].count} x ${moduleWeapons[weapon].name}</h3>
            <p>Hanger Type: ${moduleWeapons[weapon].hanger}<p>
            <p>${moduleWeapons[weapon].aircraft} Capacity: ${moduleWeapons[weapon].capacity}</p>
            <div id="modWeapon${weapon}Attributes"></div>
            </div>`)
    
            if (moduleWeapons[weapon].attributes != null) {
                for (const attribute in moduleWeapons[weapon].attributes) {
                    document.querySelector(`#modWeapon${weapon}Attributes`).insertAdjacentHTML("beforeend",
                    `<p>${moduleWeapons[weapon].attributes[attribute]}<p>`)
                }
            }

        }

    }
};

function insertModLibrary () {
    DOMSelectors.app.innerHTML = 
    `<div class="title">
        <h2>Module Library</h2>
        <p>Choose a ship, then choose a module to inspect.</p>
    </div>

    <div class="shipOverall">
        <div class="moveShipsButton">
            <button id="previousShipButton"><</button>
            <button id="nextShipButton">></button>
        </div>
        <div class="shipPreview"></div>
        <div class="shipMods"></div>
    </div>

    <div class="shipModShowcase">
    </div>
    `;

    insertShip(allShips[currentShip]);

    document.querySelector("#previousShipButton").addEventListener("click", function () {
        document.querySelector(".shipPreview").innerHTML = "";
        document.querySelector(".shipMods").innerHTML = "";
        document.querySelector(".shipModShowcase").innerHTML = "";
        currentShip += -1;
        if (currentShip < 0) {
            currentShip = allShips.length - 1;
        }
        insertShip(allShips[currentShip]);
    })

    document.querySelector("#nextShipButton").addEventListener("click", function () {
        document.querySelector(".shipPreview").innerHTML = "";
        document.querySelector(".shipMods").innerHTML = "";
        document.querySelector(".shipModShowcase").innerHTML = "";
        currentShip += 1;
        if (currentShip > allShips.length - 1) {
            currentShip = 0;
        }
        insertShip(allShips[currentShip]);
    })
};

export { insertModLibrary };
