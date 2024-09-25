import { useState } from "react";
import TWGridItem from "../gameboard/TWGridItem";
import TLGridItem from "../gameboard/TLGridItem";
import DLGridItem from "../gameboard/DLGridItem";
import DWGridItem from "../gameboard/DWGridItem";

import { hasFlag } from "country-flag-icons";
import { SE, GB } from "country-flag-icons/react/3x2";

interface IGameboardLanguage {
  onLanguageChange: (language: string) => void;
}

const GameboardLanguage: React.FC<IGameboardLanguage> = ({
  onLanguageChange,
}) => {
  const [gameboardLanguage, setGameboardLanguage] = useState<string>(
    "se" || "en",
  );

  const handleLanguageChange = (language: string) => {
    setGameboardLanguage(language);
    onLanguageChange(language); // send information to parent component
  };
  return (
    <>
      <div className="gameboard-language text-sm font-light">
        Gameboard Language: <SE className="size-4" /> <GB className="size-4" />
        <button
          onClick={() => handleLanguageChange("svenska")}
          className={`flag-button ${gameboardLanguage === "svenska" ? "selected" : ""}`}
        >
          <SE title="Sverige" className="z-10" />
        </button>
        <button
          onClick={() => handleLanguageChange("engelska")}
          className={`flag-button ${gameboardLanguage === "engelska" ? "selected" : ""}`}
        ></button>
      </div>
      <section className="special-grid-item-language-container grid grid-cols-2 grid-rows-1 border">
        <div className="special-grid-item-container-en grid w-full grid-cols-4 grid-rows-1 border">
          <div className="special-grid-item">
            <TLGridItem />
          </div>
          <div className="special-grid-item">
            <DLGridItem />
          </div>
          <div className="special-grid-item">
            <TWGridItem />
          </div>
          <div className="special-grid-item">
            <DWGridItem />
          </div>
        </div>
        <div className="special-grid-item-container-sv grid w-full grid-cols-4 grid-rows-1 border">
          <div className="special-grid-item">
            <TLGridItem />
          </div>
          <div className="special-grid-item">
            <DLGridItem />
          </div>
          <div className="special-grid-item">
            <TWGridItem />
          </div>
          <div className="special-grid-item">
            <DWGridItem />
          </div>
        </div>
      </section>
    </>
  );
};

export default GameboardLanguage;
