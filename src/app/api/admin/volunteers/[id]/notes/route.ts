import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { volunteerNotes } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { ok, err, SERVER_ERROR, FORBIDDEN } from "@/lib/api-response";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Props) {
  try {
    const session = await requireAdmin().catch(() => null);
    if (!session) return FORBIDDEN;
    const { id } = await params;

    const notes = await db
      .select()
      .from(volunteerNotes)
      .where(eq(volunteerNotes.volunteerId, id))
      .orderBy(asc(volunteerNotes.createdAt));

    return ok(notes);
  } catch (e) {
    console.error("[GET notes]", e);
    return SERVER_ERROR;
  }
}

const schema = z.object({
  note: z.string().min(1).max(2000),
  isInternal: z.boolean().default(true),
});

export async function POST(req: NextRequest, { params }: Props) {
  try {
    const session = await requireAdmin().catch(() => null);
    if (!session) return FORBIDDEN;
    const { id } = await params;

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return err("Note content is required", 422);

    const [note] = await db
      .insert(volunteerNotes)
      .values({
        volunteerId: id,
        adminId: session.sub,
        note: parsed.data.note,
        isInternal: parsed.data.isInternal,
      })
      .returning();

    return ok(note, 201);
  } catch (e) {
    console.error("[POST notes]", e);
    return SERVER_ERROR;
  }
}
