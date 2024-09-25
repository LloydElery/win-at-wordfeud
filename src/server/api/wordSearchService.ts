import { db, words } from "../db";
import { AnyColumn, lte, sql } from "drizzle-orm";

export interface ISearchResult {
  word: string;
  value: number;
}

export async function displaySearchResultsInStages(letters: string) {
  // Sort user input letters in alphabetical order
  const normalizedLetters = normalizeWord(letters);

  const searchResultsBeforeFiltering: ISearchResult[] =
    await displaySearchResults(normalizedLetters);

  let combinedResultsBeforeFiltering: ISearchResult[] =
    searchResultsBeforeFiltering;

  if (letters.includes(" ")) {
    const wildcardResultsBeforeFiltering: ISearchResult[] =
      await displayWildcardSearchResults(normalizedLetters);
    combinedResultsBeforeFiltering = [
      ...combinedResultsBeforeFiltering,
      ...wildcardResultsBeforeFiltering,
    ];
  }

  const uniqueCombinedResults = filterUniqueResults(
    combinedResultsBeforeFiltering,
  );

  const formableWords = filterFormableWords(
    uniqueCombinedResults,
    letters,
    normalizedLetters,
  );

  const filteredResults = filterWordsContainingInvalidChars(
    formableWords,
    letters,
    normalizedLetters,
  );

  // Sortera resultat baserat på längd och bokstavsordning
  const finalSortedResults =
    sortResultsByLengthAndAlphabetically(filteredResults);

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
  return results.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.word === item.word),
  );
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
