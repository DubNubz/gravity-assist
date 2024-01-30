
import { DOMSelectors } from "../domselectors";
import { data } from "./mod_data";

const allShips = ["Constantine the Great", "Eternal Storm", "Spear of Uranus", "ST59", "Thunderbolt Star", "Ediacaran", "FSV830", "CV3000", "Marshal Crux", "Solar Whale"];
let currentShip = 0;
let previousShip = 9;
let nextShip = 1;
let currentMod = {
    "Constantine the Great": "M1",
    "Eternal Storm": "M1",
    "Spear of Uranus": "M1",
    "ST59": "M1",
    "Thunderbolt Star": "M1",
    "Ediacaran": "M1",
    "FSV830": "A1",
    "CV3000": "M1",
    "Marshal Crux": "M1",
    "Solar Whale": "M1"
};

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
        document.querySelector(`#shipMods${String(moduleArray[mod].identity)[0]}`).insertAdjacentHTML("beforeend",
        `<button class="modButton" id="${moduleArray[mod].identity}">${moduleArray[mod].identity}</button>`)
        
        document.querySelector(`#${moduleArray[mod].identity}`).addEventListener("click", function () {
            const buttonArray = document.querySelectorAll(".modButton");
            buttonArray.forEach((button) => button.classList.remove("active"));
            document.querySelector(`#${moduleArray[mod].identity}`).classList.add("active");
            insertMods(shipName, moduleArray[mod].identity);
            currentMod[shipName] = moduleArray[mod].identity;
        })
    }
};

function getMax (stat) {
    if (stat <= 2500) {
        return 2500;
    } else if (stat <= 5000) {
        return 5000;
    } else if (stat <= 10000) {
        return 10000;
    } else if (stat <= 15000) {
        return 15000;
    } else if (stat <= 22500) {
        return 22500;
    } else if (stat <= 30000) {
        return 30000;
    } else if (stat <= 50000) {
        return 50000;
    } else if (stat <= 100000) {
        return 100000;
    }
};

function getMaxHP (stat) {
    if (stat <= 50000) {
        return 50000;
    } else if (stat <= 100000) {
        return 100000;
    } else if (stat <= 250000) {
        return 250000;
    } else if (stat <= 500000) {
        return 500000;
    }
};

function getMaxArmor (stat) {
    if (stat <= 50) {
        return 50;
    } else if (stat <= 100) {
        return 100;
    } else if (stat <= 200) {
        return 250;
    } else if (stat <= 350) {
        return 350;
    } else if (stat <= 500) {
        return 500;
    }
}

function insertMods (ship, module) {
    const shipArray = data[getShip(ship)];
    const getModule = shipArray.modules.find((mod) => mod.identity == module);

    if (getModule.type == "unknown") {
        document.querySelector(".shipModShowcase").innerHTML = "";
        const allWeapons = document.querySelectorAll(".modWeapon");
        allWeapons.forEach((weapon) => {
            weapon.remove();
        });
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
    let moduleDefault = "❌";

    if (getModule.default == true) {
        moduleDefault = "✅";
    }

    const hp = moduleStats.hp;

    document.querySelector(".shipModShowcase").innerHTML = "";
    const allWeapons = document.querySelectorAll(".modWeapon");
    allWeapons.forEach((weapon) => {
        weapon.remove();
    });

    if (getModule.type == "weapon") {
        document.querySelector(".shipModShowcase").insertAdjacentHTML("beforeend",
        `<div id="modInfo">
            <div id="modHeader">
                <img src="${getModule.img}" alt="Image of the module" class="weaponImg">
                <h2>${moduleIdentity} | ${moduleName}</h2>
            </div>
            <div id="modStats">
                <div id="antiship">
                    <img src="/weapons/antiship-removebg-preview.png" alt="Value of this module's antiship statistic" class="weaponImg">
                    <p>${moduleStats.antiship}</p>
                    <div id="antishipBar"></div>
                </div>
                <div id="antiair">
                <img src="/weapons/antiair-removebg-preview.png" alt="Value of this module's antiair statistic" class="weaponImg">
                    <p>${moduleStats.antiair}</p>
                    <div id="antiairBar"></div>
                </div>
                <div id="siege">
                <img src="/weapons/siege-removebg-preview.png" alt="Value of this module's siege statistic" class="weaponImg">
                    <p>${moduleStats.siege}</p>
                    <div id="siegeBar"></div>
                </div>
                <p>System HP: ${hp}</p>
            </div>
        </div>`)

        const antishipBar = document.createElement("div");
        antishipBar.classList.add("fillerBar");
        antishipBar.style.width = `${(Math.min(1, Math.max(0, (moduleStats.antiship / getMax(moduleStats.antiship))))) * 100}%`;
        document.querySelector("#antishipBar").innerHTML = "";
        document.querySelector("#antishipBar").appendChild(antishipBar);
        
        const antiairBar = document.createElement("div");
        antiairBar.classList.add("fillerBar");
        antiairBar.style.width = `${(Math.min(1, Math.max(0, (moduleStats.antiair / getMax(moduleStats.antiair))))) * 100}%`;
        document.querySelector("#antiairBar").innerHTML = "";
        document.querySelector("#antiairBar").appendChild(antiairBar);
        
        const siegeBar = document.createElement("div");
        siegeBar.classList.add("fillerBar");
        siegeBar.style.width = `${Math.min(1, Math.max(0, (moduleStats.siege / getMax(moduleStats.siege)))) * 100}%`;
        document.querySelector("#siegeBar").innerHTML = "";
        document.querySelector("#siegeBar").appendChild(siegeBar);

    } else if (getModule.type == "misc") {
        document.querySelector(".shipModShowcase").insertAdjacentHTML("beforeend",
        `<div id="modInfo">
        <div id="modHeader">
            <img src="${getModule.img}" alt="Image of the module" class="weaponImg">
            <h2>${moduleIdentity} | ${moduleName}</h2>
        </div>
        <div id="modStats">
            <p>System HP: ${hp}</p>
        </div>
    </div>`)

    } else if (getModule.type == "armor") {
        document.querySelector(".shipModShowcase").insertAdjacentHTML("beforeend",
        `<div id="modInfo">
        <div id="modHeader">
            <img src="${getModule.img}" alt="Image of the module" class="weaponImg">
            <h2>${moduleIdentity} | ${moduleName}</h2>
        </div>
        <div id="modStats">
            <div id="hp">
                <img src="/weapons/hpStat-removebg-preview.png" alt="Value of this module's hitpoint statistic" class="weaponImg">
                <p>${moduleStats.extraHP}</p>
                <div id="hpBar"></div>
            </div>
            <div id="armor">
            <img src="/weapons/armorStat-removebg-preview.png" alt="Value of this module's armor statistic" class="weaponImg">
                <p>${moduleStats.armor}</p>
                <div id="armorBar"></div>
            </div>
            <div id="siege">
            <img src="/weapons/shieldStat-removebg-preview.png" alt="Value of this module's energy shield statistic" class="weaponImg">
                <p>${moduleStats.energyShield}%</p>
                <div id="shieldBar"></div>
            </div>
                <p>System HP: ${hp}</p>
            </div>
        </div>`)

        const hpBar = document.createElement("div");
        hpBar.classList.add("fillerBarArmor");
        hpBar.style.width = `${(Math.min(1, Math.max(0, (moduleStats.extraHP / getMaxHP(moduleStats.extraHP))))) * 100}%`;
        document.querySelector("#hpBar").innerHTML = "";
        document.querySelector("#hpBar").appendChild(hpBar);
        
        const armorBar = document.createElement("div");
        armorBar.classList.add("fillerBarArmor");
        armorBar.style.width = `${(Math.min(1, Math.max(0, (moduleStats.armor / getMaxArmor(moduleStats.armor))))) * 100}%`;
        document.querySelector("#armorBar").innerHTML = "";
        document.querySelector("#armorBar").appendChild(armorBar);
        
        const shieldBar = document.createElement("div");
        shieldBar.classList.add("fillerBarArmor");
        shieldBar.style.width = `${Math.min(1, Math.max(0, (moduleStats.energyShield / 100))) * 100}%`;
        document.querySelector("#shieldBar").innerHTML = "";
        document.querySelector("#shieldBar").appendChild(shieldBar);
    }

    for (const weapon in moduleWeapons) {

        if (moduleWeapons[weapon].type == "weapon") {
            document.querySelector(".modWeaponHolder").insertAdjacentHTML("beforeend",
            `<div class="modWeapon" id="modWeapon${weapon}">
            <h3><span class="gold">x${moduleWeapons[weapon].count}</span> <span class="darkGray">|</span> <span class="normalText">${moduleWeapons[weapon].title}</span></h3>
            <h3>${moduleWeapons[weapon].name}</h3>
            <div class="modWeaponStats" id="modWeapon${weapon}Stats">
                <div id="damageType">
                    <img src="/weapons/damageType-removebg-preview.png" alt="Damage Type" class="weaponImg">
                    <p><span class="cyan">${moduleWeapons[weapon].damageType}</span> damage</p>
                </div>
                <div id="dph">
                    <img src="/weapons/dph-removebg-preview.png" alt="Damage per Hit" class="weaponImg">
                    <p><span class="pastelOrange">${moduleWeapons[weapon].alpha}</span> damage per hit</p>
                </div>
                <div id="prioritizedTarget">
                    <img src="/weapons/prioritizedTarget-removebg-preview.png" alt="Prioritized Target" class="weaponImg">
                    <p>Target: <span class="deepGreen">${moduleWeapons[weapon].target}</span></p>
                </div>
            </div>
            <div class="modWeaponAttributes" id="modWeapon${weapon}Attributes"></div>
            </div>`)
    
            if (moduleWeapons[weapon].lockonEfficiency != null) {
                document.querySelector(`#modWeapon${weapon}Stats`).insertAdjacentHTML("beforeend",
                `<div id="modWeaponLockon">
                    <img src="/weapons/lockonEfficiency-removebg-preview.png" alt="Lock-on Efficiency" class="weaponImg">
                    <p><span class="pastelPink">${moduleWeapons[weapon].lockonEfficiency}%</span> lock-on efficiency</p>
                </div>`)
            }
    
            if (moduleWeapons[weapon].attributes != null) {
                for (const attribute in moduleWeapons[weapon].attributes) {
                    const content = moduleWeapons[weapon].attributes[attribute];

                    if (content == "Crit") {
                        document.querySelector(`#modWeapon${weapon}Attributes`).insertAdjacentHTML("beforeend",
                        `<img src="/weapons/crit.png" alt="Crit Attribute" class="weaponImg">
                        <p>Crit</p>`)
                    } else if (content == "Interception Capability") {
                        document.querySelector(`#modWeapon${weapon}Attributes`).insertAdjacentHTML("beforeend",
                        `<img src="/weapons/interception.png" alt="Interception Attribute" class="weaponImg">
                        <p>Interception Capability</p>`)
                    } else if (content == "Anti-Aircraft Counterattack") {
                        document.querySelector(`#modWeapon${weapon}Attributes`).insertAdjacentHTML("beforeend",
                        `<img src="/weapons/antiaircraft.png" alt="Anti-Aircraft Counterattack Attribute" class="weaponImg">
                        <p>Anti-Aircraft Counterattack</p>`)
                    } else if (content == "Anti-Aircraft Support") {
                        document.querySelector(`#modWeapon${weapon}Attributes`).insertAdjacentHTML("beforeend",
                        `<img src="/weapons/antiaircraft.png" alt="Anti-Aircraft Support Attribute" class="weaponImg">
                        <p>Anti-Aircraft Support</p>`)
                    } else {
                        document.querySelector(`#modWeapon${weapon}Attributes`).insertAdjacentHTML("beforeend",
                        `<p>${moduleWeapons[weapon].attributes[attribute]}<p>`)
                    }
                }
            }

        } else if (moduleWeapons[weapon].type == "buff") {
            document.querySelector(".modWeaponHolder").insertAdjacentHTML("beforeend",
            `<div class="modWeapon" id="modWeapon${weapon}">
            <h3><span class="gold">x${moduleWeapons[weapon].count}</span> <span class="darkGray">|</span> <span class="normalText">${moduleWeapons[weapon].title}</span></h3>
            <h3>${moduleWeapons[weapon].name}</h3>
            <div class="modWeaponAttributes" id="modWeapon${weapon}Attributes"></div>
            </div>`)
    
            if (moduleWeapons[weapon].attributes != null) {
                for (const attribute in moduleWeapons[weapon].attributes) {
                    document.querySelector(`#modWeapon${weapon}Attributes`).insertAdjacentHTML("beforeend",
                    `<p>${moduleWeapons[weapon].attributes[attribute]}<p>`)
                }
            }
            
        } else if (moduleWeapons[weapon].type == "hanger") {
            document.querySelector(".modWeaponHolder").insertAdjacentHTML("beforeend",
            `<div class="modWeapon" id="modWeapon${weapon}">
            <h3><span class="gold">x${moduleWeapons[weapon].count}</span> <span class="darkGray">|</span> <span class="normalText">${moduleWeapons[weapon].title}</span></h3>
            <h3>${moduleWeapons[weapon].name}</h3>
            <div class="modWeaponStats" id="modWeapon${weapon}Stats">
                <div id="damageType">
                    <img src="/weapons/damageType-removebg-preview.png" alt="Hanger Type" class="weaponImg">
                    <p>Carries <span class="cyan">${moduleWeapons[weapon].capacity}</span> <span class="deepGreen">${moduleWeapons[weapon].hanger}s</span></p>
                </div>
            </div>
            <div class="modWeaponAttributes" id="modWeapon${weapon}Attributes"></div>
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
            <button id="previousShipButton"></button>
            <button id="nextShipButton"></button>
        </div>
        <div class="shipPreview"></div>
        <div class="shipMods">
            <div class="shipModHolder" id="shipModsM"></div>
            <div class="shipModHolder" id="shipModsA"></div>
            <div class="shipModHolder" id="shipModsB"></div>
            <div class="shipModHolder" id="shipModsC"></div>
            <div class="shipModHolder" id="shipModsD"></div>
            <div class="shipModHolder" id="shipModsE"></div>
        </div>
    </div>

    <div class="shipModShowcase">
    </div>

    <div class="modWeaponHolder">
    </div>
    `;

    insertShip(allShips[currentShip]);
    insertMods(allShips[currentShip], currentMod[allShips[currentShip]]);
    document.querySelector(`#${currentMod[allShips[currentShip]]}`).classList.add("active");

    document.querySelector("#previousShipButton").innerHTML = `<< ${allShips[previousShip]}`;
    document.querySelector("#nextShipButton").innerHTML = `${allShips[nextShip]} >>`;

    document.querySelector("#previousShipButton").addEventListener("click", function () {
        document.querySelector(".shipPreview").innerHTML = "";
        document.querySelector("#shipModsM").innerHTML = "";
        document.querySelector("#shipModsA").innerHTML = "";
        document.querySelector("#shipModsB").innerHTML = "";
        document.querySelector("#shipModsC").innerHTML = "";
        document.querySelector("#shipModsD").innerHTML = "";
        document.querySelector("#shipModsE").innerHTML = "";
        document.querySelector(".shipModShowcase").innerHTML = "";

        nextShip = currentShip;

        currentShip += -1;
        if (currentShip < 0) {
            currentShip = allShips.length - 1;
        }

        previousShip += -1;
        if (previousShip < 0) {
            previousShip = allShips.length - 1;
        }

        insertShip(allShips[currentShip]);
        insertMods(allShips[currentShip], currentMod[allShips[currentShip]]);
        document.querySelector(`#${currentMod[allShips[currentShip]]}`).classList.add("active");

        document.querySelector("#previousShipButton").innerHTML = `<< ${allShips[previousShip]}`;
        document.querySelector("#nextShipButton").innerHTML = `${allShips[nextShip]} >>`;

    })

    document.querySelector("#nextShipButton").addEventListener("click", function () {
        document.querySelector(".shipPreview").innerHTML = "";
        document.querySelector("#shipModsM").innerHTML = "";
        document.querySelector("#shipModsA").innerHTML = "";
        document.querySelector("#shipModsB").innerHTML = "";
        document.querySelector("#shipModsC").innerHTML = "";
        document.querySelector("#shipModsD").innerHTML = "";
        document.querySelector("#shipModsE").innerHTML = "";
        document.querySelector(".shipModShowcase").innerHTML = "";

        previousShip = currentShip;

        currentShip += 1;
        if (currentShip > allShips.length - 1) {
            currentShip = 0;
        }

        nextShip += 1;
        if (nextShip > allShips.length - 1) {
            nextShip = 0;
        }

        insertShip(allShips[currentShip]);
        insertMods(allShips[currentShip], currentMod[allShips[currentShip]]);
        document.querySelector(`#${currentMod[allShips[currentShip]]}`).classList.add("active");

        document.querySelector("#previousShipButton").innerHTML = `<< ${allShips[previousShip]}`;
        document.querySelector("#nextShipButton").innerHTML = `${allShips[nextShip]} >>`;
    })
};

export { insertModLibrary };
