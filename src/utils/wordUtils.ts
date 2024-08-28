/**
 * Counts the number of letters that exist in both @word and @query.
 * @param word a word from the database.
 * @param query the searched letters.
 * @returns the number of matching letters.
 */
export function countMatchingLetters(word: string, query: string): number {
  const wordLetters = word.split("").sort();
  const queryLetters = query.split("").sort();
  let matchCount = 0;

  let queryIndex = 0;

  for (const letter of wordLetters) {
    if (queryLetters.includes(letter)) {
      matchCount++;
      queryIndex++;
      queryLetters.splice(queryLetters.indexOf(letter), 1);
    }
  }
  return matchCount;
}
