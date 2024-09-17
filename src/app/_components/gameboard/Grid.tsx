"use client";
import GridItem from "./GirdItem";
import { gridItemMap } from "./Map";
import { GridItemType, GridProps } from "./T";

const Grid: React.FC<GridProps> = ({ size, specialGridItems }) => {
  const handleInputLetter = (id: number, letter: string) => {
    console.log(`Letter ${letter} placed on square ${id}`);
  };
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
              <div className="special-grid-item">
                <SpecialComponent key={gridItem.id} />
              </div>
            ) : (
              <div className="grid-item">
                <GridItem
                  key={gridItem.id}
                  id={gridItem.id}
                  onInputLetter={handleInputLetter}
                />
              </div>
            );
          }),
        )}
      </div>
    </>
  );
};

export default Grid;
