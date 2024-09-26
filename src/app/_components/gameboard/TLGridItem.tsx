import React from "react";
import { ISpecialGridItems } from "./props";

const TLGridItem: React.FC<ISpecialGridItems> = ({ BGColor, language }) => {
  const backgroundColor = BGColor || "bg-gameboardTL";
  const text = language === "se" ? "TB" : "TL";
  return (
    <>
      <div className={`special-grid-item inner-tile ${backgroundColor}`}>
        <p className="tile-text">{text}</p>
      </div>
    </>
  );
};

export default TLGridItem;
