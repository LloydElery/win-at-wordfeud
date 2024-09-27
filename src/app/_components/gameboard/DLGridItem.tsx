import { ISpecialGridItems } from "./props";

const DLGridItem: React.FC<ISpecialGridItems> = ({ BGColor, language }) => {
  const backgroundColor = BGColor || "bg-gameboardDL";
  const text = language === "se" ? "DB" : "DL";
  return (
    <>
      <div className={`special-grid-item inner-tile ${backgroundColor}`}>
        <p className="tile-text">{text}</p>
      </div>
    </>
  );
};

export default DLGridItem;
