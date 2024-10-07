import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { deleteReportedWordsByUserId } from "~/server/api/deleteReportedWord";
import { getReportedWordsByUserId } from "~/server/api/getReports";
import { db, words } from "~/server/db";
import { reportWord } from "~/server/queries";
import { getUserId } from "../getUserId";
import { getWordId } from "../getWordId";

export async function POST(req: NextRequest) {
  const { word } = await req.json();
  const userId = await getUserId(req);

  if (!word || typeof word !== "string") {
    return NextResponse.json({ error: "Word is required" }, { status: 400 });
  }

  try {
    const wordRecord = await db
      .select({ id: words.id })
      .from(words)
      .where(eq(words.word, word));

    if (wordRecord.length === 0) {
      return NextResponse.json({ error: "Word not found" }, { status: 404 });
    }

    const wordId = wordRecord[0]?.id;

    const updatedWord = await reportWord(userId, wordId!);

    if (!updatedWord) {
      return NextResponse.json(
        { error: "Word already reported by user or not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: `Reported word as not usable: ${word}` },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to report word:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const userId = await getUserId(req);

  try {
    const userReports = await getReportedWordsByUserId(userId);
    return NextResponse.json({ userReports }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const userId = await getUserId(req);
  const wordId = await getWordId(req);

  try {
    const userReports = await deleteReportedWordsByUserId(userId, wordId);
    return NextResponse.json({ userReports }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
