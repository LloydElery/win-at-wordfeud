import { eq, and } from "drizzle-orm";
import { db } from "../db";
import { communityWords, userVotes } from "../db/schema";
import { NextResponse } from "next/server";

export async function updateCWScoreAndStatus(
  wordId: number,
  voteType: string,
  userId: any,
) {
  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const word = await db
    .select()
    .from(communityWords)
    .where(eq(communityWords.id, wordId))
    .limit(1);

  if (!word) {
    return NextResponse.json({ error: "Could not find word" }, { status: 404 });
  }

  await db.transaction(async (tx) => {
    const existingVote = await db
      .select()
      .from(userVotes)
      .where(and(eq(userVotes.user_id, userId!), eq(userVotes.word_id, wordId)))
      .limit(1);

    if (existingVote.length > 0) {
      return NextResponse.json(
        { error: "User has already voted for this word" },
        { status: 400 },
      );
    }

    const currentVotes = await tx
      .select()
      .from(communityWords)
      .where(eq(communityWords.id, wordId))
      .limit(1);

    /**
     * Calculate possible new votes from users
     */
    const newUpVotes =
      currentVotes[0]!.up_votes + (voteType === "upVote" ? 1 : 0);
    const newDownVotes =
      currentVotes[0]!.down_votes + (voteType === "downVote" ? 1 : 0);

    await tx
      .update(communityWords)
      .set({
        up_votes: newUpVotes,
        down_votes: newDownVotes,
      })
      .where(eq(communityWords.id, wordId));

    const newScore = newUpVotes - newDownVotes;
    let newStatus = currentVotes[0]!.status;

    if (newScore >= 10) {
      newStatus = "approved";
    } else if (newScore < 0) {
      newStatus = "rejected";
    } else {
      newStatus = "pending";
    }

    await tx
      .update(communityWords)
      .set({
        status: newStatus,
      })
      .where(eq(communityWords.id, wordId));
  });

  const updatedWord = await db
    .select()
    .from(communityWords)
    .where(eq(communityWords.id, wordId))
    .limit(1);

  return updatedWord.length > 0
    ? updatedWord[0]
    : NextResponse.json({ error: "Failed to update word" }, { status: 500 });
}
