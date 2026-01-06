const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let board = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle cell click
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");
    if (!board[index] && gameActive) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkWinner();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      if (gameActive) {
        statusText.textContent = `Next Player: ${currentPlayer}`;
      }
    }
  });
});

// Check for winner
function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `🎉 Winner: ${board[a]}`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes(null)) {
    statusText.textContent = "🤝 It's a Draw!";
    gameActive = false;
  }
}

// Restart game
restartBtn.addEventListener("click", () => {
  board = Array(9).fill(null);
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  statusText.textContent = "Next Player: X";
  gameActive = true;
});
