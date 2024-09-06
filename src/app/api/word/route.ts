import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db, words } from "~/server/db";
import { deleteWordFromDatabase } from "~/server/queries";

export async function DELETE(req: NextRequest) {
  try {
    const { word } = await req.json();

    if (!word) {
      return NextResponse.json(
        { error: `Missing word in request` },
        { status: 400 },
      );
    }

    /*   const { userId } = getAuth(req);
  console.log("userId: ", userId); */

    /*   if (!userId) {
    return NextResponse.json(
      { error: "User is not administrator" },
      { status: 401 },
    );
  } */

    const wordRecord = await db
      .select({ id: words.id })
      .from(words)
      .where(eq(words.word, word));

    if (wordRecord.length === 0) {
      return NextResponse.json({ error: "Word not found" }, { status: 404 });
    }

    const wordId = wordRecord[0]?.id;

    const result = await deleteWordFromDatabase(wordId!);

    if (!result) {
      return NextResponse.json(
        { error: "Word already deleted or not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: `Word has been deleted from the database: ${result.word}` },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to delete word:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
