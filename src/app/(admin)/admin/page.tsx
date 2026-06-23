export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { volunteerProfiles } from "@/lib/db/schema";
import { eq, count, sql } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getDashboardStats() {
  const [totals] = await db
    .select({
      total: count(),
      pending: sql<number>`count(*) filter (where status = 'pending')`,
      active: sql<number>`count(*) filter (where status = 'active')`,
      deactivated: sql<number>`count(*) filter (where status = 'deactivated')`,
    })
    .from(volunteerProfiles);

  const thisWeek = await db
    .select({ count: count() })
    .from(volunteerProfiles)
    .where(sql`created_at >= now() - interval '7 days'`);

  return {
    total: totals.total,
    pending: totals.pending,
    active: totals.active,
    deactivated: totals.deactivated,
    thisWeek: thisWeek[0].count,
  };
}

async function getRecentVolunteers() {
  return db
    .select({
      id: volunteerProfiles.id,
      fullName: volunteerProfiles.fullName,
      organization: volunteerProfiles.organization,
      jobTitle: volunteerProfiles.jobTitle,
      status: volunteerProfiles.status,
      createdAt: volunteerProfiles.createdAt,
    })
    .from(volunteerProfiles)
    .orderBy(sql`created_at desc`)
    .limit(8);
}

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  active: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  deactivated: "bg-gray-100 text-gray-600",
  awaiting_info: "bg-blue-100 text-blue-700",
} as const;

export default async function AdminDashboard() {
  const [stats, recent] = await Promise.all([getDashboardStats(), getRecentVolunteers()]);

  const kpis = [
    { label: "Total Volunteers", value: stats.total, icon: "👥", href: "/admin/volunteers" },
    { label: "Pending Review", value: stats.pending, icon: "⏳", href: "/admin/review", highlight: true },
    { label: "Active Volunteers", value: stats.active, icon: "✅", href: "/admin/volunteers?status=active" },
    { label: "This Week", value: `+${stats.thisWeek}`, icon: "📈", href: "/admin/volunteers" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Overview of volunteer activity</p>
        </div>
        <Button asChild className="bg-green-600 hover:bg-green-700" size="sm">
          <Link href="/admin/review">Review Queue ({stats.pending})</Link>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Link key={kpi.label} href={kpi.href}>
            <Card className={`hover:shadow-sm transition-shadow ${kpi.highlight && Number(kpi.value) > 0 ? "border-yellow-200 bg-yellow-50" : ""}`}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{kpi.label}</p>
                  <span className="text-xl">{kpi.icon}</span>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">{kpi.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Registrations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Recent Registrations</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/volunteers">View all →</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-2.5 text-left font-medium text-gray-500">Name</th>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-500">Organization</th>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-500">Status</th>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-500">Joined</th>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recent.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{v.fullName}</div>
                      <div className="text-xs text-gray-400">{v.jobTitle}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{v.organization ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[v.status ?? "pending"]}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {v.createdAt ? new Date(v.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/volunteers/${v.id}`}
                        className="text-green-600 hover:underline text-xs"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
