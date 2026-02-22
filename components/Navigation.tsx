"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Navigation() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isTransparent = isHome || isAbout;

  const linkClass = `${
    isTransparent ? "text-white" : "text-gray-900"
  } hover:opacity-80 transition-opacity`;

  return (
    <nav
      className={`${
        isTransparent
          ? "absolute top-0 left-0 right-0 z-50"
          : "bg-white border-b border-gray-200"
      } p-6`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className={`text-2xl ${linkClass}`}>
          DineSmart
        </Link>

        {/* Nav Links + Account/User */}
        <div className="flex items-center gap-8">
          {/* Make all items share the same vertical box */}
          <div className="h-10 flex items-center">
            <Link href="/about" className={linkClass}>
              About
            </Link>
          </div>

          <div className="h-10 flex items-center">
            <Link href="/faq" className={linkClass}>
              FAQ
            </Link>
          </div>

          <SignedOut>
            <div className="h-10 flex items-center">
              <Link href="/account" className={linkClass}>
                Account
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="h-10 flex items-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}