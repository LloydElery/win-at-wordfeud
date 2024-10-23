"use client";

import { useEffect, useRef, useState } from "react";
import { LetterTile } from "../LetterTile";

const GridItem = ({
  id,
  reset,
  onInputLetter,
}: {
  id: number;
  reset: boolean;
  onInputLetter: (id: number, letter: string) => void;
}) => {
  const [letter, setLetter] = useState<string>("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getSavedLetter();
  }, []);

  useEffect(() => {
    saveLetter();
  }, [letter]);

  useEffect(() => {
    if (reset) setLetter("");
  }, [reset]);

  const saveLetter = () => {
    if (letter) {
      localStorage.setItem(`gridItem-${id}`, letter);
    } else {
      localStorage.removeItem(`gridItem-${id}`);
    }
  };

  const getSavedLetter = () => {
    const savedLetter = localStorage.getItem(`gridItem-${id}`);
    if (savedLetter) setLetter(savedLetter);
  };

  const handleClick = () => {
    if (letter) {
      handleRemove();
    } else {
      setIsInputVisible(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  const handleRemove = () => {
    setLetter("");
    localStorage.removeItem(`gridItem-${id}`);
  };

  const handleInputChange = (e: any) => {
    const userInput = e.target.value.toUpperCase();
    if (userInput.length === 1) {
      onInputLetter(id, userInput);
      setLetter(userInput);
      setIsInputVisible(false);
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
        {isInputVisible ? (
          <>
            <div
              className={`h-full w-full animate-pulse bg-placeholderLetterTile before:absolute before:-left-0 before:top-0 before:ml-px before:h-full before:w-[2px] before:animate-blink before:bg-black`}
            >
              <input
                ref={inputRef}
                type="text"
                maxLength={1}
                onChange={handleInputChange}
                className="hidden-input"
                style={{ opacity: 0, position: "absolute", width: "1px" }}
              />
            </div>
          </>
        ) : null}
        {letter ? <LetterTile letter={letter} /> : ""}
      </div>
    </>
  );
};

export default GridItem;
