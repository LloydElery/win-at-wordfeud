import { LetterTile } from "../LetterTile";

export interface ILetterTileProps {
  query: string;
  TWCSSClass: string;
  onFocusInput?: () => void;
  onLetterTileClick: (letter: string) => void;
}

const LetterTiles: React.FC<ILetterTileProps> = ({
  query,
  TWCSSClass,
  onFocusInput,
  onLetterTileClick,
}) => {
  return (
    <>
      <div className={TWCSSClass} onClick={onFocusInput!}>
        {query.split("").map((letter: string, index: number) => (
          <div
            className={
              letter === " "
                ? `blank-letter-tile border border-black bg-letterTile`
                : `letter-tile bg-letterTile inner-border inner-border-black`
            }
            onClick={() => onLetterTileClick(letter)}
          >
            <LetterTile key={index} letter={letter} />
          </div>
        ))}
      </div>
    </>
  );
};

export default LetterTiles;
