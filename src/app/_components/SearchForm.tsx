"use client";
import React from "react";
import { useSearch } from "../hooks/useSearch";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import DeleteWordButton from "./_ui/deleteWordBTN";
import { LoadingScreen } from "./_ui/LoadingScreen";
import UpdateWordValueButton from "./_ui/AdminUpdateWordValueBTN";
import { Tooltip } from "@nextui-org/tooltip";
import CircleIcon from "./_ui/CircleIcon";
import CustomSearchForm from "./_ui/CustomSearchForm";

const SearchForm = ({ query, setQuery }: any) => {
  const { results, search, sortByValue, setSortByValue, loading } = useSearch();

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
      <section className="mb-1">
        <div className="search-container flex max-h-11 justify-between gap-1">
          <CustomSearchForm
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />

          <label className="flex gap-1 text-xs">
            Sortera efter poäng
            <input
              type="checkbox"
              checked={sortByValue}
              onChange={handleSortToggle}
            />
          </label>
        </div>
        <section className="admin-section grid grid-cols-2 grid-rows-1">
          <div className="update-word-values-btn-container">
            <UpdateWordValueButton />
          </div>
        </section>
        <div className="result-heading ml-1 w-fit text-xl font-light tracking-wider">
          Resultat:
        </div>
        {loading ? (
          <LoadingScreen queryLength={query.length} />
        ) : (
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
                      <CircleIcon
                        bgColor="bg-searchResultsPointsBG"
                        textColor="text-black"
                        borderColor="border-black"
                        content={word.value}
                        tooltip={`Ordet är värt ${word.value} poäng`}
                        placement="right"
                      />
                      <SignedIn>
                        <button
                          className="flex justify-evenly"
                          onClick={() => {
                            handleReport(word.word);
                            alert(
                              `Tack för att du rapporterar oanvändbara ord: ${word.word.toUpperCase()}`,
                            );
                          }}
                        >
                          <p className="text-shadow-black-sm border-b">
                            Report
                          </p>{" "}
                        </button>
                        <CircleIcon
                          bgColor="bg-informationIconBG"
                          textColor="text-white"
                          borderColor="border-black"
                          content={"?"}
                          tooltip="Rapportera ord som inte gick att spela i ditt wordfeud spel"
                          placement="left"
                        />
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
                          <Tooltip content="Rapportera ett ord som inte gick att använda i ditt wordfeudspel">
                            <p className="text-shadow-black-sm">Report</p>{" "}
                          </Tooltip>
                          <CircleIcon
                            bgColor="bg-informationIconBG"
                            textColor="text-white"
                            borderColor="border-black"
                            content={"?"}
                            tooltip="Inloggade användare kan rapportera ord som inte gick att spela i deras wordfeud spel"
                            placement="left"
                          />
                        </button>
                      </SignedOut>{" "}
                      <DeleteWordButton {...word} />
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default SearchForm;
