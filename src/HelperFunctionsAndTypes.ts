export function getDictionary(url: string): Promise<string[]> {
  return fetch(url)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.text();
    })
    .then((text: string) => {
      return text.split("\n");
    })
    .catch((error: Error) => {
      console.error("Error:", error);
      return [];
    });
}

export type Colors = "clear" | "white" | "red" | "black" | "yellow" | "green";

export type Square = {
  letter: string;
  color: Colors;
};

export const defaultSquare: Square = {
  letter: "+",
  color: "clear",
};

export type Board = Square[][];

export type EnterResponse = {
  newBoard: Board;
  newMessage: string;
};
