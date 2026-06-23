import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { refreshTokens } from "@/lib/db/schema";
import { hashToken } from "@/lib/auth/jwt";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;
  if (refreshToken) {
    await db
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(eq(refreshTokens.tokenHash, hashToken(refreshToken)));
  }

  const response = NextResponse.json({ data: { success: true } });
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  return response;
}
