// The wordSearchService.ts file contains all specific logic for serching,
// finding and sorting words from the user input to the database.
//
// The file is structured in a way were the exported function(s) are using
// all or some of the functions above it within this file.

import { db, words } from "../db";
import { sql } from "drizzle-orm";
import { countMatchingLetters } from "~/utils/wordUtils";

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
 * Searches for words in the database that are similar to the given letters.
 * @param letters - User input in the form of letters
 * @const normalizedLetters - Uses @function normalizedWord to normalize @param letters
 * @const likeClauses - Match words that contain any of the letters
 * @const result - Search using the dynamic LIKE clauses combined with OR
 * @const filteredResults - Filters @const result to ensure no word contains letters outside @param letters
 * @returns - A filtered list of matching words only containing @param letters
 */
async function searchWordsWithLetters(letters: string) {
  const normalizedLetters = normalizeWord(letters);

  const likeClauses = normalizedLetters
    .split("")
    .map((char) => sql`${words.word} like ${"%" + char + "%"}`);

  const result = await db
    .selectDistinct({ word: sql<string>`lower(${words.word})` })
    .from(words)
    .where(sql.join(likeClauses, sql` OR `));

  const filterResults = result
    .map((row) => row.word)
    .filter((word) => {
      return [...word].every((char) => normalizedLetters.includes(char));
    });

  return filterResults;
}

/**
 * Sorts the search results by the number of matching letters.
 * @param query the letters to match against.
 * @returns a sorted list of matching words.
 */
export async function sortedSearchResults(query: string): Promise<String[]> {
  const results = await searchWordsWithLetters(query);
  const sortedResults = results.sort((a, b) => {
    const matchCountA = countMatchingLetters(a, query);
    const matchCountB = countMatchingLetters(b, query);

    return matchCountB - matchCountA;
  });
  console.log("sortedResults: ", sortedResults);
  return sortedResults;
}
