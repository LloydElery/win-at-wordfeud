export const LetterTile = ({ letter }: { letter: string }) => (
  <div
    className={
      letter === " "
        ? `blank-letter-tile bg-letterTile`
        : `letter-tile bg-letterTile`
    }
  >
    {letter}
  </div>
);
