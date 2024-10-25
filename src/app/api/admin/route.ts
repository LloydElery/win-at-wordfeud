import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { communityWords, words } from "~/server/db/schema";
import { deleteWordFromDatabase } from "~/server/services/deleteWordService";

export type CommunityWordsTable = typeof communityWords;
export type WordsTable = typeof words;

export const tableMapping: Record<string, CommunityWordsTable | WordsTable> = {
  community_words: communityWords,
  words: words,
};

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  const adminId = process.env.ADMIN;

  if (userId === adminId) {
    return NextResponse.json({ isAdmin: true }, { status: 200 });
  } else {
    return NextResponse.json({ isAdmin: false }, { status: 403 });
  }
}
/*
 * Deletes a word from a specified data-table
 * @param req
 * @param table - the table from which to delete the word
 * @returns
 */

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);
  const admin = process.env.ADMIN;

  if (userId !== admin)
    return NextResponse.json(
      { error: "Unauthorized. Only admins can delete words" },
      { status: 403 },
    );

  const { searchParams } = new URL(req.url);
  console.log("searchParams: ", searchParams);

  const tableName = searchParams.get("table");
  console.log("tableName: ", tableName);
  if (!tableName || !tableMapping[tableName])
    return NextResponse.json(
      { error: "Invalid table specified" },
      { status: 400 },
    );
  const { wordId } = await req.json();

  if (!wordId)
    return NextResponse.json(
      { error: `Missing word in request` },
      { status: 400 },
    );

  try {
    const table = tableMapping[tableName];

    const wordRecord = await db
      .select({ id: table.id })
      .from(table)
      .where(eq(table.id, wordId));

    if (wordRecord.length === 0) {
      return NextResponse.json({ error: "Word not found" }, { status: 404 });
    }

    const result = await deleteWordFromDatabase(wordId, table);

    if (!result) {
      return NextResponse.json(
        { error: "Word already deleted or not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      result,

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
