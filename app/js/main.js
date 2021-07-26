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
        var computerChoice = generateComputerChoice();
        determinateWinner(yourChoice, computerChoice);
      }
    }); // let computerChoice = generateComputerChoice();
    // determinateWinner(yourChoice, computerChoice);
  }
});

function generateYourChoice(i) {
  console.clear();
  var yourChoice = db[i].name;
  console.log("You choose ".concat(yourChoice));
  return yourChoice;
}

function generateComputerChoice() {
  var computerChoice = randomInteger(0.5, 2);
  computerChoice = db[computerChoice].name;
  console.log("Computer choose ".concat(computerChoice));
  return computerChoice;
}

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function determinateWinner(a, b) {
  if (db[a].breaks.hasOwnProperty(b) === true) {
    console.log("You win!!!");
  }
}
//# sourceMappingURL=main.js.map
