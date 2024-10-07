import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { userReports } from "../db/schema";

export async function deleteReportedWordsByUserId(userId: any, wordId: any) {
  const deleteWordFromUserReports = await db
    .delete(userReports)
    .where(and(eq(userReports.userId, userId), eq(userReports.wordId, wordId)));
  return deleteWordFromUserReports;
}
