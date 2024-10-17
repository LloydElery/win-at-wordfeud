import { db } from "../db";
import { communityWords } from "../db/schema";

export async function getCommunityWords() {
  const wordContributions = await db
    .select({
      word: communityWords.word,
    })
    .from(communityWords);
  console.log("wordContributions: ", wordContributions);
  return wordContributions;
}
