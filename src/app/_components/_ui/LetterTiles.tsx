import { LetterTile } from "../LetterTile";

interface IProps {
  query: string;
  TWCSSClass: string;
}

const LetterTiles: React.FC<IProps> = ({ query, TWCSSClass }) => {
  return (
    <>
      <div className={TWCSSClass}>
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
