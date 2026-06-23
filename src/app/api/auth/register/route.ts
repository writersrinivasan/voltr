import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { users, volunteerProfiles, volunteerSkills, volunteerMentoringInterests, volunteerLanguages, emailVerifications } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { generateSecureToken } from "@/lib/auth/jwt";
import { sendVerificationEmail } from "@/lib/email";
import { fullRegistrationSchema } from "@/lib/validations/volunteer";
import { ok, err, SERVER_ERROR } from "@/lib/api-response";
import { eq, sql } from "drizzle-orm";
import { addHours } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = fullRegistrationSchema.safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.issues[0]?.message ?? "Validation error", 422);
    }

    const data = parsed.data;

    const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, data.email)).limit(1);
    if (existing) return err("An account with this email already exists.", 409);

    const passwordHash = await hashPassword(data.password);

    const [user] = await db.insert(users).values({
      email: data.email,
      passwordHash,
      role: "volunteer",
    }).returning({ id: users.id });

    const [profile] = await db.insert(volunteerProfiles).values({
      userId: user.id,
      fullName: data.fullName,
      mobile: data.mobile || null,
      city: data.city,
      state: data.state,
      country: data.country ?? "India",
      gender: data.gender || null,
      jobTitle: data.jobTitle,
      organization: data.organization,
      industry: data.industry || null,
      yearsOfExperience: data.yearsOfExperience,
      linkedinUrl: data.linkedinUrl || null,
      highestQualification: data.highestQualification || null,
      hoursPerWeek: data.hoursPerWeek === "1-2" ? 2 : data.hoursPerWeek === "3-5" ? 5 : data.hoursPerWeek === "5-10" ? 10 : 15,
      preferredFormat: data.preferredFormat,
      preferredDays: data.preferredDays ?? [],
      preferredTimeSlots: data.preferredTimeSlots ?? [],
      openToOfflineYoto: data.openToOfflineYoto,
      openToLongTermMentoring: data.openToLongTermMentoring,
      motivationStatement: data.motivationStatement,
      donationInterest: data.donationInterest,
      status: "pending",
    }).returning({ id: volunteerProfiles.id });

    // Verification token
    const token = generateSecureToken();
    await db.insert(emailVerifications).values({
      userId: user.id,
      token,
      expiresAt: addHours(new Date(), 24),
    });

    await sendVerificationEmail(data.email, data.fullName, token);

    return ok({ message: "Registration successful. Please verify your email." }, 201);
  } catch (e) {
    console.error("[register]", e);
    return SERVER_ERROR;
  }
}
