export async function submitVote(
  userId: string | undefined,
  wordId: number,
  voteType: string,
) {
  // voteValue = -1 / 0 / +1 representing "downVote" / no vote / "upVote"
  const voteValue = voteType === "upVote" ? 1 : -1;

  const response = await fetch("/api/user-votes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, wordId, voteValue }),
  });

  const data = await response.json();

  if (data.response.success) {
    console.log("Vote Registered", data.response);
  } else {
    console.error("Failed to add vote");
  }
}
