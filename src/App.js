import "./App.css";
import { useState, useEffect, useRef } from "react";

let row = 0;
let col = 0;

function isAlpha(str) {
  return str.length === 1 && /^[a-zA-Z]+$/.test(str);
}

function Square({ value }) {
  return <div className="square">{value}</div>;
}

function BoardRow({ value }) {
  return (
    <div className="board-row">
      <Square value={value[0]} />
      <Square value={value[1]} />
      <Square value={value[2]} />
      <Square value={value[3]} />
      <Square value={value[4]} />
    </div>
  );
}

function App() {
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

    if (col / 4 === 1) {
      row++;
      col = -1;
    }

    col++;

    console.log(row, col);
  };

  return (
    <div className="App" ref={divRef} tabIndex="0" onKeyDown={handleKeyDown}>
      <h1>Hello</h1>
      <BoardRow value={board[0]} />
      <BoardRow value={board[1]} />
      <BoardRow value={board[2]} />
      <BoardRow value={board[3]} />
      <BoardRow value={board[4]} />
      <BoardRow value={board[5]} />
    </div>
  );
}

export default App;
