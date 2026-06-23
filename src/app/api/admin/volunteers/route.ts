import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { volunteerProfiles } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { ok, SERVER_ERROR, FORBIDDEN } from "@/lib/api-response";
import { eq, ilike, or, desc, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await requireAdmin().catch(() => null);
    if (!session) return FORBIDDEN;

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
    const offset = (page - 1) * limit;
    const status = searchParams.get("status");
    const q = searchParams.get("q");

    let query = db.select().from(volunteerProfiles).$dynamic();
    if (status) query = query.where(eq(volunteerProfiles.status, status as "pending"));
    if (q) {
      query = query.where(
        or(
          ilike(volunteerProfiles.fullName, `%${q}%`),
          ilike(volunteerProfiles.organization, `%${q}%`)
        )!
      );
    }

    const [volunteers, [{ count: total }]] = await Promise.all([
      query.orderBy(desc(volunteerProfiles.createdAt)).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(volunteerProfiles),
    ]);

    return ok({
      data: volunteers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (e) {
    console.error("[GET /admin/volunteers]", e);
    return SERVER_ERROR;
  }
}
