import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <div className="square" onClick={onSquareClick}>
      {value}
    </div>
  );
}

export default function App() {
  const [board, setSquares] = useState(
    Array.from({ length: 6 }, () => new Array(5).fill("/"))
  );

  function handleClick(row, col) {
    const nextboard = board.slice();
    nextboard[row][col] = "x";
    setSquares(nextboard);
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <div className="board-row">
        <Square value={board[0][0]} onSquareClick={() => handleClick(0, 0)} />
        <Square value={board[0][1]} onSquareClick={() => handleClick(0, 1)} />
        <Square value={board[0][2]} onSquareClick={() => handleClick(0, 2)} />
        <Square value={board[0][3]} onSquareClick={() => handleClick(0, 3)} />
        <Square value={board[0][4]} onSquareClick={() => handleClick(0, 4)} />
      </div>
      <div className="board-row">
        <Square value={board[1][0]} onSquareClick={() => handleClick(1, 0)} />
        <Square value={board[1][1]} onSquareClick={() => handleClick(1, 1)} />
        <Square value={board[1][2]} onSquareClick={() => handleClick(1, 2)} />
        <Square value={board[1][3]} onSquareClick={() => handleClick(1, 3)} />
        <Square value={board[1][4]} onSquareClick={() => handleClick(1, 4)} />
      </div>
      <div className="board-row">
        <Square value={board[2][0]} onSquareClick={() => handleClick(2, 0)} />
        <Square value={board[2][1]} onSquareClick={() => handleClick(2, 1)} />
        <Square value={board[2][2]} onSquareClick={() => handleClick(2, 2)} />
        <Square value={board[2][3]} onSquareClick={() => handleClick(2, 3)} />
        <Square value={board[2][4]} onSquareClick={() => handleClick(2, 4)} />
      </div>
      <div className="board-row">
        <Square value={board[3][0]} onSquareClick={() => handleClick(3, 0)} />
        <Square value={board[3][1]} onSquareClick={() => handleClick(3, 1)} />
        <Square value={board[3][2]} onSquareClick={() => handleClick(3, 2)} />
        <Square value={board[3][3]} onSquareClick={() => handleClick(3, 3)} />
        <Square value={board[3][4]} onSquareClick={() => handleClick(3, 4)} />
      </div>
      <div className="board-row">
        <Square value={board[4][0]} onSquareClick={() => handleClick(4, 0)} />
        <Square value={board[4][1]} onSquareClick={() => handleClick(4, 1)} />
        <Square value={board[4][2]} onSquareClick={() => handleClick(4, 2)} />
        <Square value={board[4][3]} onSquareClick={() => handleClick(4, 3)} />
        <Square value={board[4][4]} onSquareClick={() => handleClick(4, 4)} />
      </div>
      <div className="board-row">
        <Square value={board[5][0]} onSquareClick={() => handleClick(5, 0)} />
        <Square value={board[5][1]} onSquareClick={() => handleClick(5, 1)} />
        <Square value={board[5][2]} onSquareClick={() => handleClick(5, 2)} />
        <Square value={board[5][3]} onSquareClick={() => handleClick(5, 3)} />
        <Square value={board[5][4]} onSquareClick={() => handleClick(5, 4)} />
      </div>
    </div>
  );
}
