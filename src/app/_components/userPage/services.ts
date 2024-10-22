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
