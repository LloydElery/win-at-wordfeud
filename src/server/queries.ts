import { and, eq, sql } from "drizzle-orm";
import { db, words } from "./db";
import { userReports } from "./db/schema";

// UPDATE 'reports' to add 1 ontop of the current value
/**
 * UPDATE
 * @returns word gets +1 on words.report
 */
export async function reportWord(userId: any, wordId: number) {
  const existingReport = await db
    .select()
    .from(userReports)
    .where(and(eq(userReports.userId, userId), eq(userReports.wordId, wordId)));

  if (existingReport.length > 0) return null;

  const result = await db
    .update(words)
    .set({ reports: sql`${words.reports} + 1` })
    .where(eq(words.id, wordId))
    .returning();

  if (result.length === 0) return null;

  await db.insert(userReports).values({
    userId,
    wordId,
    reportedAt: new Date(),
  });

  return result[0];
}

/**
 * DELETE
 * @returns deletes this word from the database
 */
export async function deleteWordFromDatabase(wordId: number) {
  try {
    const deleteUserReports = await db
      .delete(userReports)
      .where(eq(userReports.wordId, wordId));

    if (!deleteUserReports) return null;

    const wordToDelete = await db
      .delete(words)
      .where(eq(words.id, wordId))
      .returning();

    return wordToDelete.length > 0 ? wordToDelete[0] : null;
  } catch (error) {
    console.error("Error deleting word:", error);
    throw new Error("Failed to delete word");
  }
}
