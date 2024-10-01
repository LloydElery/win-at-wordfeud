import { db, words } from "../db";
import { AnyColumn, lte, sql } from "drizzle-orm";

export interface ISearchResult {
  word: string;
  value: number;
}

export async function displaySearchResultsInStages(letters: string) {
  console.log("New Search Request: ", letters);
  // Sort user input letters in alphabetical order
  console.time("normalizedLetters");
  const normalizedLetters = normalizeWord(letters);
  console.timeEnd("normalizedLetters");

  console.time("searchResultsBeforeFiltering");
  const searchResultsBeforeFiltering: ISearchResult[] =
    await displaySearchResults(normalizedLetters);
  console.timeEnd("searchResultsBeforeFiltering");

  console.time("combinedResultsBeforeFiltering");
  let combinedResultsBeforeFiltering: ISearchResult[] =
    searchResultsBeforeFiltering;
  console.timeEnd("combinedResultsBeforeFiltering");

  if (letters.includes(" ")) {
    console.time("wildcardResultsBeforeFiltering");
    const wildcardResultsBeforeFiltering: ISearchResult[] =
      await displayWildcardSearchResults(normalizedLetters);
    console.timeEnd("wildcardResultsBeforeFiltering");

    console.time("combinedResultsBeforeFiltering");
    combinedResultsBeforeFiltering = [
      ...combinedResultsBeforeFiltering,
      ...wildcardResultsBeforeFiltering,
    ];
    console.timeEnd("combinedResultsBeforeFiltering");
  }

  console.time("uniqueCombinedResults");
  const uniqueCombinedResults = filterUniqueResults(
    combinedResultsBeforeFiltering,
  );
  console.timeEnd("uniqueCombinedResults");

  console.time("formableWords");
  const formableWords = filterFormableWords(
    uniqueCombinedResults,
    letters,
    normalizedLetters,
  );
  console.timeEnd("formableWords");

  console.time("filteredResults");
  const filteredResults = filterWordsContainingInvalidChars(
    formableWords,
    letters,
    normalizedLetters,
  );
  console.timeEnd("filteredResults");

  // Sortera resultat baserat på längd och bokstavsordning
  console.time("finalSortedResults");
  const finalSortedResults =
    sortResultsByLengthAndAlphabetically(filteredResults);
  console.timeEnd("finalSortedResults");
  return finalSortedResults;
}

export async function displaySearchResults(normalizedLetters: string) {
  const userInputLetters = normalizedLetters.replace(/\s/g, ""); // Remove wildcard

  const wordLength = sql`char_length(${words.word})`;

  const searchResults = await db
    .selectDistinct({
      word: sql<string>`lower(${words.word})`,
      value: words.word_value,
    })
    .from(words)
    .where(lte(wordLength, userInputLetters.length));

  return searchResults;
}

export async function displayWildcardSearchResults(normalizedLetters: string) {
  const userInputLettersAndWildcard = normalizedLetters.replace(/\s/g, "_"); // Add wildcard

  const wordLength = sql`char_length(${words.word})`;

  const wildcardResults = await db
    .selectDistinct({
      word: sql<string>`lower(${words.word})`,
      value: words.word_value,
    })
    .from(words)
    .where(lte(wordLength, userInputLettersAndWildcard.length));

  return wildcardResults;
}

export function normalizeWord(word: string): string {
  return word.split("").sort().join("").toLowerCase();
}

export const filterSearchResultsByWordLength = (
  column: AnyColumn,
  length: number,
) => {
  return sql`char_length(${column}) <= ${length}`;
};

export function filterUniqueResults(results: ISearchResult[]): ISearchResult[] {
  const uniqueWords = new Set<string>();
  return results.filter((words) => {
    if (uniqueWords.has(words.word)) return false;
    else uniqueWords.add(words.word);
    return true;
  });
}

export function filterFormableWords(
  results: ISearchResult[],
  letters: string,
  normalizedLetters: string,
): ISearchResult[] {
  return results.filter(({ word }) =>
    compareSearchInputToWord(word, normalizedLetters || letters),
  );
}

/**
 * Looks at each letter in each word in search results
 * @param word each word from the search result
 * @param letters each letter in @param word
 * @returns an array of words that can be created using only the letters provided
 */
function compareSearchInputToWord(word: string, letters: string): boolean {
  const letterCount: Record<string, number> = {};

  // Count letters in search input
  for (const letter of letters) {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  // Count wildcards {" "} if there are any
  let wildcards = letterCount[" "] || 0;
  delete letterCount[" "];

  for (const letter of word) {
    if (!letterCount[letter] && !wildcards) {
      return false;
    } else if (letterCount[letter]) {
      letterCount[letter] -= 1; // remove specific letter from search input, disabeling duplication
    } else if (wildcards > 0) {
      wildcards -= 1; // if the letter does not exist in the search input but there is a wildcard, include letter and remove wildcard
    }
  }
  return true;
}

export function sortAlphabetically(results: ISearchResult[]): ISearchResult[] {
  return results.sort((a, b) => a.word.localeCompare(b.word));
}

export function filterWordsContainingInvalidChars(
  results: ISearchResult[],
  letters: string,
  normalizedLetters: string,
): ISearchResult[] {
  return results.filter(({ word }) =>
    [...word].every(
      (char) => normalizedLetters.includes(char) || letters.includes(" "),
    ),
  );
}

export function sortResultsByLengthAndAlphabetically(
  results: ISearchResult[],
): ISearchResult[] {
  return results.sort((a, b) => {
    const lengthDifference = b.word.length - a.word.length;
    if (lengthDifference !== 0) return lengthDifference;
    return a.word.localeCompare(b.word, "sv");
  });
}
