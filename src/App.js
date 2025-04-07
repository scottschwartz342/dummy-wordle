import "./App.css";
import { useState, useEffect, useRef } from "react";

function isAlpha(str) {
  return str.length === 1 && /^[a-zA-Z]+$/.test(str);
}

function Square({ value }) {
  return <div className="square">{value}</div>;
}

function App() {
  let row = 0;
  let col = 0;

  // set up board
  const [board, setSquares] = useState(
    Array.from({ length: 6 }, () => new Array(5).fill("+"))
  );

  // this helps make the div instantly focused so the user can just type
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    console.log("Key pressed:", e.key);
    if (e.key === "Enter") {
      console.log("WE SHOULD CHGECK GAME");
      return;
    } else if (!isAlpha(e.key)) {
      console.log("Not alphabet");
      return;
    }
    const nextboard = board.slice();
    nextboard[row][col] = e.key;
    setSquares(nextboard);
  };

  return (
    <div className="App" ref={divRef} tabIndex="0" onKeyDown={handleKeyDown}>
      <h1>Hello</h1>
      <div className="board-row">
        <Square value={board[0][0]} />
        <Square value={board[0][1]} />
        <Square value={board[0][2]} />
        <Square value={board[0][3]} />
        <Square value={board[0][4]} />
      </div>
      <div className="board-row">
        <Square value={board[1][0]} />
        <Square value={board[1][1]} />
        <Square value={board[1][2]} />
        <Square value={board[1][3]} />
        <Square value={board[1][4]} />
      </div>
      <div className="board-row">
        <Square value={board[2][0]} />
        <Square value={board[2][1]} />
        <Square value={board[2][2]} />
        <Square value={board[2][3]} />
        <Square value={board[2][4]} />
      </div>
      <div className="board-row">
        <Square value={board[3][0]} />
        <Square value={board[3][1]} />
        <Square value={board[3][2]} />
        <Square value={board[3][3]} />
        <Square value={board[3][4]} />
      </div>
      <div className="board-row">
        <Square value={board[4][0]} />
        <Square value={board[4][1]} />
        <Square value={board[4][2]} />
        <Square value={board[4][3]} />
        <Square value={board[4][4]} />
      </div>
      <div className="board-row">
        <Square value={board[5][0]} />
        <Square value={board[5][1]} />
        <Square value={board[5][2]} />
        <Square value={board[5][3]} />
        <Square value={board[5][4]} />
      </div>
    </div>
  );
}

export default App;
