import '../css/style.css';
import { DOMSelectors } from './domselectors';
import { insertColorGenerator } from './color_generator';
import { insertRAHelper } from './ra_helper';

DOMSelectors.themeButton.addEventListener("click", function () {
  if (document.body.classList.contains("light")) {
    document.body.classList.add("dark");
    document.querySelector("#header").classList.add("darkHeader");
    document.querySelector("#colorGeneratorButton").classList.add("darkButton");
    document.querySelector("#researchAgreementButton").classList.add("darkButton");
    document.querySelector("#changelog").classList.add("darkButton");
    document.body.classList.remove("light");
    document.querySelector("#header").classList.remove("lightHeader");
    document.querySelector("#colorGeneratorButton").classList.remove("lightButton");
    document.querySelector("#researchAgreementButton").classList.remove("lightButton");
    document.querySelector("#changelog").classList.remove("lightButton");
  }
  else {
    document.body.classList.add("light");
    document.querySelector("#header").classList.add("lightHeader");
    document.querySelector("#colorGeneratorButton").classList.add("lightButton");
    document.querySelector("#researchAgreementButton").classList.add("lightButton");
    document.querySelector("#changelog").classList.add("lightButton");
    document.body.classList.remove("dark");
    document.querySelector("#header").classList.remove("darkHeader");
    document.querySelector("#colorGeneratorButton").classList.remove("darkButton");
    document.querySelector("#researchAgreementButton").classList.remove("darkButton");
    document.querySelector("#changelog").classList.remove("darkButton");
  }
});

insertColorGenerator();

DOMSelectors.colorGeneratorButton.addEventListener("click", function () {
  insertColorGenerator();
});

DOMSelectors.researchAgreeementButton.addEventListener("click", function () {
  insertRAHelper();
});
