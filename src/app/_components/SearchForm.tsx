"use client";
import React, { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import DeleteWordButton from "./_ui/deleteWordBTN";
import { AiOutlineSearch } from "react-icons/ai";

const SearchForm = ({ query, setQuery }: any) => {
  const { results, search, sortByValue, setSortByValue } = useSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toUpperCase());
  };

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

  // Keeps track of headings for word by letter count.
  const displayedWordH2ByLength = new Set();

  return (
    <>
      <section>
        <div className="search-container grid grid-cols-3 grid-rows-1 gap-2">
          <form
            className="col-span-2 grid h-fit grid-cols-[1fr_auto] self-center"
            onSubmit={handleSubmit}
          >
            <input
              className="text-black"
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="SÖK ORD"
            />
            <button className="search bg-letterTile" type="submit">
              <AiOutlineSearch size={26} />
            </button>
          </form>

          <div>
            <label className="grid grid-cols-1 grid-rows-2 text-xs">
              <div className="text-[1.05em]">Sortera efter poäng</div>
              <div className="mr-3 flex justify-end">
                <input
                  type="checkbox"
                  checked={sortByValue}
                  onChange={handleSortToggle}
                />
              </div>
            </label>
          </div>
        </div>

        <div className="result-heading ml-1 w-fit tracking-wider">
          Resultat:
        </div>

        <div className="search-results bg-searchResultsBG fixed max-h-[242px] w-full overflow-auto">
          <ul className="grid grid-flow-row grid-cols-2">
            {results.map((word, index) => {
              const wordLength = word.word.length;
              const showHeadingByWordLength =
                !displayedWordH2ByLength.has(wordLength);

              if (showHeadingByWordLength)
                displayedWordH2ByLength.add(wordLength);

              return (
                <React.Fragment key={index}>
                  {sortByValue
                    ? null
                    : showHeadingByWordLength && (
                        <h2>{wordLength} bokstäver</h2>
                      )}
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
