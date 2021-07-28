"use strict";

var btnListWrapper = document.querySelector(".play-buttons__button-list"),
    playBtns = btnListWrapper.querySelectorAll(".play-buttons__button"),
    modalText = document.querySelector(".modal__text"),
    modal = document.querySelector(".modal"),
    yourChoiceCardRender = document.querySelector(".play-board__card--you"),
    computerCardRender = document.querySelector(".play-board__card--computer"),
    yourHp = document.querySelector(".users__user-hp--you"),
    computerHp = document.querySelector(".users__user-hp--computer"),
    scoreLine = document.querySelector(".score-line__line"),
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
}],
    playersDb = {
  you: {
    hp: 5,
    choice: "",
    choiceNumber: ""
  },
  computer: {
    hp: 5,
    choice: "",
    choiceNumber: ""
  }
}; // Изначальный рендер жизней

renderHp(); // Событие выбора карточки

btnListWrapper.addEventListener("click", function (event) {
  // console.log(event.target);
  if (event.target.classList.contains("play-buttons__button")) {
    disableButtons();
    console.log("Buttons is disabled");
    playBtns.forEach(function (item, i) {
      if (event.target === item) {
        playersDb.you.choice = generateYourChoice(i);
        playersDb.you.choiceNumber = i;
        playersDb.computer.choiceNumber = generateComputerChoice();
        playersDb.computer.choice = db[playersDb.computer.choiceNumber].name;
        renderChoiceCards(playersDb.you.choiceNumber, playersDb.computer.choiceNumber);
        setTimeout(determinateWinner, 1500, playersDb.you.choiceNumber, playersDb.computer.choice, playersDb.you.choice);
      }
    });
  }
}); // Событие закрытия модального окна

modal.addEventListener("click", function () {
  modal.classList.remove("modal--visible");
  resetChoiceCards();
  enableButtons();
}); // Генерация вашего варианта

function generateYourChoice(i) {
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
    playersDb.you.hp++;
    playersDb.computer.hp--;
    console.log("You have ".concat(playersDb.you.hp, " hp"));
    console.log("Computer have ".concat(playersDb.computer.hp, " hp"));
  } else if (c === b) {
    console.log("nobody");
    modalText.innerText = "Nobody";
    modalText.classList.add("modal__text--nobody");
    console.log("You have ".concat(playersDb.you.hp, " hp"));
    console.log("Computer have ".concat(playersDb.computer.hp, " hp"));
  } else {
    console.log("lose");
    modalText.innerText = "You lose ;(";
    modalText.classList.add("modal__text--lose");
    playersDb.you.hp--;
    playersDb.computer.hp++;
    console.log("You have ".concat(playersDb.you.hp, " hp"));
    console.log("Computer have ".concat(playersDb.computer.hp, " hp"));
  }

  renderHp();
} // Рендерим результаты на странице


function renderChoiceCards(a, b) {
  yourChoiceCardRender.innerHTML = '<img src="' + db[a].img + '" alt="" class="play-buttons__img" />';
  computerCardRender.innerHTML = '<img src="' + db[b].img + '" alt="" class="play-buttons__img" />';
} // Возвращаем стандартные картинки вместо выбранных


function resetChoiceCards() {
  yourChoiceCardRender.innerHTML = '<img src="img/question.png" alt="" class="play-buttons__img" />';
  computerCardRender.innerHTML = '<img src="img/question.png" alt="" class="play-buttons__img" />';
} // Отключение кнопок после, защита от спама


function disableButtons() {
  playBtns.forEach(function (item) {
    item.classList.add("play-buttons__button--disabled");
  });
} // Включение кнопок после, защита от спама


function enableButtons() {
  playBtns.forEach(function (item) {
    item.classList.remove("play-buttons__button--disabled");
  });
} // Рендерим значения и полоску хп


function renderHp() {
  yourHp.innerText = playersDb.you.hp;
  computerHp.innerText = playersDb.computer.hp;
  scoreLine.style.width = playersDb.you.hp * 10 + "%";
}
//# sourceMappingURL=main.js.map
