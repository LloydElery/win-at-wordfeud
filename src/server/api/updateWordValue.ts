import { db, words } from "../db";
import { calculateWordValue } from "~/utils/calculateLetterValue";
import { eq } from "drizzle-orm";

export async function updateWordValue() {
  const allWords = await db.select().from(words);

  for (const word of allWords) {
    const wordValue = calculateWordValue(word.word);

    await db
      .update(words)
      .set({ word_value: wordValue })
      .where(eq(words.id, word.id));
  }
}
