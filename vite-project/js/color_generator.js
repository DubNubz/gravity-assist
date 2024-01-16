
const colors = ["red", "orange", "gold", "yellow", "green", "blue", "hotPink", "lightPink", "white", 
"black", "underline", "pastelRed", "pastelOrange", "deepOrange", "pastelYellow", "deepYellow", "pastelGreen", 
"deepGreen", "aqua", "turquoise", "lightBlue", "cyan", "pastelBlue", "pastelPink", "deepPink", "normalText", 
"darkGray", "invisible"];
const colorCodes = ["R", "O", "D", "Y", "G", "B", "U", "P", "W", "K", "E", "cffaaaa", "cffddaa", "cff9756", 
"cfbffaa", "cffe561", "caaffaa", "c56ff93", "c5bffd2", "c1abc9c", "c6af1fd", "c56ddff", "caac8ff", "cffaafe", 
"cf467cb", "cccc9c6", "c878787", "c222222"];

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

  document.querySelector("#messageCharacterCounter").innerHTML = `${compileText().length}/280 characters (chat message)`
  document.querySelector("#mailCharacterCounter").innerHTML = `${compileText().length}/1000 characters (mail)`;
};

function compileText() {
  const text = document.querySelector("#textBox").innerHTML;
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

function insertColorGenerator() {
    document.querySelector(".app").innerHTML = 
    `<div class="title">
    <h2>Color Generator</h2>
    <p>Highlight your text in the input box and click one of the buttons to add a color.</p>
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
    <button class="button" id="underlineButton">10</button>
    <button class="button" id="pastelRedButton">11</button>
    <button class="button" id="pastelOrangeButton">12</button>
    <button class="button" id="deepOrangeButton">13</button>
    <button class="button" id="pastelYellowButton">14</button>
    <button class="button" id="deepYellowButton">15</button>
    <button class="button" id="pastelGreenButton">16</button>
    <button class="button" id="deepGreenButton">17</button>
    <button class="button" id="aquaButton">18</button>
    <button class="button" id="turquoiseButton">19</button>
    <button class="button" id="lightBlueButton">20</button>
    <button class="button" id="cyanButton">21</button>
    <button class="button" id="pastelBlueButton">22</button>
    <button class="button" id="pastelPinkButton">23</button>
    <button class="button" id="deepPinkButton">24</button>
    <button class="button" id="normalTextButton">25</button>
    <button class="button" id="darkGrayButton">26</button>
    <button class="button" id="invisibleButton">27</button>
    </div>
    
    <div class="cardTitles">
    <h2>Input</h2>
    <h2>Output</h2>
    </div>
    
    <div class="cards">
    <div id="textBox" contenteditable="true">Click <span class="gold">here</span> to start typing!<br><br><span class="cyan">Highlight</span> your text and <span class="pastelPink">click one of the buttons above</span> to change the color of it!</div>
    <div id="outputBox">Click #Dhere #Wto start typing!#r#r<br>#c56deffHighlight #Wyour text and #cffaafeclick one of the buttonsabove #Wto change the color of it!</div>
    </div>
    
    <p id="messageCharacterCounter">135/280 characters (chat message)</p>
    <p id="mailCharacterCounter">135/1000 characters (mail)</p>
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
        document.querySelector("#outputBox").innerHTML = compileText();
        document.querySelector("#messageCharacterCounter").innerHTML = `${compileText().length}/280 characters (chat message)`
        document.querySelector("#mailCharacterCounter").innerHTML = `${compileText().length}/1000 characters (mail)`;
    });
};

export { insertColorGenerator };
