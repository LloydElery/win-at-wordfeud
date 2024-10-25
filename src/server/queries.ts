import { and, eq, sql } from "drizzle-orm";
import { db, words } from "./db";
import { communityWords, userReports, userVotes } from "./db/schema";
import { NextResponse } from "next/server";

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

/**
 *
 * Select a specific word by its ID from the "community_words" db
 */
export async function getCommunityWordByWordId(wordId: number) {
  const word = await db
    .select()
    .from(communityWords)
    .where(eq(communityWords.id, wordId))
    .limit(1);

  if (!word) {
    return NextResponse.json({ error: "Could not find word" }, { status: 404 });
  }
  return word[0];
}

/**
 * Checks to see if a user has a vote registered
 */
/* async function userHasVoted(wordId: number, userId: any) {
  const vote = await db
    .select()
    .from(userVotes)
    .where(and(eq(userVotes.user_id, userId), eq(userVotes.word_id, wordId)))
    .limit(1);

  return vote.length > 0;
} */
