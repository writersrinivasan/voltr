export const dynamic = "force-dynamic";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { volunteerProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STATUS_CONFIG = {
  pending: { label: "Pending Review", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  active: { label: "Active", color: "bg-green-100 text-green-700 border-green-200" },
  rejected: { label: "Not Approved", color: "bg-red-100 text-red-700 border-red-200" },
  deactivated: { label: "Deactivated", color: "bg-gray-100 text-gray-700 border-gray-200" },
  awaiting_info: { label: "Awaiting Information", color: "bg-blue-100 text-blue-700 border-blue-200" },
} as const;

export default async function VolunteerDashboard() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const [profile] = await db
    .select()
    .from(volunteerProfiles)
    .where(eq(volunteerProfiles.userId, session.sub))
    .limit(1);

  if (!profile) redirect("/volunteer/register");

  const statusCfg = STATUS_CONFIG[profile.status ?? "pending"];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {profile.fullName.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-gray-500">Here&apos;s an overview of your volunteer profile</p>
        </div>
        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${statusCfg.color}`}>
          {statusCfg.label}
        </span>
      </div>

      {profile.status === "pending" && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800">
              <strong>Application under review.</strong> Our team typically responds within 48 hours. You&apos;ll get an email once your application is processed.
            </p>
          </CardContent>
        </Card>
      )}

      {profile.status === "awaiting_info" && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <p className="text-sm text-blue-800">
              <strong>Action needed.</strong> Our team has requested additional information. Please check your email and update your profile.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Profile Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 capitalize">{profile.status}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Sessions (Coming Soon)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Hours Contributed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your Profile Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Organization</p>
              <p className="font-medium text-gray-900">{profile.organization ?? "—"}</p>
            </div>
            <div>
              <p className="text-gray-500">Role</p>
              <p className="font-medium text-gray-900">{profile.jobTitle ?? "—"}</p>
            </div>
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-medium text-gray-900">{profile.city}, {profile.state}</p>
            </div>
            <div>
              <p className="text-gray-500">Availability</p>
              <p className="font-medium text-gray-900">{profile.hoursPerWeek ?? "—"} hrs/week</p>
            </div>
          </div>
          <div className="pt-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/profile">Edit Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
