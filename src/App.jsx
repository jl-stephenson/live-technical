import React, { useState } from "react";

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "black",
};

const boardStyle = {
  backgroundColor: "#eee",
  alignItems: "center",
  justifyContent: "center",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const Square = ({ playerMark, squareId, handleSquareClick }) => {
  return (
    <button
      className="square"
      style={squareStyle}
      aria-label={playerMark === null ? "Empty" : playerMark}
      onClick={() => handleSquareClick(squareId)}
    >
      {playerMark}
    </button>
  );
};

const Board = ({
  board,
  isXnext,
  winner,
  gameOver,
  handleSquareClick,
  handleReset,
}) => {
  return (
    <main style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        <span>
          {!gameOver && !winner ? "Next Player: " + (isXnext ? "X" : "O") : ""}
        </span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        <span>
          {gameOver && !winner
            ? "Game Over"
            : winner
            ? "Winner: " + winner
            : ""}
        </span>
      </div>
      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
      <div style={boardStyle}>
        {board.map((playerMark, idx) => (
          <Square
            key={idx}
            squareId={idx}
            playerMark={playerMark}
            handleSquareClick={handleSquareClick}
          />
        ))}
      </div>
    </main>
  );
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  let initialState = {
    board: Array(9).fill(null),
    isXnext: true,
    gameOver: false,
  };

  const [board, setBoard] = useState(initialState.board);
  const [isXnext, setIsXnext] = useState(initialState.isXnext);
  const [isGameOver, setIsGameOver] = useState(initialState.isGameOver);

  let getWinner = () => {
    const markJustPlaced = isXnext ? "O" : "X";

    const results = winningCombinations.map((set) => {
      return set.every((index) => board[index] === markJustPlaced);
    });

    const isWinner = results.includes(true);

    return isWinner ? markJustPlaced : "";
  };

  let squareClicked = (squareId) => {
    if (board[squareId] !== null || getWinner() === "X" || getWinner() === "O") return;

    const mark = isXnext ? "X" : "O";
    const updatedBoard = board.map((square, index) => {
      return index === squareId ? mark : square;
    });

    setBoard(updatedBoard);
    const isEmptySquares = updatedBoard.some((square) => square === null);
    if (!isEmptySquares) setIsGameOver(true);
    setIsXnext((isXnext) => !isXnext);
  };

  let resetGame = () => {
    setBoard(initialState.board);
    setIsXnext(initialState.isXnext);
    setIsGameOver(initialState.isGameOver);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          board={board}
          isXnext={isXnext}
          winner={getWinner()}
          gameOver={isGameOver}
          handleSquareClick={squareClicked}
          handleReset={resetGame}
        />
      </div>
    </div>
  );
};

export default App;
