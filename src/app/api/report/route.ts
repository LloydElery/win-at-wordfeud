import { useAuth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { reportWord } from "~/server/queries";

export async function POST(req: NextRequest, res: NextResponse) {
  const { word, wordId } = await req.json();
  const { userId } = useAuth();

  if (
    !word ||
    typeof word !== "string" ||
    !wordId ||
    typeof wordId !== "number"
  ) {
    return NextResponse.json(
      { error: "Word and Word ID is required" },
      { status: 400 },
    );
  }

  if (!userId) {
    return NextResponse.json(
      { error: "User must be logged in" },
      { status: 401 },
    );
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    console.log("userId: ", user);

    const updatedWord = await reportWord(user.id, wordId);
    if (!updatedWord) {
      return NextResponse.json(
        { error: "Word already reported by user or not found" },
        { status: 404 },
      );
    }

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
