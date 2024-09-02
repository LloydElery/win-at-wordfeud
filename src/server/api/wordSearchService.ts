// The wordSearchService.ts file contains all specific logic for serching,
// finding and sorting words from the user input to the database.
//
// The file is structured in a way were the exported function(s) are using
// all or some of the functions above it within this file.

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

/**
 * Searches for words in the database that are similar to the given letters.
 * @param letters - User input in the form of letters
 * @const normalizedLetters - Uses @function normalizedWord to normalize @param letters
 * @const likeClauses - Match words that contain any of the letters
 * @const result - A list of words from the db containing one or multible @param letters provided
 * @const filteredResults - Filters @const result to ensure no word contains letters outside @param letters
 * @returns - A filtered list of matching words only containing @param letters
 */
export async function searchWordsWithLetters(
  letters: string,
  sortBy: "length" | "value" = "length",
) {
  const normalizedLetters = normalizeWord(letters);

  const likeClauses = normalizedLetters
    .split("")
    .map((char) => sql`${words.word} like ${"%" + char + "%"}`);

  const result = await db
    .selectDistinct({
      word: sql<string>`lower(${words.word})`,
      value: words.word_value,
    })
    .from(words)
    .where(sql.join(likeClauses, sql` OR `));

  const formableWords = result.filter(({ word }) =>
    canFormWord(word, normalizedLetters),
  );

  const filteredResults = formableWords
    .map((row) => row)
    .filter(({ word }) =>
      [...word].every((char) => normalizedLetters.includes(char)),
    );

  const sortedResults = filteredResults.sort((a, b) => {
    const lengthDifferance = b.word.length - a.word.length;
    if (lengthDifferance !== 0) return lengthDifferance;
    return (b.value ?? 0) - (a.value ?? 0);
  });

  console.log("sortBy: ", sortBy);
  console.log("sortedResults: ", sortedResults);
  return sortedResults;
}
