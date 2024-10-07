import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db, words } from "~/server/db";

export async function getWordId(req: NextRequest) {
  const { word } = await req.json();

  if (!word || typeof word !== "string") {
    return NextResponse.json({ error: "Word is required" }, { status: 400 });
  }

  const wordRecord = await db
    .select({ id: words.id })
    .from(words)
    .where(eq(words.word, word));

  if (wordRecord.length === 0) {
    throw new Error("Word not found");
  }

  const wordId = wordRecord[0]?.id;
  return wordId;
}
