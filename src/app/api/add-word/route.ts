import { NextRequest, NextResponse } from "next/server";
import { addWordToCommunityWords } from "~/server/services/addWordService";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId)
    return NextResponse.json(
      {
        success: false,
        message: "User has to be signed in to add a word to the database",
      },
      { status: 401 },
    );
  try {
    const { word } = await req.json();
    const result = await addWordToCommunityWords(word);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    console.log(result.result);
    return NextResponse.json(
      {
        success: true,
        message: "The word has been added to the `community-words` database",
        result: result,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding word", error);
    return NextResponse.json({ error: "Failed to add word" }, { status: 500 });
  }
}
