import { NextRequest, NextResponse } from "next/server";
import { addWordToCommunityWords } from "~/server/services/addWordService";

export async function POST(req: NextRequest) {
  try {
    const { word } = await req.json();
    const result = await addWordToCommunityWords(word);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add word" }, { status: 500 });
  }
}
