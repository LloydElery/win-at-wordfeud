import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { communityWords } from "../db/schema";
import { NextResponse } from "next/server";

export async function updateScore(wordId: number, voteType: string) {
  let updatedWord;

  const word = await db
    .select()
    .from(communityWords)
    .where(eq(communityWords.id, wordId));

  if (!word)
    return NextResponse.json({ error: "Could not find word" }, { status: 404 });

  if (voteType === "upVote") {
    updatedWord = await db
      .update(communityWords)
      .set({ up_votes: sql`${communityWords.up_votes} + 1` })
      .where(eq(communityWords.id, wordId))
      .returning();
  } else if (voteType === "downVote") {
    updatedWord = await db
      .update(communityWords)
      .set({ down_votes: sql`${communityWords.down_votes} + 1` })
      .where(eq(communityWords.id, wordId))
      .returning();
  }
  return updatedWord;
}
