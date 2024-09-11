"use client";

import { useState } from "react";

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
      <div className="grid-item" onClick={handleClick}>
        <p>{letter}</p>
      </div>
    </>
  );
};

export default GridItem;
