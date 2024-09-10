export type GridProps = {
  size: number;
  specialGridItems: {
    row: number;
    col: number | number[];
    type: "DubbleLetter" | "DubbleWord" | "TrippleLetter" | "TrippleWord";
  }[];
};

export type GridItemType = {
  id: number;
  row: number;
  col: number | number[];
  specialType:
    | "DubbleLetter"
    | "DubbleWord"
    | "TrippleLetter"
    | "TrippleWord"
    | null;
};

export type DubbleLetter = {
  multiplyLetterBy2: () => void;
};

export type DubbleWord = {
  multiplyWordBy2: () => void;
};

export type TrippleLetter = {
  multiplyLetterBy3: () => void;
};

export type TrippleWord = {
  multiplyWordBy3: () => void;
};
