import { db, words } from "../db";
import { calculateWordValue } from "~/utils/calculateLetterValue";
import { eq } from "drizzle-orm";

export async function updateWordValue() {
  const wordWithZeroValue = await db
    .select()
    .from(words)
    .where(eq(words.word_value, 0));

  for (const word of wordWithZeroValue) {
    const wordValue = calculateWordValue(word.word);

    if (wordValue > 0) {
      await db
        .update(words)
        .set({ word_value: wordValue })
        .where(eq(words.id, word.id));
    }
  }
  console.log("Update completed, ", wordWithZeroValue.length, "was updated!");
}
