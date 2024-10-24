/**
 * This is a placeholder section with
 * - placeholder words, icons and buttons for search results
 */
import React from "react";

export const LoadingScreen: React.FC<{ queryLength: number }> = ({
  queryLength,
}) => {
  const generateLoadingScreenContent = () => {
    let placeholderSection = [];
    let lettersInSearchQuery = queryLength;
    let placeholderWords = 10 - lettersInSearchQuery;

    while (lettersInSearchQuery >= 2) {
      const placeholderRows = Array.from({ length: placeholderWords }, () => ({
        word: "•".repeat(lettersInSearchQuery),
        value: "••",
      }));

      placeholderSection.push(
        <React.Fragment key={lettersInSearchQuery}>
          <h2 className="text-md border-b-[1px] border-searchResultsBorder font-light">
            {lettersInSearchQuery} bokstäver
          </h2>
          {placeholderRows.map((placeholder, index) => (
            <li
              className="blur-animation mb-[2px] ml-[0.8rem] grid grid-cols-4 text-sm font-extralight"
              key={`placeholder-${lettersInSearchQuery}-${index}`}
            >
              <p>{placeholder.word}</p>
              <div className="h-5 w-5 content-center place-self-center rounded-full border border-black bg-searchResultsPointsBG text-center text-xs font-normal text-black">
                {placeholder.value}
              </div>

              <button className="flex justify-evenly">
                <p className="text-shadow-black-sm">Report</p>{" "}
                <div className="circle-icon bg-informationIconBG !text-white">
                  i
                </div>
              </button>

              <div />
            </li>
          ))}
        </React.Fragment>,
      );
      lettersInSearchQuery -= 1;
      placeholderWords += 2;
    }
    return placeholderSection;
  };

  return (
    <div className="search-results max-h-[238px] border-searchResultsBorder bg-searchResultsBG">
      <ul className="ml-1 mr-1">{generateLoadingScreenContent()}</ul>
    </div>
  );
};
