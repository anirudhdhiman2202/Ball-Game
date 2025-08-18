const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const overlay = document.getElementById('overlay');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const playerNameInput = document.getElementById('player-name');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const finalScoreDisplay = document.getElementById('final-score');

let score = 0;
let timeLeft = 30;
let gameInterval;
let starInterval;
let playerName = "";

// Move the basket
document.addEventListener('keydown', (event) => {
  const basketLeft = basket.offsetLeft;
  if (event.key === 'ArrowLeft' && basketLeft > 0) {
    basket.style.left = basketLeft - 20 + 'px';
  } else if (event.key === 'ArrowRight' && basketLeft < gameContainer.offsetWidth - basket.offsetWidth) {
    basket.style.left = basketLeft + 20 + 'px';
  }
});

// Create and drop stars
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = Math.random() * (gameContainer.offsetWidth - 20) + 'px';
  gameContainer.appendChild(star);

  let fallInterval = setInterval(() => {
    star.style.top = (star.offsetTop + 5) + 'px';

    // Check if the star is caught
    if (star.offsetTop + star.offsetHeight >= basket.offsetTop &&
        star.offsetLeft + star.offsetWidth > basket.offsetLeft &&
        star.offsetLeft < basket.offsetLeft + basket.offsetWidth) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      gameContainer.removeChild(star);
      clearInterval(fallInterval);
    }

    // Remove star if it falls out of bounds
    if (star.offsetTop > gameContainer.offsetHeight) {
      gameContainer.removeChild(star);
      clearInterval(fallInterval);
    }
  }, 30);
}

// Start the game
function startGame() {
  if (!playerName) {
    playerName = playerNameInput.value || "Player";
  }
  
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time: ${timeLeft}s`;
  overlay.style.display = 'none';

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(starInterval);
      endGame();
    }
  }, 1000);

  starInterval = setInterval(createStar, 1000);
}

// End the game
function endGame() {
  overlay.style.display = 'flex';
  startScreen.style.display = 'none';
  endScreen.style.display = 'block';
  finalScoreDisplay.textContent = `${playerName}, your final score is: ${score}`;
}

// Restart the game
function restartGame() {
  startGame();
  endScreen.style.display = 'none';
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
