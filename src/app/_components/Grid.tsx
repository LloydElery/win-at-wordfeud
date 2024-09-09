import GridItem from "./GirdItem";

const Grid = () => {
  const gridWidthAndHeight = 15;
  const gridItems = Array.from({ length: Math.pow(gridWidthAndHeight, 2) });

  return (
    <>
      <div className="gridContainer grid-cols-15 grid-rows-15 gap-1 border border-black">
        Grid
        {gridItems.map((_, index) => (
          <div key={index}>
            <GridItem />
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
