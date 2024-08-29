// scrape.ts
// This file contains the logic for scraping words from 'SAOL14' the Swedish dictionary
// sorting, filtering and adding them to a PostgresSQL database.

import { db, words } from "../db";
import { normalizeWord } from "./wordSearchService";

/**
 *
 * @param url = SAOL 14 words
 * @returns words[] = the usable words when playing wordfeud in Swedish
 */
export async function fetchSAOL14FilteredWords(
  url: string | undefined,
): Promise<string[]> {
  url = process.env.URL;
  const words = await fetchSAOL14TextFile(url!);
  const filteredWords = filterSAOL14Words(words);

  return filteredWords;
}
// Fetching all the words in SAOL 14, the swedish dictionary.
async function fetchSAOL14TextFile(url: string): Promise<string[]> {
  const response = await fetch(url);
  const text = await response.text();
  const words = text.split(/\r?\n/);
  return words;
}
// Filtering the words and creating an array excluding the words containing
//  a dash("-"), a space(" ") and words that contain only one letter.
function filterSAOL14Words(words: string[]): string[] {
  return words.filter((word) => !/[-\s]/.test(word) && word.length > 1);
}

// Save filtered word in the database
export async function saveFilteredWordsToDataBase(filteredWords: string[]) {
  for (const word of filteredWords) {
    const normalizedWord = normalizeWord(word);

    // Adding it to the database
    await db
      .insert(words)
      .values({
        word: word,
        normalized_word: normalizedWord,
      })
      .execute();
  }
}

//TODO Add a GET function to test basic search function
/* export async function findFilteredWordsInDatabase() {
  
  await db.select()
} */
