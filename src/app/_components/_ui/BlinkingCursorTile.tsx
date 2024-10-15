import { ILetterTileProps } from "./LetterTiles";

const BlinkingCursorTile: React.FC<ILetterTileProps> = ({
  onFocusInput,
  TWCSSClass,
}) => {
  return (
    <>
      <div className={TWCSSClass}>
        <div
          className={`letter-tile before:animate-blink bg-placeholderLetterTile inner-border inner-border-black before:absolute before:-left-0 before:top-0 before:ml-px before:h-full before:w-[2px] before:bg-black`}
          onClick={onFocusInput!}
        ></div>
      </div>
    </>
  );
};

export default BlinkingCursorTile;
