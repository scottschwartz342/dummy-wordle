export class WordleGame {
  board;
  currRow;
  currCol;
  currWord;

  constructor() {
    this.board = Array.from({ length: 6 }, () => new Array(5).fill("+"));
    this.currRow = 0;
    this.currCol = 0;
    this.currWord = "";
  }

  add() {}

  delete() {}
}
