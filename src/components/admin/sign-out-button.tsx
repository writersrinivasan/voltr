"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  }

  return (
    <button
      onClick={handleSignOut}
      className="mt-2 text-xs text-red-400 hover:text-red-600"
    >
      Sign out
    </button>
  );
}
