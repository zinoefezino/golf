"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MemberNav from "@/components/membernav";

import {
  ArrowRight,
  Clock3,
  Users,
  ShoppingCart,
  Flag,
  AlertTriangle,
} from "lucide-react";

const FILTERS = ["All", "Confirmed", "Pending", "Cancelled"];

const STATUS_STYLES = {
  confirmed: "bg-[#C8E650]/20 text-[#2D4A1E] border border-[#C8E650]",
  pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  cancelled: "bg-red-50 text-red-500 border border-red-200",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [cancelId, setCancelId] = useState(null);

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

  const filtered =
    filter === "All"
      ? bookings
      : bookings.filter((b) => b.status === filter.toLowerCase());

  const confirmCancel = async () => {
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

  const total = bookings.length;
  const upcoming = bookings.filter((b) => b.status !== "cancelled").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <MemberNav />

      <main className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-10 pb-24 md:pb-10 flex flex-col gap-8">
        {/* Header */}
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
              <ArrowRight className="w-3 h-3 text-[#1A1A1A] group-hover:text-white" />
            </span>
          </Link>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            {
              label: "Total Bookings",
              value: total,
              color: "text-[#1A1A1A]",
            },
            {
              label: "Active / Upcoming",
              value: upcoming,
              color: "text-[#2D4A1E]",
            },
            {
              label: "Cancelled",
              value: cancelled,
              color: "text-red-500",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-4 md:p-5 border border-[#E8E4DC]"
            >
              <span className={`text-2xl md:text-3xl font-black ${s.color}`}>
                {s.value}
              </span>

              <p className="text-xs text-[#888] font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex items-stretch rounded-full border border-[#D0CCC4] bg-white shadow-sm overflow-hidden w-fit">
          {FILTERS.map((f, i) => (
            <div key={f} className="flex items-stretch">
              {i > 0 && <span className="self-stretch w-px bg-[#D0CCC4]" />}

              <button
                onClick={() => setFilter(f)}
                className={`px-4 md:px-5 py-2 text-xs md:text-sm font-semibold transition-colors duration-200 focus:outline-none
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

        {/* Bookings list */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#E8E4DC] p-5 animate-pulse h-20"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E4DC] flex flex-col items-center justify-center py-20 gap-4">
            <Flag className="w-12 h-12 text-[#2D4A1E]" />

            <p className="text-[#888] text-sm font-medium">
              No {filter.toLowerCase()} bookings found.
            </p>

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
            {filtered.map((b) => (
              <div
                key={b._id}
                className={`bg-white rounded-2xl border p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                  b.status === "cancelled"
                    ? "opacity-60 border-[#E8E4DC]"
                    : "border-[#E8E4DC]"
                }`}
              >
                {/* Left */}
                <div className="flex items-start gap-4">
                  {/* Date block */}
                  <div className="bg-[#F5F2EC] rounded-xl px-3 py-2 text-center shrink-0 min-w-13">
                    <p className="text-[#2D4A1E] text-xs font-bold uppercase leading-none">
                      {b.date?.split(" ")[0]}
                    </p>

                    <p className="text-[#1A1A1A] text-xl font-black leading-tight">
                      {b.date?.split(" ")[1]?.replace(",", "")}
                    </p>

                    <p className="text-[#888] text-[10px] leading-none">
                      {b.date?.split(" ")[2]} {b.date?.split(" ")[3]}
                    </p>
                  </div>

                  {/* Details */}
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
                </div>

                {/* Right */}
                {b.status === "confirmed" || b.status === "pending" ? (
                  <button
                    onClick={() => setCancelId(b._id)}
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
