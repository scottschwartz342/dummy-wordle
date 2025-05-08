import { Yallist } from "yallist";
import allWords from "./data/wordle-All.json";

export class AISolver {
  allWordsList: Yallist<string>;
  guessCount: number;
  blackLetters: Set<string>;
  yellowLetters: Map<number, Set<string>>;
  greenLetters: Map<number, string | null>;

  constructor(
    currRow: number,
    blackLetters: Set<string>,
    yellowLetters: Map<number, Set<string>>,
    greenLetters: Map<number, string | null>
  ) {
    this.allWordsList = Yallist.create(allWords);
    this.guessCount = currRow;
    this.blackLetters = blackLetters;
    this.yellowLetters = yellowLetters;
    this.greenLetters = greenLetters;

    console.log("AI INIT DONE");
    console.log(this.allWordsList.length);
    console.log(this.allWordsList);
  }

  canBeWord(word: string): boolean {
    return false;
  }

  solve() {
    let guessesMadeByAI = [];

    console.log(this.greenLetters);

    while (this.guessCount < 6) {
      console.log(this.allWordsList.length);

      let currWordNode = this.allWordsList.head;
      while (currWordNode) {
        const nextNode = currWordNode.next;

        if (!this.canBeWord(currWordNode.value)) {
          this.allWordsList.removeNode(currWordNode);
        }

        currWordNode = nextNode;
      }
      this.guessCount++;
    }
  }
}
