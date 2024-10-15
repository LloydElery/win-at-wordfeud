import { useEffect } from "react";
import { LetterTile } from "../LetterTile";
import BlinkingCursorTile from "./BlinkingCursorTile";
import { ILetterTileProps } from "./LetterTiles";

const LetterTilePlaceholders: React.FC<ILetterTileProps> = ({
  query,
  TWCSSClass,
  onFocusInput,
}) => {
  const letters = 6 - query!.length;

  useEffect(() => {}, [query]);

  return (
    <>
      <div className={TWCSSClass}>
        <BlinkingCursorTile onFocusInput={onFocusInput} />
        {Array.from({ length: letters }).map((_, index) => (
          <div
            key={index}
            className={`letter-tile bg-placeholderLetterTile inner-border inner-border-black`}
            onClick={onFocusInput!}
          >
            <LetterTile letter={""} />
          </div>
        ))}
      </div>
    </>
  );
};

export default LetterTilePlaceholders;
