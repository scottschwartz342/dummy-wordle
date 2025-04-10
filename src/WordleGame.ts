import {
  getDictionary,
  // Square,
  Colors,
  Board,
  defaultSquare,
  EnterResponse,
} from "./HelperFunctionsAndTypes.ts";

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

  async init() {
    let tempDictionaryLA: string[] = await getDictionary("wordle-La.txt");
    let tempDictionaryTA: string[] = await getDictionary("wordle-Ta.txt");

    let randomIndex = Math.floor(Math.random() * tempDictionaryLA.length);
    this.solutionWord = tempDictionaryLA[randomIndex];

    this.dictionaryPossibleSolutions = new Set(tempDictionaryLA);
    this.dictionaryNonSolutions = new Set(tempDictionaryTA);
  }

  constructor() {
    this.board = Array.from({ length: 6 }, () =>
      new Array(5).fill(defaultSquare)
    );
    this.currRow = 0;
    this.currCol = 0;
    this.dictionaryPossibleSolutions = new Set();
    this.dictionaryNonSolutions = new Set();
    this.solutionWord = "";
    this.yellowLetters = new Set();
    this.greenLetters = new Set();
    this.blackLetters = new Set();
    this.gameOver = false;

    this.init();
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
        this.greenLetters.add(currGuessedLetter);
      } else if (solutionWordSet.has(currGuessedLetter)) {
        nextBoard[this.currRow][i].color = "yellow";
        this.yellowLetters.add(currGuessedLetter);
      } else {
        nextBoard[this.currRow][i].color = "black";
        this.blackLetters.add(currGuessedLetter);
        console.log(this.blackLetters);
      }
    }

    return nextBoard;
  }

  enter(): EnterResponse {
    if (!this.isFullLine() || !this.isValidWord()) {
      return {
        newBoard: this.board,
        newMessage: "Invalid Guess",
      };
    }

    if (this.gameOver) {
      return {
        newBoard: this.board,
        newMessage: "Sorry, GAME OVER! \n Refresh to Play Again.",
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
        newMessage = "Sorry, GAME OVER! \n Refresh to Play Again.";
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
}
