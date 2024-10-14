"use client";
import React, { useRef } from "react";
import { useSearch } from "../hooks/useSearch";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import DeleteWordButton from "./_ui/deleteWordBTN";
import { LoadingScreen } from "./_ui/LoadingScreen";
import UpdateWordValueButton from "./_ui/AdminUpdateWordValueBTN";
import CircleIcon from "./_ui/CircleIcon";
import CustomSearchForm from "./_ui/CustomSearchForm";
import LetterTiles from "./_ui/LetterTiles";
import LetterTilePlaceholders from "./_ui/LetterTilePlaceholders";
import { AiOutlineEye } from "react-icons/ai";

const SearchForm = ({ query, setQuery }: any) => {
  const { results, search, sortByValue, setSortByValue, loading } = useSearch();
  const customSearchFormRef = useRef<any>(null);

  const handleFocusInput = () => {
    if (customSearchFormRef.current) customSearchFormRef.current.focusInput();
  };

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
        <div className="flex flex-wrap">
          <div className="my-1">
            <div>
              <CustomSearchForm
                ref={customSearchFormRef}
                query={query}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
              <CircleIcon
                bgColor="none"
                textColor="text-black"
                borderColor="border-none"
                content={<AiOutlineEye size={20} />}
                tooltip=""
                placement="left"
              />
            </div>
          </div>

          {query === "" ? (
            <LetterTilePlaceholders
              onFocusInput={handleFocusInput}
              query={query}
              TWCSSClass="letter-tile flex md:hidden blur-[1px] gap-[1px]"
            />
          ) : (
            <LetterTiles
              onFocusInput={handleFocusInput}
              query={query}
              TWCSSClass="letter-tile flex md:hidden"
            />
          )}
        </div>
        <section className="admin-section">
          <div className="update-word-values-btn-container">
            <UpdateWordValueButton />
          </div>
        </section>

        <div className="result-heading">Resultat:</div>
        <label className="sorting-label">
          Sortera efter poäng
          <input
            type="checkbox"
            checked={sortByValue}
            onChange={handleSortToggle}
          />
        </label>
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
                      className="my-[2px] ml-[0.8rem] grid grid-cols-4 items-center text-sm font-extralight"
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
                          textColor="text-letterTile"
                          borderColor="border-black"
                          content="?"
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
                          <p className="text-shadow-black-sm">Report</p>{" "}
                        </button>
                        <CircleIcon
                          bgColor="bg-informationIconBG"
                          textColor="text-letterTile"
                          borderColor="border-black"
                          content="?"
                          tooltip="Inloggade användare kan rapportera ord som inte gick att spela i ditt wordfeud spel"
                          placement="left"
                        />
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
