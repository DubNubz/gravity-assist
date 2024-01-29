import '../css/style.css';
import { DOMSelectors } from './domselectors';
import { insertColorGenerator } from './Color Generator/color_generator';
import { insertRAHelper } from './RA Helper/ra_helper';
import { insertChangelog } from './Changelog/changelogPage';
import { changelog } from './Changelog/changelog';
import { insertModLibrary } from './Module Library/mod_library';

DOMSelectors.themeButton.addEventListener("click", function () {
  if (document.body.classList.contains("light")) {
    document.body.classList.add("dark");
    document.querySelector("#header").classList.add("darkHeader");
    document.querySelector("#colorGeneratorButton").classList.add("darkButton");
    document.querySelector("#researchAgreementButton").classList.add("darkButton");
    document.querySelector("#modLibraryButton").classList.add("darkButton");
    document.querySelector("#changelog").classList.add("darkButton");
    document.querySelector("#themeButton").classList.add("darkButton");
    document.body.classList.remove("light");
    document.querySelector("#header").classList.remove("lightHeader");
    document.querySelector("#colorGeneratorButton").classList.remove("lightButton");
    document.querySelector("#researchAgreementButton").classList.remove("lightButton");
    document.querySelector("#modLibraryButton").classList.remove("lightButton");
    document.querySelector("#changelog").classList.remove("lightButton");
    document.querySelector("#themeButton").classList.remove("lightButton");
  }
  else {
    document.body.classList.add("light");
    document.querySelector("#header").classList.add("lightHeader");
    document.querySelector("#colorGeneratorButton").classList.add("lightButton");
    document.querySelector("#researchAgreementButton").classList.add("lightButton");
    document.querySelector("#modLibraryButton").classList.add("lightButton");
    document.querySelector("#changelog").classList.add("lightButton");
    document.querySelector("#themeButton").classList.add("lightButton");
    document.body.classList.remove("dark");
    document.querySelector("#header").classList.remove("darkHeader");
    document.querySelector("#colorGeneratorButton").classList.remove("darkButton");
    document.querySelector("#researchAgreementButton").classList.remove("darkButton");
    document.querySelector("#modLibraryButton").classList.remove("darkButton");
    document.querySelector("#changelog").classList.remove("darkButton");
    document.querySelector("#themeButton").classList.remove("darkButton");
  }
});

insertColorGenerator();

DOMSelectors.version.innerHTML = `Gravity Assist v${changelog[changelog.length - 1].version} by DubNubz`;

DOMSelectors.colorGeneratorButton.addEventListener("click", function () {
  insertColorGenerator();
  DOMSelectors.colorGeneratorButton.classList.add("activeHeaderButton");
  DOMSelectors.researchAgreeementButton.classList.remove("activeHeaderButton");
  DOMSelectors.modLibraryButton.classList.remove("activeHeaderButton");
  DOMSelectors.changelog.classList.remove("activeHeaderButton");
});

DOMSelectors.researchAgreeementButton.addEventListener("click", function () {
  insertRAHelper();
  DOMSelectors.colorGeneratorButton.classList.remove("activeHeaderButton");
  DOMSelectors.researchAgreeementButton.classList.add("activeHeaderButton");
  DOMSelectors.modLibraryButton.classList.remove("activeHeaderButton");
  DOMSelectors.changelog.classList.remove("activeHeaderButton");
});

DOMSelectors.modLibraryButton.addEventListener("click", function () {
  insertModLibrary();
  DOMSelectors.colorGeneratorButton.classList.remove("activeHeaderButton");
  DOMSelectors.researchAgreeementButton.classList.remove("activeHeaderButton");
  DOMSelectors.modLibraryButton.classList.add("activeHeaderButton");
  DOMSelectors.changelog.classList.remove("activeHeaderButton");
})

DOMSelectors.changelog.addEventListener("click", function () {
  insertChangelog();
  DOMSelectors.colorGeneratorButton.classList.remove("activeHeaderButton");
  DOMSelectors.researchAgreeementButton.classList.remove("activeHeaderButton");
  DOMSelectors.modLibraryButton.classList.remove("activeHeaderButton");
  DOMSelectors.changelog.classList.add("activeHeaderButton");
})
