const rulesBtn = document.getElementById('rulesBtn');
const closeBtn = document.getElementById('closeBtn');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const rules = document.getElementById('rules');
const gameTitle = document.getElementById('gameTitle');
// const replayBtn = document.getElementById('replayBtn');

const gameBoard = document.getElementById('gameCanvas');
const gameBoardCTX = gameBoard.getContext('2d');

// Init Score
let score = 0;

// Define elements
const border = '#000';
const background = '#fff';
const snakeColor = '#18ee1c';
const snakeOutline = '#007202';

// Snakes horizontal velocity
let dx = 10;
let foodX;
// Snakes vertical velocity 
let dy = 0;
let foodY;

// Create snake props
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 }
];

// True if changing direction
let changingDirection = false;


function clearCanvas() {
  // Define background color of game canvas
  gameBoardCTX.fillStyle = background;
  // Define border color of game canvas
  gameBoardCTX.strokeStyle = border;
  // Fills background canvas color
  gameBoardCTX.fillRect(0, 0, gameBoard.width, gameBoard.height);
  // Creates canvas border stroke
  gameBoardCTX.strokeRect(0, 0, gameBoard.width, gameBoard.height);

}
// Draws the snake body parts
function drawSnakeBody(snakeBodyPart) {
  // Defines snake color
  gameBoardCTX.fillStyle = snakeColor;
  // Defines snake outline color
  gameBoardCTX.strokeStyle = snakeOutline;
  // Fills snake color
  gameBoardCTX.fillRect(snakeBodyPart.x, snakeBodyPart.y, 10, 10);
  // Creates snake outline stroke
  gameBoardCTX.strokeRect(snakeBodyPart.x, snakeBodyPart.y, 10, 10);
}

// Function that prints the snake
function drawSnake() {
  snake.forEach(drawSnakeBody);
}

// Function to move snake
function moveSnake() {
  // Creates new snake head
  const snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };
  // Adds the new head to the beginning of the body
  snake.unshift(snakeHead);
  const hasEatenFoods = snake[0].x === foodX && snake[0].y === foodY;
  if (hasEatenFoods) {
    // Increase Score
    score += 10;
    // Display Score on screen
    document.getElementById('score').innerHTML = score;
    // Generate new food location
    generateFood();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}

// Change snake direction 
function changeDirection(e) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  // Prevent snake from reversing

  if (changingDirection) return;
  changingDirection = true;

  const keyPressed = e.keyCode;
  const moveUp = dy === -10;
  const moveDown = dy === 10;
  const moveRight = dx === 10;
  const moveLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !moveRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !moveDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !moveLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !moveUp) {
    dx = 0;
    dy = 10;
  }
}

// Create random foods for snake
function randomfood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

// Generate random foods after eating 
function generateFood() {
  foodX = randomfood(0, gameBoard.width - 10);
  foodY = randomfood(0, gameBoard.height - 10);

  snake.forEach(function snakeAteFood(part) {
    const hasEaten = part.x == foodX && part.y == foodY;
    if (hasEaten) generateFood();
  });
}

// Actually draw the food on the canvas
function drawFood() {
  gameBoardCTX.fillStyle = '#0df9ff';
  gameBoardCTX.strokeStyle = '#0035a5';
  gameBoardCTX.fillRect(foodX, foodY, 10, 10);
  gameBoardCTX.strokeRect(foodX, foodY, 10, 10);
}

// Check for game over
function gameOver() {
  // For loop to check if snake has collided into itself
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      // If snake crashes into itself then game over
      return true;
    };
  }
  const crashLeftWall = snake[0].x < 0;
  const crashRightWall = snake[0].x > gameBoard.width - 10;
  const crashTopWall = snake[0].y < 0;
  const crashBottomWall = snake[0].y > gameBoard.height - 10;

  if (crashLeftWall || crashRightWall || crashTopWall || crashBottomWall) return true;
}
// Start Game
clearCanvas();
drawSnake();
generateFood();

// Event Listeners 
document.addEventListener('keydown', changeDirection);

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));

startBtn.addEventListener('click', app = () => {
  if (gameOver()) {
    gameTitle.innerHTML = 'Game Over!!';
    return;
  };

  changingDirection = false;
  setTimeout(onTick = () => {
    clearCanvas();
    drawFood();
    drawSnake();
    moveSnake();
    // Repeats
    app();
  }, 100);
});

resetBtn.addEventListener('click', () => {
  if (!gameOver()) return;
  gameTitle.innerHTML = 'Snake !';
  score = 0;
  snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
  ];

  clearCanvas();
  generateFood();
  drawSnake();
});


