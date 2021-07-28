let btnListWrapper = document.querySelector(".play-buttons__button-list"),
  playBtns = btnListWrapper.querySelectorAll(".play-buttons__button"),
  modalText = document.querySelector(".modal__text"),
  modal = document.querySelector(".modal"),
  yourChoiceCardRender = document.querySelector(".play-board__card--you"),
  computerCardRender = document.querySelector(".play-board__card--computer"),
  db = [
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
      hp: 100,
      choice: "",
      choiceNumber: "",
    },
    computer: {
      hp: 100,
      choice: "",
      choiceNumber: "",
    },
  };

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
        playersDb.computer.choice = db[playersDb.computer.choiceNumber].name;
        renderChoiceCards(
          playersDb.you.choiceNumber,
          playersDb.computer.choiceNumber
        );
        setTimeout(
          determinateWinner,
          1000,
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
  let yourChoice = db[i].name;
  console.log(`You choose ${yourChoice}`);
  return yourChoice;
}

// Генерация варианта компьютера
function generateComputerChoice() {
  let computerChoiceNumber = randomInteger(0.5, 2);
  // console.log(computerChoiceNumber);
  let computerChoice = db[computerChoiceNumber].name;
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

// Рендерим результаты на странице
function renderChoiceCards(a, b) {
  yourChoiceCardRender.innerHTML =
    '<img src="' + db[a].img + '" alt="" class="play-buttons__img" />';
  computerCardRender.innerHTML =
    '<img src="' + db[b].img + '" alt="" class="play-buttons__img" />';
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
