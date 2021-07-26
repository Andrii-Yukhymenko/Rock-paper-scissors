"use strict";

var btnListWrapper = document.querySelector(".play-buttons__button-list"),
    btnList = btnListWrapper.querySelectorAll(".play-buttons__button"),
    modalText = document.querySelector(".modal__text"),
    modal = document.querySelector(".modal"),
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
      if (event.target === item) {
        var yourChoice = generateYourChoice(i);
        var yourChoiceNumber = i;
        var computerChoiceNumber = generateComputerChoice();
        var computerChoice = db[computerChoiceNumber].name;
        determinateWinner(yourChoiceNumber, computerChoice, yourChoice);
      }
    });
  }
});
modal.addEventListener("click", function () {
  modal.classList.remove('modal--visible');
});

function generateYourChoice(i) {
  console.clear();
  var yourChoice = db[i].name;
  console.log("You choose ".concat(yourChoice));
  return yourChoice;
}

function generateComputerChoice() {
  var computerChoiceNumber = randomInteger(0.5, 2); // console.log(computerChoiceNumber);

  var computerChoice = db[computerChoiceNumber].name;
  console.log("Computer choose ".concat(computerChoice));
  return computerChoiceNumber;
}

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function determinateWinner(a, b, c) {
  modal.classList.add("modal--visible");
  modalText.className = 'modal__text';

  if (db[a].breaks.includes(b)) {
    console.log("win");
    modalText.innerText = "You win!!!";
    modalText.classList.add("modal__text--win");
  } else if (c === b) {
    console.log("nobody");
    modalText.innerText = "Nobody";
    modalText.classList.add("modal__text--nobody");
  } else {
    console.log("lose");
    modalText.innerText = "You lose ;(";
    modalText.classList.add("modal__text--lose");
  }
}
//# sourceMappingURL=main.js.map
