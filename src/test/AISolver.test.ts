import { Yallist } from "yallist";
import allWords from "./data/wordle-All.json";
import lettersProbabilities from "./data/letterProbabilities.json";
import { AISolver } from "../AISolver";

let aiSolver: AISolver;

beforeEach(() => {
  aiSolver = new AISolver();
});

describe("constructor", () => {
  it("allWordsList", () => {
    expect(aiSolver.allWordsList.length).toEqual(12972);
  });
});

describe("update", () => {
  it("blackLetters", () => {
    const testSet = new Set(["one", "two", "three"]);

    aiSolver.update(
      testSet,
      new Map<number, Set<string>>(),
      new Map<number, string | null>()
    );

    expect(aiSolver.blackLetters.has("one")).toBeTruthy();
    expect(aiSolver.blackLetters.has("two")).toBeTruthy();
    expect(aiSolver.blackLetters.has("three")).toBeTruthy();
  });

  it("yellowLetters", () => {
    const testSet = new Set(["one", "two", "three"]);
    const testMap = new Map<number, Set<string>>([
      [1, testSet],
      [2, testSet],
    ]);

    aiSolver.update(new Set(), testMap, new Map<number, string | null>());

    expect(aiSolver.yellowLetters).toEqual(testMap);
  });

  it("greenLetters", () => {
    const testMap = new Map<number, string | null>([
      [1, null],
      [2, "two"],
    ]);

    aiSolver.update(new Set(), new Map<number, Set<string>>(), testMap);

    expect(aiSolver.greenLetters).toEqual(testMap);
    expect(aiSolver.greenLetters.get(1)).toEqual(null);
    expect(aiSolver.greenLetters.get(2)).toEqual("two");
  });
});
