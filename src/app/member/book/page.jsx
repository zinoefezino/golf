"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TIMES = [
  "07:00 AM",
  "07:30 AM",
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

const STEPS = ["Date & Time", "Confirm"];

const initialForm = {
  date: "",
  time: "",
  players: "1",
  holes: "",
  cart: false,
  notes: "",
};

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                i < current
                  ? "bg-[#2D4A1E] border-[#2D4A1E] text-white"
                  : i === current
                    ? "bg-[#C8E650] border-[#C8E650] text-[#1A1A1A]"
                    : "bg-white border-[#D0CCC4] text-[#aaa]"
              }`}
            >
              {i < current ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-xs font-semibold ${i === current ? "text-[#1A1A1A]" : "text-[#aaa]"}`}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-20 md:w-32 h-px mx-2 mb-5 transition-all duration-300 ${i < current ? "bg-[#2D4A1E]" : "bg-[#D0CCC4]"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function InputField({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#444] uppercase tracking-wider">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full bg-[#F5F2EC] border border-[#E0DDD6] rounded-xl px-4 py-3 text-base text-[#1A1A1A] placeholder:text-[#bbb] focus:outline-none focus:border-[#C8E650] focus:ring-2 focus:ring-[#C8E650]/30 transition-all duration-200";

const NAV_LINKS = [
  { label: "Dashboard", href: "/member/dashboard" },
  { label: "Bookings", href: "/member/bookings" },
  { label: "Profile", href: "/member/profile" },
  { label: "Settings", href: "/member/settings" },
];

export default function MemberBookPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const user = session?.user;
  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  const set = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: "" }));
    setApiError("");
  };

  const validate = () => {
    const e = {};
    if (!form.date) e.date = "Please pick a date";
    if (!form.time) e.time = "Please pick a time";
    if (!form.holes) e.holes = "Please select 9 or 18 holes";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate()) setStep(1);
  };
  const back = () => setStep(0);

  const handleSubmit = async () => {
    setLoading(true);
    setApiError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: form.date,
          time: form.time,
          players: form.players,
          holes: form.holes,
          cart: form.cart,
          notes: form.notes,
          // userId is set server-side from the session
          // no guestInfo needed — member is identified by session
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(
          data.error || "Failed to create booking. Please try again.",
        );
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setApiError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F2EC] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-sm border border-[#E8E4DC] text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#C8E650] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#2D4A1E]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-[#1A1A1A]">
            Booking Confirmed!
          </h2>
          <p className="text-[#666] text-sm leading-relaxed">
            Your tee time for <strong>{form.date}</strong> at{" "}
            <strong>{form.time}</strong> has been added to your account. A
            confirmation has been sent to <strong>{user?.email}</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
            <Link
              href="/member/bookings"
              className="flex-1 bg-[#2D4A1E] text-white font-bold text-sm py-3 rounded-full hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 text-center"
            >
              View My Bookings
            </Link>
            <button
              onClick={() => {
                setForm(initialForm);
                setStep(0);
                setSubmitted(false);
                setApiError("");
              }}
              className="flex-1 border-2 border-[#D0CCC4] text-[#555] font-semibold text-sm py-3 rounded-full hover:border-[#2D4A1E] hover:text-[#2D4A1E] transition-all duration-300"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      {/* ── Nav ── */}
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
                className="text-sm font-semibold text-[#888] hover:text-[#1A1A1A] transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2D4A1E] flex items-center justify-center text-white text-sm font-bold">
              {initials}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 md:px-10 py-10 flex flex-col gap-8">
        <div>
          <Link
            href="/member/dashboard"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#888] hover:text-[#2D4A1E] transition-colors group mb-4 w-fit"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Dashboard
          </Link>
          <p className="text-[#4A7C2F] text-sm font-semibold italic mb-1">
            Member Booking
          </p>
          <h1 className="text-[#1A1A1A] text-3xl font-black leading-tight tracking-tight">
            Book a Round
          </h1>
          <p className="text-[#888] text-sm mt-1">
            This booking will be saved to your account and tracked in your
            history.
          </p>
        </div>

        {/* Member info card */}
        <div className="bg-[#2D4A1E] rounded-2xl px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#C8E650] flex items-center justify-center text-[#1A1A1A] font-black text-sm shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-white font-bold text-sm">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-white/55 text-xs">{user?.email}</p>
            </div>
          </div>
          <span className="bg-[#C8E650] text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full shrink-0 capitalize">
            {user?.membershipType}
          </span>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8E4DC]">
          <StepIndicator current={step} />

          {/* API error */}
          {apiError && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-4 py-3 rounded-xl flex items-center gap-2">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {apiError}
            </div>
          )}

          {/* Step 0 */}
          {step === 0 && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Date" error={errors.date}>
                  <input
                    className={inputClass}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </InputField>
                <InputField label="Number of Players">
                  <select
                    className={inputClass}
                    value={form.players}
                    onChange={(e) => set("players", e.target.value)}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Player" : "Players"}
                      </option>
                    ))}
                  </select>
                </InputField>
              </div>

              <InputField label="Preferred Tee Time" error={errors.time}>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 mt-1">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set("time", t)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                        form.time === t
                          ? "bg-[#C8E650] border-[#C8E650] text-[#1A1A1A]"
                          : "bg-white border-[#E0DDD6] text-[#555] hover:border-[#C8E650]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </InputField>

              <InputField label="Holes" error={errors.holes}>
                <div className="flex gap-3">
                  {["9", "18"].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => set("holes", h)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-150 ${
                        form.holes === h
                          ? "bg-[#2D4A1E] border-[#2D4A1E] text-white"
                          : "bg-white border-[#E0DDD6] text-[#555] hover:border-[#2D4A1E]"
                      }`}
                    >
                      {h} Holes
                    </button>
                  ))}
                </div>
              </InputField>

              <div className="flex items-center justify-between bg-[#F5F2EC] rounded-xl px-4 py-3.5">
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    Golf Cart Rental
                  </p>
                  <p className="text-xs text-[#888] mt-0.5">
                    Add a cart to your booking
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => set("cart", !form.cart)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${form.cart ? "bg-[#2D4A1E]" : "bg-[#D0CCC4]"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${form.cart ? "translate-x-5" : "translate-x-0"}`}
                  />
                </button>
              </div>

              <InputField label="Special Requests (optional)">
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  placeholder="Any special requirements..."
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                />
              </InputField>
            </div>
          )}

          {/* Step 1: Confirm */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <p className="text-[#888] text-sm mb-1">
                Review your booking before confirming.
              </p>
              <div className="bg-[#F5F2EC] rounded-2xl p-4 flex flex-col gap-1 mb-2">
                <p className="text-xs font-semibold text-[#888] uppercase tracking-wide mb-2">
                  Booked By
                </p>
                <p className="text-sm font-bold text-[#1A1A1A]">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-[#888]">{user?.email}</p>
              </div>
              <div className="bg-[#F5F2EC] rounded-2xl p-5 flex flex-col gap-3">
                {[
                  { label: "Date", value: form.date },
                  { label: "Time", value: form.time },
                  {
                    label: "Players",
                    value: `${form.players} ${form.players === "1" ? "Player" : "Players"}`,
                  },
                  { label: "Holes", value: `${form.holes} Holes` },
                  { label: "Cart", value: form.cart ? "Yes" : "No" },
                  ...(form.notes
                    ? [{ label: "Notes", value: form.notes }]
                    : []),
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-4 border-b border-[#E8E4DC] last:border-0 pb-3 last:pb-0"
                  >
                    <span className="text-xs font-semibold text-[#888] uppercase tracking-wide shrink-0">
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-[#1A1A1A] text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#aaa] leading-relaxed text-center">
                This booking will be saved to your account. A confirmation email
                will be sent to {user?.email}.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div
            className={`flex mt-8 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}
          >
            {step > 0 && (
              <button
                onClick={back}
                className="px-6 py-3 rounded-full border-2 border-[#D0CCC4] text-sm font-semibold text-[#555] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all duration-200"
              >
                Back
                <ArrowLeft
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            )}
            {step < 1 ? (
              <button
                onClick={next}
                className="px-8 py-3 rounded-full bg-[#2D4A1E] text-white text-sm font-bold hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 shadow-md"
              >
                Review Booking →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 rounded-full bg-[#C8E650] text-[#1A1A1A] text-sm font-bold hover:bg-[#2D4A1E] hover:text-white transition-all duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Confirming...
                  </>
                ) : (
                  "Confirm Booking ✓"
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
