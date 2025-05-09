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
