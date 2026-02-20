"use client";
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation";


export function Navigation() {
    const pathname = usePathname();

    const isHome = pathname === "/";
    const isAbout = pathname === "/about";

  // For About page, the navigation should be transparent and overlay the hero image
  const isTransparent = isHome || isAbout;

  return (
    <nav className={`${isTransparent ? 'absolute top-0 left-0 right-0 z-50' : 'bg-white border-b border-gray-200'} p-6`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className={`text-2xl ${isTransparent ? 'text-white' : 'text-gray-900'} hover:opacity-80 transition-opacity`}>
          DineSmart
        </Link>

        {/* Nav Links */}
        <div className="flex gap-8">
          <Link href="/about" className={`${isTransparent ? 'text-white' : 'text-gray-900'} hover:opacity-80 transition-opacity`}>
            About
          </Link>
          <Link href="/faq" className={`${isTransparent ? 'text-white' : 'text-gray-900'} hover:opacity-80 transition-opacity`}>
            FAQ
          </Link>
          <Link href="/account" className={`${isTransparent ? 'text-white' : 'text-gray-900'} hover:opacity-80 transition-opacity`}>
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
}