import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { volunteerProfiles } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { ok, SERVER_ERROR, FORBIDDEN } from "@/lib/api-response";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const session = await requireAdmin().catch(() => null);
    if (!session) return FORBIDDEN;

    const [stats] = await db
      .select({
        total: sql<number>`count(*)`,
        pending: sql<number>`count(*) filter (where status = 'pending')`,
        active: sql<number>`count(*) filter (where status = 'active')`,
        rejected: sql<number>`count(*) filter (where status = 'rejected')`,
        deactivated: sql<number>`count(*) filter (where status = 'deactivated')`,
        thisWeek: sql<number>`count(*) filter (where created_at >= now() - interval '7 days')`,
        thisMonth: sql<number>`count(*) filter (where created_at >= now() - interval '30 days')`,
      })
      .from(volunteerProfiles);

    return ok(stats);
  } catch (e) {
    console.error("[GET /admin/dashboard/stats]", e);
    return SERVER_ERROR;
  }
}
