import { letterValues } from "~/utils/calculateLetterValue";

const getLetterValue = (letter: string): number => {
  return letterValues[letter.toLowerCase()] || 0;
};

export const LetterTile = ({ letter }: { letter: string }) => (
  <div
    className={
      letter
        ? `relative flex size-full content-center items-center text-center tracking-[0.1em]`
        : `grid-item`
    }
  >
    <div className="letter-value">{getLetterValue(letter)}</div>
    <p className="tile-text mr-[2px] mt-[2px] text-black">{letter}</p>
  </div>
);
