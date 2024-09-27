import { useLanguage } from "~/app/context/gameboard/GBLContext";
import { ISpecialGridItems } from "./props";

const DWGridItem: React.FC<ISpecialGridItems> = ({ BGColor, menuLanguage }) => {
  const { gameboardLanguage } = useLanguage();

  const backgroundColor = BGColor || "bg-gameboardDW";
  const text = gameboardLanguage === "se" ? "DO" : "DW";
  return (
    <>
      <div className={`special-grid-item inner-tile ${backgroundColor}`}>
        <p className="tile-text">{menuLanguage ? menuLanguage : text}</p>
      </div>
    </>
  );
};

export default DWGridItem;
