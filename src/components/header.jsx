"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Service", hasDropdown: true },
  { label: "Agency", hasDropdown: true },
  { label: "Case study", hasDropdown: true },
  { label: "Resources", hasDropdown: true },
  { label: "Contact", hasDropdown: false },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-1/2 top-4 z-30 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 transition-all duration-300">
      {/* MAIN CONTAINER */}
      <div
        className={`relative flex items-center justify-between rounded-full px-4 py-3 md:px-5 transition-all duration-300 backdrop-blur-2xl border
        ${
          scrolled
            ? "bg-black/40 border-white/10 shadow-2xl shadow-black/30 scale-[0.98]"
            : "bg-white/10 border-white/20 shadow-lg shadow-black/10"
        }`}
      >
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2">
          <svg
            viewBox="0 0 32 32"
            className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
          >
            <path d="M16 2 A14 14 0 0 0 16 30 Z" fill="#4A7C2F" />
            <path d="M16 2 A14 14 0 0 1 16 30 Z" fill="#C8E650" />
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="#4A7C2F"
              strokeWidth="0.5"
            />
          </svg>

          <span
            className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-white" : "text-white"
            }`}
          >
            Golf
          </span>
        </Link>

        {/* NAV */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map(({ label, hasDropdown }) => (
            <button
              key={label}
              className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-white/80 hover:text-[#C8E650]"
                  : "text-white/80 hover:text-[#C8E650]"
              }`}
              type="button"
            >
              {label}
              {hasDropdown && (
                <svg
                  className="mt-0.5 h-3.5 w-3.5 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              )}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            href="/login"
            className="group inline-flex w-fit items-center gap-4 rounded-full bg-[#C8E650] py-1.5 pl-6 pr-1.5 text-sm font-bold tracking-wide text-[#1A1A1A] transition-all duration-300 hover:bg-white"
          >
            <span>LOGIN</span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
            </span>
          </Link>
        </div>

        {/* MOBILE */}
        <button
          className="rounded-full p-2 text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mt-3 rounded-3xl border border-white/20 bg-black/40 px-5 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map(({ label }) => (
              <Link
                key={label}
                href="#"
                className="border-b border-white/10 pb-3 text-base font-medium text-white"
              >
                {label}
              </Link>
            ))}

            <Link
              href="/login"
              className="group inline-flex w-fit items-center gap-4 rounded-full bg-[#C8E650] py-1.5 pl-6 pr-1.5 text-sm font-bold tracking-wide text-[#1A1A1A] transition-all duration-300 hover:bg-white"
            >
              <span>LOGIN</span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
