import { eq } from "drizzle-orm";
import { db } from "../db";
import { communityWords } from "../db/schema";
import { NextResponse } from "next/server";

export async function updateCWScoreAndStatus(wordId: number, voteType: string) {
  let updatedWord;

  const word = await db
    .select()
    .from(communityWords)
    .where(eq(communityWords.id, wordId))
    .limit(1);

  if (!word)
    return NextResponse.json({ error: "Could not find word" }, { status: 404 });

  const currentWord = word[0];
  let newUpVotes = currentWord?.up_votes;
  let newDownVotes = currentWord?.down_votes;

  if (voteType === "upVote") newUpVotes! += 1;
  if (voteType === "downVote") newDownVotes! += 1;
  else
    return NextResponse.json({ error: "Invalid vote type" }, { status: 400 });

  const newScore = newUpVotes! - newDownVotes!;

  let newStatus = currentWord!.status;
  if (newScore >= 10) newStatus = "approved";
  else if (newScore < 0) newStatus = "rejected";
  else newStatus = "pending";

  updatedWord = await db
    .update(communityWords)
    .set({
      up_votes: newUpVotes,
      down_votes: newDownVotes,
      status: newStatus,
    })
    .where(eq(communityWords.id, wordId))
    .returning();

  return updatedWord.length > 0
    ? updatedWord[0]
    : NextResponse.json({ error: "Failed to update word" }, { status: 500 });
}
