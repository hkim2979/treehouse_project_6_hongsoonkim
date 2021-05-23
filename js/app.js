// variables

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('btn__reset');
const hideOverlay = document.getElementById('hideOverlay');
const phraseUl = phrase.firstElementChild

// missed variable

let missed = 0;

// event listener for btn_reset element

startButton.addEventListener('click', () => {
  hideOverlay.style.display = 'none';
});

//phrase selection

const phrases = [
  'Adidas',
  'Under Armour',
  'Nike',
  'New Balance',
  'Puma'
];

// getRandomPhraseAsArray function

function getRandomPhraseAsArray(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber].split('');
}

const phraseArray = getRandomPhraseAsArray(phrases);

// addPhraseToDisplay function that loops through an array of characters

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('li');
    li.textContent = arr[i];
    phraseUl.appendChild(li);
    if (arr[i] !== ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
  }
}

addPhraseToDisplay(phraseArray);

// checkLetter function

const letters = document.querySelectorAll('.letter');
const checkLetter = (btn) => {
  let letterMatched = null;
  for (i = 0; i < letters.length; i++) {
    if (btn === letters[i].textContent.toLowerCase()) {
      letters[i].classList.add("show");
      letterMatched = true;
    }
  }
  return letterMatched;
}