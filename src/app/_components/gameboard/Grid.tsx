"use client";
import { useEffect, useState } from "react";
import GridItem from "./GirdItem";
import { gridItemMap } from "./Map";
import { GridItemType, GridProps } from "./T";

const Grid: React.FC<GridProps> = ({ size, specialGridItems }) => {
  const [reset, setReset] = useState(false);
  const [hasSavedLetters, setHasSavedLetters] = useState(false);

  const handleInputLetter = (id: number, letter: string) => {
    console.log(`Letter ${letter} placed on square ${id}`);
  };

  const checkForSavedLetters = () => {
    let hasLetters = false;
    for (let i = 0; i < 225; i++) {
      if (localStorage.getItem(`gridItem-${i}`)) {
        hasLetters = true;
        break;
      }
    }
    setHasSavedLetters(true);
  };

  const handleClear = () => {
    console.log("Tömmer spelbrädan");
    localStorage.clear();
    setReset(!reset);
    setHasSavedLetters(false);
  };

  useEffect(() => {
    checkForSavedLetters();
  }, []);

  const create2DGrid = (): GridItemType[][] => {
    return Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => {
        const specialGridItem = specialGridItems.find(
          (sq) =>
            sq.row === row &&
            (Array.isArray(sq.col) ? sq.col.includes(col) : sq.col === col),
        );
        return {
          id: row * size + col,
          row,
          col,
          specialType: specialGridItem ? specialGridItem.type : null,
        };
      }),
    );
  };

  const grid = create2DGrid();

  return (
    <>
      <div className="grid-container bg-gameboardBG">
        {grid.map((row) =>
          row.map((gridItem) => {
            const SpecialComponent = gridItem.specialType
              ? gridItemMap[gridItem.specialType]
              : null;

            return SpecialComponent ? (
              <SpecialComponent menuLanguage="" BGColor="" key={gridItem.id} />
            ) : (
              <GridItem
                key={gridItem.id}
                id={gridItem.id}
                reset={reset}
                onInputLetter={(id, letter) => {
                  handleInputLetter(id, letter);
                  checkForSavedLetters();
                }}
              />
            );
          }),
        )}
      </div>
      {hasSavedLetters && (
        <button
          className="m-1 rounded-md border p-1 text-xs"
          onClick={handleClear}
        >
          Töm spelbrädan
        </button>
      )}
    </>
  );
};

export default Grid;
