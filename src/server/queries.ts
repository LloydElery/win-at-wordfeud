import { eq, sql } from "drizzle-orm";
import { db, words } from "./db";

// UPDATE 'reports' to add 1 ontop of the current value
export async function reportWord(word: string) {
  const result = await db
    .update(words)
    .set({ reports: sql`${words.reports} + 1` })
    .where(eq(words.word, word))
    .returning();

  if (result.length === 0) return null;
  return result[0];
}
