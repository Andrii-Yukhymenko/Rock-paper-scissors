let btnListWrapper = document.querySelector(".play-buttons__button-list"),
  modalText = document.querySelector(".modal__text"),
  modal = document.querySelector(".modal"),
  yourChoiceCardRender = document.querySelector(".play-board__card--you"),
  computerCardRender = document.querySelector(".play-board__card--computer"),
  yourHp = document.querySelector(".users__user-hp--you"),
  computerHp = document.querySelector(".users__user-hp--computer"),
  scoreLine = document.querySelector(".score-line__line"),
  cardsDb = [
    {
      name: "rock",
      breaks: [`scissors`],
      img: "img/rock.png",
    },
    {
      name: "paper",
      breaks: [`rock`],
      img: "img/paper.png",
    },
    {
      name: "scissors",
      breaks: [`paper`],
      img: "img/scissors.png",
    },
  ],
  playersDb = {
    you: {
      hp: 2,
      choice: "",
      choiceNumber: "",
    },
    computer: {
      hp: 2,
      choice: "",
      choiceNumber: "",
    },
  };

// Изначальный рендер жизней
renderHp();

renderCards();
let playBtns = btnListWrapper.querySelectorAll(".play-buttons__button");

// Событие выбора карточки
btnListWrapper.addEventListener("click", (event) => {
  // console.log(event.target);
  if (event.target.classList.contains("play-buttons__button")) {
    disableButtons();
    console.log("Buttons is disabled");
    playBtns.forEach((item, i) => {
      if (event.target === item) {
        playersDb.you.choice = generateYourChoice(i);
        playersDb.you.choiceNumber = i;
        playersDb.computer.choiceNumber = generateComputerChoice();
        playersDb.computer.choice =
          cardsDb[playersDb.computer.choiceNumber].name;
        renderChoiceCards(
          playersDb.you.choiceNumber,
          playersDb.computer.choiceNumber
        );
        setTimeout(
          determinateWinner,
          1500,
          playersDb.you.choiceNumber,
          playersDb.computer.choice,
          playersDb.you.choice
        );
      }
    });
  }
});

// Событие закрытия модального окна
modal.addEventListener("click", () => {
  modal.classList.remove("modal--visible");
  resetChoiceCards();
  enableButtons();
});

// Генерация вашего варианта
function generateYourChoice(i) {
  let yourChoice = cardsDb[i].name;
  console.log(`You choose ${yourChoice}`);
  return yourChoice;
}

// Генерация варианта компьютера
function generateComputerChoice() {
  let computerChoiceNumber = randomInteger(0.5, 2);
  // console.log(computerChoiceNumber);
  let computerChoice = cardsDb[computerChoiceNumber].name;
  console.log(`Computer choose ${computerChoice}`);
  return computerChoiceNumber;
}

// Генерация рандомного числа
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

// Определение победителя
function determinateWinner(a, b, c) {
  modal.classList.add("modal--visible");
  modalText.className = "modal__text";
  if (cardsDb[a].breaks.includes(b)) {
    modalText.classList.add("modal__text--win");
    playersDb.you.hp++;
    playersDb.computer.hp--;
    console.log(`You have ${playersDb.you.hp} hp`);
    console.log(`Computer have ${playersDb.computer.hp} hp`);
    if (playersDb.computer.hp === 0) {
      modalText.innerText = "!!! TOTAL WIN !!!";
      console.log("total win");
      setTimeout(() => {
        location.reload();
      }, 2500);
    } else {
      console.log("win");
      modalText.innerText = "You win!!!";
    }
  } else if (c === b) {
    console.log("nobody");
    modalText.innerText = "Nobody";
    modalText.classList.add("modal__text--nobody");
    console.log(`You have ${playersDb.you.hp} hp`);
    console.log(`Computer have ${playersDb.computer.hp} hp`);
  } else {
    modalText.classList.add("modal__text--lose");
    playersDb.you.hp--;
    playersDb.computer.hp++;
    console.log(`You have ${playersDb.you.hp} hp`);
    console.log(`Computer have ${playersDb.computer.hp} hp`);
    if (playersDb.you.hp === 0) {
      modalText.innerText = "!!! TOTAL LOSE !!!";
      console.log("total lose");
      setTimeout(() => {
        location.reload();
      }, 2500);
    } else {
      modalText.innerText = "You lose ;(";
      console.log("lose");
    }
  }
  renderHp();
}

// Рендерим результаты на странице
function renderChoiceCards(a, b) {
  yourChoiceCardRender.innerHTML =
    '<img src="' + cardsDb[a].img + '" alt="" class="play-buttons__img" />';
  computerCardRender.innerHTML =
    '<img src="' + cardsDb[b].img + '" alt="" class="play-buttons__img" />';
}

// Возвращаем стандартные картинки вместо выбранных
function resetChoiceCards() {
  yourChoiceCardRender.innerHTML =
    '<img src="img/question.png" alt="" class="play-buttons__img" />';
  computerCardRender.innerHTML =
    '<img src="img/question.png" alt="" class="play-buttons__img" />';
}

// Отключение кнопок после, защита от спама
function disableButtons() {
  playBtns.forEach((item) => {
    item.classList.add("play-buttons__button--disabled");
  });
}

// Включение кнопок после, защита от спама
function enableButtons() {
  playBtns.forEach((item) => {
    item.classList.remove("play-buttons__button--disabled");
  });
}

// Рендерим значения и полоску хп
function renderHp() {
  yourHp.innerText = playersDb.you.hp;
  computerHp.innerText = playersDb.computer.hp;
  scoreLine.style.width =
    (playersDb.you.hp * 100) / (playersDb.you.hp + playersDb.computer.hp) + `%`;
}

function renderCards() {
  cardsDb.forEach((item) => {
    btnListWrapper.innerHTML +=
      '<div class="play-buttons__button" style="background: url(' +
      item.img +
      ')  0 0/contain no-repeat"></div>';
  });
}
