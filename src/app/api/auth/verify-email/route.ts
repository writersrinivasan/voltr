import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { emailVerifications, users } from "@/lib/db/schema";
import { ok, err, SERVER_ERROR } from "@/lib/api-response";
import { eq, and, isNull, gt } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) return err("Token is required.", 400);

    const [verification] = await db
      .select()
      .from(emailVerifications)
      .where(
        and(
          eq(emailVerifications.token, token),
          isNull(emailVerifications.usedAt),
          gt(emailVerifications.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!verification) return err("Invalid or expired verification link.", 400, "invalid_token");

    await db
      .update(emailVerifications)
      .set({ usedAt: new Date() })
      .where(eq(emailVerifications.id, verification.id));

    await db
      .update(users)
      .set({ emailVerified: true })
      .where(eq(users.id, verification.userId));

    return ok({ verified: true });
  } catch (e) {
    console.error("[verify-email]", e);
    return SERVER_ERROR;
  }
}
