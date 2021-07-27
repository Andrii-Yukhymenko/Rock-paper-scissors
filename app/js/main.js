"use strict";

var btnListWrapper = document.querySelector(".play-buttons__button-list"),
    playBtns = btnListWrapper.querySelectorAll(".play-buttons__button"),
    modalText = document.querySelector(".modal__text"),
    modal = document.querySelector(".modal"),
    yourChoiceCardRender = document.querySelector(".play-board__card--you"),
    computerCardRender = document.querySelector(".play-board__card--computer"),
    // test = `"${db[yourChoiceNumber].img}`,
db = [{
  name: "rock",
  breaks: ["scissors"],
  img: "img/rock.png"
}, {
  name: "paper",
  breaks: ["rock"],
  img: "img/paper.png"
}, {
  name: "scissors",
  breaks: ["paper"],
  img: "img/scissors.png"
}];
btnListWrapper.addEventListener("click", function (event) {
  console.log(event.target);

  if (event.target.classList.contains("play-buttons__button")) {
    playBtns.forEach(function (item, i) {
      if (event.target === item) {
        var yourChoice = generateYourChoice(i);
        var yourChoiceNumber = i;
        var computerChoiceNumber = generateComputerChoice();
        var computerChoice = db[computerChoiceNumber].name;
        renderChoiceCards(yourChoiceNumber, computerChoiceNumber);
        setTimeout(determinateWinner, 1500, yourChoiceNumber, computerChoice, yourChoice);
      }
    });
  }
}); // Событие закрытия модального окна

modal.addEventListener("click", function () {
  modal.classList.remove("modal--visible");
  resetChoiceCards();
}); // Генерация вашего варианта

function generateYourChoice(i) {
  console.clear();
  var yourChoice = db[i].name;
  console.log("You choose ".concat(yourChoice));
  return yourChoice;
} // Генерация варианта компьютера


function generateComputerChoice() {
  var computerChoiceNumber = randomInteger(0.5, 2); // console.log(computerChoiceNumber);

  var computerChoice = db[computerChoiceNumber].name;
  console.log("Computer choose ".concat(computerChoice));
  return computerChoiceNumber;
} // Генерация рандомного числа


function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
} // Определение победителя


function determinateWinner(a, b, c) {
  modal.classList.add("modal--visible");
  modalText.className = "modal__text";

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
} // Рендерим результаты на странице


function renderChoiceCards(a, b) {
  yourChoiceCardRender.innerHTML = '<img src="' + db[a].img + '" alt="" class="play-buttons__img" />';
  computerCardRender.innerHTML = '<img src="' + db[b].img + '" alt="" class="play-buttons__img" />';
} // Возвращаем стандартные картинки вместо выбранных


function resetChoiceCards() {
  yourChoiceCardRender.innerHTML = '<img src="img/question.png" alt="" class="play-buttons__img" />';
  computerCardRender.innerHTML = '<img src="img/question.png" alt="" class="play-buttons__img" />';
}
//# sourceMappingURL=main.js.map
