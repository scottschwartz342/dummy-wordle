export function getDictionary(url: string): Promise<string[]> {
  return fetch(`${process.env.PUBLIC_URL}/${url}`)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      // console.log("Dictionary response:", response);
      return response.json();
    })
    .then((data: string[]) => {
      return data;
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

export interface SquareProps {
  value: Square;
}

export interface DialogueProps {
  message: string;
}

export interface BoardRowProps {
  value: Square[];
}
