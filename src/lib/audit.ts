import { db } from "./db";
import { auditLogs } from "./db/schema";

interface AuditParams {
  actorId?: string;
  actorRole?: string;
  action: string;
  targetType?: string;
  targetId?: string;
  payload?: Record<string, unknown>;
  ipAddress?: string;
}

export async function createAuditLog(params: AuditParams) {
  await db.insert(auditLogs).values({
    actorId: params.actorId,
    actorRole: params.actorRole,
    action: params.action,
    targetType: params.targetType,
    targetId: params.targetId,
    payload: params.payload,
    ipAddress: params.ipAddress,
  });
}
