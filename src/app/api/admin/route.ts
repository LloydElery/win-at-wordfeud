import { getAuth } from "@clerk/nextjs/server";
import { Column, eq, Table } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { communityWords, words } from "~/server/db/schema";
import { deleteWordFromDatabase } from "~/server/services/deleteWordService";

export type CommunityWordsTable = typeof communityWords;
export type WordsTable = typeof words;

export const tableMapping: Record<string, CommunityWordsTable | WordsTable> = {
  community_words: communityWords,
  word: words,
};

/*
 * Deletes a word from a specified data-table
 * @param req
 * @param table - the table from which to delete the word
 * @returns
 */

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);
  const admin = process.env.NEXT_PUBLIC_ADMIN;

  if (userId !== admin)
    return NextResponse.json(
      { error: "Unauthorized. Only admins can delete words" },
      { status: 403 },
    );

  const { searchParams } = new URL(req.url);
  const tableName = searchParams.get("table");

  if (!tableName || !tableMapping[tableName])
    return NextResponse.json(
      { error: "Invalid table specified" },
      { status: 400 },
    );

  const { wordId } = await req.json();
  console.log("wordId: ", wordId);

  if (!wordId)
    return NextResponse.json(
      { error: `Missing word in request` },
      { status: 400 },
    );

  try {
    const table = tableMapping[tableName];
    console.log("table: ", table);

    const wordRecord = await db
      .select({ id: table.id })
      .from(table)
      .where(eq(table.id, wordId));

    if (wordRecord.length === 0) {
      return NextResponse.json({ error: "Word not found" }, { status: 404 });
    }

    const result = await deleteWordFromDatabase(wordId!, table);

    if (!result) {
      return NextResponse.json(
        { error: "Word already deleted or not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: `Word has been deleted from the database: ${result.word}` },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to delete word:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
