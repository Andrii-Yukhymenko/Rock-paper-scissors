let btnListWrapper = document.querySelector(".play-buttons__button-list"),
  btnList = btnListWrapper.querySelectorAll(".play-buttons__button"),
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
      if (event.target == item) {
        let yourChoice = generateYourChoice(i);
        let yourChoiceNumber = i;
        let computerChoice = generateComputerChoice()[1];
        let computerChoiceNumber = generateComputerChoice()[0];
        determinateWinner(yourChoiceNumber, computerChoice, yourChoice);
      }
    });
  }
});

function generateYourChoice(i) {
  console.clear();
  let yourChoice = db[i].name;
  console.log(`You choose ${yourChoice}`);
  return yourChoice;
}
function generateComputerChoice() {
  let computerChoiceNumber = randomInteger(0.5, 2);
  console.log(computerChoiceNumber);
  let computerChoice = db[computerChoiceNumber].name;
  console.log(`Computer choose ${computerChoice}`);
  return [computerChoiceNumber, computerChoice];
}
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
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
