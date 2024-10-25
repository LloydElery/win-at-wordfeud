import { db } from "~/server/db";

export async function submitVote(
  userId: string | undefined,
  wordId: number,
  voteValue: number,
) {
  const response = await fetch("/api/user-votes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, wordId, voteValue }),
  });

  if (!response.ok) throw new Error("Failed to submit vote");
}

export async function fetchCurrentVoteValueFromDatabase(
  wordId: number,
  userId: string,
) {
  const response = await fetch(
    `/api/user-votes?wordId=${wordId}&userId=${userId}`,
  );
  const { currentVoteValue } = await response.json();

  return { currentVoteValue };
}

export async function fetchCommunityWordsFromDatabase() {
  const response = await fetch(`/api/community-words`);

  if (!response.ok) throw new Error("Failed to fetch community words");

  const { communityWords } = await response.json();

  return { communityWords };
}

export async function setCommunityWordScore(wordId: number, voteType: string) {
  try {
    const response = await fetch("/api/community-words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wordId,
        voteType,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit vote");
    }
    return await response.json();
  } catch (error) {
    console.error("Error submitting vote", error);
    throw error;
  }
}
