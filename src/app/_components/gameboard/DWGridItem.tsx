import { ISpecialGridItems } from "./props";

const DWGridItem: React.FC<ISpecialGridItems> = ({ BGColor, language }) => {
  const backgroundColor = BGColor || "bg-gameboardDW";
  const text = language === "se" ? "DO" : "DW";
  return (
    <>
      <div className={`special-grid-item inner-tile ${backgroundColor}`}>
        <p className="tile-text">{text}</p>
      </div>
    </>
  );
};

export default DWGridItem;
