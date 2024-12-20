import { AiTwotoneDelete } from "react-icons/ai";
import { ILetterTileProps } from "./LetterTiles";

const ClearQueryTile: React.FC<ILetterTileProps> = ({
  setQuery,
  TWCSSClass,
}) => {
  const handleClear = () => {
    setQuery("");
  };
  return (
    <>
      <div className={TWCSSClass}>
        <div
          className={`letter-tile content-center bg-placeholderLetterTile inner-border inner-border-black`}
          onClick={handleClear}
        >
          <AiTwotoneDelete size={25} color="#6F1515" />
        </div>
      </div>
    </>
  );
};

export default ClearQueryTile;
