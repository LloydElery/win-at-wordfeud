import { NextRequest, NextResponse } from "next/server";
import { updateWordValue } from "~/server/api/updateWordValue";

export async function POST(req: NextRequest) {
  try {
    await updateWordValue();
    return NextResponse.json(
      { message: "Word value updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updateing word value:", error);
    return NextResponse.json(
      { error: "Failed to update word values" },
      { status: 500 },
    );
  }
}
