import "./App.css";
import { useState, useEffect, useRef } from "react";
import { WordleGame } from "./WordleGame.js";

const game = new WordleGame();

function isAlpha(str) {
  return str.length === 1 && /^[a-zA-Z]+$/.test(str);
}

function Square({ value }) {
  return <div className={`square ${value.color}`}>{value.letter}</div>;
}

function Dialogue({ message }) {
  return <p className="dialogue">{message}</p>;
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
  const [message, setDialogue] = useState("Guess, then hit 'Enter'");

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
      const { newBoard, newMessage } = game.enter();
      setSquares(newBoard);
      setDialogue(newMessage);
    } else if (event.key === "Backspace") {
      setSquares(game.delete());
    } else if (isAlpha(event.key)) {
      setSquares(game.add(event.key));
    }
  };

  return (
    <div className="App" ref={divRef} tabIndex="0" onKeyDown={handleKeyDown}>
      <h1>Hello</h1>
      <p>Type out your 5-lettered guess and hit "Enter". Remember:</p>
      <ul>
        <li>Gray: not in the word</li>
        <li>Yellow: in the word but not in the correct spot </li>
        <li>Green: in the right spot</li>
      </ul>
      <Dialogue message={message} />
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
