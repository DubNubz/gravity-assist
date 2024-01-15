import '../css/style.css';
import { DOMSelectors } from './domselectors';
import { insertHome } from './pages';

const colors = ["red", "orange", "gold", "yellow", "green", "blue", "hotPink", "lightPink", "white", "black", "underline", "pastelRed", "pastelOrange", "deepOrange", "pastelYellow", "deepYellow", "pastelGreen", "deepGreen", "aqua", "turquoise", "lightBlue", "cyan", "pastelBlue", "pastelPink", "deepPink", "normalText", "darkGray", "invisible"];
const colorCodes = ["R", "O", "D", "Y", "G", "B", "U", "P", "W", "K", "E", "cffaaaa", "cffddaa", "cff9756", "cfbffaa", "cffe561", "caaffaa", "c56ff93", "c5bffd2", "c1abc9c", "c6af1fd", "c56ddff", "caac8ff", "cffaafe", "cf467cb", "cccc9c6", "c878787", "c222222"];

function getColor(num) {
  let color;

  switch (Number(num)) {
    case 0:
      return color = "red";
    case 1:
      return color = "orange";
    case 2:
      return color = "gold";
    case 3:
      return color = "yellow";
    case 4:
      return color = "green";
    case 5:
      return color = "blue";
    case 6:
      return color = "hotPink";
    case 7:
      return color = "lightPink";
    case 8:
      return color = "white";
    case 9:
      return color = "black";
    case 10:
      return color = "underline";
    case 11:
    default:
      return color = "white";
  }
};

function addMarker(num) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const marker = document.createElement("span");
  marker.classList.add(colors[num]);
  marker.textContent = selection;

  range.deleteContents();
  range.insertNode(marker);

  range.setStartAfter(marker);
  range.setEndAfter(marker);
  selection.removeAllRanges();
  selection.addRange(range);

  DOMSelectors.outputBox.innerHTML = `<div id="textBox">${compileText()}</div>`;
  DOMSelectors.charCounter.innerHTML = `<p id="characterCounter">${compileText().length}/1000 characters</p>`;
};

function compileText() {
  const text = DOMSelectors.textBox.innerHTML;
  let finalText = [text];
  for (let i = 0; i < colors.length; i++) {
    while (finalText[finalText.length - 1].includes(`<span class="${colors[i]}">`) == true) {
      finalText.push(finalText[finalText.length - 1].replace(`<span class="${colors[i]}">`, `#${colorCodes[i]}`));
      finalText.push(finalText[finalText.length - 1].replace(`</span>`, "#W"));
    }
    while (finalText[finalText.length - 1].includes("<div>") == true) {
      finalText.push(finalText[finalText.length - 1].replace("<div>", "#r"));
      finalText.push(finalText[finalText.length - 1].replace("</div>", ""));
    }
  }
  
  return finalText[finalText.length - 1];
};

const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => button.addEventListener("click", function () {
  addMarker(button.textContent);
}));

DOMSelectors.reset.addEventListener("click", function () {
  DOMSelectors.textBox.innerHTML = "";
  DOMSelectors.outputBox.innerHTML = "";
  DOMSelectors.messageCharCounter.innerHTML = `<p id="characterCounter">0/280 characters (chat message)</p>`;
  DOMSelectors.mailCharCounter.innerHTML = `<p id="characterCounter">0/1000 characters (mail)</p>`;
});

DOMSelectors.textBox.addEventListener("input", function () {
  DOMSelectors.outputBox.innerHTML = compileText();
  DOMSelectors.messageCharCounter.innerHTML = `${compileText().length}/280 characters (chat message)`
  DOMSelectors.mailCharCounter.innerHTML = `${compileText().length}/1000 characters (mail)`;
});

DOMSelectors.themeButton.addEventListener("click", function () {
  if (document.body.classList.contains("light")) {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  }
  else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  }
});
