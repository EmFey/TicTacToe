// Factory function for creating players
const createPlayer = (name, marker) => {
  return { name, marker };
};

// Module for managing game flow
const gameFlow = (() => {
  let currentPlayer;
  let gameBoard;
  let modal = document.querySelector(".player-selection");

  const startGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = player1;
    displayController.render(gameBoard);
  };

  const nextTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const playTurn = (index) => {
    if (gameBoard[index] === "") {
      gameBoard[index] = currentPlayer.marker;
      nextTurn();
      displayController.render(gameBoard);
      checkWinner();
    }
  };

  const checkWinner = () => {
    const winConditions = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        displayController.showWinner(currentPlayer);
        return;
      }
    }

    if (!gameBoard.includes("")) {
      displayController.showTie();
    }
  };

  const resetGame = () => {
    //displayController.newGame();
    modal.classList.add("active");
    //gameFlow.startGame();
  };

  const restartButton = document.querySelector('.restartBtn');
  restartButton.addEventListener('click', resetGame);

  return { startGame, playTurn };
})();

// Module for rendering game board and messages to the screen
const displayController = (() => {
  const board = document.querySelector(".board");
  const message = document.querySelector(".message");

  const render = (gameBoard) => {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
      const div = document.createElement("div");
      div.classList.add("field");
      div.textContent = cell;
      div.addEventListener("click", () => gameFlow.playTurn(index));
      board.appendChild(div);
    });
  };

  const showWinner = (player) => {
    message.textContent = `${player.name} wins!`;
  };

  const showTie = () => {
    message.textContent = "It's a tie!";
  };

  const newGame = () => {
    message.textContent = "It's a new game";
  }

  return { render, showWinner, showTie, newGame };
})();

// Create players and start game
const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");
gameFlow.startGame();