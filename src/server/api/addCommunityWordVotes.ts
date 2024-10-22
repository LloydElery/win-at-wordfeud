import { eq, and, NotNull } from "drizzle-orm";
import { db } from "../db";
import { userVotes } from "../db/schema";

interface IVoteParams {
  userId: string;
  wordId: number;
  voteValue: number;
}

export async function addOrUpdateVote({
  userId,
  wordId,
  voteValue,
}: IVoteParams) {
  try {
    const existingVote = await db
      .select()
      .from(userVotes)
      .where(and(eq(userVotes.user_id, userId), eq(userVotes.word_id, wordId)));

    const currentVoteValue = existingVote[0]?.vote_value;

    if (existingVote.length > 0) {
      await db
        .update(userVotes)
        .set({
          vote_value: (voteValue = currentVoteValue ? 0 : voteValue),
          voted_at: new Date(),
        })
        .where(
          and(eq(userVotes.user_id, userId), eq(userVotes.word_id, wordId)),
        );
    } else {
      await db.insert(userVotes).values({
        user_id: userId,
        word_id: wordId,
        vote_value: voteValue,
        voted_at: new Date(),
      });
    }

    return { success: true, message: "Vote has been registered!" };
  } catch (error) {
    console.error("Error registering vote: ", error);
    return { success: false, message: "Failed to register vote" };
  }
}
