import { Yallist } from "yallist";
import allWords from "./data/wordle-All.json";

export class AISolver {
  allWordsList: Yallist<string>;
  blackLetters: Set<string>;
  yellowLetters: Map<number, Set<string>>;
  greenLetters: Map<number, string | null>;

  constructor() {
    this.allWordsList = Yallist.create(allWords);
    this.blackLetters = new Set<string>();
    this.yellowLetters = new Map<number, Set<string>>();
    this.greenLetters = new Map<number, string | null>();

    console.log("AI INIT DONE");
    console.log(this.allWordsList.length);
    console.log(this.allWordsList);
  }

  update(
    blackLetters: Set<string>,
    yellowLetters: Map<number, Set<string>>,
    greenLetters: Map<number, string | null>
  ) {
    this.blackLetters = blackLetters;
    this.yellowLetters = yellowLetters;
    this.greenLetters = greenLetters;
  }

  solve(): string {
    console.log(this.greenLetters);
    console.log(this.yellowLetters);

    let currBestGuess: string = "";
    let currBestProb: number = 0;

    console.log(this.allWordsList.length);

    let currWordNode = this.allWordsList.head;
    while (currWordNode) {
      const nextNode = currWordNode.next;
      let currProb = 0;

      for (let i = 0; i < 5; i++) {
        const currGuessedLetter: string = currWordNode.value[i];

        if (
          this.blackLetters.has(currGuessedLetter) ||
          this.yellowLetters.get(i)?.has(currGuessedLetter) ||
          this.greenLetters.get(i) !== currGuessedLetter
        ) {
          this.allWordsList.removeNode(currWordNode);
          break;
        } else {
        }
      }

      currWordNode = nextNode;
    }

    return currBestGuess;
  }
}
