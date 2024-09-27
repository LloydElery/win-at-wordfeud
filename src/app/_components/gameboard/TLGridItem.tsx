import React from "react";
import { ISpecialGridItems } from "./props";
import { useLanguage } from "~/app/context/gameboard/GBLContext";

const TLGridItem: React.FC<ISpecialGridItems> = ({ BGColor, menuLanguage }) => {
  const { gameboardLanguage } = useLanguage();

  const backgroundColor = BGColor || "bg-gameboardTL";
  const text = gameboardLanguage === "se" ? "TB" : "TL";
  return (
    <>
      <div className={`special-grid-item inner-tile ${backgroundColor}`}>
        <p className="tile-text">{menuLanguage ? menuLanguage : text}</p>
      </div>
    </>
  );
};

export default TLGridItem;
