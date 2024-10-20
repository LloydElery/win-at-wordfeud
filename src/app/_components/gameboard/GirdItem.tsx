"use client";

import { useState } from "react";
import { LetterTile } from "../LetterTile";

const GridItem = ({
  id,
  onInputLetter,
}: {
  id: number;
  onInputLetter: (id: number, letter: string) => void;
}) => {
  const [letter, setLetter] = useState("");

  const handleClick = () => {
    const userLetter = prompt("Ange en bokstav:");
    if (userLetter && userLetter.length === 1) {
      setLetter(userLetter.toUpperCase());
      onInputLetter(id, userLetter.toUpperCase());
    }
  };

  return (
    <>
      <div
        className={
          letter
            ? `special-grid-item inner-tile bg-letterTile font-bold`
            : `grid-item`
        }
        onClick={handleClick}
      >
        {letter ? <LetterTile letter={letter} /> : ""}
      </div>
    </>
  );
};

export default GridItem;
