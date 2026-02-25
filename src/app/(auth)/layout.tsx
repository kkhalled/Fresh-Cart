import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/src/components/layout/PageTransition";
import logo from "@/src/assets/freshcart-logo.svg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo}
                alt="FreshCart"
                className="h-8 w-auto"
                priority
              />
            </Link>
            <Link
              href="/"
              className="text-xs font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Back to shop
            </Link>
          </div>
        </header>

        <main className="w-full flex-1 flex justify-center ">
          <div className="w-full ">
            {children}
          </div>
        </main>

        <footer className="w-full border-t border-gray-200 bg-white/80 backdrop-blur">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 text-xs text-gray-500">
            <span>© {new Date().getFullYear()} FreshCart</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-gray-700">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-gray-700">
                Terms
              </Link>
              <Link href="/support" className="hover:text-gray-700">
                Support
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}

