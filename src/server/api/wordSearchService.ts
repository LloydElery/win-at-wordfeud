// wordSearchService contains the logic for finding the words containing the letters a user might input.

import { normalizeWord } from "~/utils/wordUtils";
import { db, words } from "../db";
import { sql } from "drizzle-orm";

export async function searchWordsWithLetters(letters: string) {
  const normalizedLetters = normalizeWord(letters).toLowerCase();

  const result = await db
    .selectDistinct({ word: sql<string>`lower(${words.word})` })
    .from(words)
    .where(
      sql`${normalizedLetters} ILIKE '%' || ${words.normalized_word} || '%'`,
    );

  return result.map((row) => row.word);
}
