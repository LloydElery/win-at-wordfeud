// This function fetches all the words from "SAOL 14"
// sorts them and adds them to the database

const url = process.env.URL;
console.log(url);

export async function fetchSAOL14FilteredWords(url: string): Promise<string[]> {
  const words = await fetchSAOL14TextFile(url);
  const filteredWords = filterSAOL14Words(words);

  return filteredWords;
}
/**
 *
 * @param url all SAOL14 words from a .txt file
 * @returns
 */
async function fetchSAOL14TextFile(url: string): Promise<string[]> {
  const response = await fetch(url);
  const text = await response.text();
  const words = text.split(/\r?\n/);
  return words;
}
/**
 *
 * @param words an array of words from SAOL14
 * @returns a filterd array without words containing a dash("-"), a space(" ") and words that contain only one letter.
 */
function filterSAOL14Words(words: string[]): string[] {
  return words.filter((word) => !/[-\s]/.test(word) && word.length > 1);
}
