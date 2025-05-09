import { Yallist } from "yallist";
import allWords from "./data/wordle-All.json";
import lettersProbabilities from "./data/letterProbabilities.json";
import wordProbabilities from "./data/wordProbabilities.json";

export class AISolver {
  allWordsList: Yallist<string>;
  lettersProbabilities: Record<string, number>;
  wordProbabilities: Record<string, number>;
  blackLetters: Set<string>;
  yellowLetters: Map<number, Set<string>>;
  greenLetters: Map<number, string | null>;

  constructor() {
    this.allWordsList = Yallist.create(allWords);
    this.lettersProbabilities = lettersProbabilities;
    this.wordProbabilities = wordProbabilities;
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
      const lettersProcessed: Set<String> = new Set();
      let doubleLetters = false;
      let hasBeenPruned = false;

      for (let i = 0; i < currWordNode.value.length; i++) {
        const currGuessedLetter: string = currWordNode.value[i];

        if (
          this.blackLetters.has(currGuessedLetter) ||
          this.yellowLetters.get(i)?.has(currGuessedLetter) ||
          (this.greenLetters.get(i) &&
            this.greenLetters.get(i) !== currGuessedLetter)
        ) {
          this.allWordsList.removeNode(currWordNode);
          hasBeenPruned = true;
          break;
        } else {
          if (lettersProcessed.has(currGuessedLetter)) {
            doubleLetters = true;
          }
          lettersProcessed.add(currGuessedLetter);
        }
      }

      let currProb = this.wordProbabilities[currWordNode.value];

      if (doubleLetters) {
        currProb *= 0.07;
      }

      if (!hasBeenPruned && currProb >= currBestProb) {
        currBestProb = currProb;
        currBestGuess = currWordNode.value;
      }

      currWordNode = nextNode;
    }

    console.log(currBestGuess);
    return currBestGuess;
  }
}
