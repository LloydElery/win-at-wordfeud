import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { userReports } from "../db/schema";

export async function deleteReportedWordsByUserId(userId: any, wordId: any) {
  console.log("Running deleteHandler");
  const deleteWordFromUserReports = await db
    .delete(userReports)
    .where(and(eq(userReports.userId, userId), eq(userReports.wordId, wordId)));
  console.log("wordId:", wordId);
  console.log("user id: ", userId);

  console.log("deleteWordFromUserReports: ", deleteWordFromUserReports);
  return deleteWordFromUserReports;
}
