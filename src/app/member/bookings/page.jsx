"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data (replace with API call later)
const ALL_BOOKINGS = [
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
  {
    id: 3,
    date: "Sun, 11 May 2026",
    time: "07:30 AM",
    holes: "18",
    players: 4,
    cart: true,
    status: "confirmed",
  },
  {
    id: 4,
    date: "Sat, 03 May 2026",
    time: "09:00 AM",
    holes: "9",
    players: 2,
    cart: false,
    status: "confirmed",
  },
  {
    id: 5,
    date: "Wed, 23 Apr 2026",
    time: "01:00 PM",
    holes: "18",
    players: 1,
    cart: false,
    status: "cancelled",
  },
  {
    id: 6,
    date: "Sat, 12 Apr 2026",
    time: "08:30 AM",
    holes: "18",
    players: 3,
    cart: true,
    status: "confirmed",
  },
  {
    id: 7,
    date: "Mon, 31 Mar 2026",
    time: "11:00 AM",
    holes: "9",
    players: 2,
    cart: false,
    status: "confirmed",
  },
  {
    id: 8,
    date: "Sat, 15 Mar 2026",
    time: "07:00 AM",
    holes: "18",
    players: 4,
    cart: true,
    status: "cancelled",
  },
];

const FILTERS = ["All", "Confirmed", "Pending", "Cancelled"];

const STATUS_STYLES = {
  confirmed: "bg-[#C8E650]/20 text-[#2D4A1E] border border-[#C8E650]",
  pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  cancelled: "bg-red-50 text-red-500 border border-red-200",
};

const NAV_LINKS = [
  { label: "Dashboard", href: "/member/dashboard" },
  { label: "Bookings", href: "/member/bookings" },
  { label: "Profile", href: "/member/profile" },
  { label: "Settings", href: "/member/settings" },
];

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

const ArrowRightIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Icon>
);

export default function BookingsPage() {
  const [filter, setFilter] = useState("All");
  const [cancelId, setCancelId] = useState(null);
  const [bookings, setBookings] = useState(ALL_BOOKINGS);

  const filtered =
    filter === "All"
      ? bookings
      : bookings.filter((b) => b.status === filter.toLowerCase());

  const confirmCancel = () => {
    setBookings((prev) =>
      prev.map((b) => (b.id === cancelId ? { ...b, status: "cancelled" } : b)),
    );
    setCancelId(null);
  };

  const upcoming = bookings.filter((b) => b.status !== "cancelled").length;
  const total = bookings.length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;

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
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  l.label === "Bookings"
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
              JD
            </div>
            <button className="hidden md:block text-xs font-semibold text-[#888] hover:text-red-500 transition-colors">
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-10 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-[#4A7C2F] text-sm font-semibold italic mb-1">
              Member Area
            </p>
            <h1 className="text-[#1A1A1A] text-3xl font-black leading-tight tracking-tight">
              Booking History
            </h1>
          </div>
          <Link
            href="/member/book"
            className="self-start inline-flex items-center gap-2 bg-[#2D4A1E] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 shadow-md group"
          >
            Book a Round
            <span className="w-5 h-5 rounded-full bg-[#C8E650] group-hover:bg-[#2D4A1E] flex items-center justify-center transition-all duration-300">
              <svg
                className="w-3 h-3 text-[#1A1A1A] group-hover:text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Bookings", value: total, color: "text-[#1A1A1A]" },
            {
              label: "Active / Upcoming",
              value: upcoming,
              color: "text-[#2D4A1E]",
            },
            { label: "Cancelled", value: cancelled, color: "text-red-500" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-5 border border-[#E8E4DC]"
            >
              <span className={`text-3xl font-black ${s.color}`}>
                {s.value}
              </span>
              <p className="text-xs text-[#888] font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-stretch rounded-full border border-[#D0CCC4] bg-white shadow-sm overflow-hidden w-fit">
          {FILTERS.map((f, i) => (
            <div key={f} className="flex items-stretch">
              {i > 0 && <span className="self-stretch w-px bg-[#D0CCC4]" />}
              <button
                onClick={() => setFilter(f)}
                className={`px-5 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none
                  ${i === 0 ? "rounded-l-full" : ""}
                  ${i === FILTERS.length - 1 ? "rounded-r-full" : ""}
                  ${
                    filter === f
                      ? "bg-[#C8E650] text-[#1A1A1A]"
                      : "text-[#888] hover:text-[#1A1A1A] hover:bg-[#F0EDE6]"
                  }`}
              >
                {f}
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E4DC] flex flex-col items-center justify-center py-20 gap-4">
            <FlagIcon className="h-12 w-12 text-[#4A7C2F]" />
            <p className="text-[#888] text-sm font-medium">
              No {filter.toLowerCase()} bookings found.
            </p>
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
            {filtered.map((b) => (
              <div
                key={b.id}
                className={`bg-white rounded-2xl border p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-opacity duration-200 ${
                  b.status === "cancelled" ? "opacity-60" : "border-[#E8E4DC]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#F5F2EC] rounded-xl px-3 py-2 text-center shrink-0 min-w-14">
                    <p className="text-[#2D4A1E] text-xs font-bold uppercase leading-none">
                      {b.date.split(" ")[0]}
                    </p>
                    <p className="text-[#1A1A1A] text-xl font-black leading-tight">
                      {b.date.split(" ")[1].replace(",", "")}
                    </p>
                    <p className="text-[#888] text-xs leading-none">
                      {b.date.split(" ")[2]} {b.date.split(" ")[3]}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
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
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#777]">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-3.5 w-3.5" />
                        {b.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <FlagIcon className="h-3.5 w-3.5" />
                        {b.holes} holes
                      </span>
                      <span className="flex items-center gap-1">
                        <UsersIcon className="h-3.5 w-3.5" />
                        {b.players} {b.players === 1 ? "player" : "players"}
                      </span>
                      {b.cart && (
                        <span className="flex items-center gap-1">
                          <CartIcon className="h-3.5 w-3.5" />
                          Cart included
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {b.status === "confirmed" || b.status === "pending" ? (
                  <button
                    onClick={() => setCancelId(b.id)}
                    className="self-start md:self-auto text-xs font-semibold text-red-400 hover:text-red-600 transition-colors border border-red-200 hover:border-red-400 px-4 py-2 rounded-full shrink-0"
                  >
                    Cancel
                  </button>
                ) : (
                  <span className="self-start md:self-auto text-xs text-[#bbb] font-medium px-4 py-2 border border-[#E8E4DC] rounded-full shrink-0">
                    Cancelled
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {cancelId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl flex flex-col gap-5 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto">
              <svg
                className="w-7 h-7 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-black text-[#1A1A1A] mb-1">
                Cancel Booking?
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Are you sure? This action cannot be undone.
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
                onClick={confirmCancel}
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
