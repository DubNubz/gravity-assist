
import { DOMSelectors } from "../domselectors";
import { difficulty, data } from "../../../gravity-assist-vue/src/stores/ra_data";

let manufacturer = "Jupiter Industry";
let direction = "Outstanding Firepower";
let scope = "Projectile Weapon";
let selectedShip;

function getData (manufacturer, direction, scope, retrieve) {
    const names = [];
    const titles = [];
    const imgs = [];
    const types = [];
    const variants = [];
    const variant_names = [];
    const weights = [];
    const all = [];

    for (const ship in data) {
        if (data[ship].manufacturer.includes(manufacturer) || manufacturer == "all") {
            if (data[ship].direction.includes(direction) || direction == "all") {
                if (data[ship].scope.includes(scope) || scope == "all") {
                    names.push(data[ship].name);
                    titles.push(data[ship].title);
                    imgs.push(data[ship].img);
                    types.push(data[ship].type);
                    variants.push(data[ship].variant);
                    variant_names.push(data[ship].variant_name);
                    weights.push(data[ship].weight);
                    all.push(data[ship]);
                };
            };
        };
    };

    switch (Number(retrieve)) {
        case 0:
            return names;
        case 1:
            return titles;
        case 2:
            return imgs;
        case 3:
            return types;
        case 4:
            return variants;
        case 5:
            return variant_names;
        case 6:
            return weights;
        case 7:
            return all;
    };
};

function weightCalculator (data) {
    const totalWeight = Object.values(data).reduce((acc, item) => acc + item.weight, 0);
    const percentages = [];

    for (const ship in data) {
        const shipWeight = data[ship].weight;
        const percentage = (shipWeight / totalWeight) * 100;
        percentages.push(percentage.toFixed(2));
    };

    return percentages;
};

function activeButton (buttonType) {
    const buttons = document.querySelectorAll(".RAButton");
    if (buttonType == 0) {
        for (let i = 0; i <= 4; i++) {
            if (buttons[i].classList.contains("active")) {
                document.querySelector(`#${buttons[i].id}`).classList.remove("active");
                break;
            };
        };
    } else if (buttonType == 1) {
        for (let i = 5; i <= 9; i++) {
            if (buttons[i].classList.contains("active")) {
                document.querySelector(`#${buttons[i].id}`).classList.remove("active");
                break;
            };
        };
    } else if (buttonType == 2) {
        for (let i = 10; i <= 12; i++) {
            if (buttons[i].classList.contains("active")) {
                document.querySelector(`#${buttons[i].id}`).classList.remove("active");
                break;
            };
        };
    };
};

function insertData (manufacturer, direction, scope) {
    let names = getData(manufacturer, direction, scope, 0);
    let titles = getData(manufacturer, direction, scope, 1);
    let imgs = getData(manufacturer, direction, scope, 2);
    let types = getData(manufacturer, direction, scope, 3);
    let variants = getData(manufacturer, direction, scope, 4);
    let variant_names = getData(manufacturer, direction, scope, 5);
    let weights = getData(manufacturer, direction, scope, 6);
    let percentages = weightCalculator(getData(manufacturer, direction, scope, 7));

    for (let i = 0; i < names.length; i++) {
        document.querySelector(".RAResults").insertAdjacentHTML("beforeend", 
        `<div class="RAResult">
            <p class="RAData"><img src="${imgs[i]}" alt="Image of ${names[i]}" class="RADataImg">${names[i]}-${variants[i]}</p>
            <p class="RADataPercent">${percentages[i]}%</p>
        </div>`);
    };
};

function autocomplete () {
    const shipList = [];
    for (const ship in data) {
        shipList.push(`${data[ship].name}-${data[ship].variant}`);
    }

    const inputValue = document.querySelector("#RASearchInput").value;
    const filteredChoices = shipList.filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()));

    document.querySelector("#RASearchResults").innerHTML = "";

    filteredChoices.forEach((choice) => {
        const listItem = document.createElement("p");
        listItem.setAttribute("id", "RASearchResultItem")
        listItem.textContent = choice;

        listItem.addEventListener("click", function () {
            document.querySelector("#RASearchInput").value = choice;
            selectedShip = choice;
            document.querySelector("#RASearchResults").innerHTML = "";
        });

        document.querySelector("#RASearchResults").appendChild(listItem);
    });
};

function insertRAHelper () {
    DOMSelectors.app.innerHTML = 
    `<div class="title">
        <h2>Research Agreement Finder</h2>
        <p>Select a ship to find a research agreement path for it, or freely browse through all reseach agreement paths.</p>
    </div>

    <div class="RASearch">
        <p>Currently displaying results of: <span class="cyan" id="RASearchCurrent">Not selected</span></p>
        <button id="RASearchButton">SELECT A SHIP</button>
    </div>
    
    <div class="RAButtons">
        <div class="manufacturers">
            <h3>Companies</h3>
            <button class="RAButton" id="jupiterIndustries">Jupiter Industry</button>
            <button class="RAButton" id="nomaShipping">NOMA Shipping</button>
            <button class="RAButton" id="antonios">Antonios</button>
            <button class="RAButton" id="dawnAccord">Dawn Accord</button>
            <button class="RAButton" id="emptyManufacturer">No Company</button>
        </div>
        <div class="directions">
            <h3>Directions</h3>
            <button class="RAButton" id="outstandingFirepower">Outstanding Firepower</button>
            <button class="RAButton" id="sustainedCombat">Sustained Combat</button>
            <button class="RAButton" id="strategySupport">Strategy & Support</button>
            <button class="RAButton" id="fighterCorvette">Fighter & Corvette</button>
            <button class="RAButton" id="emptyDirection">No Direction</button>
        </div>
        <div class="scopes">
            <h3>Scopes</h3>
            <button class="RAButton" id="projectile">Projectile Weapon</button>
            <button class="RAButton" id="directfire">Direct-Fire Weapon</button>
            <button class="RAButton" id="emptyScope">No Scope</button>
        </div>
    </div>

    <button id="resetButton">Reset</button>

    <div class="RAResultsHolder">
        <div class="RAResults">
        </div>
    </div>
    `;

    insertData(manufacturer, direction, scope);
    const RAButtons = document.querySelectorAll(".RAButton");
    RAButtons.forEach((button) => {
        if (button.textContent == manufacturer || button.textContent == direction || button.textContent == scope) {
            button.classList.add("active");
        }
    })

    document.querySelector("#RASearchButton").addEventListener("click", function () {
        document.querySelector(".RASearch").insertAdjacentHTML("beforeend", 
        `<div id="RASearchMenuBackground">
            <div id="RASearchMenu">
                <label for="RASearchInput"><h2>Click on a ship to select it</h2></label>
                <input type="text" id="RASearchInput" placeholder="Click to start typing to narrow search...">
                <button class="RASearchConfirmButton">CONFIRM</button>
                <div id="RASearchMenuResults">
                    <div id="RASearchResults"></div>
                </div>
            </div>
        </div>`)

        autocomplete();

        document.querySelector("#RASearchInput").addEventListener("input", autocomplete);
        document.querySelector(".RASearchConfirmButton").addEventListener("click", function () {

            document.querySelector("#RASearchMenuBackground").remove();
            document.querySelector("#RASearchCurrent").innerHTML = selectedShip;
            const shipName = selectedShip.slice(0, -2);
            const variant = selectedShip[selectedShip.length - 1];

            for (const ship in data) {
                if (data[ship].name == shipName && data[ship].variant == variant) {

                    manufacturer = data[ship].manufacturer;
                    direction = data[ship].direction[0];
                    scope = data[ship].scope;

                    document.querySelector(".RAResults").innerHTML = "";
                    const RAButtons = document.querySelectorAll(".RAButton");

                    RAButtons.forEach((button) => {
                        button.classList.remove("active");
                        if (button.textContent == manufacturer || button.textContent == direction || button.textContent == scope) {
                            button.classList.add("active");
                        }
                        if (button.id == "emptyManufacturer" && manufacturer == "Empty") {
                            button.classList.add("active");
                            manufacturer = "all";
                        } else if (button.id == "emptyDirection" && direction == "Empty") {
                            button.classList.add("active");
                            direction = "all";
                        } else if (button.id == "emptyScope" && scope == "Empty") {
                            button.classList.add("active");
                            scope = "all";
                        }
                    })
                    insertData(manufacturer, direction, scope);

                }
            }
        })
    })

    document.querySelector("#resetButton").addEventListener("click", function () {
        const buttons = document.querySelectorAll(".RAButton");
        buttons.forEach((button) => {
            document.querySelector(`#${button.id}`).classList.remove("active");
        })
        document.querySelector(`#jupiterIndustries`).classList.add("active");
        document.querySelector(`#outstandingFirepower`).classList.add("active");
        document.querySelector(`#projectile`).classList.add("active");

        document.querySelector(".RAResults").innerHTML = "";
        manufacturer = "Jupiter Industry";
        direction = "Outstanding Firepower";
        scope = "Projectile Weapon";
        insertData(manufacturer, direction, scope);
    })

    const buttons = document.querySelectorAll(".RAButton");
    buttons.forEach((button) => button.addEventListener("click", function () {
        let buttonType;
        document.querySelector(".RAResults").innerHTML = "";

        if (button == buttons[0] || button == buttons[1] || button == buttons[2] || button == buttons[3]) {
            manufacturer = button.textContent;
            buttonType = 0;
        } else if (button == buttons[4]) {
            manufacturer = "all";
            buttonType = 0;
        } else if (button == buttons[5] || button == buttons[6] || button == buttons[7] || button == buttons[8]) {
            direction = button.textContent;
            buttonType = 1;
        } else if (button == buttons[9]) {
            direction = "all";
            buttonType = 1;
        } else if (button == buttons[10] || button == buttons[11]) {
            scope = button.textContent;
            buttonType = 2;
        } else if (button == buttons[12]) {
            scope = "all";
            buttonType = 2;
        }
        
        activeButton(buttonType);
        document.querySelector(`#${button.id}`).classList.add("active");
        document.querySelector("#RASearchCurrent").innerHTML = "Not selected";

        insertData(manufacturer, direction, scope);
        
    }));
    
};

export { insertRAHelper };
