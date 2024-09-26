import { ISpecialGridItems } from "./props";

const TWGridItem: React.FC<ISpecialGridItems> = ({ BGColor, language }) => {
  const backgroundColor = BGColor || "bg-gameboardTW";
  const text = language === "se" ? "TO" : "TW";
  return (
    <>
      <div className={`special-grid-item inner-tile ${backgroundColor}`}>
        <p className="tile-text">{text}</p>
      </div>
    </>
  );
};

export default TWGridItem;
