"use client";
import { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { Protect, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import DeleteWordButton from "./_ui/deleteWordBTN";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const { results, search, sortByValue, setSortByValue } = useSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  const handleSortToggle = () => {
    setSortByValue(!sortByValue);
  };

  const handleReport = async (word: string) => {
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word }),
      });

      if (!response.ok) {
        throw new Error("Failed to report word");
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Failed to report word:", error);
    }
  };

  const handleWordDeletion = async (word: string) => {
    try {
      const response = await fetch("/api/word", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ word }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Word: ${word} has been processed: ${data.word}`);
      } else {
        console.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to delete word:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="text-black"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          placeholder="SÖK ORD"
        />
        <button type="submit">Sök</button>
      </form>

      <label>
        Sortera efter poäng
        <input
          type="checkbox"
          checked={sortByValue}
          onChange={handleSortToggle}
        />
      </label>

      <ul>
        {results.map((word, index) => (
          <li key={index}>
            {word.word.toUpperCase()} - {word.value} {word.id}
            <SignedIn>
              <button
                onClick={() => {
                  handleReport(word.word);
                  alert(
                    `Tack för att du rapporterar oanvändbara ord: ${word.word.toUpperCase()}`,
                  );
                }}
              >
                Report
              </button>
            </SignedIn>
            <SignedOut>
              <button
                onClick={() => {
                  <RedirectToSignIn />;
                  alert(`
                    Du måste vara inloggad för att repportera ord!\n
                    Klicka på 'Sign in' nere i hörnet för att skapa ett konto.
                  `);
                }}
              >
                Report
              </button>
            </SignedOut>{" "}
            <DeleteWordButton {...word} />
            {/* <button
              className="h-5 w-5 rounded-full bg-red-600"
              onClick={() => {
                handleWordDeletion(word.word);
                alert(
                  `Ordet är nu borttaget från databasen: ${word.word.toUpperCase()}`,
                );
              }}
            >
              X
            </button> */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchForm;
