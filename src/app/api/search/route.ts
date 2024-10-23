import { NextRequest, NextResponse } from "next/server";
import { displaySearchResultsInStages } from "~/server/api/wordSearchService";
import { communityWords, words } from "~/server/db/schema";

export type CommunityWordsTable = typeof communityWords;
export type WordsTable = typeof words;

export const tableMapping: Record<string, CommunityWordsTable | WordsTable> = {
  community_words: communityWords,
  words: words,
};

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const letters = searchParams.get("letters");
  const tableName = searchParams.get("table");
  console.log("tableName: ", tableName);

  if (!tableName || !tableMapping[tableName]) {
    return NextResponse.json(
      { error: "Invalid table specified" },
      { status: 400 },
    );
  }

  if (!letters || typeof letters !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const table = tableMapping[tableName];
    const words = await displaySearchResultsInStages(letters, table);
    return NextResponse.json({ words }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
