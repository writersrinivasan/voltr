import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white font-bold text-sm">
            M
          </div>
          <span className="font-semibold text-gray-900 text-lg">VOLTR</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            How It Works
          </Link>
          <Link href="#impact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Impact
          </Link>
          <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Login
          </Link>
        </nav>

        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/volunteer/register">Become a Volunteer</Link>
        </Button>
      </div>
    </header>
  );
}
