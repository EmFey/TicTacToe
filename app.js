// Gameboard module
/*const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }
  };

  const getBoard = () => board;

  const makeMove = (index, player) => {
    board[index] = player.getSymbol();
  };

  return {
    resetBoard,
    getBoard,
    makeMove,
  };
})();

// Player factory function
const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

// Game module
const game = (() => {
  let player1, player2, currentPlayer;
  let gameOver = false;

  const initializeGame = (name1, symbol1, name2, symbol2) => {
    player1 = Player(name1, symbol1);
    player2 = Player(name2, symbol2);
    currentPlayer = player1;
    gameBoard.resetBoard();
    gameOver = false;
    displayController.updateBoard(gameBoard.getBoard());
  };

  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const playTurn = (index) => {
    if (!gameOver && gameBoard.getBoard()[index] === '') {
      gameBoard.makeMove(index, currentPlayer);
      displayController.updateBoard(gameBoard.getBoard());
      checkWin();
      switchPlayer();
    }
  };

  const checkWin = () => {
    const board = gameBoard.getBoard();
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal wins
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical wins
      [0, 4, 8], [2, 4, 6] // diagonal wins
    ];
    for (let i = 0; i < winPatterns.length; i++) {
      const [a, b, c] = winPatterns[i];
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        displayController.displayWin(currentPlayer.getName());
        gameOver = true;
        return;
      }
    }
    if (!board.includes('')) {
      displayController.displayDraw();
      gameOver = true;
    }
  };

  return { initializeGame, playTurn };
})();

const displayController = (() => {
  // Select the game board element and its cells
  const form = document.querySelector('.cellGrid');
  const cells = Array.from(document.querySelectorAll('.field'));
  const message = document.querySelector('.message');
  const resetBtn = document.querySelector('.btnRestart');

  // Render the current game board state on the UI
  function renderBoard(gameboard) {
    cells.forEach((cell, index) => {
      cell.textContent = gameboard[index];
    });
  }

  // Clear the game board on the UI
  function clearBoard() {
    cells.forEach((cell) => {
      cell.textContent = '';
    });
  }

  return {
    renderBoard,
    clearBoard,
  };
})();*/

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const updateBoard = (index, marker) => {
    board[index] = marker;
  };
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  return { getBoard, updateBoard, resetBoard };
})();

const displayController = (() => {
  const cells = document.querySelectorAll(".field");
  cells.forEach(cell => cell.addEventListener("click", playerMove));
  function playerMove() {
    const index = Array.from(cells).indexOf(this);
    if (gameBoard.getBoard()[index] === "") {
      const marker = game.currentPlayer.getMarker();
      gameBoard.updateBoard(index, marker);
      this.textContent = marker;
      const winner = game.checkWinner();
      if (winner) {
        endGame(winner);
      } else if (!gameBoard.getBoard().includes("")) {
        endGame("tie");
      } else {
        game.changeTurn();
      }
    }
  }
  function endGame(result) {
    cells.forEach(cell => cell.removeEventListener("click", playerMove));
    if (result === "tie") {
      alert("It's a tie!");
    } else {
      alert(`${game.currentPlayer.getName()} has won!`);
    }
    gameBoard.resetBoard();
    cells.forEach(cell => {
      cell.textContent = "";
      cell.addEventListener("click", playerMove);
    });
  }
  return { endGame };
})();

const game = (() => {
  let currentPlayer = "";
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  const changeTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };
  const checkWinner = () => {
    const board = gameBoard.getBoard();
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    return winningCombos.find(combo => {
      if (
        board[combo[0]] !== "" &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[1]] === board[combo[2]]
      ) {
        return combo;
      } else {
        return false;
      }
    });
  };
  const startGame = () => {
    currentPlayer = Math.random() < 0.5 ? player1 : player2;
  };
  return { startGame, currentPlayer, changeTurn, checkWinner };
})();

game.startGame();