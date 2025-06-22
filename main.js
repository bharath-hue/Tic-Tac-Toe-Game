// Game variables
let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameOver = false;

// DOM elements
const boardDiv = document.getElementById('board');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('reset');

// Initialize board UI
function drawBoard() {
    boardDiv.innerHTML = "";
    board.forEach((cell, idx) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.idx = idx;
        square.textContent = cell ? cell : "";
        square.addEventListener('click', () => handleMove(idx));
        boardDiv.appendChild(square);
    });
}

// Handle a player's move
function handleMove(idx) {
    if (board[idx] || isGameOver) return;
    board[idx] = currentPlayer;
    if (checkWin(currentPlayer)) {
        statusDiv.textContent = `Player ${currentPlayer} wins!`;
        isGameOver = true;
    } else if (board.every(cell => cell)) {
        statusDiv.textContent = "It's a draw!";
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
    drawBoard();
}

// Check if a player has won
function checkWin(player) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // cols
        [0,4,8],[2,4,6]          // diags
    ];
    return winPatterns.some(pattern =>
        pattern.every(idx => board[idx] === player)
    );
}

// Reset game
function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    isGameOver = false;
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    drawBoard();
}

// Event listeners
resetBtn.addEventListener('click', resetGame);

// Initial rendering
resetGame();