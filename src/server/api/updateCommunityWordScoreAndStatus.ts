import { eq, and } from "drizzle-orm";
import { db } from "../db";
import { communityWords, userVotes } from "../db/schema";
import { NextResponse } from "next/server";

type VoteType = "upVote" | "downVote" | "reset";

export async function updateCWScoreAndUVValue(
  wordId: number,
  voteType: VoteType,
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

  // Check for existing votes by user_id
  await db.transaction(async (tx) => {
    const existingVote = await tx
      .select()
      .from(userVotes)
      .where(and(eq(userVotes.user_id, userId!), eq(userVotes.word_id, wordId)))
      .limit(1);

    const existingVoteValue = existingVote[0]?.vote_value;

    let newVoteValue;
    newVoteValue = 0;
    if (existingVoteValue === 0) {
      newVoteValue = voteType === "upVote" ? 1 : -1;
    } else if (existingVoteValue === 1 && voteType === "downVote") {
      newVoteValue = -1;
    } else if (existingVoteValue === -1 && voteType === "upVote") {
      newVoteValue = 1;
    }

    if (existingVote.length > 0) {
      await db
        .update(userVotes)
        .set({ vote_value: newVoteValue })
        .where(
          and(eq(userVotes.user_id, userId), eq(userVotes.word_id, wordId)),
        );
    } else if (newVoteValue !== undefined) {
      await tx.insert(userVotes).values({
        user_id: userId,
        word_id: wordId,
        vote_value: newVoteValue!,
      });
    }

    // Update "up_votes" and "down_votes" in the "user_votes" table
    const newUpVotes =
      word[0]!.up_votes +
      (newVoteValue === 1 ? 1 : existingVoteValue === 1 ? -1 : 0);
    const newDownVotes =
      word[0]!.down_votes +
      (newVoteValue === -1 ? 1 : existingVoteValue === -1 ? -1 : 0);

    // Update votes, score and status
    await tx
      .update(communityWords)
      .set({
        up_votes: newUpVotes,
        down_votes: newDownVotes,
        status: calculateNewStatus(newUpVotes, newDownVotes),
      })
      .where(eq(communityWords.id, wordId));
  });

  // Retuning the updated word
  const updatedWord = await db
    .select()
    .from(communityWords)
    .where(eq(communityWords.id, wordId))
    .limit(1);

  return updatedWord[0];
}

function calculateNewStatus(upVotes: number, downVotes: number): string {
  const score = upVotes - downVotes;
  if (score >= 10) return "approved";
  if (score < 0) return "rejected";
  return "pending";
}
