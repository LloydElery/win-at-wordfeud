import { NextRequest, NextResponse } from "next/server";
import { addOrUpdateVote } from "~/server/api/addCommunityWordVotes";

export async function POST(req: NextRequest) {
  const { userId, wordId, voteValue } = await req.json();
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
