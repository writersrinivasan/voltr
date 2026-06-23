import { NextResponse } from "next/server";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function err(message: string, status = 400, code?: string) {
  return NextResponse.json({ error: { message, code } }, { status });
}

export const UNAUTHORIZED = err("Unauthorized", 401, "unauthorized");
export const FORBIDDEN = err("Forbidden", 403, "forbidden");
export const NOT_FOUND = err("Not found", 404, "not_found");
export const SERVER_ERROR = err("Internal server error", 500, "server_error");
