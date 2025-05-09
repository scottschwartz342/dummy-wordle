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

describe("solve", () => {
  beforeEach(() => {
    aiSolver.update(
      new Set(["a", "b"]),
      new Map<number, Set<string>>([
        [0, new Set("z")],
        [1, new Set()],
        [2, new Set()],
        [3, new Set()],
        [4, new Set()],
      ]),
      new Map<number, string | null>([
        [0, "z"],
        [1, null],
        [2, null],
        [3, "i"],
        [4, null],
      ])
    );
  });

  it("solve returns zymic", () => {
    expect(aiSolver.solve()).toBe("zymic");
  });
});
