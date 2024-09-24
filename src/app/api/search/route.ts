import { NextRequest, NextResponse } from "next/server";
import {
  displaySearchResultsInStages,
  searchWordsWithLetters,
} from "~/server/api/wordSearchService";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const letters = searchParams.get("letters");

  if (!letters || typeof letters !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const words = await displaySearchResultsInStages(letters);
    return NextResponse.json({ words }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
