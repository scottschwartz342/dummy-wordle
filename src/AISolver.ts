import { getDictionary } from "./HelperFunctionsAndTypes";
import { Yallist } from "yallist";

export class AISolver {
  allWords: Yallist<string>;
  guessCount: number;
  blackLetters: Set<string>;
  yellowLetters: Set<string>;
  greenLetters: Set<string>;

  async init() {
    this.allWords = Yallist.create<string>(
      await getDictionary("wordle-All.json")
    );
  }

  constructor(
    currRow: number,
    blackLetters: Set<string>,
    yellowLetters: Set<string>,
    greenLetters: Set<string>
  ) {
    this.allWords = Yallist.create<string>();
    this.guessCount = currRow;
    this.blackLetters = blackLetters;
    this.yellowLetters = yellowLetters;
    this.greenLetters = greenLetters;

    this.init();
  }

  solve() {
    let guessesMadeByAI = [];

    while (this.guessCount < 6) {
      for (const word of this.allWords) {
      }

      this.guessCount++;
    }
  }
}
