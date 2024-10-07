import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export interface IUserId {
  userId:
    | string
    | NextResponse<{
        error: string;
      }>;
}

export async function getUserId(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json(
      { error: "User must be logged in" },
      { status: 401 },
    );
  }
  return userId;
}
