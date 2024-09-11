"use client";
import React, { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
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

  const handleLength = (word: string) => {
    if (word.length === 0) return null;
    return word.length;
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

  // Keeps track of headings for word by letter count.
  const displayedWordH2ByLength = new Set();

  return (
    <>
      <section className="min-h-72">
        <div className="search-container grid grid-cols-3 grid-rows-1 gap-2 border border-orange-500">
          <form
            className="col-span-2 grid grid-cols-[1fr_auto] border border-purple-500"
            onSubmit={handleSubmit}
          >
            <input
              className="text-black"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value.toUpperCase())}
              placeholder="SÖK ORD"
            />
            <button className="border border-black text-black" type="submit">
              Sök
            </button>
          </form>

          <div className="border border-red-500">
            <label>
              Sortera efter poäng
              <input
                type="checkbox"
                checked={sortByValue}
                onChange={handleSortToggle}
              />
            </label>
          </div>
        </div>

        <div className="h-full min-h-56 border border-green-500">
          <ul>
            {results.map((word, index) => {
              const wordLength = word.word.length;
              const showHeadingByWordLength =
                !displayedWordH2ByLength.has(wordLength);

              if (showHeadingByWordLength)
                displayedWordH2ByLength.add(wordLength);

              return (
                <React.Fragment key={index}>
                  {showHeadingByWordLength && <h2>{wordLength} bokstäver</h2>}
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
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default SearchForm;
