// The wordSearchService.ts file contains all specific logic for serching,
// finding and sorting words from the user input to the database.
//
// The file is structured in a way were the exported function(s) are using
// all or some of the functions above it within this file.

import { Word } from "~/app/utils/WordInterface";
import { db, words } from "../db";
import { sql } from "drizzle-orm";

/**
 * Normalizes the input by converting to lowercase and sorting @chars alphabeticly
 * @param word the input combination of @chars
 * @returns the normalized version of the word.
 * @example 'äpple' = 'elppä' & 'bord' = 'bdor'
 */
export function normalizeWord(word: string): string {
  return word.split("").sort().join("").toLowerCase();
}

/**
 * Counts the number of letters that exist in both @word and @query.
 * @param word a word from the database.
 * @param query the searched letters.
 * @returns the number of matching letters.
 */
export function countMatchingLetters(word: string, letters: string): number {
  const wordLetters = word.split("").sort();
  const letterSet = new Set(letters.split(""));

  return wordLetters.reduce((count, letter) => {
    if (letterSet.has(letter)) {
      count += 1;
    }
    return count;
  }, 0);
}

/**
 * Looks at each letter in each word in search results
 * @param word each word from the search result
 * @param letters each letter in @param word
 * @returns an array of words that can be created using only the letters provided
 */
function canFormWord(word: string, letters: string): boolean {
  const letterCount: Record<string, number> = {};

  for (const letter of letters) {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  for (const letter of word) {
    if (!letterCount[letter]) {
      return false;
    }
    letterCount[letter] -= 1;
  }
  return true;
}

export function sortByValueDesc(results: Word[]): Word[] {
  return [...results].sort((a, b) => {
    return b.value - a.value;
  });
}

/**
 * Searches for words in the database that are similar to the given letters.
 * @param letters - User input in the form of letters
 * @returns - A filtered list of matching words only containing @param letters
 */
export async function searchWordsWithLetters(
  letters: string,
  sortBy: "length" | "value" | "default" = "length",
) {
  const normalizedLetters = normalizeWord(letters);

  // Match words that contain any of the letters
  const likeClauses = normalizedLetters
    .split("")
    .map((char) => sql`${words.word} like ${"%" + char + "%"}`);

  // A list of words from the db containing two or more letters provided
  const result = await db
    .selectDistinct({
      word: sql<string>`lower(${words.word})`,
      value: words.word_value,
    })
    .from(words)
    .where(sql.join(likeClauses, sql` OR `));

  // Filters results and returns a list of words without excessive
  const formableWords = result.filter(({ word }) =>
    canFormWord(word, normalizedLetters),
  );

  // Filers results and returns them in alphabetical order
  const alphabeticallySortedResults = formableWords.sort((a, b) => {
    return a.word.localeCompare(b.word);
  });

  // Filters result to ensure no word contains letters outside letters
  const filteredResults = alphabeticallySortedResults
    .map((row) => row)
    .filter(({ word }) =>
      [...word].every((char) => normalizedLetters.includes(char)),
    );

  const sortedResults = filteredResults.sort((a, b) => {
    const lengthDifferance = b.word.length - a.word.length;
    if (lengthDifferance !== 0) return lengthDifferance;
    return a.word.length - b.word.length || a.word.localeCompare(b.word);
  });

  console.log("sortedResults: ", sortedResults);
  return sortedResults;
}
