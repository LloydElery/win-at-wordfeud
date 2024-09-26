import { useState } from "react";
import TWGridItem from "../gameboard/TWGridItem";
import TLGridItem from "../gameboard/TLGridItem";
import DLGridItem from "../gameboard/DLGridItem";
import DWGridItem from "../gameboard/DWGridItem";

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
      <div className="gameboard-language grid grid-cols-5 grid-rows-1 text-sm font-light">
        <h2 className="gameboard-language-title">Gameboard Language:</h2>
        <button
          onClick={() => handleLanguageChange("se")}
          className={`gameboard-language-flag ${gameboardLanguage === "se" ? "selected" : ""}`}
        >
          <SE />
        </button>
        <button
          onClick={() => handleLanguageChange("en")}
          className={`gameboard-language-flag ${gameboardLanguage === "en" ? "selected" : ""}`}
        >
          <GB />
        </button>
      </div>
      <section className="special-grid-item-language-container grid grid-cols-2 grid-rows-1 border">
        <div className="special-grid-item-container-en grid w-full grid-cols-4 grid-rows-1 border">
          <div className="special-grid-item">
            <TLGridItem
              language="en"
              BGColor={gameboardLanguage === "en" ? "" : "bg-none"}
            />
          </div>
          <div className="special-grid-item">
            <DLGridItem
              language="en"
              BGColor={gameboardLanguage === "en" ? "" : "bg-none"}
            />
          </div>
          <div className="special-grid-item">
            <TWGridItem
              language="en"
              BGColor={gameboardLanguage === "en" ? "" : "bg-none"}
            />
          </div>
          <div className="special-grid-item">
            <DWGridItem
              language="en"
              BGColor={gameboardLanguage === "en" ? "" : "bg-none"}
            />
          </div>
        </div>
        <div className="special-grid-item-container-sv grid w-full grid-cols-4 grid-rows-1 border">
          <div className="special-grid-item">
            <TLGridItem
              language="se"
              BGColor={gameboardLanguage === "se" ? "" : "bg-none"}
            />
          </div>
          <div className="special-grid-item">
            <DLGridItem
              language="se"
              BGColor={gameboardLanguage === "se" ? "" : "bg-none"}
            />
          </div>
          <div className="special-grid-item">
            <TWGridItem
              language="se"
              BGColor={gameboardLanguage === "se" ? "" : "bg-none"}
            />
          </div>
          <div className="special-grid-item">
            <DWGridItem
              language="se"
              BGColor={gameboardLanguage === "se" ? "" : "bg-none"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default GameboardLanguage;
