// Gameboard module
const gameBoard = (() => {
  let gameArray = ["", "", "", "", "", "", "", "", ""];

  const getGameArray = () => gameArray;
  const updateGameArray = (index, value) => {
    gameArray[index] = value;
  };
  const resetGameArray = () => {
    gameArray = ["", "", "", "", "", "", "", "", ""];
  };

  return {
    getGameArray,
    updateGameArray,
    resetGameArray,
  };
})();



// Player factory function
const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol };
};



// Game flow module
const gameFlow = (() => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  let currentPlayer = player1;

  const gameTurn = (e) => {
    const gameArray = gameBoard.getGameArray();
    const index = e.target.dataset.index;

    if (gameArray[index] !== "") return;

    gameBoard.updateGameArray(index, currentPlayer.getSymbol());
    displayController.renderBoard();

    if (checkWin(currentPlayer.getSymbol())) {
      displayController.showMessage(`${currentPlayer.getName()} wins!`);
      displayController.disableBoard();
      return;
    }

    if (checkDraw()) {
      displayController.showMessage("Draw!");
      displayController.disableBoard();
      return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWin = (symbol) => {
    const gameArray = gameBoard.getGameArray();
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winCombinations.some((combination) => {
      return combination.every((index) => gameArray[index] === symbol);
    });
  };

  const checkDraw = () => {
    const gameArray = gameBoard.getGameArray();
    return gameArray.every((value) => value !== "");
  };

  function resetGame() {
    // reset game board array and render empty grid
    gameBoard.resetBoard();
    displayController.render(gameBoard.getBoard());
  
    // reset game status message
    displayController.updateMessage("Player 1's turn");
  
    // enable grid clicks and add event listener to each grid
    const grids = document.querySelectorAll('.field');
    for (let i = 0; i < grids.length; i++) {
      grids[i].addEventListener('click', playTurn);
      grids[i].classList.remove('x');
      grids[i].classList.remove('o');
    }
  }
  
  // event listener for reset button click
  document.getElementById('reset-button').addEventListener('click', resetGame);
});



// Display controller module
const displayController = (() => {
  const field = document.querySelectorAll(".field");
  const message = document.querySelector(".message");
  const resetButton = document.querySelector(".restartBtn");

  const renderBoard = () => {
    const gameArray = gameBoard.getGameArray();
    field.forEach((div, index) => {
      div.textContent = gameArray[index];
    });
  };

  const showMessage = (message) => {
    message.textContent = message;
  };

  const clearMessage = () => {
    message.textContent = "";
  };

  const disableBoard = () => {
    field.forEach((div) => {
      div.removeEventListener("click", gameFlow.gameTurn);
    });
  };

  const enableBoard = () => {
    field.forEach((div) => {
      div.addEventListener("click", gameFlow.gameTurn);
    });
  };

  resetButton.addEventListener("click", gameFlow.resetGame);

  return { renderBoard, showMessage, clearMessage, disableBoard, enableBoard };
})();