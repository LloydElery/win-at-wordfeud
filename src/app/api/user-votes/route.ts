import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { addOrUpdateVote } from "~/server/api/addCommunityWordVotes";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
  const { userId, wordId, voteValue } = await req.json();

  if (voteValue === null ?? undefined) {
    return NextResponse.json(
      { success: false, message: "Vote value is required" },
      { status: 400 },
    );
  }

  try {
    const response = await addOrUpdateVote({ userId, wordId, voteValue });
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Vote not registered",
    });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wordId = searchParams.get("wordId");
  const userId = searchParams.get("userId");

  if (!wordId || !userId) {
    return NextResponse.json(
      { error: "Missing word_id or user_id" },
      { status: 400 },
    );
  }

  try {
    const currentVote = await db.query.userVotes.findFirst({
      where: (userVotes) =>
        and(
          eq(userVotes.word_id, Number(wordId)),
          eq(userVotes.user_id, String(userId)),
        ),
    });

    if (!currentVote) {
      return NextResponse.json({ currentVoteValue: null }, { status: 200 });
    }

    return NextResponse.json(
      { currentVoteValue: currentVote.vote_value },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching current vote:", error);
    return NextResponse.json(
      { error: "Failed to retrieve current vote" },
      { status: 500 },
    );
  }
}
