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
  yellowLetters: Set<string>;
  greenLetters: Set<string>;
  gameOver: boolean;

  constructor() {
    this.board = Array.from({ length: 6 }, () =>
      new Array(5).fill(defaultSquare)
    );
    this.currRow = 0;
    this.currCol = 0;
    this.solutionWord = "";
    this.yellowLetters = new Set();
    this.greenLetters = new Set();
    this.blackLetters = new Set();
    this.gameOver = false;

    let randomIndex = Math.floor(Math.random() * dictionaryLa.length);
    this.solutionWord = dictionaryLa[randomIndex];

    this.dictionaryPossibleSolutions = new Set(dictionaryLa);
    this.dictionaryNonSolutions = new Set(dictionaryTa);
    console.log(this.solutionWord);
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
      let currGuessedLetter: string = this.board[this.currRow][i].letter;

      if (currGuessedLetter === this.solutionWord[i]) {
        nextBoard[this.currRow][i].color = "green";
        this.greenLetters.add(`${currGuessedLetter}${i}`);
      } else if (solutionWordSet.has(currGuessedLetter)) {
        nextBoard[this.currRow][i].color = "yellow";
        this.yellowLetters.add(currGuessedLetter);
      } else {
        nextBoard[this.currRow][i].color = "black";
        this.blackLetters.add(currGuessedLetter);
      }
    }

    return nextBoard;
  }

  enter(): EnterResponse {
    if (this.gameOver) {
      return {
        newBoard: this.board,
        newMessage: "Sorry, GAME OVER! \n Refresh to Play Again.",
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
      newMessage = "Winner! Winner! Chicken Dinner! \n Refresh to Play Again.";
    } else {
      console.log("Wrong");
      this.currCol = 0;
      this.currRow++;
      if (this.currRow >= 6) {
        newMessage = `Sorry, GAME OVER! The word was ${this.solutionWord.toUpperCase()}\n Refresh to Play Again.`;
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

  runAI(): void {
    if (this.gameOver) {
      return;
    }

    const aiSolver = new AISolver(
      this.currRow,
      this.blackLetters,
      this.yellowLetters,
      this.greenLetters
    );

    aiSolver.solve();

    this.gameOver = true;
  }
}
