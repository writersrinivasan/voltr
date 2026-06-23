import { db } from "@/lib/db";
import { auditLogs, users } from "@/lib/db/schema";
import { desc, sql } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { eq } from "drizzle-orm";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

const ACTION_COLORS: Record<string, string> = {
  "volunteer.approved": "bg-green-100 text-green-700",
  "volunteer.rejected": "bg-red-100 text-red-700",
  "volunteer.deactivated": "bg-gray-100 text-gray-600",
  "volunteer.awaiting_info": "bg-blue-100 text-blue-700",
  "volunteer.reactivated": "bg-green-100 text-green-700",
  "note.added": "bg-purple-100 text-purple-700",
  "campaign.sent": "bg-orange-100 text-orange-700",
  "user.login": "bg-gray-100 text-gray-600",
};

export default async function AuditLogPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1"));
  const limit = 30;
  const offset = (page - 1) * limit;

  const logs = await db
    .select({
      id: auditLogs.id,
      actorId: auditLogs.actorId,
      actorRole: auditLogs.actorRole,
      action: auditLogs.action,
      targetType: auditLogs.targetType,
      targetId: auditLogs.targetId,
      payload: auditLogs.payload,
      ipAddress: auditLogs.ipAddress,
      createdAt: auditLogs.createdAt,
    })
    .from(auditLogs)
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ count: total }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(auditLogs);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
        <p className="text-sm text-gray-500">Complete record of all admin actions</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-500">Timestamp</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Action</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Actor</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Target</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    No audit log entries yet
                  </td>
                </tr>
              )}
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {log.createdAt
                      ? new Date(log.createdAt).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        ACTION_COLORS[log.action] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    <span className="font-medium capitalize">{log.actorRole?.replace("_", " ") ?? "system"}</span>
                    <br />
                    <span className="text-gray-400 font-mono text-[10px]">{log.actorId?.slice(0, 8)}…</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                    {log.targetType && <span>{log.targetType}: </span>}
                    {log.targetId?.slice(0, 8)}…
                  </td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                    {String(log.ipAddress ?? "—")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="border-t border-gray-100 px-4 py-3 text-xs text-gray-500">
              Page {page} of {totalPages}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
