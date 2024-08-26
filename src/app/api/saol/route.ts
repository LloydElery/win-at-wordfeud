import { NextRequest, NextResponse } from "next/server";
import { saveFilteredWordsToDataBase } from "~/server/api/scrape";

export async function POST(req: NextRequest) {
  const { word } = await req.json();

  if (!word) {
    return NextResponse.json({ error: "Word is required" }, { status: 400 });
  }

  await saveFilteredWordsToDataBase(word);

  return NextResponse.json(
    { message: "Word saved successfully" },
    { status: 200 },
  );
}
