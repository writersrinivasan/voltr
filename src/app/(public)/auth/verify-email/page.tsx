"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const sent = searchParams.get("sent");

  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">(
    token ? "verifying" : "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) return;
    setStatus("verifying");
    fetch(`/api/auth/verify-email?token=${token}`, { method: "POST" })
      .then((res) => res.json())
      .then((json) => {
        if (json.data?.verified) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage(json.error?.message ?? "Verification failed.");
        }
      })
      .catch(() => {
        setStatus("error");
        setErrorMessage("Network error. Please try again.");
      });
  }, [token]);

  if (sent && !token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 text-5xl">📧</div>
          <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
          <p className="mt-3 text-gray-500">
            We&apos;ve sent a verification link to your email address. Click the link to
            confirm your application and get it under review.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Didn&apos;t receive it? Check your spam folder, or{" "}
            <a href="/volunteer/register" className="text-green-600 hover:underline">
              re-register
            </a>.
          </p>
        </div>
      </div>
    );
  }

  if (status === "verifying") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-600 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Verifying your email…</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 text-5xl">✅</div>
          <h1 className="text-2xl font-bold text-gray-900">Email verified!</h1>
          <p className="mt-3 text-gray-500">
            Your application has been submitted and is under review. We&apos;ll email
            you within 48 hours once it&apos;s been processed.
          </p>
          <Button asChild className="mt-6 bg-green-600 hover:bg-green-700">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 text-5xl">❌</div>
          <h1 className="text-2xl font-bold text-gray-900">Verification failed</h1>
          <p className="mt-3 text-gray-500">{errorMessage}</p>
          <p className="mt-2 text-sm text-gray-400">
            The link may have expired. Please{" "}
            <a href="/volunteer/register" className="text-green-600 hover:underline">
              re-register
            </a>{" "}
            to get a new link.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
