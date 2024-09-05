import { and, eq, sql } from "drizzle-orm";
import { db, words } from "./db";
import { userReports } from "./db/schema";

// UPDATE 'reports' to add 1 ontop of the current value
export async function reportWord(userId: string, wordId: number) {
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
