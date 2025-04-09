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
  gameOver;
  blackLetters;
  yellowLetters;
  greenLetters;

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
    this.gameOver = false;
    this.blackLetters = new Set();
    this.yellowLetters = new Set();
    this.greenLetters = new Set();
    this.init();
  }

  add(key) {
    if (this.isFullLine() || this.gameOver) {
      return this.board;
    }

    key = key.toLowerCase();

    const nextBoard = this.board.slice();
    let newColor = "white";

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

  delete() {
    if (this.currCol === 0 || this.gameOver) {
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

  enter() {
    if (!this.isFullLine() || !this.isValidWord() || this.gameOver) {
      return {
        newBoard: this.board,
        newMessage: "Invalid Guess",
      };
    }

    const updatedColoredBoard = this.updateColors();
    let newMessage = "";

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
        newMessage = "Not quit... :(";
      }
    }

    return {
      newBoard: updatedColoredBoard,
      newMessage: newMessage,
    };
  }
}
