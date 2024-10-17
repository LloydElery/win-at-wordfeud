import { NextRequest, NextResponse } from "next/server";
import { getCommunityWords } from "~/server/api/getCommunityWords";
import { getUserId } from "../getUserId";

export async function GET(req: NextRequest, res: NextResponse) {
  const userId = await getUserId(req); // might not need?

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
