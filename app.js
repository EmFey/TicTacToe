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