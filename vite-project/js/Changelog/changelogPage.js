
import { changelog } from "./changelog";
import { DOMSelectors } from "../domselectors";
import { insertColorGenerator } from "../Color Generator/color_generator";
import { insertRAHelper } from "../RA Helper/ra_helper";
import { insertModLibrary } from "../Module Library/mod_library";

const changelogAll = changelog.slice(0, -1);

function getAllChanges () {
    for (const version in changelogAll) {
        document.querySelector(".allChanges").insertAdjacentHTML("afterbegin",
        `<div class="allChange">
            <h2>Version ${changelogAll[version].version}</h2>
            <h3>Release: ${changelogAll[version].release}</h3>
            <div class="changeNotes" id="notes${version}">
            </div>
        </div>`)

        for (const change in changelogAll[version].notes) {
            document.querySelector(`#notes${version}`).insertAdjacentHTML("beforeend", 
            `<p>► ${changelogAll[version].notes[change]}</p>`)
        }
    }
};

function loadAllChanges () {
    document.querySelector("#loadAllChanges").addEventListener("click", function () {
        document.querySelector(".allChanges").innerHTML = "";

        getAllChanges();

        document.querySelector(".allChanges").insertAdjacentHTML("afterbegin",
        `<button id="hideAllChanges">Hide full changelog</button>`);
        hideAllChanges();
    });
};

function hideAllChanges () {
    document.querySelector("#hideAllChanges").addEventListener("click", function () {
        document.querySelector(".allChanges").innerHTML = `<button id="loadAllChanges">View full changelog</button>`;
        loadAllChanges();
    });
};

function insertChangelog () {
    DOMSelectors.app.innerHTML = 
    `<div class="title">
        <h2>Gravity Assist</h2>
        <p>Access any Gravity Assist tool here, or at the top in the header</p>

        <div class="appButtonDisplay">
            <button class="appButton" id="colorGeneratorAppButton">Color Generator</button>
            <button class="appButton" id="researchAgreementAppButton">Research Agreement Helper</button>
            <button class="appButton" id="modLibraryAppButton">Module Library</button>
        </div>
    </div>

    <div class="latestChange">
    </div>

    <div class="allChanges">
        <button id="loadAllChanges">View full changelog</button>
    </div>
    `;

    document.querySelector(".latestChange").insertAdjacentHTML("beforeend", 
    `<h2>Version ${changelog[changelog.length - 1].version}</h2>
    <h3>Latest Release: ${changelog[changelog.length - 1].release}</h3>
    <div class="changeNotes">
    </div>`);

    for (const change in changelog[changelog.length - 1].notes) {
        document.querySelector(".changeNotes").insertAdjacentHTML("beforeend",
        `<p>► ${changelog[changelog.length - 1].notes[change]}</p>`)
    };

    document.querySelector("#colorGeneratorAppButton").addEventListener("click", function () {
        insertColorGenerator();
        DOMSelectors.colorGeneratorButton.classList.add("activeHeaderButton");
        DOMSelectors.changelog.classList.remove("activeHeaderButton");
    });

    document.querySelector("#researchAgreementAppButton").addEventListener("click", function () {
        insertRAHelper();
        DOMSelectors.researchAgreeementButton.classList.add("activeHeaderButton");
        DOMSelectors.changelog.classList.remove("activeHeaderButton");
    });

    document.querySelector("#modLibraryAppButton").addEventListener("click", function () {
        insertModLibrary();
        DOMSelectors.modLibraryButton.classList.add("activeHeaderButton");
        DOMSelectors.changelog.classList.remove("activeHeaderButton");
    });


    loadAllChanges();
};

export { insertChangelog };
