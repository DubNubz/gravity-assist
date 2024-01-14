import '../css/style.css';
import { insertHome } from './pages';

var realText;

function getSelectedText() {
  let selectedText = '';
  selectedText = document.getSelection();
  return selectedText;
};

function changeColors() {
  const selectedtext = getSelectedText().toString();
  const selectedChars = selectedtext.split("");
  let alltext = document.inputform.inputtext.value;

  /*if (realText == null) {
    alltext = document.inputform.inputtext.value;
  } else {
    alltext = realText;
  }*/

  const allChars = alltext.split("");
  const allCharList = [];
  let x = 0;
  let modifiedCharList = [];

  for (let i = 0; i < allChars.length; i++) {
    if (allChars[i] === selectedChars[i - x]) {
      modifiedCharList.push(allChars[i]);

      if (selectedChars[i - x + 1] == undefined) {
        allCharList.push(`<span class="blue">${modifiedCharList.join("")}</span>`);

      }

    } else {
      x++;
      allCharList.push(allChars[i]);

    }
  }

  const finalOutput = allCharList.join("").replace(/\n/g, `<br>`);

  document.querySelector("#output").innerHTML = finalOutput;
  realText = finalOutput;
  console.log(realText);
}

document.querySelector("#getButton").addEventListener("click", function () {
  changeColors();
});

