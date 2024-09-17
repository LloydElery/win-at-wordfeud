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
        <div className="search-container grid max-h-11 grid-cols-5 grid-rows-1">
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

          <div className="sort-by-points col-span-2 col-start-4">
            <div className="flex justify-center">
              <label className="col-start-1 text-xs">
                Sortera efter poäng
                <div className="col-start-2 mr-3">
                  <input
                    type="checkbox"
                    checked={sortByValue}
                    onChange={handleSortToggle}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="result-heading ml-1 w-fit text-xl font-light tracking-wider">
          Resultat:
        </div>

        <div className="search-results border-searchResultsBorder bg-searchResultsBG">
          <ul className="ml-1 mr-1">
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
                        <h2 className="text-md border-b-[1px] border-searchResultsBorder font-light">
                          {wordLength} bokstäver
                        </h2>
                      )}
                  <li
                    className="mb-[2px] ml-[0.8rem] grid grid-cols-4 text-sm font-extralight"
                    key={index}
                  >
                    <p>{word.word.toUpperCase()}</p>
                    <div className="circle-icon bg-searchResultsPointsBG">
                      {word.value}
                    </div>
                    <SignedIn>
                      <button
                        className="border border-cyan-500"
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
                        className="flex justify-evenly"
                        onClick={() => {
                          <RedirectToSignIn />;
                          alert(`
                    Du måste vara inloggad för att repportera ord!\n
                    Klicka på 'Sign in' nere i hörnet för att skapa ett konto.
                    `);
                        }}
                      >
                        <p className="text-shadow-black-sm">Report</p>{" "}
                        <div className="circle-icon bg-informationIconBG !text-white">
                          i
                        </div>
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
