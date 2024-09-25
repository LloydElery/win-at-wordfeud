"use client";
import { useState } from "react";

const WordContributionForm: React.FC = () => {
  const [word, setWord] = useState("");

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

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="text-black"
        type="text"
        pattern="[a-zåäöA-ZÅÄÖ]"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Skriv ditt ord"
        required
      />
      <button type="submit">Skicka</button>
    </form>
  );
};

export default WordContributionForm;
