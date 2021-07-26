let btnListWrapper = document.querySelector(".play-buttons__button-list"),
  btnList = btnListWrapper.querySelectorAll(".play-buttons__button"),
  modalText = document.querySelector(".modal__text"),
  modal = document.querySelector(".modal"),
  db = [
    {
      name: "rock",
      breaks: [`scissors`],
      img: "",
    },
    {
      name: "paper",
      breaks: [`rock`],
      img: "",
    },
    {
      name: "scissors",
      breaks: [`paper`],
      img: "",
    },
  ];

btnListWrapper.addEventListener("click", (event) => {
  if (event.target.classList.contains("play-buttons__button")) {
    btnList.forEach((item, i) => {
      if (event.target === item) {
        let yourChoice = generateYourChoice(i);
        let yourChoiceNumber = i;
        let computerChoiceNumber = generateComputerChoice();
        let computerChoice = db[computerChoiceNumber].name;
        determinateWinner(yourChoiceNumber, computerChoice, yourChoice);
      }
    });
  }
});

modal.addEventListener("click", () => {
  modal.classList.remove('modal--visible');
});

function generateYourChoice(i) {
  console.clear();
  let yourChoice = db[i].name;
  console.log(`You choose ${yourChoice}`);
  return yourChoice;
}
function generateComputerChoice() {
  let computerChoiceNumber = randomInteger(0.5, 2);
  // console.log(computerChoiceNumber);
  let computerChoice = db[computerChoiceNumber].name;
  console.log(`Computer choose ${computerChoice}`);
  return computerChoiceNumber;
}
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
function determinateWinner(a, b, c) {
  modal.classList.add("modal--visible");
  modalText.className = '';
  if (db[a].breaks.includes(b)) {
    console.log("win");
    modalText.innerText = "You win!!!";
    modalText.classList.add(
      "modal__text--win",
      "modal__text",
      "modal--visible"
    );
  } else if (c === b) {
    console.log("nobody");
    modalText.innerText = "Nobody";
    modalText.classList.add(
      "modal__text--nobody",
      "modal__text",
      "modal--visible"
    );
  } else {
    console.log("lose");
    modalText.innerText = "You lose ;(";
    modalText.classList.add(
      "modal__text--lose",
      "modal__text",
      "modal--visible"
    );
  }
}
