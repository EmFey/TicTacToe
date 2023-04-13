// Factory function for creating players
const createPlayer = (name, marker) => {
  return { name, marker };
};

// Factory function for creating AI
const AIPlayer = (symbol) => {
  const getMove = (board) => {
    const emptySpaces = gameBoard.filter((space) => space === '');
    const randomIndex = Math.floor(Math.random() * emptySpaces.length);
    return emptySpaces[randomIndex];
  }

  return { symbol, getMove };
}

// Module for managing game flow
/*const gameFlow = (() => {
  let currentPlayer;
  let gameBoard;
  const restartButton = document.querySelector('.restartBtn');
  let modal = document.querySelector(".player-selection");
  const humanBtn = document.querySelector('.human-btn');
  const aiBtn = document.querySelector('.ai-btn');

  const startGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    //currentPlayer = player1;
    //displayController.render(gameBoard);

    let player1, player2;
    if (humanBtn.classList.contains('human')) {
      player1 = createPlayer('Player 1', 'X');
      player2 = createPlayer('Player 2', 'O');
      currentPlayer = player1;
    } else {
      player1 = createPlayer('Player 1', 'X');
      player2 = AIPlayer('AI', 'O');
      currentPlayer = player1;
    }
    displayController.render(gameBoard);
    const gameController = GameController(gameBoard, player1, player2);
    gameController.startGame();
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

  const restartGame = () => {
    modal.classList.add("active");
  };

  const humanGame = () => {
    modal.classList.remove("active");
    humanBtn.classList.add("human");
    displayController.newGame();
    gameFlow.startGame();
  };

  const aiGame = () => {
    modal.classList.remove("active");
    displayController.newGame();
    gameFlow.startGame();
  };

  restartButton.addEventListener('click', restartGame);
  humanBtn.addEventListener('click', humanGame);
  aiBtn.addEventListener('click', aiGame);

  return { startGame, playTurn };
})();*/




// Module for rendering game board and messages to the screen
/*const displayController = (() => {
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
gameFlow.startGame();*/



const GameController = (() => {
  let player1, player2, currentPlayer;
  let isGameStarted = false;

  const startGame = (isAgainstAi) => {
  if (isGameStarted) return;

  player1 = createPlayer('Player 1', 'X');
  if (isAgainstAi) {
    player2 = AIPlayer('AI', 'O');
  } else {
      player2 = createPlayer('Player 2', 'O');
  }
  currentPlayer = player1;

  displayController.updateMessage(`${currentPlayer.getName()} goes first`);
  isGameStarted = true;
  };

    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      displayController.updateMessage(`${currentPlayer.getName()}'s turn (${currentPlayer.getSymbol()})`);
    };
  
    const makeMove = (index) => {
      if (!isGameStarted) return;
  
      const result = gameBoard.placeSymbol(index, currentPlayer.getSymbol());
      if (result) {
        displayController.updateBoard(gameBoard.getBoard());
        if (gameBoard.checkForWinner(currentPlayer.getSymbol())) {
          displayController.updateMessage(`${currentPlayer.getName()} wins!`);
          isGameStarted = false;
        } else if (gameBoard.checkForTie()) {
          displayController.updateMessage('Tie game!');
          isGameStarted = false;
        } else {
          switchPlayer();
          if (currentPlayer instanceof AIPlayer) {
            setTimeout(() => {
              const aiMove = currentPlayer.getMove(gameBoard.getAvailableIndexes());
              makeMove(aiMove);
            }, 1000);
          }
        }
      }
    };
  
    const init = () => {
      displayController.initBoard(makeMove);
  
      const humanButton = document.querySelector('.human-btn');
      const aiButton = document.querySelector('.ai-btn');
  
      humanButton.addEventListener('click', () => {
        startGame(false);
      });
  
      aiButton.addEventListener('click', () => {
        startGame(true);
      });
    };
  
    return { init };
})();


const displayController = (() => {
    const messageContainer = document.querySelector('.message');
    const gameBoardContainer = document.querySelector('.board');
  
    const renderGameBoard = (gameBoard, handleClick) => {
      gameBoardContainer.innerHTML = '';
  
      gameBoard.forEach((cellValue, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('field');
        cellElement.dataset.index = index;
        cellElement.textContent = cellValue || '';
  
        cellElement.addEventListener('click', handleClick);
  
        gameBoardContainer.appendChild(cellElement);
      });
    };
  
    const renderMessage = (message) => {
      messageContainer.textContent = message;
    };
  
    return {
      renderGameBoard,
      renderMessage,
    };
  })();