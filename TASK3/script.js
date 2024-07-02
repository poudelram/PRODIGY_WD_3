const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
const messageElement = document.getElementById('message');
const player1SymbolInput = document.getElementById('player1Symbol');
const player2SymbolInput = document.getElementById('player2Symbol');

let player1Symbol = 'X';
let player2Symbol = 'O';
let isCircleTurn = false;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    messageElement.textContent = '';
};

const handleClick = (e) => {
    const cell = e.target;
    const currentSymbol = isCircleTurn ? player2Symbol : player1Symbol;
    placeMark(cell, currentSymbol);
    if (checkWin(currentSymbol)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
};

const placeMark = (cell, currentSymbol) => {
    cell.textContent = currentSymbol;
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
};

const setBoardHoverClass = () => {
    board.classList.remove('x');
    board.classList.remove('circle');
    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
};

const checkWin = (currentSymbol) => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentSymbol;
        });
    });
};

const endGame = (draw) => {
    if (draw) {
        messageElement.textContent
