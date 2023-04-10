const Gameboard = (() => {
  // Gameboard state
  let board = ['', '', '', '', '', '', '', '', ''];

  // Public methods
  const getBoard = () => board;

  const updateBoard = (index, marker) => {
    board[index] = marker;
  };

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
  };

  return {
    getBoard,
    updateBoard,
    resetBoard,
  };
})();

const Player = (name, marker) => {
  // Private properties
  const pName = name;
  const pMarker = marker;

  // Public methods
  const getName = () => pName;
  const getMarker = () => pMarker;

  return {
    getName,
    getMarker,
  };
};

const GameController = (() => {
  // Private properties
  let players = [];
  let currentPlayer = null;
  let gameOver = false;

  // Private methods
  const checkWin = (board, marker) => {
    // Check rows
    for (let i = 0; i < 9; i += 3) {
      if (board[i] === marker && board[i+1] === marker && board[i+2] === marker) {
        return true;
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[i] === marker && board[i+3] === marker && board[i+6] === marker) {
        return true;
      }
    }
    // Check diagonals
    if (board[0] === marker && board[4] === marker && board[8] === marker) {
      return true;
    }
    if (board[2] === marker && board[4] === marker && board[6] === marker) {
      return true;
    }
    // No win
    return false;
  };

  const checkTie = (board) => {
    return !board.includes('');
  };

  const endGame = (message) => {
    gameOver = true;
    alert(message);
  };

  const nextPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  // Public methods
  const startGame = (player1Name, player2Name) => {
    // Create players
    players = [
      Player(player1Name, 'X'),
      Player(player2Name, 'O'),
    ];

    // Set current player
    currentPlayer = players[0];

    // Reset gameboard
    Gameboard.resetBoard();

    // Game loop
    while (!gameOver) {
      // Display current player
      console.log(`Current player: ${currentPlayer.getName()}`);

      // Get move from current player
      let move = prompt(`Enter move for ${currentPlayer.getName()} (${_currentPlayer.getMarker()}):`);
      while (move === '' || isNaN(move) || move < 1 || move > 9 || Gameboard.getBoard()[move-1] !== '') {
        move = prompt(`Invalid move. Enter move for ${currentPlayer.getName()} (${currentPlayer.getMarker()}):`);
      }
    }
  }
})

Gameboard.updateBoard(move-1, _currentPlayer.getMarker());