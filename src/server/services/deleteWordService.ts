import { eq } from "drizzle-orm";
import { db } from "../db";
import { CommunityWordsTable, WordsTable } from "~/app/api/admin/route";
import { NextResponse } from "next/server";

/**
 * DELETE
 * @param wordId - ID of the word looking to get deleted
 * @param table - Table were the word should be removed
 * @returns The deleted word if deletion was successful, else null.
 */
export async function deleteWordFromDatabase(
  wordId: any,
  table: CommunityWordsTable | WordsTable,
) {
  try {
    const wordToDelete = await db
      .delete(table)
      .where(eq(table.id, wordId))
      .returning();

    return wordToDelete.length > 0 ? wordToDelete[0] : null;
  } catch (error) {
    console.error("Error deleting word:", error);
    throw new Error("Failed to delete word");
  }
}
