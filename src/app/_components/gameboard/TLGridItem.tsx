import React from "react";
import { TrippleLetter } from "./T";

export const trippleLetterItems = [
  { row: 0, col: [0, 14] },
  { row: 1, col: [5, 9] },
  { row: 3, col: [3, 11] },
  { row: 5, col: [1, 5, 9, 13] },
  { row: 9, col: [1, 5, 9, 13] },
  { row: 11, col: [3, 11] },
  { row: 13, col: [5, 9] },
  { row: 14, col: [0, 14] },
];

const TLGridItem = () => {
  return (
    <>
      <div className="bg-gameboardTL">TL</div>
    </>
  );
};

export default TLGridItem;
