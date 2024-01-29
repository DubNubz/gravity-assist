
const colors = ["red", "orange", "gold", "yellow", "green", "blue", "hotPink", "lightPink", "white", 
"black", "pastelRed", "pastelOrange", "deepOrange", "pastelYellow", "deepYellow", "pastelGreen", 
"deepGreen", "aqua", "turquoise", "lightBlue", "cyan", "pastelBlue", "pastelPink", "deepPink", "normalText", 
"darkGray", "invisible"];
const colorCodes = ["R", "O", "D", "Y", "G", "B", "U", "P", "W", "K", "cffaaaa", "cffddaa", "cff9756", 
"cfbffaa", "cffe561", "caaffaa", "c56ff93", "c5bffd2", "c1abc9c", "c6af1fd", "c56ddff", "caac8ff", "cffaafe", 
"cf467cb", "cccc9c6", "c878787", "c222222"];

function addMarker(num) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const marker = document.createElement("span");
  marker.classList.add(colors[num]);
  marker.textContent = "★";

  range.deleteContents();
  range.insertNode(marker);

  range.setStartAfter(marker);
  range.setEndAfter(marker);
  selection.removeAllRanges();
  selection.addRange(range);

  document.querySelector("#outputBox").innerHTML = compileText(0);
  document.querySelector("#messageCharacterCounter").innerHTML = `${compileText(1).length}/280 characters (chat message)`;
  document.querySelector("#mailCharacterCounter").innerHTML = `${compileText(1).length}/1000 characters (mail)`;
};

function compileText(retrieve) {
  const text = document.querySelector("#textBox").innerHTML;
  let finalText = [text];
  let charCounterText = [text];
  
  for (let i in colors) {
    while (finalText[finalText.length - 1].includes(`<span class="${colors[i]}">★`) == true) {
      finalText.push(finalText[finalText.length - 1].replace(`<span class="${colors[i]}">★`, `</span><span class="${colors[i]}">#${colorCodes[i]}`));
      charCounterText.push(charCounterText[charCounterText.length - 1].replace(`<span class="${colors[i]}">★`, `#${colorCodes[i]}`).replace("</span>", ""));
    }
    while (finalText[finalText.length - 1].includes("<div>") == true) {
      finalText.push(finalText[finalText.length - 1].replace("<div>", "#r").replace("</div>", ""));
      charCounterText.push(charCounterText[charCounterText.length - 1].replace("<div>", "#r").replace("</div>", ""));
    }
    while (charCounterText[charCounterText.length - 1].includes("<br>") == true) {
      charCounterText.push(charCounterText[charCounterText.length - 1].replace("<br>", ""));
    }
    while (charCounterText[charCounterText.length - 1].includes("&nbsp;") == true) {
      charCounterText.push(charCounterText[charCounterText.length - 1].replace("&nbsp;", ""));
    }
    while (charCounterText[charCounterText.length - 1].includes(`<span class="${colors[i]}">`) == true) {
      charCounterText.push(charCounterText[charCounterText.length - 1].replace(`<span class="${colors[i]}">`, "").replace("</span>", ""));
    }
  }
  console.log(charCounterText);
  
  switch (Number(retrieve)) {
    case 0:
      return finalText[finalText.length - 1];
    case 1:
      return charCounterText[charCounterText.length - 1];
  }
};

function insertColorGenerator() {
    document.querySelector(".app").innerHTML = 
    `<div class="title">
    <h2>Color Generator</h2>
    <p>Click anywhere in the input box and click one of the buttons to add a marker, which will generate a color.</p>
    <p>Copy the text in the output box and paste it in to Infinite Lagrange.</p>
    </div>
    
    <div class="buttonsArray">
    <button class="button" id="redButton">0</button>
    <button class="button" id="orangeButton">1</button>
    <button class="button" id="goldButton">2</button>
    <button class="button" id="yellowButton">3</button>
    <button class="button" id="greenButton">4</button>
    <button class="button" id="blueButton">5</button>
    <button class="button" id="hotPinkButton">6</button>
    <button class="button" id="lightPinkButton">7</button>
    <button class="button" id="whiteButton">8</button>
    <button class="button" id="blackButton">9</button>
    <button class="button" id="pastelRedButton">10</button>
    <button class="button" id="pastelOrangeButton">11</button>
    <button class="button" id="deepOrangeButton">12</button>
    <button class="button" id="pastelYellowButton">13</button>
    <button class="button" id="deepYellowButton">14</button>
    <button class="button" id="pastelGreenButton">15</button>
    <button class="button" id="deepGreenButton">16</button>
    <button class="button" id="aquaButton">17</button>
    <button class="button" id="turquoiseButton">18</button>
    <button class="button" id="lightBlueButton">19</button>
    <button class="button" id="cyanButton">20</button>
    <button class="button" id="pastelBlueButton">21</button>
    <button class="button" id="pastelPinkButton">22</button>
    <button class="button" id="deepPinkButton">23</button>
    <button class="button" id="normalTextButton">24</button>
    <button class="button" id="darkGrayButton">25</button>
    <button class="button" id="invisibleButton">26</button>
    </div>
    
    <div class="cardTitles">
    <h2>Input</h2>
    <h2>Output</h2>
    </div>
    
    <div class="cards">
    <div id="textBox" contenteditable="true">Click <span class="gold">★here </span><span class="white">★to start typing!</span><div><br></div><div><span class="cyan">★Click anywhere </span><span class="white">★in your text and </span><span class="pastelPink">★click one of the buttons above </span><span class="white">★to add a marker to change colors!</span></div></div>
    <div id="outputBox">Click <span class="gold">#Dhere </span><span class="white">#Wto start typing!#r</span><br>#r<span class="cyan">#c56deffClick anywhere </span><span class="white">#Win your text and </span><span class="pastelPink">#cffaafeclick one of the buttons above </span><span class="white">#Wto add a marker to change colors!</span></div>
    </div>
    
    <p id="messageCharacterCounter">151/280 characters (chat message)</p>
    <p id="mailCharacterCounter">151/1000 characters (mail)</p>
    <p>The colors displayed in the input box may not 100% represent what it looks like ingame. Test the output before
    sending a mail with it.</p>
    <button id="resetButton">Reset</button>`;

    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => button.addEventListener("click", function () {
        addMarker(button.textContent);
    }));
    
    document.querySelector("#resetButton").addEventListener("click", function () {
        document.querySelector("#textBox").innerHTML = "";
        document.querySelector("#outputBox").innerHTML = "";
        document.querySelector("#messageCharacterCounter").innerHTML = `<p id="characterCounter">0/280 characters (chat message)</p>`;
        document.querySelector("#mailCharacterCounter").innerHTML = `<p id="characterCounter">0/1000 characters (mail)</p>`;
    });
    
    document.querySelector("#textBox").addEventListener("input", function () {
        document.querySelector("#outputBox").innerHTML = compileText(0);
        document.querySelector("#messageCharacterCounter").innerHTML = `${compileText(1).length}/280 characters (chat message)`
        document.querySelector("#mailCharacterCounter").innerHTML = `${compileText(1).length}/1000 characters (mail)`;
    });
};

export { insertColorGenerator };
