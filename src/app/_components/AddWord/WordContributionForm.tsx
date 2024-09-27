"use client";
import { useState } from "react";
import GameboardLanguage from "../_ui/GameboardLanguage";

const WordContributionForm: React.FC = () => {
  const [word, setWord] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("svenska"); // Hanterar valt språk

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const lowerCaeWord = word.trim().toLowerCase();

    const res = await fetch("/api/add-word", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: lowerCaeWord }),
    });

    const result = await res.json();
    if (result.success) {
      alert("Word submitted successfully!");
    } else {
      alert("Word already exists od failed to submit.");
    }

    setWord("");
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    console.log(`Selected language: ${language}`);
    // Här kan du lägga till logik för vad som ska hända vid språkbyte
  };

  return (
    <>
      <div className="m-[7px] text-sm font-light">
        <p>
          Finns det ord som du kan spela men som inte dyker upp när du söker?
        </p>
        <br />
        <p>
          Om du hittar ord som inte går att spela så finns det en "Report" knapp
          vid varje ord bland sökresultaten
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="flex gap-1 text-sm font-light text-letterTile">
          <input
            className="rounded-md border border-gray-300 px-4 py-2 text-black"
            type="text"
            pattern="[a-zåäöA-ZÅÄÖ]"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Skriv ditt ord"
            required
          />
          <button
            type="submit"
            className="rounded bg-gray-100 px-4 py-2 text-gray-600"
          >
            Skicka
          </button>
        </label>
      </form>
      <div className="m-[7px] w-full border">
        <GameboardLanguage onLanguageChange={handleLanguageChange} />
      </div>
    </>
  );
};

export default WordContributionForm;
