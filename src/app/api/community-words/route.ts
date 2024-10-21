import { NextRequest, NextResponse } from "next/server";
import { getCommunityWords } from "~/server/api/getCommunityWords";
import { updateScore } from "~/server/api/updateCommunityWordsScore";
import { updateStatus } from "~/server/api/updateCommunityWordStatus";

export async function GET(req: NextRequest) {
  try {
    const communityWords = await getCommunityWords();
    return NextResponse.json({ communityWords }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const { wordId, voteType } = await req.json();
  try {
    updateScore(wordId, voteType);
    updateStatus(wordId);
    return NextResponse.json(
      { message: `+1 ${voteType} has been added` },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating votes", error);
    return NextResponse.json(
      { success: false, message: "Failed to add vote" },
      { status: 500 },
    );
  }
}
