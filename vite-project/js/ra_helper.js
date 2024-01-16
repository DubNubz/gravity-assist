
import { DOMSelectors } from "./domselectors";
import { difficulty, data } from "./ra_data";

let manufacturer = "Jupiter Industry";
let direction = "Outstanding Firepower";
let scope = "Projectile Weapon";

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
        document.querySelector("#RAName").insertAdjacentHTML("beforeend", 
        `<p>${names[i]}</p>`);
        
        document.querySelector("#RAVariant").insertAdjacentHTML("beforeend",
        `<p>${variants[i]}-${variant_names[i]}</p>`);
        
        document.querySelector("#RAType").insertAdjacentHTML("beforeend",
        `<p>${types[i]}</p>`);

        document.querySelector("#RAChance").insertAdjacentHTML("beforeend",
        `<p>${percentages[i]}%</p>`);
    };
};

function insertRAHelper () {
    DOMSelectors.app.innerHTML = 
    `<div class="title">
        <h2>Research Agreement Finder</h2>
        <p>Choose the Research Agreement paths you want to search through.</p>
    </div>
    
    <div class="RAButtons">
        <div class="manufacturers">
            <h3>Manufacturers</h3>
            <button class="RAButton active" id="jupiterIndustries">Jupiter Industry</button>
            <button class="RAButton" id="nomaShipping">NOMA Shipping</button>
            <button class="RAButton" id="antonios">Antonios</button>
            <button class="RAButton" id="dawnAccord">Dawn Accord</button>
            <button class="RAButton" id="emptyManufacturer">Empty</button>
        </div>
        <div class="directions">
            <h3>Directions</h3>
            <button class="RAButton active" id="outstandingFirepower">Outstanding Firepower</button>
            <button class="RAButton" id="sustainedCombat">Sustained Combat</button>
            <button class="RAButton" id="strategySupport">Strategy & Support</button>
            <button class="RAButton" id="fighterCorvette">Fighter & Corvette</button>
            <button class="RAButton" id="emptyDirection">Empty</button>
        </div>
        <div class="scopes">
            <h3>Scopes</h3>
            <button class="RAButton active" id="projectile">Projectile Weapon</button>
            <button class="RAButton" id="directfire">Direct-Fire Weapon</button>
            <button class="RAButton" id="emptyScope">Empty</button>
        </div>
    </div>

    <button id="resetButton">Reset</button>

    <div class="RAResults">
        <div class="RAResult" id="RAName">
        </div>

        <div class="RAResult" id="RAVariant">
        </div>

        <div class="RAResult" id="RAType">
        </div>

        <div class="RAResult" id="RAChance">
        </div>
    </div>
    `;

    insertData("Jupiter Industry", "Outstanding Firepower", "Projectile Weapon");

    document.querySelector("#resetButton").addEventListener("click", function () {
        const buttons = document.querySelectorAll(".RAButton");
        buttons.forEach((button) => {
            document.querySelector(`#${button.id}`).classList.remove("active");
        })
        document.querySelector(`#jupiterIndustries`).classList.add("active");
        document.querySelector(`#outstandingFirepower`).classList.add("active");
        document.querySelector(`#projectile`).classList.add("active");

        document.querySelector(".RAList").innerHTML = "";
        manufacturer = "Jupiter Industry";
        direction = "Outstanding Firepower";
        scope = "Projectile Weapon";
        insertData(manufacturer, direction, scope);
    })

    const buttons = document.querySelectorAll(".RAButton");
    buttons.forEach((button) => button.addEventListener("click", function () {
        let buttonType;
        document.querySelector("#RAName").innerHTML = "";
        document.querySelector("#RAVariant").innerHTML = "";
        document.querySelector("#RAType").innerHTML = "";
        document.querySelector("#RAChance").innerHTML = "";

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

        insertData(manufacturer, direction, scope);
        
    }));
    
};

export { insertRAHelper };
