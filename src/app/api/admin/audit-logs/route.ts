import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auditLogs } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { ok, SERVER_ERROR, FORBIDDEN } from "@/lib/api-response";
import { desc, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await requireAdmin().catch(() => null);
    if (!session) return FORBIDDEN;

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = 30;
    const offset = (page - 1) * limit;

    const [logs, [{ count: total }]] = await Promise.all([
      db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(auditLogs),
    ]);

    return ok({ data: logs, total, page, totalPages: Math.ceil(total / limit) });
  } catch (e) {
    console.error("[GET /admin/audit-logs]", e);
    return SERVER_ERROR;
  }
}
