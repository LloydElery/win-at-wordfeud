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
      <h2
        className={`gameboard-language-title ${gameboardLanguage === "se" ? "mx-16" : "mx-10"}`}
      >
        {gameboardLanguage === "se"
          ? "Spelbrädans språk:"
          : "Gameboard Language:"}
      </h2>
      <div className="gameboard-language grid grid-cols-2 grid-rows-1 text-sm font-light">
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
      <section className="special-grid-item-language-container m-[7px] grid grid-cols-2 grid-rows-1">
        <div className="special-grid-item-container-sv grid grid-cols-4 grid-rows-1 gap-px justify-self-center">
          <div className="h-[26px] w-[26px]">
            <TLGridItem
              language="se"
              BGColor={gameboardLanguage === "se" ? "" : "bg-none"}
            />
          </div>
          <div className="h-[26px] w-[26px]">
            <DLGridItem
              language="se"
              BGColor={gameboardLanguage === "se" ? "" : "bg-none"}
            />
          </div>
          <div className="h-[26px] w-[26px]">
            <TWGridItem
              language="se"
              BGColor={gameboardLanguage === "se" ? "" : "bg-none"}
            />
          </div>
          <div className="h-[26px] w-[26px]">
            <DWGridItem
              language="se"
              BGColor={gameboardLanguage === "se" ? "" : "bg-none"}
            />
          </div>
        </div>
        <div className="special-grid-item-container-en grid grid-cols-4 grid-rows-1 gap-px justify-self-center">
          <div className="h-[26px] w-[26px]">
            <TLGridItem
              language="en"
              BGColor={gameboardLanguage === "en" ? "" : "bg-none"}
            />
          </div>
          <div className="h-[26px] w-[26px]">
            <DLGridItem
              language="en"
              BGColor={gameboardLanguage === "en" ? "" : "bg-none"}
            />
          </div>
          <div className="h-[26px] w-[26px]">
            <TWGridItem
              language="en"
              BGColor={gameboardLanguage === "en" ? "" : "bg-none"}
            />
          </div>
          <div className="h-[26px] w-[26px]">
            <DWGridItem
              language="en"
              BGColor={gameboardLanguage === "en" ? "" : "bg-none"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default GameboardLanguage;
