import { Board, getDictionary } from "./HelperFunctionsAndTypes";

export class AISolver {
  allWords: Set<string>;

  async init() {
    this.allWords = new Set(await getDictionary("wordle-All.json"));
  }

  constructor() {
    this.allWords = new Set();

    this.init();
  }
}
