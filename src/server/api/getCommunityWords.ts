import { db } from "../db";
import { communityWords } from "../db/schema";

export async function getCommunityWords() {
  const wordContributions = await db.select().from(communityWords);
  console.log("wordContributions: ", wordContributions);
  return wordContributions;
}

/**
 * {
    id: 19,
    word: 'nejsan',
    normalized_word: 'aejnns',
    word_value: 0,
    reports: 0,
    up_votes: 0,
    down_votes: 0,
    score: 0,
    status: 'pending',
    created_at: 2024-10-17T09:46:37.645Z
  }
]
 GET /api/community-words 200 in 71ms
 */
