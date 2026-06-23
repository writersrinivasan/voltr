import { db } from "@/lib/db";
import { volunteerProfiles } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function ReviewQueuePage() {
  const pending = await db
    .select()
    .from(volunteerProfiles)
    .where(eq(volunteerProfiles.status, "pending"))
    .orderBy(desc(volunteerProfiles.createdAt));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Review Queue</h1>
        <p className="text-sm text-gray-500">
          {pending.length} application{pending.length !== 1 ? "s" : ""} awaiting review
        </p>
      </div>

      {pending.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <p className="text-gray-600 font-medium">All caught up!</p>
            <p className="text-sm text-gray-400 mt-1">No pending applications to review.</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {pending.map((v) => (
          <Card key={v.id} className="hover:border-green-200 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 font-semibold">
                    {v.fullName[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{v.fullName}</p>
                    <p className="text-sm text-gray-500">
                      {v.jobTitle} at {v.organization} · {v.city}, {v.state}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right text-xs text-gray-400">
                    <p>Submitted</p>
                    <p className="font-medium">
                      {v.createdAt
                        ? new Date(v.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-xs">
                    {v.openToLongTermMentoring && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">Long-term</span>
                    )}
                    {v.openToOfflineYoto && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">YOTO offline</span>
                    )}
                  </div>
                  <Link
                    href={`/admin/volunteers/${v.id}`}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                  >
                    Review →
                  </Link>
                </div>
              </div>

              {v.motivationStatement && (
                <p className="mt-3 text-sm text-gray-500 line-clamp-2 border-t border-gray-50 pt-3">
                  &ldquo;{v.motivationStatement}&rdquo;
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
