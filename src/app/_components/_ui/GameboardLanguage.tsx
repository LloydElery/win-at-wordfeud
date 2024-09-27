import TWGridItem from "../gameboard/TWGridItem";
import TLGridItem from "../gameboard/TLGridItem";
import DLGridItem from "../gameboard/DLGridItem";
import DWGridItem from "../gameboard/DWGridItem";

import { SE, GB } from "country-flag-icons/react/3x2";
import { useLanguage } from "~/app/context/gameboard/GBLContext";

const GameboardLanguage: React.FC = () => {
  const { gameboardLanguage, setGameboardLanguage } = useLanguage();

  const handleLanguageChange = (language: string) => {
    setGameboardLanguage(language);
  };
  return (
    <>
      <h2
        className={`gameboard-language-title ${gameboardLanguage === "se" ? "mx-14" : "mx-10"}`}
      >
        {gameboardLanguage === "se"
          ? "Spelbrädans språk:"
          : "Gameboard Language:"}
      </h2>
      <div className="gameboard-language">
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
              menuLanguage="TB"
              BGColor={gameboardLanguage === "se" ? "" : "bg-none"}
            />
          </div>
          <div className="h-[26px] w-[26px]">
            <DLGridItem
              menuLanguage="DB"
              BGColor={gameboardLanguage === "se" ? "" : "bg-none"}
            />
          </div>
          <div className="h-[26px] w-[26px]">
            <TWGridItem
              menuLanguage="TO"
              BGColor={gameboardLanguage === "se" ? "" : "bg-none"}
            />
          </div>
          <div className="h-[26px] w-[26px]">
            <DWGridItem
              menuLanguage="DO"
              BGColor={gameboardLanguage === "se" ? "" : "bg-none"}
            />
          </div>
        </div>
        <div className="special-grid-item-container-en grid grid-cols-4 grid-rows-1 gap-px justify-self-center">
          <div className="h-[26px] w-[26px]">
            <TLGridItem
              menuLanguage="TL"
              BGColor={gameboardLanguage === "en" ? "" : "bg-none"}
            />
          </div>
          <div className="h-[26px] w-[26px]">
            <DLGridItem
              menuLanguage="DL"
              BGColor={gameboardLanguage === "en" ? "" : "bg-none"}
            />
          </div>
          <div className="h-[26px] w-[26px]">
            <TWGridItem
              menuLanguage="TW"
              BGColor={gameboardLanguage === "en" ? "" : "bg-none"}
            />
          </div>
          <div className="h-[26px] w-[26px]">
            <DWGridItem
              menuLanguage="DW"
              BGColor={gameboardLanguage === "en" ? "" : "bg-none"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default GameboardLanguage;
