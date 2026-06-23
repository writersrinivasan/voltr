import { cookies } from "next/headers";
import { verifyAccessToken, type JWTPayload } from "./jwt";

export async function getSession(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) return null;
    return verifyAccessToken(token);
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<JWTPayload> {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function requireAdmin(): Promise<JWTPayload> {
  const session = await requireSession();
  if (!["super_admin", "admin", "reviewer"].includes(session.role)) {
    throw new Error("Forbidden");
  }
  return session;
}
