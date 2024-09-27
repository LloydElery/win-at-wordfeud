import { useLanguage } from "~/app/context/gameboard/GBLContext";
import { ISpecialGridItems } from "./props";

const DLGridItem: React.FC<ISpecialGridItems> = ({ BGColor, menuLanguage }) => {
  const { gameboardLanguage } = useLanguage();
  const backgroundColor = BGColor || "bg-gameboardDL";
  const text = gameboardLanguage === "se" ? "DB" : "DL";
  return (
    <>
      <div className={`special-grid-item inner-tile ${backgroundColor}`}>
        <p className="tile-text">{menuLanguage ? menuLanguage : text}</p>
      </div>
    </>
  );
};

export default DLGridItem;
