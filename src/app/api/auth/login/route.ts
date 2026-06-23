import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, refreshTokens } from "@/lib/db/schema";
import { verifyPassword } from "@/lib/auth/password";
import { signAccessToken, signRefreshToken, hashToken, generateSecureToken } from "@/lib/auth/jwt";
import { loginSchema } from "@/lib/validations/auth";
import { ok, err, SERVER_ERROR } from "@/lib/api-response";
import { eq } from "drizzle-orm";
import { addDays } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return err("Invalid request", 422);

    const { email, password } = parsed.data;

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user || !user.isActive) return err("Invalid email or password.", 401);

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return err("Invalid email or password.", 401);

    if (!user.emailVerified) return err("Please verify your email before logging in.", 403, "email_not_verified");

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = generateSecureToken();
    const refreshTokenHash = hashToken(refreshToken);

    await db.insert(refreshTokens).values({
      userId: user.id,
      tokenHash: refreshTokenHash,
      expiresAt: addDays(new Date(), 30),
    });

    await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));

    const response = NextResponse.json({
      data: { role: user.role, email: user.email },
    });

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
      path: "/",
    });

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (e) {
    console.error("[login]", e);
    return SERVER_ERROR;
  }
}
