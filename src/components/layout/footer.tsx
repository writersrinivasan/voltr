import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white font-bold text-sm">
                M
              </div>
              <span className="font-semibold text-gray-900 text-lg">VOLTR</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              Empowering rural futures by connecting passionate professionals with college students who need guidance.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/volunteer/register" className="text-sm text-gray-500 hover:text-gray-900">Volunteer Registration</Link></li>
              <li><Link href="/auth/login" className="text-sm text-gray-500 hover:text-gray-900">Login</Link></li>
              <li><Link href="#about" className="text-sm text-gray-500 hover:text-gray-900">About VOLTR</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">Terms of Use</Link></li>
              <li><a href="mailto:support@voltr.org" className="text-sm text-gray-500 hover:text-gray-900">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} VOLTR. A social impact initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
