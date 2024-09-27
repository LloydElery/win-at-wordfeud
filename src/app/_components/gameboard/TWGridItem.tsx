import { useLanguage } from "~/app/context/gameboard/GBLContext";
import GameboardLanguage from "../_ui/GameboardLanguage";
import { ISpecialGridItems } from "./props";

const TWGridItem: React.FC<ISpecialGridItems> = ({ BGColor, menuLanguage }) => {
  const { gameboardLanguage } = useLanguage();
  const backgroundColor = BGColor || "bg-gameboardTW";
  const text = gameboardLanguage === "se" ? "TO" : "TW";
  return (
    <>
      <div className={`special-grid-item inner-tile ${backgroundColor}`}>
        <p className="tile-text">{menuLanguage ? menuLanguage : text}</p>
      </div>
    </>
  );
};

export default TWGridItem;
