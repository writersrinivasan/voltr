import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { volunteerProfiles } from "@/lib/db/schema";
import { getSession } from "@/lib/auth/session";
import { ok, UNAUTHORIZED, SERVER_ERROR, NOT_FOUND } from "@/lib/api-response";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return UNAUTHORIZED;

    const [profile] = await db
      .select()
      .from(volunteerProfiles)
      .where(eq(volunteerProfiles.userId, session.sub))
      .limit(1);

    if (!profile) return NOT_FOUND;
    return ok(profile);
  } catch (e) {
    console.error("[GET /volunteer/me]", e);
    return SERVER_ERROR;
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return UNAUTHORIZED;

    const body = await req.json();
    const allowedFields = [
      "mobile", "city", "state", "jobTitle", "organization",
      "industry", "yearsOfExperience", "linkedinUrl", "hoursPerWeek",
      "preferredFormat", "preferredDays", "preferredTimeSlots",
      "openToOfflineYoto", "openToLongTermMentoring", "motivationStatement",
    ];

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    for (const key of allowedFields) {
      if (key in body) updateData[key] = body[key];
    }

    const [updated] = await db
      .update(volunteerProfiles)
      .set(updateData)
      .where(eq(volunteerProfiles.userId, session.sub))
      .returning();

    return ok(updated);
  } catch (e) {
    console.error("[PUT /volunteer/me]", e);
    return SERVER_ERROR;
  }
}
