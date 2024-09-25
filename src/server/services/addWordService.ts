import { db } from "~/server/db";
import { eq, or } from "drizzle-orm";
import { normalizeWord } from "../api/wordSearchService";
import { communityWords, words } from "../db/schema";

export async function addWordToCommunityWords(word: string) {
  const normalizedWord = normalizeWord(word);

  const existingWordInCommunityWordsDatabase = await db
    .select()
    .from(communityWords)
    .where(
      or(
        eq(communityWords.word, word),
        eq(communityWords.normalized_word, normalizedWord),
      ),
    );

  const existingWordInWordsDatabase = await db
    .select()
    .from(words)
    .where(or(eq(words.word, word), eq(words.normalized_word, normalizedWord)));

  if (
    existingWordInCommunityWordsDatabase.length > 0 ||
    existingWordInWordsDatabase.length > 0
  ) {
    return { success: false, message: "Word already exists" };
  }

  const result = await db.insert(communityWords).values({
    word,
    normalized_word: normalizedWord,
  });

  return { success: true, message: "Word added successfully", result };
}
