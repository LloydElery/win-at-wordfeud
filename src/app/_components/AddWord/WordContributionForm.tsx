"use client";
import { useRef, useState } from "react";
import GameboardLanguage from "../_ui/GameboardLanguage";
import { useAuth } from "@clerk/nextjs";

const WordContributionForm: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();

  const [word, setWord] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isLoaded || isSubmitting) return;

    if (!isSignedIn) {
      setMessage("Logga in för att lägga till ord i vår databas");
      setMessageColor("text-red-400");
      return;
    }

    const lowerCaseWord = word.trim().toLowerCase();

    setIsSubmitting(true);

    const res = await fetch("/api/add-word", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: lowerCaseWord }),
    });

    const result = await res.json();

    if (result.success) {
      setMessage(`Tack! ${word.toUpperCase()} finns nu i vår databas.`);
      setMessageColor("text-green-400");
    } else {
      setMessage(`${word.toUpperCase()} finns redan i vår databas.`);
      setMessageColor("text-red-400");
    }

    setWord("");
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);

    const messageWhenWordDoesNotMatchFormat =
      "Ord får enbart innehålla bokstäver i Svenska alfabetet";

    if (inputRef.current) {
      if (!e.target.validity.valid) {
        inputRef.current.setCustomValidity(messageWhenWordDoesNotMatchFormat);
      } else {
        inputRef.current.setCustomValidity("");
      }
    }
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
            ref={inputRef}
            className="rounded-md border border-gray-300 px-4 py-2 text-black"
            type="text"
            pattern="[a-zåäöA-ZÅÄÖ]+"
            value={word.toUpperCase()}
            onChange={handleInputChange}
            placeholder="Skriv ditt ord"
            required
          />

          <button
            type="submit"
            className={`rounded bg-gray-100 px-4 py-2 text-gray-600 ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Skickar..." : "Skicka"}
          </button>
        </label>
      </form>

      <div className={`m-[7px] text-sm font-light ${messageColor}`}>
        {message}
      </div>
      <div className="gameboard-language-container">
        <GameboardLanguage />
      </div>
    </>
  );
};

export default WordContributionForm;
