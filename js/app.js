// variables

const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startGame = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");

const phraseUl = phrase.firstElementChild;

// missed variable

let missed = 0;

// event listener for btn_reset element

startGame.addEventListener("click", () => {
  overlay.style.display = "none"
});

//phrase selection

const phrases = [
  "Nike",
  "Adidas",
  "Under Armour",
  "Puma",
  "New Balance"
];

// getRandomPhraseAsArray function

function getRandomPhraseAsArray(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length)
  return arr[randomNumber].split("")
};

const phraseArray = getRandomPhraseAsArray(phrases)

// addPhraseToDisplay function that loops through an array of characters

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li")
    li.textContent = arr[i]
    phraseUl.appendChild(li)
    if (arr[i] !== " ") {
      li.className = "letter"
    } else {
      li.className = "space"
    }
  }
};

addPhraseToDisplay(phraseArray);

// checkLetter function

function checkLetter(btn) {
  let letters = document.getElementsByClassName("letter")
  let letterMatched = null
  for (let i = 0; i < letters.length; i++) {
    if (btn.textContent.toLowerCase() === letters[i].textContent.toLowerCase()) {
      letters[i].classList.add("show")
      letterMatched = letters[i].textContent.toLowerCase()
    }
  }
  return letterMatched;
};

// event listener to the keyboard

qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const btnPressed = e.target
    btnPressed.classList.add("chosen")
    btnPressed.setAttribute("disabled", true)
    const letterMatched = checkLetter(e.target)
    if (letterMatched === null) {
      missed = missed + 1
      document.querySelectorAll(".tries img")[missed - 1].src = "images/lostHeart.png"
    }
    checkWin()
  }
});

// checkWin function for winning / losing display overlay

function checkWin() {
  let show = document.querySelectorAll(".show")
  let letter = document.querySelectorAll(".letter")
  if (missed > 4) {
    overlay.className = "lose"
    overlay.style.display = "flex"
    document.querySelector("#overlay h2").textContent = "loser"
    reset()
  } else if (letter.length === show.length) {
    overlay.className = "win"
    overlay.style.display = "flex"
    document.querySelector("#overlay h2").textContent = "winner"
    reset()
  }
};

//game reset function

function reset() {
  startGame.textContent = "do it again"
  missed = 0
  phraseUl.textContent = ""
  const chosenLetters = document.querySelectorAll(".chosen")
  for (let i = 0; i < chosenLetters.length; i++) {
    chosenLetters[i].classList.remove("chosen")
    chosenLetters[i].disabled = false
  }
  const phraseArray = getRandomPhraseAsArray(phrases)
  addPhraseToDisplay(phraseArray)
  let hearts = document.querySelectorAll(".tries img")
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].src = "images/liveHeart.png"
  }
};
