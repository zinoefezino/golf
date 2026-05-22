"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MemberNav from "@/components/membernav";
import { MEMBERSHIP_CONFIG } from "@/lib/pricing";

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
  Crown,
  BadgeCheck,
  BadgePercent,
  Sparkles,
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
  const [activeSlide, setActiveSlide] = useState(0);

  const membershipKey =
    user?.membershipType?.toLowerCase() === "premium" ? "premium" : "standard";

  const membership = MEMBERSHIP_CONFIG[membershipKey];
  const discountPercent = Math.round(membership.discount * 100);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % 3);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const upcoming = useMemo(
    () => bookings.filter((b) => b.status !== "cancelled").slice(0, 3),
    [bookings],
  );

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
    {
      label: "Total Rounds",
      value: bookings.length,
      icon: Flag,
    },
    {
      label: "Upcoming",
      value: upcoming.length,
      icon: CalendarDays,
    },
    {
      label: "Membership",
      value: membership.label,
      icon: membershipKey === "premium" ? Crown : BadgeCheck,
    },
    {
      label: "Member Since",
      value: user?.createdAt
        ? new Date(user.createdAt).getFullYear()
        : new Date().getFullYear(),
      icon: Clock3,
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

  const SLIDES = [
    {
      icon: BadgePercent,
      eyebrow: "Green Fee Discount",
      title: `${discountPercent}% off`,
      body:
        discountPercent > 0
          ? `Your ${membership.label.toLowerCase()} plan saves you ${discountPercent}% on green fees.`
          : "Your membership includes access to tee time booking and club benefits.",
      className: "from-[#C8E650] via-[#E7F98B] to-[#F8FFD8]",
      dark: false,
    },
    {
      icon: CalendarDays,
      eyebrow: "Advance Booking",
      title: `${membership.advanceDays} days`,
      body: `Reserve tee times up to ${membership.advanceDays} days in advance with your ${membership.label.toLowerCase()} account.`,
      className: "from-[#BFE8FF] via-[#DDF4FF] to-[#F7FCFF]",
      dark: false,
    },
    {
      icon: membershipKey === "premium" ? Crown : Sparkles,
      eyebrow: membershipKey === "premium" ? "Premium Perks" : "Upgrade Ready",
      title: membershipKey === "premium" ? "Top tier" : "Go premium",
      body:
        membershipKey === "premium"
          ? "Free cart rental, monthly guest pass, priority slots, and the full member experience are active."
          : "Upgrade to Premium for 20% off, 30-day advance booking, free cart rental, and monthly guest passes.",
      className: "from-[#2D4A1E] via-[#496B35] to-[#C8E650]",
      dark: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <MemberNav />

      <main className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-10 pb-24 md:pb-10 flex flex-col gap-8">
        <div className="bg-[#2D4A1E] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden shadow-[0_24px_80px_rgba(45,74,30,0.22)]">
          <div className="absolute inset-0 premium-glow" />
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -right-4 -bottom-10 w-32 h-32 rounded-full bg-[#C8E650]/10" />

          <div className="relative z-10">
            <p className="text-[#C8E650] text-sm font-semibold italic mb-2 inline-flex items-center gap-2">
              <BadgeCheck className="w-4 h-4" />
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
                {membership.label}
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {STATS.map((s) => {
            const Icon = s.icon;

            return (
              <div
                key={s.label}
                className="bg-white rounded-2xl p-4 md:p-5 border border-[#E8E4DC] flex flex-col gap-4 shadow-[0_12px_35px_rgba(45,74,30,0.06)] hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(45,74,30,0.1)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#F5F2EC] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#2D4A1E]" />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xl md:text-2xl font-black text-[#1A1A1A] capitalize">
                    {s.value}
                  </span>

                  <span className="text-xs text-[#888] font-medium">
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl p-5 md:p-6 border border-[#E8E4DC] flex flex-col gap-5 shadow-[0_18px_60px_rgba(45,74,30,0.08)]">
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
                    className="bg-[#F5F2EC] rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:bg-[#F0ECE3] transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-black text-[#1A1A1A]">
                          {b.date}
                        </span>

                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            STATUS_STYLES[b.status] ?? STATUS_STYLES.pending
                          }`}
                        >
                          {b.status?.charAt(0).toUpperCase()}
                          {b.status?.slice(1)}
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

          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-3xl p-4 border border-[#E8E4DC] shadow-[0_18px_60px_rgba(45,74,30,0.08)] overflow-hidden">
              <div
                className={`relative min-h-61.25 overflow-hidden rounded-2xl bg-linear-to-br ${SLIDES[activeSlide].className}`}
              >
                <div className="floating-circle left-5 top-5 h-20 w-20" />
                <div className="floating-circle bottom-5 right-4 h-28 w-28 delay-2" />

                {SLIDES.map((slide, index) => {
                  const Icon = slide.icon;
                  const isActive = index === activeSlide;

                  return (
                    <div
                      key={slide.eyebrow}
                      className={`absolute inset-0 p-5 flex flex-col justify-between transition-all duration-700 ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "translate-x-8 opacity-0"
                      } ${slide.dark ? "text-white" : "text-[#1A1A1A]"}`}
                    >
                      <div>
                        <div className="w-11 h-11 rounded-2xl bg-white/55 backdrop-blur flex items-center justify-center mb-4">
                          <Icon className="w-5 h-5 text-[#2D4A1E]" />
                        </div>

                        <p className="text-[11px] font-black uppercase tracking-[0.18em] opacity-70">
                          {slide.eyebrow}
                        </p>

                        <h3 className="text-4xl font-black tracking-tight mt-2">
                          {slide.title}
                        </h3>
                      </div>

                      <p className="text-sm font-semibold leading-relaxed opacity-75 max-w-60">
                        {slide.body}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {SLIDES.map((slide, index) => (
                  <button
                    key={slide.eyebrow}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`View ${slide.eyebrow}`}
                    className={`h-2 rounded-full transition-all ${
                      activeSlide === index
                        ? "w-8 bg-[#2D4A1E]"
                        : "w-2 bg-[#D8D1C5]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 md:p-6 border border-[#E8E4DC] flex flex-col gap-4 shadow-[0_18px_60px_rgba(45,74,30,0.08)]">
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
        </div>
      </main>

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

      <style jsx>{`
        .premium-glow {
          background:
            radial-gradient(
              circle at 20% 20%,
              rgba(200, 230, 80, 0.22),
              transparent 32%
            ),
            radial-gradient(
              circle at 80% 10%,
              rgba(255, 255, 255, 0.12),
              transparent 28%
            );
          animation: glowShift 8s ease-in-out infinite alternate;
        }

        .floating-circle {
          position: absolute;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.28);
          filter: blur(1px);
          animation: floatSoft 7s ease-in-out infinite;
        }

        .delay-2 {
          animation-delay: 2s;
        }

        @keyframes glowShift {
          from {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: 0.82;
          }

          to {
            transform: scale(1.08) translate3d(18px, -10px, 0);
            opacity: 1;
          }
        }

        @keyframes floatSoft {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(12px, -16px, 0);
          }
        }
      `}</style>
    </div>
  );
}
