"use strict";

var btnListWrapper = document.querySelector(".play-buttons__button-list"),
    btnList = btnListWrapper.querySelectorAll(".play-buttons__button"),
    db = [{
  name: "rock",
  breaks: ["scissors"],
  img: ""
}, {
  name: "paper",
  breaks: ["rock"],
  img: ""
}, {
  name: "scissors",
  breaks: ["paper"],
  img: ""
}];
btnListWrapper.addEventListener("click", function (event) {
  if (event.target.classList.contains("play-buttons__button")) {
    btnList.forEach(function (item, i) {
      if (event.target == item) {
        var yourChoice = generateYourChoice(i);
        var yourChoiceNumber = i;
        var computerChoice = generateComputerChoice()[1];
        var computerChoiceNumber = generateComputerChoice()[0];
        determinateWinner(yourChoiceNumber, computerChoice, yourChoice);
      }
    });
  }
});

function generateYourChoice(i) {
  console.clear();
  var yourChoice = db[i].name;
  console.log("You choose ".concat(yourChoice));
  return yourChoice;
}

function generateComputerChoice() {
  var computerChoiceNumber = randomInteger(0.5, 2);
  console.log(computerChoiceNumber);
  var computerChoice = db[computerChoiceNumber].name;
  console.log("Computer choose ".concat(computerChoice));
  return [computerChoiceNumber, computerChoice];
}

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function determinateWinner(a, b, c) {
  if (db[a].breaks.includes(b)) {
    console.log("win");
  } else if (c === b) {
    console.log("nobody");
  } else {
    console.log("lose");
  }
}
//# sourceMappingURL=main.js.map
