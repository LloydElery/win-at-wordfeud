/**
 *
 * @param word each word in the database has a normalized version of it
 * @returns Normalizing of a word (apple = aelpp)
 */
export function normalizeWord(word: string): string {
  return word.split("").sort().join("");
}
