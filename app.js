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