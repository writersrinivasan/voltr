"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type Status = "pending" | "active" | "rejected" | "deactivated" | "awaiting_info";

interface Props {
  volunteerId: string;
  currentStatus: Status;
}

interface Action {
  label: string;
  newStatus: Status;
  variant: "default" | "outline" | "destructive";
  requiresReason?: boolean;
  className?: string;
}

const ACTIONS: Record<Status, Action[]> = {
  pending: [
    { label: "✅ Approve", newStatus: "active", variant: "default", className: "bg-green-600 hover:bg-green-700" },
    { label: "⚠ Request Info", newStatus: "awaiting_info", variant: "outline" },
    { label: "❌ Reject", newStatus: "rejected", variant: "destructive", requiresReason: true },
  ],
  awaiting_info: [
    { label: "✅ Approve", newStatus: "active", variant: "default", className: "bg-green-600 hover:bg-green-700" },
    { label: "❌ Reject", newStatus: "rejected", variant: "destructive", requiresReason: true },
  ],
  active: [
    { label: "Deactivate", newStatus: "deactivated", variant: "destructive", requiresReason: true },
  ],
  deactivated: [
    { label: "Reactivate", newStatus: "active", variant: "default", className: "bg-green-600 hover:bg-green-700" },
  ],
  rejected: [
    { label: "Reconsider (set Pending)", newStatus: "pending", variant: "outline" },
  ],
};

export default function VolunteerActions({ volunteerId, currentStatus }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState<Action | null>(null);
  const [reason, setReason] = useState("");
  const [noteText, setNoteText] = useState("");

  const actions = ACTIONS[currentStatus] ?? [];

  async function executeAction(action: Action, reason?: string) {
    setIsLoading(true);
    try {
      await fetch(`/api/admin/volunteers/${volunteerId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action.newStatus, reason }),
      });
      router.refresh();
    } finally {
      setIsLoading(false);
      setConfirmAction(null);
      setReason("");
    }
  }

  async function addNote() {
    if (!noteText.trim()) return;
    await fetch(`/api/admin/volunteers/${volunteerId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: noteText }),
    });
    setNoteText("");
    router.refresh();
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {actions.map((action) => (
          <Button
            key={action.newStatus}
            variant={action.variant}
            size="sm"
            className={action.className}
            disabled={isLoading}
            onClick={() => {
              if (action.requiresReason) {
                setConfirmAction(action);
              } else {
                executeAction(action);
              }
            }}
          >
            {action.label}
          </Button>
        ))}

        {/* Quick note */}
        <div className="flex gap-2 ml-auto">
          <Textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add internal note…"
            rows={1}
            className="min-h-0 h-8 py-1 text-sm w-52 resize-none"
          />
          <Button size="sm" variant="outline" onClick={addNote} disabled={!noteText.trim()}>
            Add Note
          </Button>
        </div>
      </div>

      {/* Confirm dialog for actions requiring a reason */}
      <Dialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm: {confirmAction?.label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              {confirmAction?.newStatus === "rejected"
                ? "Provide a reason for rejection (optional — will be emailed to the volunteer)."
                : "Provide a reason for this action (for internal records)."}
            </p>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason…"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmAction(null)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => confirmAction && executeAction(confirmAction, reason)}
              disabled={isLoading}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
