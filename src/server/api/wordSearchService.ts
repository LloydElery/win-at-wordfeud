import { db, words } from "../db";
import { sql } from "drizzle-orm";
import { countMatchingLetters } from "~/utils/wordUtils";

/**
 * Normalizes the input by converting to lowercase.
 * @param word the input word.
 * @returns the normalized version of the word.
 */
export function normalizeWord(word: string): string {
  return word.toLowerCase();
}

/**
 * Searches for words in the database that are similar to the given letters.
 * Uses pg_trgm index for efficient searching.
 * @param letters the letters to search for.
 * @returns a list of matching words.
 */
export async function searchWordsWithLetters(letters: string) {
  // Normalize input letters
  const normalizedLetters = normalizeWord(letters);

  // Perform a trigram search using pg_trgm index
  const result = await db
    .selectDistinct({ word: sql<string>`lower(${words.word})` })
    .from(words)
    .where(sql`${words.normalized_word} % ${normalizedLetters}`);

  return result.map((row) => row.word);
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
  return sortedResults;
}
