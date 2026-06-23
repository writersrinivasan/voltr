export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { communicationCampaigns } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NewCampaignForm from "@/components/admin/new-campaign-form";

const STATUS_COLORS = {
  draft: "bg-gray-100 text-gray-600",
  scheduled: "bg-blue-100 text-blue-700",
  sent: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
} as const;

export default async function CommunicationsPage() {
  const campaigns = await db
    .select()
    .from(communicationCampaigns)
    .orderBy(desc(communicationCampaigns.createdAt))
    .limit(50);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
          <p className="text-sm text-gray-500">Send emails to volunteers</p>
        </div>
      </div>

      {/* New Campaign */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">New Email Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <NewCampaignForm />
        </CardContent>
      </Card>

      {/* Past campaigns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Campaign History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-500">Subject</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Recipients</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                    No campaigns yet
                  </td>
                </tr>
              )}
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.subject}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[c.status ?? "draft"]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{c.recipientCount ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {(c.sentAt ?? c.scheduledAt ?? c.createdAt)
                      ? new Date((c.sentAt ?? c.scheduledAt ?? c.createdAt)!).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
