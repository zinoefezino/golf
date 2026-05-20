"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const NAV_LINKS = [
  {
    label: "Dashboard",
    href: "/member/dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    label: "Book",
    href: "/member/book",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
  {
    label: "Bookings",
    href: "/member/bookings",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/member/profile",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/member/settings",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
];

export default function MemberNav({ active }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const user = session?.user;
  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  const avatarUrl = user?.avatar || "";

  const Avatar = ({ className, fallbackClassName }) => {
    if (avatarUrl) {
      return (
        <img
          src={avatarUrl}
          alt="Profile"
          className={className}
          referrerPolicy="no-referrer"
        />
      );
    }

    return <div className={fallbackClassName}>{initials}</div>;
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* ── Desktop top nav ── */}
      <header className="bg-white border-b border-[#E8E4DC] sticky top-0 z-20 hidden md:block">
        <div className="max-w-6xl mx-auto px-10 py-4 flex items-center justify-between">
          {/* Logo — no link home */}
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
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
            <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
              Golf
            </span>
          </div>

          {/* Nav links — all go to member pages */}
          <nav className="flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  pathname === l.href
                    ? "text-[#2D4A1E]"
                    : "text-[#888] hover:text-[#1A1A1A]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Avatar + logout */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2D4A1E] flex items-center justify-center text-white text-sm font-bold shrink-0 overflow-hidden">
              <Avatar
                className="w-full h-full object-cover"
                fallbackClassName="w-full h-full flex items-center justify-center text-white text-sm font-bold"
              />
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-[#888] hover:text-red-500 transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile top bar ── */}
      <header className="md:hidden bg-white border-b border-[#E8E4DC] sticky top-0 z-20">
        <div className="px-5 py-4 flex items-center justify-between">
          {/* Logo — no link */}
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
              <path d="M16 2 A14 14 0 0 0 16 30 Z" fill="#4A7C2F" />
              <path d="M16 2 A14 14 0 0 1 16 30 Z" fill="#C8E650" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-[#1A1A1A]">
              Golf
            </span>
          </div>

          {/* Avatar + logout */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2D4A1E] flex items-center justify-center text-white text-xs font-bold overflow-hidden">
              <Avatar
                className="w-full h-full object-cover"
                fallbackClassName="w-full h-full flex items-center justify-center text-white text-xs font-bold"
              />
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-full"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-[#E8E4DC] px-2 py-2 flex items-center justify-around">
        {NAV_LINKS.map((l) => {
          const isActive = pathname === l.href;
          return (
            <Link
              key={l.label}
              href={l.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-[#2D4A1E] bg-[#C8E650]/20"
                  : "text-[#aaa] hover:text-[#555]"
              }`}
            >
              {l.icon}
              <span className="text-[10px] font-semibold">{l.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
