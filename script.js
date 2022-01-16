const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
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
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const finalMessage = document.getElementById('final-message');
const finalMessageTextElement = document.querySelector('[data-final-message-text]');
const resetButton = document.getElementById('restart-button');
let turn;

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
}

const checkWin = (currentClass) => {
  return WINNING_COMBINATIONS.some(combinations => {
    return combinations.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

const isDraw = () => {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
}

const endGame = (draw) => {
  if (draw) {
    finalMessageTextElement.innerHTML = 'Draw!';
  } else {
    finalMessageTextElement.innerText = `${turn ? "O's" : "X's"} Wins!`;
  }
  finalMessage.classList.add('show');
}

const swapTurns = () => {
  turn = !turn;
}

const setHoverClass = () => {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (turn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

const handleClick = (event) => {
  const cell = event.target;
  const currentClass = turn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setHoverClass();
  }
}

const startGame = () => {
  turn = true;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setHoverClass();
  finalMessage.classList.remove('show');
}

startGame();

resetButton.addEventListener('click', startGame);