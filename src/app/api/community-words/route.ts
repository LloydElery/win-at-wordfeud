import { NextRequest, NextResponse } from "next/server";
import { getCommunityWords } from "~/server/api/getCommunityWords";
import { updateScore } from "~/server/api/updateCommunityWordsScore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = (page - 1) * limit;

  try {
    const communityWords = await getCommunityWords(limit, offset);
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
    return NextResponse.json(
      { message: "Vote has been added" },
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
