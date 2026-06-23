import { db } from "@/lib/db";
import { volunteerProfiles, volunteerNotes, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VolunteerActions from "@/components/admin/volunteer-actions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VolunteerDetailPage({ params }: Props) {
  const { id } = await params;

  const [profile] = await db
    .select()
    .from(volunteerProfiles)
    .where(eq(volunteerProfiles.id, id))
    .limit(1);

  if (!profile) notFound();

  const notes = await db
    .select({
      id: volunteerNotes.id,
      note: volunteerNotes.note,
      createdAt: volunteerNotes.createdAt,
      isInternal: volunteerNotes.isInternal,
    })
    .from(volunteerNotes)
    .where(eq(volunteerNotes.volunteerId, id))
    .orderBy(volunteerNotes.createdAt);

  const STATUS_COLORS = {
    pending: "bg-yellow-100 text-yellow-700",
    active: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    deactivated: "bg-gray-100 text-gray-600",
    awaiting_info: "bg-blue-100 text-blue-700",
  } as const;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 font-bold text-xl">
            {profile.fullName[0]}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{profile.fullName}</h1>
            <p className="text-sm text-gray-500">{profile.jobTitle} at {profile.organization}</p>
          </div>
        </div>
        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${STATUS_COLORS[profile.status ?? "pending"]}`}>
          {profile.status}
        </span>
      </div>

      {/* Action buttons */}
      <VolunteerActions volunteerId={id} currentStatus={profile.status ?? "pending"} />

      {/* Profile Tabs */}
      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="motivation">Motivation</TabsTrigger>
          <TabsTrigger value="notes">Notes ({notes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-4">
          <Card>
            <CardContent className="p-5 grid grid-cols-2 gap-4 text-sm">
              {[
                ["Full Name", profile.fullName],
                ["City", profile.city],
                ["State", profile.state],
                ["Country", profile.country],
                ["Gender", profile.gender ?? "Not provided"],
                ["Mobile", profile.mobile ?? "Not provided"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-400 text-xs">{label}</p>
                  <p className="font-medium text-gray-900 mt-0.5">{value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional" className="mt-4">
          <Card>
            <CardContent className="p-5 grid grid-cols-2 gap-4 text-sm">
              {[
                ["Job Title", profile.jobTitle],
                ["Organization", profile.organization],
                ["Industry", profile.industry],
                ["Years of Experience", profile.yearsOfExperience ? `${profile.yearsOfExperience} years` : "—"],
                ["Qualification", profile.highestQualification],
                ["LinkedIn", profile.linkedinUrl ?? "Not provided"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-400 text-xs">{label}</p>
                  <p className="font-medium text-gray-900 mt-0.5 break-all">{value ?? "—"}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="mt-4">
          <Card>
            <CardContent className="p-5 grid grid-cols-2 gap-4 text-sm">
              {[
                ["Hours per Week", profile.hoursPerWeek],
                ["Preferred Format", profile.preferredFormat],
                ["Preferred Days", profile.preferredDays?.join(", ") ?? "—"],
                ["Time Slots", profile.preferredTimeSlots?.join(", ") ?? "—"],
                ["Open to YOTO Offline", profile.openToOfflineYoto ? "Yes" : "No"],
                ["Long-term Mentoring", profile.openToLongTermMentoring ? "Yes" : "No"],
                ["Donation Interest", profile.donationInterest],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-400 text-xs">{label}</p>
                  <p className="font-medium text-gray-900 mt-0.5">{String(value ?? "—")}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="motivation" className="mt-4">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {profile.motivationStatement ?? "No motivation statement provided."}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Internal Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notes.length === 0 && (
                <p className="text-sm text-gray-400">No notes yet.</p>
              )}
              {notes.map((note) => (
                <div key={note.id} className="rounded-lg bg-gray-50 p-3">
                  <p className="text-sm text-gray-700">{note.note}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {note.createdAt ? new Date(note.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : ""}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
