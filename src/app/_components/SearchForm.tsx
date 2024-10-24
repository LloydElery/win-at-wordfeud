"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { LoadingScreen } from "./_ui/LoadingScreen";
import UpdateWordValueButton from "./_ui/AdminUpdateWordValueBTN";
import CircleIcon from "./_ui/CircleIcon";
import CustomSearchForm from "./_ui/CustomSearchForm";
import LetterTiles from "./_ui/LetterTiles";
import LetterTilePlaceholders from "./_ui/LetterTilePlaceholders";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { AdminDeleteWordButton } from "./_ui/AdminDeleteWordButton";
import { Word } from "../utils/WordInterface";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SearchForm = ({ query, setQuery }: any) => {
  const {
    results,
    setResults,
    search,
    cwSearch,
    sortByValue,
    setSortByValue,
    loading,
    addCommunityWords,
    setAddCommunityWords,
  } = useSearch();

  const [isVisible, setIsVisible] = useState(true);
  const [expandResults, setExpandResults] = useState(false);
  const customSearchFormRef = useRef<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addCommunityWords) {
      search(query);
    } else {
      cwSearch(query);
    }
  };

  const handleFocusInput = () => {
    customSearchFormRef.current?.focusInput();
  };

  const removeLetterTile = (letter: string) => {
    const letterTileToRemove = query.indexOf(letter);

    if (letterTileToRemove !== -1) {
      const updatedQuery =
        query.slice(0, letterTileToRemove) +
        query.slice(letterTileToRemove + 1);

      setQuery(updatedQuery);
    }
  };

  const handleSearchBarVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSortToggle = () => {
    setSortByValue(!sortByValue);
  };

  const handleCommunityWordsToggle = () => {
    setAddCommunityWords(!addCommunityWords);
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

  const handleWordDeletion = (wordId: number) => {
    setResults((prevResults: Word[]) =>
      prevResults.filter((word) => word.id !== wordId),
    );
  };

  const handleResultsHeight = () => {
    setExpandResults(!expandResults);
  };

  useEffect(() => {
    if (addCommunityWords) {
      cwSearch(query);
    }
    search(query);
  }, [addCommunityWords]);

  useEffect(() => {
    getSavedQuery();
  }, []);

  useEffect(() => {
    saveQuery();
  }, [query]);

  const saveQuery = () => {
    if (query) localStorage.setItem("savedQuery", query);
    else localStorage.removeItem("savedQuery");
  };

  const getSavedQuery = () => {
    const savedQuery = localStorage.getItem("savedQuery");
    if (savedQuery) setQuery(savedQuery);
  };

  // Keeps track of headings for word by letter count.
  const displayedWordH2ByLength = new Set();

  return (
    <>
      <section className="mb-1">
        <div className="flex w-full flex-wrap justify-start">
          <div className="relative my-1 flex w-full flex-nowrap justify-between">
            <div
              className={
                !isVisible
                  ? "pointer-events-none h-0 overflow-hidden opacity-0"
                  : ""
              }
            >
              <CustomSearchForm
                ref={customSearchFormRef}
                query={query}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            </div>

            <div className="eye-icon-container absolute right-0 h-full content-center">
              <CircleIcon
                bgColor="none"
                textColor="text-letterTile"
                borderColor="border-none"
                content={
                  isVisible ? (
                    <RxEyeOpen size={20} />
                  ) : (
                    <RxEyeClosed size={20} />
                  )
                }
                tooltip={isVisible ? "Göm sökfältet" : "Visa Sökfältet"}
                placement="bottom"
                onIconClick={handleSearchBarVisibility}
              />
            </div>
          </div>

          {query === "" ? (
            <LetterTilePlaceholders
              onFocusInput={handleFocusInput}
              query={query}
              TWCSSClass="letter-tile flex blur-[1px] gap-[1px]"
            />
          ) : (
            <LetterTiles
              onFocusInput={handleFocusInput}
              onLetterTileClick={removeLetterTile}
              query={query}
              setQuery={setQuery}
              TWCSSClass="letter-tile flex"
            />
          )}
        </div>
        <section className="admin-section">
          <div className="update-word-values-btn-container">
            <UpdateWordValueButton />
          </div>
        </section>

        <section className="result-section">
          <div className="result-heading">Resultat:</div>
          <SignedIn>
            <label className="sorting-label">
              <input
                type="checkbox"
                checked={addCommunityWords}
                onChange={handleCommunityWordsToggle}
              />
              Inkludera "Community Ord"
            </label>
          </SignedIn>
          <label className="sorting-label">
            <input
              type="checkbox"
              checked={sortByValue}
              onChange={handleSortToggle}
            />
            Sortera efter poäng
          </label>
        </section>
        {loading ? (
          <LoadingScreen queryLength={query.length} />
        ) : (
          <div
            className={`search-results border-searchResultsBorder bg-searchResultsBG ${expandResults ? "max-h-[450px]" : "max-h-[238px]"} `}
          >
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
                      className={`${
                        word.source === "cw" ? (
                          <CircleIcon
                            content={"cw"}
                            bgColor="bg-none"
                            textColor="text-letterTile"
                            borderColor="border-black"
                            tooltip={"Community ord"}
                            placement="right"
                          />
                        ) : (
                          ""
                        )
                      } relative my-[2px] ml-[0.8rem] grid grid-cols-4 items-center text-sm font-extralight`}
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
                      {word.source && (
                        <CircleIcon
                          content={"cw"}
                          bgColor="bg-gameboardBG absolute left-[110px] bottom-[3px]"
                          textColor="text-letterTile"
                          borderColor="border-black"
                          tooltip={"Community ord"}
                          placement="right"
                        />
                      )}
                      <div className="admin-delete-btn absolute right-0 rounded-full">
                        <AdminDeleteWordButton
                          wordId={word.id!}
                          word={word.word}
                          table="words"
                          onWordDeleted={handleWordDeletion}
                        />
                      </div>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        )}
        {!expandResults ? (
          <button
            onClick={handleResultsHeight}
            className="flex justify-self-center"
          >
            <IoIosArrowDown size={20} />
          </button>
        ) : (
          <button
            onClick={handleResultsHeight}
            className="flex justify-self-center"
          >
            <IoIosArrowUp size={20} />
          </button>
        )}
      </section>
    </>
  );
};

export default SearchForm;
