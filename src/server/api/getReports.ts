import { eq } from "drizzle-orm";
import { db } from "../db";
import { userReports, words } from "../db/schema";

export async function getReportedWordsByUserId(userId: any) {
  const reportedWords = await db
    .select({
      word: words.word,
    })
    .from(userReports)
    .innerJoin(words, eq(userReports.wordId, words.id))
    .where(eq(userReports.userId, userId));

  console.log("reportedWords: ", reportedWords);
  return reportedWords;
}
