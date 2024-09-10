export type SpecialGridLayoutItem = {
  row: number;
  columns: {
    col: number | number[];
    type: "DubbleLetter" | "DubbleWord" | "TrippleLetter" | "TrippleWord";
  }[];
};

const generateSpecialGridItems = (
  layout: SpecialGridLayoutItem[],
): {
  row: number;
  col: number | number[];
  type: "DubbleLetter" | "DubbleWord" | "TrippleLetter" | "TrippleWord";
}[] => {
  let specialGridLayoutItems: {
    row: number;
    col: number | number[];
    type: "DubbleLetter" | "DubbleWord" | "TrippleLetter" | "TrippleWord";
  }[] = [];

  layout.forEach((rowLayout) => {
    rowLayout.columns.forEach((column) => {
      specialGridLayoutItems.push({
        row: rowLayout.row,
        col: column.col,
        type: column.type,
      });
    });
  });

  return specialGridLayoutItems;
};

const specialGridLayout: SpecialGridLayoutItem[] = [
  {
    row: 0,
    columns: [
      { col: [0, 14], type: "TrippleLetter" },
      { col: [4, 10], type: "TrippleWord" },
    ],
  },
  {
    row: 1,
    columns: [
      { col: [1, 13], type: "DubbleLetter" },
      { col: [5, 9], type: "TrippleLetter" },
    ],
  },
  {
    row: 2,
    columns: [
      { col: [2, 12], type: "DubbleWord" },
      { col: [6, 8], type: "DubbleLetter" },
    ],
  },
  {
    row: 3,
    columns: [
      { col: [3, 11], type: "TrippleLetter" },
      { col: [7], type: "DubbleWord" },
    ],
  },
  {
    row: 4,
    columns: [
      { col: [0, 14], type: "TrippleWord" },
      { col: [4, 10], type: "DubbleWord" },
      { col: [6, 8], type: "DubbleLetter" },
    ],
  },
  { row: 5, columns: [{ col: [1, 5, 9, 13], type: "TrippleLetter" }] },
  { row: 6, columns: [{ col: [2, 4, 10, 12], type: "DubbleLetter" }] },
  { row: 7, columns: [{ col: [3, 11], type: "DubbleWord" }] },
  { row: 8, columns: [{ col: [2, 4, 10, 12], type: "DubbleLetter" }] },
  { row: 9, columns: [{ col: [1, 5, 9, 13], type: "TrippleLetter" }] },
  {
    row: 10,
    columns: [
      { col: [0, 14], type: "TrippleWord" },
      { col: [4, 10], type: "DubbleWord" },
      { col: [6, 8], type: "DubbleLetter" },
    ],
  },
  {
    row: 11,
    columns: [
      { col: [3, 11], type: "TrippleLetter" },
      { col: [7], type: "DubbleWord" },
    ],
  },
  {
    row: 12,
    columns: [
      { col: [2, 12], type: "DubbleWord" },
      { col: [6, 8], type: "DubbleLetter" },
    ],
  },
  {
    row: 13,
    columns: [
      { col: [0, 14], type: "TrippleLetter" },
      { col: [4, 10], type: "TrippleWord" },
    ],
  },
  {
    row: 14,
    columns: [
      { col: [0, 14], type: "TrippleLetter" },
      { col: [4, 10], type: "TrippleWord" },
    ],
  },
];

export const specialGridLayoutItems =
  generateSpecialGridItems(specialGridLayout);
