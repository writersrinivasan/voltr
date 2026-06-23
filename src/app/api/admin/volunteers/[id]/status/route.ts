import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { volunteerProfiles, users } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { ok, err, SERVER_ERROR, FORBIDDEN } from "@/lib/api-response";
import { createAuditLog } from "@/lib/audit";
import { sendApprovalEmail, sendRejectionEmail } from "@/lib/email";
import { eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
  status: z.enum(["active", "rejected", "deactivated", "pending", "awaiting_info"]),
  reason: z.string().optional(),
});

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const session = await requireAdmin().catch(() => null);
    if (!session) return FORBIDDEN;

    const { id } = await params;
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return err("Invalid status", 422);

    const { status, reason } = parsed.data;

    const [profile] = await db
      .select({ id: volunteerProfiles.id, userId: volunteerProfiles.userId })
      .from(volunteerProfiles)
      .where(eq(volunteerProfiles.id, id))
      .limit(1);

    if (!profile) return err("Volunteer not found", 404);

    await db
      .update(volunteerProfiles)
      .set({
        status,
        rejectionReason: reason ?? null,
        reviewedBy: session.sub,
        reviewedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(volunteerProfiles.id, id));

    const [user] = await db
      .select({ email: users.email, fullName: volunteerProfiles.fullName })
      .from(users)
      .innerJoin(volunteerProfiles, eq(users.id, volunteerProfiles.userId))
      .where(eq(users.id, profile.userId))
      .limit(1);

    if (user) {
      if (status === "active") await sendApprovalEmail(user.email, user.fullName);
      if (status === "rejected") await sendRejectionEmail(user.email, user.fullName, reason);
    }

    await createAuditLog({
      actorId: session.sub,
      actorRole: session.role,
      action: `volunteer.${status}`,
      targetType: "volunteer_profile",
      targetId: id,
      payload: { reason },
      ipAddress: req.headers.get("x-forwarded-for") ?? undefined,
    });

    return ok({ status });
  } catch (e) {
    console.error("[PATCH /admin/volunteers/[id]/status]", e);
    return SERVER_ERROR;
  }
}
