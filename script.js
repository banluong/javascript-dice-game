'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
// Works same as querySelector, without # for id
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Define variables
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0]; // Scores for Player 1 and Player 2
  currentScore = 0;
  activePlayer = 0; // Player 1 starts, then Player 2
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// Switch play function switches activePlayer and toggles background
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //1 if activeplayer is 0, else 0
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active'); // toggles the --active on one player
};

// Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore; // Changes current score of activePlayer
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// Hold and save score
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to scores array
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // End game when player gets score of 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// Start New Game
btnNew.addEventListener('click', init);
