"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  AlertCircle,
  Loader2,
  CircleCheckBig,
} from "lucide-react";

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
              {i < current ? <Check size={16} strokeWidth={3} /> : i + 1}
            </div>
            <span
              className={`text-xs font-semibold ${i === current ? "text-[#1A1A1A]" : "text-[#aaa]"}`}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-20 md:w-32 h-px mx-2 mb-5 transition-all duration-300 ${
                i < current ? "bg-[#2D4A1E]" : "bg-[#D0CCC4]"
              }`}
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
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error || "Failed to create booking.");
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
      <div className="min-h-screen bg-[#F5F2EC] flex items-center justify-center px-4 text-center">
        <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-sm border border-[#E8E4DC] flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-[#C8E650] flex items-center justify-center text-[#2D4A1E]">
            <CircleCheckBig size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#1A1A1A]">
              Booking Confirmed!
            </h2>
            <p className="text-[#666] text-sm mt-3 leading-relaxed">
              Your tee time for <strong>{form.date}</strong> at{" "}
              <strong>{form.time}</strong> is set. Confirmation sent to{" "}
              <strong>{user?.email}</strong>.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Link
              href="/member/bookings"
              className="w-full bg-[#2D4A1E] text-white font-bold text-sm py-4 rounded-full hover:bg-[#1f3315] transition-all duration-300"
            >
              View My Bookings
            </Link>
            <button
              onClick={() => {
                setForm(initialForm);
                setStep(0);
                setSubmitted(false);
              }}
              className="w-full border-2 border-[#D0CCC4] text-[#555] font-semibold text-sm py-4 rounded-full hover:border-[#2D4A1E] transition-all"
            >
              Book Another Round
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <header className="bg-white border-b border-[#E8E4DC] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <Link
            href="/member/dashboard"
            className="flex items-center gap-2 group"
          >
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

      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link
          href="/member/dashboard"
          className="flex items-center gap-2 text-sm font-semibold text-[#888] hover:text-[#2D4A1E] mb-6 group w-fit"
        >
          <ChevronLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <p className="text-[#4A7C2F] text-sm font-semibold italic">
            Member Booking
          </p>
          <h1 className="text-[#1A1A1A] text-3xl font-black">Book a Round</h1>
        </div>

        <div className="bg-[#2D4A1E] rounded-2xl p-5 mb-8 flex items-center justify-between text-white shadow-lg shadow-[#2D4A1E]/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#C8E650] flex items-center justify-center text-[#1A1A1A] font-black">
              {initials}
            </div>
            <div>
              <p className="font-bold text-sm">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-white/60 text-xs">{user?.email}</p>
            </div>
          </div>
          <span className="bg-[#C8E650] text-[#1A1A1A] text-[10px] font-black uppercase px-3 py-1 rounded-full">
            {user?.membershipType || "Member"}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-[#E8E4DC]">
          <StepIndicator current={step} />

          {apiError && (
            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in zoom-in duration-200">
              <AlertCircle size={18} />
              {apiError}
            </div>
          )}

          {step === 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Date" error={errors.date}>
                  <input
                    className={inputClass}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </InputField>
                <InputField label="Players">
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
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-2">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set("time", t)}
                      className={`py-2.5 rounded-lg text-[11px] font-bold border transition-all ${
                        form.time === t
                          ? "bg-[#C8E650] border-[#C8E650] text-[#1A1A1A] scale-[1.02]"
                          : "bg-white text-[#666] hover:border-[#C8E650]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </InputField>

              <InputField label="Holes" error={errors.holes}>
                <div className="flex gap-4">
                  {["9", "18"].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => set("holes", h)}
                      className={`flex-1 py-4 rounded-xl text-sm font-black border-2 transition-all ${
                        form.holes === h
                          ? "bg-[#2D4A1E] border-[#2D4A1E] text-white"
                          : "bg-white text-[#555] hover:border-[#2D4A1E]"
                      }`}
                    >
                      {h} Holes
                    </button>
                  ))}
                </div>
              </InputField>

              <div className="flex items-center justify-between bg-[#F5F2EC] rounded-2xl p-5">
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A]">
                    Golf Cart Rental
                  </p>
                  <p className="text-xs text-[#888]">
                    Add a cart to your booking
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => set("cart", !form.cart)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${form.cart ? "bg-[#2D4A1E]" : "bg-[#D0CCC4]"}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.cart ? "left-7" : "left-1"}`}
                  />
                </button>
              </div>

              <InputField label="Special Requests">
                <textarea
                  className={`${inputClass} resize-none min-h-25`}
                  placeholder="Any requirements..."
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                />
              </InputField>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#F5F2EC] rounded-2xl p-6 space-y-4">
                <div className="border-b border-[#E0DDD6] pb-4">
                  <p className="text-[10px] font-black text-[#888] uppercase mb-1">
                    Booked For
                  </p>
                  <p className="font-bold">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-y-4">
                  {[
                    { label: "Date", val: form.date },
                    { label: "Time", val: form.time },
                    { label: "Players", val: `${form.players} Players` },
                    { label: "Holes", val: `${form.holes} Holes` },
                    { label: "Cart", val: form.cart ? "Yes" : "No" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] font-black text-[#888] uppercase">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-[#F5F2EC]">
            {step > 0 && (
              <button
                onClick={back}
                className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-[#D0CCC4] text-sm font-bold text-[#555] hover:bg-[#F5F2EC] flex items-center justify-center gap-2 transition-all"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            )}

            <button
              onClick={step === 0 ? next : handleSubmit}
              disabled={loading}
              className={`w-full ${step === 0 ? "sm:flex-1" : "sm:flex-1"} py-4 rounded-full text-sm font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/5 disabled:opacity-50 ${
                step === 0
                  ? "bg-[#2D4A1E] text-white hover:bg-[#1f3315]"
                  : "bg-[#C8E650] text-[#1A1A1A] hover:bg-[#b8d44a]"
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : step === 0 ? (
                <>
                  Review Booking <ArrowRight size={18} />
                </>
              ) : (
                <>Confirm & Pay ✓</>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
