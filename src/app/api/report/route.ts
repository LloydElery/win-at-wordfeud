import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { reportWord } from "~/server/queries";

export async function POST(req: NextRequest, res: NextResponse) {
  const { word } = await req.json();

  if (!word || typeof word !== "string") {
    return NextResponse.json({ error: "Word is required" }, { status: 400 });
  }

  try {
    const updatedWord = await reportWord(word);
    if (!updatedWord)
      return NextResponse.json({ error: "Word not found" }, { status: 404 });
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
