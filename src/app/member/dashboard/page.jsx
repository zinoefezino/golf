"use client";

import Link from "next/link";
import { useState } from "react";

// Mock data (replace with real API calls later)
const USER = {
  name: "James Davidson",
  email: "james@example.com",
  membershipType: "Premium",
  memberSince: "2022",
  avatar: "JD",
};

const UPCOMING = [
  {
    id: 1,
    date: "Sat, 24 May 2026",
    time: "08:00 AM",
    holes: "18",
    players: 2,
    cart: true,
    status: "confirmed",
  },
  {
    id: 2,
    date: "Tue, 27 May 2026",
    time: "10:30 AM",
    holes: "9",
    players: 1,
    cart: false,
    status: "pending",
  },
];

const STATS = [
  { label: "Total Rounds", value: "47" },
  { label: "Member Since", value: USER.memberSince },
  { label: "Membership", value: USER.membershipType },
  { label: "Holes Played", value: "612" },
];

const QUICK_LINKS = [
  { label: "Book a Round", href: "/booking", icon: "flag" },
  { label: "Booking History", href: "/member/bookings", icon: "list" },
  { label: "Edit Profile", href: "/member/profile", icon: "user" },
  { label: "Settings", href: "/member/settings", icon: "settings" },
];

const STATUS_STYLES = {
  confirmed: "bg-[#C8E650]/20 text-[#2D4A1E] border border-[#C8E650]",
  pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  cancelled: "bg-red-50 text-red-600 border border-red-200",
};

const Icon = ({ children, className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ClockIcon = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Icon>
);

const FlagIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M4 22V4" />
    <path d="M4 4h12l-1 4 1 4H4" />
  </Icon>
);

const UsersIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

const CartIcon = ({ className }) => (
  <Icon className={className}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L21.95 8H5.12" />
  </Icon>
);

const ListIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M8 6h13" />
    <path d="M8 12h13" />
    <path d="M8 18h13" />
    <path d="M3 6h.01" />
    <path d="M3 12h.01" />
    <path d="M3 18h.01" />
  </Icon>
);

const UserIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

const SettingsIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

const ArrowRightIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Icon>
);

const ArrowUpRightIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </Icon>
);

const WarningIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
  </Icon>
);

const QuickLinkIcon = ({ type, className }) => {
  const icons = {
    flag: <FlagIcon className={className} />,
    list: <ListIcon className={className} />,
    user: <UserIcon className={className} />,
    settings: <SettingsIcon className={className} />,
  };

  return icons[type] ?? <ArrowRightIcon className={className} />;
};

export default function DashboardPage() {
  const [cancelId, setCancelId] = useState(null);

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <header className="bg-white border-b border-[#E8E4DC] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <svg
              viewBox="0 0 32 32"
              className="h-8 w-8 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
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
            <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
              Golf
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "Dashboard", href: "/member/dashboard" },
              { label: "Bookings", href: "/member/bookings" },
              { label: "Profile", href: "/member/profile" },
              { label: "Settings", href: "/member/settings" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  l.label === "Dashboard"
                    ? "text-[#2D4A1E]"
                    : "text-[#888] hover:text-[#1A1A1A]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2D4A1E] flex items-center justify-center text-white text-sm font-bold">
              {USER.avatar}
            </div>
            <button className="hidden md:block text-xs font-semibold text-[#888] hover:text-red-500 transition-colors">
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-10 flex flex-col gap-10">
        <div className="bg-[#2D4A1E] rounded-3xl p-7 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -right-4 -bottom-10 w-32 h-32 rounded-full bg-[#C8E650]/10" />

          <div className="relative z-10">
            <p className="text-[#C8E650] text-sm font-semibold italic mb-2">
              Welcome back
            </p>
            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight mb-2">
              {USER.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-[#C8E650] text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full">
                {USER.membershipType} Member
              </span>
              <span className="text-white/50 text-xs">
                Since {USER.memberSince}
              </span>
            </div>
          </div>

          <Link
            href="/member/book"
            className="relative z-10 self-start md:self-auto inline-flex items-center gap-2 bg-[#C8E650] text-[#1A1A1A] font-bold text-sm px-6 py-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg group shrink-0"
          >
            Book a Round
            <span className="w-5 h-5 rounded-full bg-[#2D4A1E] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRightIcon className="w-3 h-3 text-white" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-5 border border-[#E8E4DC] flex flex-col gap-1"
            >
              <span className="text-2xl font-black text-[#1A1A1A]">
                {s.value}
              </span>
              <span className="text-xs text-[#888] font-medium">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-[#E8E4DC] flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-[#1A1A1A]">
                Upcoming Bookings
              </h2>
              <Link
                href="/member/bookings"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D4A1E] hover:underline"
              >
                View all
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>

            {UPCOMING.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <FlagIcon className="h-10 w-10 text-[#4A7C2F]" />
                <p className="text-[#888] text-sm">No upcoming bookings.</p>
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#2D4A1E] hover:underline"
                >
                  Book your next round
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {UPCOMING.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#F5F2EC] rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-black text-[#1A1A1A]">
                          {b.date}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_STYLES[b.status]}`}
                        >
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#888]">
                        <span className="inline-flex items-center gap-1">
                          <ClockIcon className="h-3.5 w-3.5" />
                          {b.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <FlagIcon className="h-3.5 w-3.5" />
                          {b.holes} holes
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <UsersIcon className="h-3.5 w-3.5" />
                          {b.players} {b.players === 1 ? "player" : "players"}
                        </span>
                        {b.cart && (
                          <span className="inline-flex items-center gap-1">
                            <CartIcon className="h-3.5 w-3.5" />
                            Cart
                          </span>
                        )}
                      </div>
                    </div>
                    {b.status !== "cancelled" && (
                      <button
                        onClick={() => setCancelId(b.id)}
                        className="self-start md:self-auto text-xs font-semibold text-red-400 hover:text-red-600 transition-colors border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-full"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8E4DC] flex flex-col gap-4">
            <h2 className="text-lg font-black text-[#1A1A1A]">Quick Links</h2>
            <div className="flex flex-col gap-2">
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5F2EC] transition-colors duration-200 group"
                >
                  <span className="w-9 h-9 rounded-xl bg-[#F5F2EC] group-hover:bg-[#C8E650] flex items-center justify-center transition-colors duration-200 text-[#2D4A1E]">
                    <QuickLinkIcon type={l.icon} className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-sm font-semibold text-[#333] group-hover:text-[#1A1A1A] transition-colors">
                    {l.label}
                  </span>
                  <ArrowRightIcon className="w-4 h-4 text-[#ccc] group-hover:text-[#2D4A1E] ml-auto transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {cancelId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl flex flex-col gap-5 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto">
              <WarningIcon className="w-7 h-7 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#1A1A1A] mb-1">
                Cancel Booking?
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Are you sure you want to cancel this booking? This action cannot
                be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 border-2 border-[#E0DDD6] text-[#555] font-semibold text-sm py-2.5 rounded-full hover:border-[#1A1A1A] transition-all"
              >
                Keep It
              </button>
              <button
                onClick={() => {
                  setCancelId(null);
                }}
                className="flex-1 bg-red-500 text-white font-semibold text-sm py-2.5 rounded-full hover:bg-red-600 transition-all"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
