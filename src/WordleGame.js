import { getDictionary } from "./getDictionary.js";

export class WordleGame {
  defSquare = {
    letter: "+",
    color: "clear",
  };

  board;
  currRow;
  currCol;
  wordleLA; //can be guessed and word
  wordleTA; //can be gues but not word
  solutionWord;

  async init() {
    this.wordleLA = await getDictionary("wordle-La.txt");
    this.wordleTA = await getDictionary("wordle-Ta.txt");
    let randomIndex = Math.floor(Math.random() * this.wordleLA.length);
    this.solutionWord = this.wordleLA[randomIndex];
    console.log(this.solutionWord);

    this.wordleLA = new Set(this.wordleLA);
    this.wordleTA = new Set(this.wordleTA);
  }

  constructor() {
    this.board = Array.from({ length: 6 }, () =>
      new Array(5).fill(this.defSquare)
    );
    this.currRow = 0;
    this.currCol = 0;
    this.init();
  }

  add(key) {
    if (this.isFullLine()) {
      return this.board;
    }

    const nextBoard = this.board.slice();
    nextBoard[this.currRow][this.currCol] = {
      letter: key,
      color: "white",
    };

    this.currCol++;

    return nextBoard;
  }

  delete() {
    if (this.currCol === 0) {
      return this.board;
    }

    this.currCol--;

    const nextBoard = this.board.slice();
    nextBoard[this.currRow][this.currCol] = this.defSquare;

    return nextBoard;
  }

  correct() {
    for (let i = 0; i < 5; i++) {
      if (this.board[this.currRow][i].letter !== this.solutionWord[i]) {
        return false;
      }
    }

    return true;
  }

  isFullLine() {
    return this.currCol / 5 === 1;
  }

  isValidWord() {
    let currGuess = "";

    for (let i = 0; i < 5; i++) {
      currGuess += this.board[this.currRow][i].letter;
    }

    return this.wordleLA.has(currGuess) || this.wordleTA.has(currGuess);
  }

  updateColors() {
    const nextBoard = this.board.slice();
    let solutionWordSet = new Set(this.solutionWord);

    for (let i = 0; i < 5; i++) {
      let currGuessedLetter = this.board[this.currRow][i].letter;

      if (currGuessedLetter === this.solutionWord[i]) {
        nextBoard[this.currRow][i].color = "green";
      } else if (solutionWordSet.has(currGuessedLetter)) {
        nextBoard[this.currRow][i].color = "yellow";
      } else {
        nextBoard[this.currRow][i].color = "black";
      }
    }

    return nextBoard;
  }

  enter() {
    if (!this.isFullLine() || !this.isValidWord()) {
      return {
        newBoard: this.board,
        newMessage: "Invalid Guess",
      };
    }

    const updatedColoredBoard = this.updateColors();
    let newMessage = "";

    if (this.correct()) {
      console.log("Correct");
      newMessage = "Winner! Winner! Chicken Dinner!";
    } else {
      console.log("Wrong");
      newMessage = "Not quit... :(";
      this.currCol = 0;
      this.currRow++;
    }

    return {
      newBoard: updatedColoredBoard,
      newMessage: newMessage,
    };
  }
}
