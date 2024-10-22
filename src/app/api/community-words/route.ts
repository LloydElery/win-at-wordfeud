import { NextRequest, NextResponse } from "next/server";
import { getCommunityWords } from "~/server/api/getCommunityWords";
import { updateCWScoreAndStatus } from "~/server/api/updateCommunityWordScoreAndStatus";
import { getUserId } from "../getUserId";

export async function POST(req: NextRequest) {
  const { wordId, voteType } = await req.json();
  const userId = await getUserId(req);

  try {
    const updatedWord = await updateCWScoreAndStatus(wordId, voteType, userId);
    return NextResponse.json({ updatedWord }, { status: 200 });
  } catch (error) {
    console.error("Error updating votes", error);
    return NextResponse.json(
      { success: false, message: "Failed to add vote" },
      { status: 500 },
    );
  }
}

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
