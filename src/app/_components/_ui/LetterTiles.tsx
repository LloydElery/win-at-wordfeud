import { LetterTile } from "../LetterTile";

export interface ILetterTileProps {
  query: string;
  TWCSSClass: string;
  onFocusInput?: () => void;
}

const LetterTiles: React.FC<ILetterTileProps> = ({
  query,
  TWCSSClass,
  onFocusInput,
}) => {
  const handleClick = () => onFocusInput!();
  return (
    <>
      <div className={TWCSSClass} onClick={handleClick}>
        {query.split("").map((letter: string, index: number) => (
          <div
            className={
              letter === " "
                ? `blank-letter-tile border border-black bg-letterTile`
                : `letter-tile bg-letterTile inner-border inner-border-black`
            }
          >
            <LetterTile key={index} letter={letter} />
          </div>
        ))}
      </div>
    </>
  );
};

export default LetterTiles;
