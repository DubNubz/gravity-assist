
import { changelog } from "./changelog";
import { DOMSelectors } from "../domselectors";

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
        `<button id="hideAllChanges">Hide all changes</button>`);
        hideAllChanges();
    });
};

function hideAllChanges () {
    document.querySelector("#hideAllChanges").addEventListener("click", function () {
        document.querySelector(".allChanges").innerHTML = `<button id="loadAllChanges">View all changes</button>`;
        loadAllChanges();
    });
};

function insertChangelog () {
    DOMSelectors.app.innerHTML = 
    `<div class="title">
        <h2>Changelog</h2>
        <p>This is a list of all documented changes to Gravity Assist.</p>
    </div>

    <div class="latestChange">
    </div>

    <div class="allChanges">
        <button id="loadAllChanges">View all changes</button>
    </div>
    `;

    document.querySelector(".latestChange").insertAdjacentHTML("beforeend", 
    `<h2>Version ${changelog[changelog.length - 1].version}</h2>
    <h3>Release: ${changelog[changelog.length - 1].release}</h3>
    <div class="changeNotes">
    </div>`);

    for (const change in changelog[changelog.length - 1].notes) {
        document.querySelector(".changeNotes").insertAdjacentHTML("beforeend",
        `<p>► ${changelog[changelog.length - 1].notes[change]}</p>`)
    };

    loadAllChanges();
};

export { insertChangelog };
