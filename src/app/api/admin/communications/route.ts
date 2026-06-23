import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { communicationCampaigns, volunteerProfiles, users } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { ok, err, SERVER_ERROR, FORBIDDEN } from "@/lib/api-response";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
  subject: z.string().min(1).max(500),
  bodyHtml: z.string().min(1),
  audienceFilter: z.object({ status: z.string().optional() }).optional(),
  sendNow: z.boolean().optional().default(false),
});

export async function GET() {
  try {
    const session = await requireAdmin().catch(() => null);
    if (!session) return FORBIDDEN;

    const campaigns = await db
      .select()
      .from(communicationCampaigns)
      .orderBy(desc(communicationCampaigns.createdAt))
      .limit(50);

    return ok(campaigns);
  } catch (e) {
    console.error("[GET /admin/communications]", e);
    return SERVER_ERROR;
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin().catch(() => null);
    if (!session) return FORBIDDEN;

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return err("Validation error", 422);

    const { subject, bodyHtml, audienceFilter, sendNow } = parsed.data;

    // Get recipients
    let recipientQuery = db
      .select({ email: users.email })
      .from(users)
      .innerJoin(volunteerProfiles, eq(users.id, volunteerProfiles.userId))
      .$dynamic();

    if (audienceFilter?.status) {
      recipientQuery = recipientQuery.where(
        eq(volunteerProfiles.status, audienceFilter.status as "active")
      );
    }

    const recipients = await recipientQuery;

    const [campaign] = await db
      .insert(communicationCampaigns)
      .values({
        createdBy: session.sub,
        subject,
        bodyHtml,
        audienceFilter,
        status: sendNow ? "sent" : "draft",
        sentAt: sendNow ? new Date() : null,
        recipientCount: recipients.length,
      })
      .returning();

    if (sendNow && recipients.length > 0) {
      // Batch send (max 50 per batch for Resend)
      const batchSize = 50;
      for (let i = 0; i < recipients.length; i += batchSize) {
        const batch = recipients.slice(i, i + batchSize);
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY!);
        await resend.batch.send(
          batch.map((r) => ({
            from: process.env.EMAIL_FROM ?? "VOLTR <noreply@voltr.org>",
            to: r.email,
            subject,
            html: bodyHtml,
          }))
        );
      }
    }

    return ok(campaign, 201);
  } catch (e) {
    console.error("[POST /admin/communications]", e);
    return SERVER_ERROR;
  }
}
