import "./App.css";
import { useState, useEffect, useRef } from "react";
import { WordleGame } from "./WordleGame.js";

const game = new WordleGame();

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
  const [board, setSquares] = useState(game.board);

  // this helps make the div instantly focused so the user can just type
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  const handleKeyDown = (event) => {
    console.log("Key pressed:", event.key);
    if (event.key === "Enter") {
      game.isWinner();
    } else if (event.key === "Backspace") {
      game.delete();
    } else if (isAlpha(event.key)) {
      setSquares(game.add(event.key));
    }
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
