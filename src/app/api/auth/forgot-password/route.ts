import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { users, passwordResetTokens } from "@/lib/db/schema";
import { generateSecureToken } from "@/lib/auth/jwt";
import { sendPasswordResetEmail } from "@/lib/email";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { ok, err, SERVER_ERROR } from "@/lib/api-response";
import { eq } from "drizzle-orm";
import { addHours } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) return err("Invalid email", 422);

    const [user] = await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(eq(users.email, parsed.data.email))
      .limit(1);

    // Always return success to prevent user enumeration
    if (!user) return ok({ message: "If this email is registered, you will receive a reset link." });

    const token = generateSecureToken();
    await db.insert(passwordResetTokens).values({
      userId: user.id,
      token,
      expiresAt: addHours(new Date(), 1),
    });

    await sendPasswordResetEmail(user.email, user.email, token);

    return ok({ message: "If this email is registered, you will receive a reset link." });
  } catch (e) {
    console.error("[forgot-password]", e);
    return SERVER_ERROR;
  }
}
