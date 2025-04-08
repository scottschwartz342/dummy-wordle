import { getDictionary } from "./getDictionary.js";

export class WordleGame {
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
  }

  constructor() {
    this.board = Array.from({ length: 6 }, () => new Array(5).fill("+"));
    this.currRow = 0;
    this.currCol = 0;
    this.init();
  }

  isFullLine() {
    return this.currCol / 5 === 1;
  }

  add(key) {
    if (this.isFullLine()) {
      return this.board;
    }

    const nextboard = this.board.slice();
    nextboard[this.currRow][this.currCol] = key;

    this.currCol++;

    return nextboard;
  }

  delete() {
    if (this.currCol === 0) {
      return this.board;
    }

    this.currCol--;

    const nextboard = this.board.slice();
    nextboard[this.currRow][this.currCol] = "+";

    return nextboard;
  }

  enter() {
    if (!this.isFullLine()) {
      return;
    }

    this.currCol = 0;
    this.currRow++;
  }
}
