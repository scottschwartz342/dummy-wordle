export class WordleGame {
  board;
  currRow;
  currCol;

  constructor() {
    this.board = Array.from({ length: 6 }, () => new Array(5).fill("+"));
    this.currRow = 0;
    this.currCol = 0;
  }

  add(key) {
    const nextboard = this.board.slice();
    nextboard[this.currRow][this.currCol] = key;

    if (this.currCol / 4 === 1) {
      this.currRow++;
      this.currCol = -1;
    }

    this.currCol++;

    return nextboard;
  }

  delete() {}

  isWinner() {
    // TO DO
  }
}
