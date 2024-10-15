import { useEffect, useRef } from "react";
import { LetterTile } from "../LetterTile";
import BlinkingCursorTile from "./BlinkingCursorTile";

export interface ILetterTileProps {
  query?: string;
  TWCSSClass?: string;
  onFocusInput?: () => void;
  onLetterTileClick?: (letter: string) => void;
  setQuery?: (newQuery: string) => void;
}

const LetterTiles: React.FC<ILetterTileProps> = ({
  query,
  TWCSSClass,
  onFocusInput,
  onLetterTileClick,
  setQuery,
}) => {
  const handleBackspaceOnMobileDevices = (event: KeyboardEvent) => {
    if (event.key === "Backspace" && query!.length > 0) {
      setQuery!(query!.slice(0, -1));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleBackspaceOnMobileDevices);

    return () =>
      document.removeEventListener("keydown", handleBackspaceOnMobileDevices);
  }, [query, setQuery]);

  return (
    <>
      <div className={TWCSSClass} onClick={onFocusInput!}>
        {query!.split("").map((letter: string, index: number) => (
          <div
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
