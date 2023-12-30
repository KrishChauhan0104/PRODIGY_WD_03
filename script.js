let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const cells = document.getElementById('board');
const status = document.getElementById('status');

// Create the game board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('data-index', i);
  cell.addEventListener('click', handleCellClick);
  cells.appendChild(cell);
}

// Handle cell click
function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');

  if (board[index] === '' && gameActive) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkForWinner();
    switchPlayer();
    if (gameActive) {
      makeAIMove();
    }
  }
}

// Switch player
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check for a winner
function checkForWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      status.textContent = `${currentPlayer} wins!`;
      return;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    status.textContent = "It's a tie!";
  }
}

// Make a random move for the AI
function makeAIMove() {
  const availableCells = board.reduce((acc, val, index) => (val === '' ? acc.concat(index) : acc), []);
  const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

  if (availableCells.length > 0) {
    setTimeout(() => {
      board[randomIndex] = currentPlayer;
      cells.children[randomIndex].textContent = currentPlayer;
      checkForWinner();
      switchPlayer();
    }, 500);
  }
}

// Reset the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = '';
  cells.childNodes.forEach(cell => (cell.textContent = ''));
}
