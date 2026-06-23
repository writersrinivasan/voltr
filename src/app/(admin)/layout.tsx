export const dynamic = "force-dynamic";
import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/admin/sign-out-button";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/volunteers", label: "All Volunteers", icon: "👥" },
  { href: "/admin/review", label: "Review Queue", icon: "📋" },
  { href: "/admin/communications", label: "Communications", icon: "📧" },
  { href: "/admin/audit-log", label: "Audit Log", icon: "🔍" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || !["super_admin", "admin", "reviewer"].includes(session.role)) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-gray-100 flex flex-col">
        <div className="flex items-center gap-2 h-14 px-4 border-b border-gray-100">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-600 text-white font-bold text-xs">
            M
          </div>
          <span className="font-semibold text-gray-900 text-sm">VOLTR Admin</span>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="text-xs text-gray-400 mb-1">{session.email}</div>
          <div className="text-xs font-medium text-gray-600 capitalize">{session.role.replace("_", " ")}</div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
