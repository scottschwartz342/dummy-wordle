export class WordleGame {
  board;
  currRow;
  currCol;

  constructor() {
    this.board = Array.from({ length: 6 }, () => new Array(5).fill("+"));
    this.currRow = 0;
    this.currCol = 0;
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

  delete() {}

  enter() {
    if (!this.isFullLine()) {
      return;
    }

    this.currCol = 0;
    this.currRow++;
  }
}
