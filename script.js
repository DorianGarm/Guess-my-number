'use strict';

let score, secretNumber, highscore;
highscore = 0;
function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}
function displayScore() {
  document.querySelector('.score').textContent = score;
}

function init() {
  secretNumber = Math.trunc(Math.random() * 100) + 1;
  score = 20;
  displayScore();
  displayMessage(`Start guessing...`);
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = `?`;
  document.querySelector('.guess').value = null;
  document.querySelector('.check').addEventListener(`click`, clickHandler);
}
init();

document.querySelector('.again').addEventListener(`click`, init);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    clickHandler();
  }
});

function clickHandler() {
  const guess = Number(document.querySelector('.guess').value);
  if (score > 1) {
    if (!guess) {
      displayMessage(`No number!`);
    } else if (guess === secretNumber) {
      displayMessage(`Correct!`);
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('.number').textContent = secretNumber;
      document
        .querySelector('.check')
        .removeEventListener('click', clickHandler);
      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
    } else if (guess !== secretNumber) {
      displayMessage(guess > secretNumber ? `Too high!` : `Too low!`);
      score--;
      displayScore();
    }
  } else {
    displayMessage(`You lost the game!`);
    document.querySelector('.score').textContent = 0;
  }
}
