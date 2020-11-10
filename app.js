const gameBoard = document.getElementById('gameCanvas');
const gameBoardCTX = gameBoard.getContext('2d');

// Define elements
const border = '#000';
const background = '#fff';
const snakeColor = '#18ee1c';
const snakeOutline = '#007202';

// Snakes horizontal velocity
let dx = 10;
// Snakes vertical velocity 
let dy = 0;

// Create starting snake position
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 }
];

// Start Game
app();

function app() {
  if (gameOver()) return;

  changingDirection = false;
  setTimeout(function onTick() {
    clearCanvas();
    drawSnake();
    moveSnake();
    // Call the app again
    app();
  }, 100);
}

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
  const snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(snakeHead);
  snake.pop();
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

// Check for game over
function gameOver() {
  // For loop to check if snake has collided into itself
  for (let i = 4; i < snake.length; i++) {
    const collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    // If snake crashes into itself then game over
    if (collided) return true;
  }

  const crashLeftWall = snake[0].x < 0;
  const crashRightWall = snake[0].x > gameBoard.width - 10;
  const crashTopWall = snake[0].y < 0;
  const crashBottomWall = snake[0].y > gameBoard.height - 10;
  return crashLeftWall || crashRightWall || crashTopWall || crashBottomWall;
}

// Event Listeners 

document.addEventListener('keydown', changeDirection);

