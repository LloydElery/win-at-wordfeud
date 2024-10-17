import { NextRequest, NextResponse } from "next/server";
import { addWordToCommunityWords } from "~/server/services/addWordService";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId)
    return NextResponse.json(
      {
        success: false,
        message: "Du måste vara inloggad för att lägga till ord i vår databas",
      },
      { status: 401 },
    );
  try {
    const { word } = await req.json();
    const result = await addWordToCommunityWords(word);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding word", error);
    return NextResponse.json({ error: "Failed to add word" }, { status: 500 });
  }
}
