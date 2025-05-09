import { Yallist } from "yallist";
import allWords from "./data/wordle-All.json";
import lettersProbabilities from "./data/letterProbabilities.json";

export class AISolver {
  allWordsList: Yallist<string>;
  lettersProbabilities: Record<string, number>;
  blackLetters: Set<string>;
  yellowLetters: Map<number, Set<string>>;
  greenLetters: Map<number, string | null>;

  constructor() {
    this.allWordsList = Yallist.create(allWords);
    this.lettersProbabilities = lettersProbabilities;
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
      const lettersProcessed: Set<String> = new Set();

      for (let i = 0; i < currWordNode.value.length; i++) {
        const currGuessedLetter: string = currWordNode.value[i];

        if (
          this.blackLetters.has(currGuessedLetter) ||
          this.yellowLetters.get(i)?.has(currGuessedLetter) ||
          (this.greenLetters.get(i) &&
            this.greenLetters.get(i) !== currGuessedLetter)
        ) {
          this.allWordsList.removeNode(currWordNode);
          break;
        } else {
          if (lettersProcessed.has(currGuessedLetter)) {
            currProb += this.lettersProbabilities[currGuessedLetter] / 2;
          } else {
            currProb += this.lettersProbabilities[currGuessedLetter];
          }
          lettersProcessed.add(currGuessedLetter);
        }
      }

      if (currProb >= currBestProb) {
        currBestProb = currProb;
        currBestGuess = currWordNode.value;
      }

      currWordNode = nextNode;
    }

    console.log(currBestGuess);
    return currBestGuess;
  }
}
