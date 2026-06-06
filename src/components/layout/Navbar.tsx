"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Activity } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/clinics", label: "Find a Clinic" },
  { href: "/about", label: "About TB" },
  { href: "/symptom-checker", label: "Symptom Checker" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-gray-900 text-lg leading-none block">
                Ogun DOT
              </span>
              <span className="text-xs text-blue-600 font-medium leading-none">
                Connect
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/clinics"
              className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              Find a DOT Clinic
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-700 hover:text-blue-700 hover:bg-blue-50 px-4 py-2.5 rounded-lg text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/clinics"
              className="block w-full text-center bg-blue-700 text-white text-sm font-semibold px-5 py-3 rounded-xl"
              onClick={() => setOpen(false)}
            >
              Find a DOT Clinic
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
