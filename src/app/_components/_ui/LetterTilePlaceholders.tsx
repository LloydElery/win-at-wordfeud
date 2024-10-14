import { LetterTile } from "../LetterTile";
import { ILetterTileProps } from "./LetterTiles";

const LetterTilePlaceholders: React.FC<ILetterTileProps> = ({
  query,
  TWCSSClass,
  onFocusInput,
}) => {
  const letters = 7 - query.length;
  return (
    <>
      <div className={TWCSSClass}>
        {Array.from({ length: letters }).map((_, index) => (
          <div
            key={index}
            className={`letter-tile bg-placeholderLetterTile inner-border inner-border-black`}
            onClick={onFocusInput}
          >
            <LetterTile letter={""} />
          </div>
        ))}
      </div>
    </>
  );
};

export default LetterTilePlaceholders;
