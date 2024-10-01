export const LetterTile = ({ letter }: { letter: string }) => (
  <div
    className={
      letter
        ? `flex size-full content-center items-center text-center tracking-[0.1em]`
        : `grid-item`
    }
  >
    <p className="tile-text text-black">{letter}</p>
  </div>
);
