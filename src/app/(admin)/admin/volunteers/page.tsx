import { db } from "@/lib/db";
import { volunteerProfiles } from "@/lib/db/schema";
import { eq, ilike, or, sql, desc } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  active: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  deactivated: "bg-gray-100 text-gray-600",
  awaiting_info: "bg-blue-100 text-blue-700",
} as const;

interface Props {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>;
}

export default async function VolunteerListPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1"));
  const limit = 20;
  const offset = (page - 1) * limit;

  const baseQuery = db.select().from(volunteerProfiles).$dynamic();
  const countQuery = db.select({ count: sql<number>`count(*)` }).from(volunteerProfiles).$dynamic();

  const conditions = [];
  if (params.status) conditions.push(eq(volunteerProfiles.status, params.status as "pending" | "active" | "rejected" | "deactivated" | "awaiting_info"));
  if (params.q) {
    conditions.push(
      or(
        ilike(volunteerProfiles.fullName, `%${params.q}%`),
        ilike(volunteerProfiles.organization, `%${params.q}%`),
        ilike(volunteerProfiles.jobTitle, `%${params.q}%`)
      )!
    );
  }

  const volunteers = await baseQuery
    .orderBy(desc(volunteerProfiles.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ count: total }] = await countQuery;
  const totalPages = Math.ceil(total / limit);

  const STATUSES = ["", "pending", "active", "awaiting_info", "rejected", "deactivated"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteers</h1>
          <p className="text-sm text-gray-500">{total} total volunteers</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href="/api/admin/volunteers/export">Export CSV</a>
        </Button>
      </div>

      {/* Filters */}
      <form className="flex flex-wrap gap-3 items-center">
        <input
          name="q"
          defaultValue={params.q}
          placeholder="Search name, org, title…"
          className="rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-52"
        />
        <select
          name="status"
          defaultValue={params.status ?? ""}
          className="rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="awaiting_info">Awaiting Info</option>
          <option value="rejected">Rejected</option>
          <option value="deactivated">Deactivated</option>
        </select>
        <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">Filter</Button>
        <Button type="button" variant="ghost" size="sm" asChild>
          <Link href="/admin/volunteers">Clear</Link>
        </Button>
      </form>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Organization</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Location</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Experience</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Joined</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {volunteers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                      No volunteers found
                    </td>
                  </tr>
                )}
                {volunteers.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{v.fullName}</div>
                      <div className="text-xs text-gray-400">{v.jobTitle}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{v.organization ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{v.city}, {v.state}</td>
                    <td className="px-4 py-3 text-gray-600">{v.yearsOfExperience ?? "—"} yrs</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[v.status ?? "pending"]}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {v.createdAt ? new Date(v.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/volunteers/${v.id}`} className="text-green-600 hover:underline text-xs font-medium">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
              <p className="text-xs text-gray-500">
                Page {page} of {totalPages} — {total} results
              </p>
              <div className="flex gap-2">
                {page > 1 && (
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`?page=${page - 1}&status=${params.status ?? ""}&q=${params.q ?? ""}`}>← Prev</Link>
                  </Button>
                )}
                {page < totalPages && (
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`?page=${page + 1}&status=${params.status ?? ""}&q=${params.q ?? ""}`}>Next →</Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
