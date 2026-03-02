"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Mail, Phone } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  const aboutLinks = [
    { label: "Mission", href: "#mission" },
    { label: "What We Do", href: "#purpose" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] as const;

  const defaultLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ] as const;

  const linkClass = "text-gray-400 hover:text-white transition-colors";

  return (
    <footer className="bg-gray-900 text-white py-6 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-4">
          {/* Brand & Tagline */}
          <div>
            <h3 className="text-xl mb-2 text-gray-200">DineSmart</h3>
            <p className="text-gray-400 text-sm">
              Making dining safe and accessible for everyone with food allergies.
            </p>
          </div>

          {/* Quick Links (STACKED) */}
          <div>
            <h4 className="text-sm mb-2 text-gray-300">Quick Links</h4>

            <ul className="space-y-1 text-sm">
              {isAboutPage ? (
                aboutLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  {defaultLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}

                  {/* Match Navigation behavior */}
                    <li>
                      <Link href="/account" className={linkClass}>
                        Account
                      </Link>
                    </li>       
                </>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm mb-2 text-gray-300">Contact</h4>
            <div className="space-y-1 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="size-3" />
                <a href="mailto:hello@dinesmart.com" className={linkClass}>
                  hello@dinesmart.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3" />
                <a href="tel:+15551234567" className={linkClass}>
                  (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-3 text-center text-gray-500 text-xs">
          <p>&copy; 2026 DineSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}