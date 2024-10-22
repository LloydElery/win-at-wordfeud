import { useEffect } from "react";
import { LetterTile } from "../LetterTile";
import BlinkingCursorTile from "./BlinkingCursorTile";
import ClearQueryTile from "./ClearQueryTile";

export interface ILetterTileProps {
  query?: string;
  setQuery?: any;
  TWCSSClass?: string;
  onFocusInput?: () => void;
  onLetterTileClick?: (letter: string) => void;
}

const LetterTiles: React.FC<ILetterTileProps> = ({
  query,
  setQuery,
  TWCSSClass,
  onFocusInput,
  onLetterTileClick,
}) => {
  const updateQuery = () => {
    const letter = query?.split("");
    const updatedQuery = letter!.join("");
    if (updatedQuery !== query) setQuery(updatedQuery);
  };

  useEffect(() => {
    updateQuery();
  }, [query]);

  return (
    <>
      <div className={TWCSSClass} onClick={onFocusInput!}>
        <ClearQueryTile
          setQuery={setQuery}
          TWCSSClass="letter-tile flex  gap-[1px]"
        />
        {query!.split("").map((letter: string, index: number) => (
          <div
            key={index}
            className={
              letter === " "
                ? `blank-letter-tile border border-black bg-letterTile`
                : `letter-tile bg-letterTile inner-border inner-border-black`
            }
            onClick={() => onLetterTileClick!(letter)}
          >
            <LetterTile key={index} letter={letter} />
          </div>
        ))}
        <BlinkingCursorTile
          onFocusInput={onFocusInput!}
          TWCSSClass="letter-tile flex blur-[1px] gap-[1px]"
        />
      </div>
    </>
  );
};

export default LetterTiles;
