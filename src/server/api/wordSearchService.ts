// wordSearchService contains the logic for finding the words containing the letters a user might input.

import { normalizeWord } from "~/utils/wordUtils";
import { db, words } from "../db";
import { eq } from "drizzle-orm";

export async function searchWordsWithLetters(letters: string) {
  const normalizedLetters = normalizeWord(letters);

  const result = await db
    .select()
    .from(words)
    .where(eq(words.normalized_word, normalizedLetters));

  return result.map((row) => row.word);
}
