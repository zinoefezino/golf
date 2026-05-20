"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MemberNav from "@/components/membernav";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Users,
  ShoppingCart,
  Flag,
  ClipboardList,
  User,
  Settings,
  AlertTriangle,
} from "lucide-react";

const STATUS_STYLES = {
  confirmed: "bg-[#C8E650]/20 text-[#2D4A1E] border border-[#C8E650]",
  pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  cancelled: "bg-red-50 text-red-500 border border-red-200",
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        if (res.ok) setBookings(data.bookings ?? []);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const upcoming = bookings.filter((b) => b.status !== "cancelled").slice(0, 3);

  const handleCancel = async () => {
    try {
      await fetch(`/api/bookings/${cancelId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });

      setBookings((prev) =>
        prev.map((b) =>
          b._id === cancelId ? { ...b, status: "cancelled" } : b,
        ),
      );
    } catch (err) {
      console.error("Cancel failed:", err);
    } finally {
      setCancelId(null);
    }
  };

  const STATS = [
    { label: "Total Rounds", value: bookings.length },
    { label: "Upcoming", value: upcoming.length },
    { label: "Membership", value: user?.membershipType ?? "—" },
    {
      label: "Member Since",
      value: user?.createdAt
        ? new Date(user.createdAt).getFullYear()
        : new Date().getFullYear(),
    },
  ];

  const QUICK_LINKS = [
    {
      label: "Book a Round",
      href: "/member/book",
      icon: Flag,
    },
    {
      label: "Booking History",
      href: "/member/bookings",
      icon: ClipboardList,
    },
    {
      label: "Edit Profile",
      href: "/member/profile",
      icon: User,
    },
    {
      label: "Settings",
      href: "/member/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <MemberNav />

      <main className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-10 pb-24 md:pb-10 flex flex-col gap-8">
        {/* Welcome banner */}
        <div className="bg-[#2D4A1E] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -right-4 -bottom-10 w-32 h-32 rounded-full bg-[#C8E650]/10" />

          <div className="relative z-10">
            <p className="text-[#C8E650] text-sm font-semibold italic mb-2">
              Welcome back
            </p>

            <h1 className="text-white text-2xl md:text-4xl font-black leading-tight tracking-tight mb-2">
              {user ? (
                `${user.firstName} ${user.lastName}`
              ) : (
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              )}
            </h1>

            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="bg-[#C8E650] text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full capitalize">
                {user?.membershipType ?? "Member"}
              </span>

              <span className="text-white/50 text-xs">{user?.email}</span>
            </div>
          </div>

          <Link
            href="/member/book"
            className="relative z-10 self-start md:self-auto inline-flex items-center gap-2 bg-[#C8E650] text-[#1A1A1A] font-bold text-sm px-6 py-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg group shrink-0"
          >
            Book a Round
            <span className="w-5 h-5 rounded-full bg-[#2D4A1E] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowRight className="w-3 h-3 text-white" />
            </span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-4 md:p-5 border border-[#E8E4DC] flex flex-col gap-1"
            >
              <span className="text-xl md:text-2xl font-black text-[#1A1A1A] capitalize">
                {s.value}
              </span>

              <span className="text-xs text-[#888] font-medium">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {/* Upcoming bookings */}
          <div className="md:col-span-2 bg-white rounded-3xl p-5 md:p-6 border border-[#E8E4DC] flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-black text-[#1A1A1A]">
                Upcoming Bookings
              </h2>

              <Link
                href="/member/bookings"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D4A1E] hover:underline"
              >
                View all
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="flex flex-col gap-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-[#F5F2EC] rounded-2xl p-4 animate-pulse h-16"
                  />
                ))}
              </div>
            ) : upcoming.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <Flag className="w-10 h-10 text-[#2D4A1E]" />

                <p className="text-[#888] text-sm">No upcoming bookings.</p>

                <Link
                  href="/member/book"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#2D4A1E] hover:underline"
                >
                  Book your next round
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {upcoming.map((b) => (
                  <div
                    key={b._id}
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

                      <div className="flex items-center gap-3 text-xs text-[#888] flex-wrap">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="w-3.5 h-3.5" />
                          {b.time}
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <Flag className="w-3.5 h-3.5" />
                          {b.holes} holes
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {b.players} {b.players === 1 ? "player" : "players"}
                        </span>

                        {b.cart && (
                          <span className="inline-flex items-center gap-1">
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Cart
                          </span>
                        )}
                      </div>
                    </div>

                    {b.status !== "cancelled" && (
                      <button
                        onClick={() => setCancelId(b._id)}
                        className="self-start md:self-auto text-xs font-semibold text-red-400 hover:text-red-600 transition-colors border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-full shrink-0"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="bg-white rounded-3xl p-5 md:p-6 border border-[#E8E4DC] flex flex-col gap-4">
            <h2 className="text-base md:text-lg font-black text-[#1A1A1A]">
              Quick Links
            </h2>

            <div className="flex flex-col gap-1">
              {QUICK_LINKS.map((l) => {
                const Icon = l.icon;

                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5F2EC] transition-colors duration-200 group"
                  >
                    <span className="w-9 h-9 rounded-xl bg-[#F5F2EC] group-hover:bg-[#C8E650] flex items-center justify-center transition-colors duration-200 shrink-0">
                      <Icon className="w-4 h-4 text-[#2D4A1E]" />
                    </span>

                    <span className="text-sm font-semibold text-[#333] group-hover:text-[#1A1A1A] transition-colors">
                      {l.label}
                    </span>

                    <ArrowRight className="w-4 h-4 text-[#ccc] group-hover:text-[#2D4A1E] ml-auto transition-colors shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Cancel modal */}
      {cancelId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl flex flex-col gap-5 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>

            <div>
              <h3 className="text-lg font-black text-[#1A1A1A] mb-1">
                Cancel Booking?
              </h3>

              <p className="text-[#666] text-sm leading-relaxed">
                Are you sure you want to cancel this booking? This cannot be
                undone.
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
                onClick={handleCancel}
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
