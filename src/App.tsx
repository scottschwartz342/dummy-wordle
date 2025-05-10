import "./App.css";
import { useState, useEffect, useRef } from "react";
import { WordleGame } from "./WordleGame";
import {
  SquareProps,
  DialogueProps,
  BoardRowProps,
  Board,
} from "./HelperFunctionsAndTypes";

const game: WordleGame = new WordleGame();

function isAlpha(str: string): boolean {
  return str.length === 1 && /^[a-zA-Z]+$/.test(str);
}

function Square({ value }: SquareProps) {
  return <div className={`square ${value.color}`}>{value.letter}</div>;
}

function Dialogue({ message }: DialogueProps) {
  return <p className="dialogue">{message}</p>;
}

function BoardRow({ value }: BoardRowProps) {
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
  const [board, setSquares] = useState<Board>(game.board);
  const [message, setDialogue] = useState<string>(
    "Type out a 5-lettered guess and hit 'Enter'"
  );
  const [isGameOver, setIsGameOver] = useState<boolean>(game.gameOver);

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const runAI = (runs: number) => {
    let cap = runs ? game.board.length : 1;

    for (let i = 0; i < 5; i++) {
      setSquares(game.delete());
    }

    for (let run = 0; run < cap; run++) {
      const aiGuess: string = game.runAI();

      for (let i = 0; i < aiGuess.length; i++) {
        setSquares(game.add(aiGuess[i]));
      }

      const { newBoard, newMessage } = game.enter();
      setSquares(newBoard);
      setDialogue(newMessage);
      setIsGameOver(game.gameOver);
    }
  };

  const handleAIClick = (
    runs: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    runAI(runs);
    e.currentTarget.blur();
    hiddenInputRef.current?.focus();
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("Key pressed:", e.key);
    if (e.key === "Enter") {
      const { newBoard, newMessage } = game.enter();
      setSquares(newBoard);
      setDialogue(newMessage);
      setIsGameOver(game.gameOver);
    } else if (e.key === "Backspace") {
      setSquares(game.delete());
    } else if (isAlpha(e.key)) {
      setSquares(game.add(e.key));
    }

    e.preventDefault();
  };

  useEffect(() => {
    hiddenInputRef.current?.focus();

    const refocus = () => hiddenInputRef.current?.focus();

    window.addEventListener("click", refocus);
    window.addEventListener("touchstart", refocus);

    return () => {
      window.removeEventListener("click", refocus);
      window.removeEventListener("touchstart", refocus);
    };
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        ref={hiddenInputRef}
        onKeyDown={onKeyDown}
        className="hidden-input"
      />
      <h1>Wordle Dummy</h1>
      <a href="https://github.com/scottschwartz342/wordle-dummy">Source Code</a>
      <ul>
        <li>Black: not in the word</li>
        <li>Yellow: in the word but not in the correct spot</li>
        <li>Green: in the correct spot</li>
        <li>Red: already guessed and is Black</li>
      </ul>
      <div className="button-pair">
        <button onClick={(e) => handleAIClick(0, e)}>Have AI Guess</button>
        <br />
        <button onClick={(e) => handleAIClick(1, e)}>Have AI Solve</button>
      </div>
      <Dialogue message={message} />
      {isGameOver && (
        <button id="play-again" onClick={handlePlayAgain}>
          Play Again
        </button>
      )}
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
