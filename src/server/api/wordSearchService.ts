// The wordSearchService.ts file contains all specific logic for serching,
// finding and sorting words from the user input to the database.
//
// The file is structured in a way were the exported function(s) are using
// all or some of the functions above it within this file.

import { Word } from "~/app/utils/WordInterface";
import { db, words } from "../db";
import { like, sql } from "drizzle-orm";

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
export async function searchWordsWithLetters(letters: string) {
  const normalizedLetters = normalizeWord(letters);

  const replaceSpaceWithUnderscore = letters.replace(/\s/g, "_");

  // Match words that contain any of the letters with wildcards
  const likeClause = sql`${words.word} LIKE ${replaceSpaceWithUnderscore.toLowerCase()}`;

  const wildcardResults = await db
    .selectDistinct({
      word: sql<string>`lower(${words.word})`,
      value: words.word_value,
    })
    .from(words)
    .where(likeClause);

  // Match words that contain any of the letters without wildcards
  const likeClauses = normalizedLetters
    .split("")
    .map((char) => sql`${words.word} LIKE ${"%" + char + "%"}`);

  if (letters.includes(" ")) {
    const wildcardQuery = letters.replace(/ /g, "_");
    likeClauses.push(sql`${words.word} LIKE ${wildcardQuery}`);
  }

  const result = await db
    .selectDistinct({
      word: sql<string>`lower(${words.word})`,
      value: words.word_value,
    })
    .from(words)
    .where(sql.join(likeClauses, sql` OR `));

  const uniqueCombinedResults = [...result, ...wildcardResults].filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.word === item.word),
  );

  // Filters results and returns a list of words without excessive
  const formableWords = uniqueCombinedResults.filter(({ word }) =>
    compareSearchInputToWord(
      word,
      normalizedLetters || replaceSpaceWithUnderscore,
    ),
  );

  // Filers results and returns them in alphabetical order
  const alphabeticallySortedResults = formableWords.sort((a, b) => {
    return a.word.localeCompare(b.word);
  });

  // Filters result to ensure no word contains letters outside letters
  const filteredResults = alphabeticallySortedResults.filter(({ word }) =>
    [...word].every(
      (char) => normalizedLetters.includes(char) || letters.includes(" "),
    ),
  );

  const sortedResults = filteredResults.sort((a, b) => {
    const lengthDifference = b.word.length - a.word.length;
    if (lengthDifference !== 0) return lengthDifference;
    return a.word.localeCompare(b.word);
  });

  return sortedResults;
}
