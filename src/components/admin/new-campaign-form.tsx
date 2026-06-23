"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function NewCampaignForm() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<"all" | "active" | "pending">("all");
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;
    setIsSending(true);
    try {
      await fetch("/api/admin/communications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, bodyHtml: body, audienceFilter: { status: audience } }),
      });
      setSubject("");
      setBody("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      router.refresh();
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form onSubmit={handleSend} className="space-y-4">
      <div>
        <Label>Audience</Label>
        <div className="mt-1 flex gap-2">
          {[
            { value: "all", label: "All Volunteers" },
            { value: "active", label: "Active Only" },
            { value: "pending", label: "Pending Only" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setAudience(opt.value as typeof audience)}
              className={`rounded-full border px-3 py-1 text-sm font-medium transition-all ${
                audience === opt.value
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="subject">Subject Line</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Thank you for joining VOLTR!"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="body">Email Body</Label>
        <Textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          placeholder="Write your email content here… (HTML is supported)"
          className="mt-1 font-mono text-sm"
        />
      </div>

      {success && (
        <p className="text-sm text-green-600 font-medium">Campaign sent successfully!</p>
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700"
          disabled={isSending || !subject.trim() || !body.trim()}
        >
          {isSending ? "Sending…" : "Send Campaign"}
        </Button>
        <Button type="button" variant="outline" disabled={isSending}>
          Save as Draft
        </Button>
      </div>
    </form>
  );
}
