import {
  Colors,
  Board,
  defaultSquare,
  EnterResponse,
} from "./HelperFunctionsAndTypes.ts";
import { AISolver } from "./AISolver.ts";

import dictionaryLa from "./data/wordle-La.json";
import dictionaryTa from "./data/wordle-Ta.json";

export class WordleGame {
  board: Board;
  currRow: number;
  currCol: number;
  dictionaryPossibleSolutions: Set<string>;
  dictionaryNonSolutions: Set<string>;
  solutionWord: string;
  blackLetters: Set<string>;
  yellowLetters: Map<number, Set<string>>;
  greenLetters: Map<number, string | null>;
  gameOver: boolean;
  gameWon: boolean;
  aiSolver: AISolver;

  constructor() {
    this.board = Array.from({ length: 6 }, () =>
      new Array(5).fill(defaultSquare)
    );
    this.currRow = 0;
    this.currCol = 0;
    this.solutionWord = "";
    this.yellowLetters = new Map<number, Set<string>>([
      [0, new Set()],
      [1, new Set()],
      [2, new Set()],
      [3, new Set()],
      [4, new Set()],
    ]);
    this.greenLetters = new Map<number, string | null>([
      [0, null],
      [1, null],
      [2, null],
      [3, null],
      [4, null],
    ]);
    this.blackLetters = new Set();
    this.gameOver = false;
    this.gameWon = false;

    let randomIndex = Math.floor(Math.random() * dictionaryLa.length);
    this.solutionWord = dictionaryLa[randomIndex];

    this.dictionaryPossibleSolutions = new Set(dictionaryLa);
    this.dictionaryNonSolutions = new Set(dictionaryTa);
    console.log(this.solutionWord);

    this.aiSolver = new AISolver();
  }

  isFullLine() {
    return this.currCol / 5 === 1;
  }

  add(key: string): Board {
    if (this.isFullLine() || this.gameOver) {
      return this.board;
    }

    key = key.toLowerCase();

    const nextBoard: Board = this.board.slice();
    let newColor: Colors = "white";

    if (this.blackLetters.has(key)) {
      newColor = "red";
    }

    nextBoard[this.currRow][this.currCol] = {
      letter: key,
      color: newColor,
    };

    this.currCol++;

    return nextBoard;
  }

  delete(): Board {
    if (this.currCol === 0 || this.gameOver) {
      return this.board;
    }

    this.currCol--;

    const nextBoard = this.board.slice();

    nextBoard[this.currRow][this.currCol] = defaultSquare;

    return nextBoard;
  }

  correct(): boolean {
    for (let i = 0; i < 5; i++) {
      if (this.board[this.currRow][i].letter !== this.solutionWord[i]) {
        return false;
      }
    }

    return true;
  }

  isValidWord(): boolean {
    let currGuess: string = "";

    for (let i = 0; i < 5; i++) {
      currGuess += this.board[this.currRow][i].letter;
    }

    return (
      this.dictionaryPossibleSolutions.has(currGuess) ||
      this.dictionaryNonSolutions.has(currGuess)
    );
  }

  updateColors(): Board {
    const nextBoard: Board = this.board.slice();
    let solutionWordSet: Set<string> = new Set(this.solutionWord);

    for (let i = 0; i < 5; i++) {
      const currGuessedLetter: string = this.board[this.currRow][i].letter;

      if (currGuessedLetter === this.solutionWord[i]) {
        nextBoard[this.currRow][i].color = "green";
        this.greenLetters.set(i, currGuessedLetter);
      } else if (solutionWordSet.has(currGuessedLetter)) {
        nextBoard[this.currRow][i].color = "yellow";
        this.yellowLetters.get(i)?.add(currGuessedLetter);
      } else {
        nextBoard[this.currRow][i].color = "black";
        this.blackLetters.add(currGuessedLetter);
      }
    }

    return nextBoard;
  }

  enter(): EnterResponse {
    if (this.gameOver) {
      const newMessage = this.gameWon
        ? "Winner! Winner! Chicken Dinner!"
        : `Sorry, GAME OVER! The word was ${this.solutionWord.toUpperCase()}.`;

      return {
        newBoard: this.board,
        newMessage: newMessage,
      };
    }

    if (!this.isFullLine() || !this.isValidWord()) {
      return {
        newBoard: this.board,
        newMessage: "Invalid Guess",
      };
    }

    const updatedColoredBoard: Board = this.updateColors();
    let newMessage: string = "";

    if (this.correct()) {
      console.log("Correct");
      newMessage = "Winner! Winner! Chicken Dinner!";
      this.gameOver = true;
      this.gameWon = true;
    } else {
      console.log("Wrong");
      this.currCol = 0;
      this.currRow++;
      if (this.currRow >= 6) {
        newMessage = `Sorry, GAME OVER! The word was ${this.solutionWord.toUpperCase()}.`;
        this.gameOver = true;
      } else {
        newMessage = "Not quite... :(";
      }
    }

    return {
      newBoard: updatedColoredBoard,
      newMessage: newMessage,
    };
  }

  runAI(): string {
    if (this.gameOver) {
      return "";
    }

    this.aiSolver.update(
      this.blackLetters,
      this.yellowLetters,
      this.greenLetters
    );

    return this.aiSolver.solve();
  }
}
