'use strict';

//These are elements,not values
// total score
const totalScoreP1 = document.getElementById('score1');
const totalScoreP2 = document.getElementById('score2');
const dice = document.querySelector('.dice');
// button
const btnNewGame = document.querySelector('.new-game');
const btnRollDice = document.querySelector('.roll-dice');
const btnHold = document.querySelector('.hold');
// current score of players
const currentScoreP1 = document.getElementById('currentP1');
const currentScoreP2 = document.getElementById('currentP2');
// player
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

let sum, currentScore, activePlayer, playing;

const init = function () {
  //this func needs to run when page first loads or new gate starts
  sum = [0, 0]; //hold totalscores for each player
  currentScore = 0;
  activePlayer = 1;
  playing = true;
  currentScoreP1.textContent = 0;
  currentScoreP2.textContent = 0;
  totalScoreP1.textContent = 0;
  totalScoreP2.textContent = 0;
  dice.classList.add('hidden');
  player1.classList.add('player-active');
  player1.classList.remove('player-winner');
  player2.classList.remove('player-active');
  player2.classList.remove('player-active');
};

init();

// function to switch player
const switchPlayer = function () {
  document.getElementById(`currentP${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  console.log(activePlayer);
  player1.classList.toggle('player-active');
  player2.classList.toggle('player-active');
};

// Dice Roll
btnRollDice.addEventListener('click', function () {
  if (playing) {
    const diceNo = Math.trunc(Math.random() * 6) + 1;
    dice.src = `img/dice-${diceNo}.png`;
    dice.classList.remove('hidden');

    if (diceNo !== 1) {
      currentScore += diceNo;
      document.getElementById(`currentP${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// hold current score
btnHold.addEventListener('click', function () {
  if (playing) {
    sum[activePlayer - 1] += currentScore;
    document.getElementById(`score${activePlayer}`).textContent =
      sum[activePlayer - 1];

    if (sum[activePlayer - 1] >= 100) {
      playing = false;
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove('player-active');
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// restart game
btnNewGame.addEventListener('click', function () {
  init();
});
