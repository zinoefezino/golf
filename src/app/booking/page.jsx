"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

const STEPS = ["Details", "Date & Time", "Confirm"];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
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
              className={`w-14 md:w-20 h-px mx-2 mb-5 transition-all duration-300 ${i < current ? "bg-[#2D4A1E]" : "bg-[#D0CCC4]"}`}
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

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const set = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = "Required";
      if (!form.lastName.trim()) e.lastName = "Required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
        e.email = "Valid email required";
      if (!form.phone.trim()) e.phone = "Required";
    }
    if (step === 1) {
      if (!form.date) e.date = "Please pick a date";
      if (!form.time) e.time = "Please pick a time";
      if (!form.holes) e.holes = "Please select 9 or 18 holes";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate()) setStep((s) => s + 1);
  };
  const back = () => setStep((s) => s - 1);

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
          guestInfo: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
          },
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
            Booking Received!
          </h2>
          <p className="text-[#666] text-sm leading-relaxed">
            Thanks, <strong>{form.firstName}</strong>! Your tee time for{" "}
            <strong>{form.date}</strong> at <strong>{form.time}</strong> has
            been received. A confirmation will be sent to{" "}
            <strong>{form.email}</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
            <button
              onClick={() => {
                setForm(initialForm);
                setStep(0);
                setSubmitted(false);
              }}
              className="flex-1 bg-[#2D4A1E] text-white font-bold text-sm py-3 rounded-full hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300"
            >
              Book Another
            </button>
            <Link
              href="/"
              className="flex-1 text-center border-2 border-[#D0CCC4] text-[#555] font-semibold text-sm py-3 rounded-full hover:border-[#2D4A1E] hover:text-[#2D4A1E] transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── LEFT: Photo panel ── */}
      <div className="hidden md:flex md:w-[42%]  shrink-0 sticky top-0 h-screen">
        <Image
          src="/img14.avif"
          alt="Golf course"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/20" />

        <div className="absolute top-8 left-8 z-10">
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
            <span className="text-white font-bold text-xl tracking-tight">
              Golf
            </span>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
          <p className="text-[#C8E650] text-sm font-semibold italic mb-3">
            Tee Time
          </p>
          <h2 className="text-white text-4xl font-black leading-tight tracking-tight mb-4">
            Reserve your spot
            <br />
            on the course.
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-8">
            No membership needed. Book in minutes and we'll send your
            confirmation straight to your inbox.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { icon: "🕗", text: "Tee times from 7:00 AM daily" },
              { icon: "⛳", text: "9 or 18 holes available" },
              { icon: "👥", text: "Up to 4 players per booking" },
              { icon: "🛒", text: "Golf cart rental available" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-base leading-none">{item.icon}</span>
                <span className="text-white/70 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Form panel ── */}
      <div className="flex-1 bg-[#F5F2EC] flex flex-col overflow-y-auto">
        <div className="md:hidden flex items-center justify-between px-6 py-5 bg-white border-b border-[#E8E4DC] sticky top-0 z-20">
          <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
              <path d="M16 2 A14 14 0 0 0 16 30 Z" fill="#4A7C2F" />
              <path d="M16 2 A14 14 0 0 1 16 30 Z" fill="#C8E650" />
            </svg>
            <span className="text-lg font-bold text-[#1A1A1A]">Golf</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#555] hover:text-[#2D4A1E] transition-colors group"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Home
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-start px-6 md:px-12 py-10 max-w-2xl mx-auto w-full">
          <div className="mb-8">
            <p className="text-[#4A7C2F] text-sm font-semibold italic mb-1">
              Book a Round
            </p>
            <h1 className="text-[#1A1A1A] text-3xl font-black leading-tight tracking-tight mb-1">
              Book Your Tee Time
            </h1>
            <p className="text-[#888] text-sm">
              Fill in your details below. Takes less than 2 minutes.
            </p>
          </div>

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
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField label="First Name" error={errors.firstName}>
                    <input
                      className={inputClass}
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                    />
                  </InputField>
                  <InputField label="Last Name" error={errors.lastName}>
                    <input
                      className={inputClass}
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                    />
                  </InputField>
                </div>
                <InputField label="Email Address" error={errors.email}>
                  <input
                    className={inputClass}
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </InputField>
                <InputField label="Phone Number" error={errors.phone}>
                  <input
                    className={inputClass}
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </InputField>
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
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

            {/* Step 2 */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <p className="text-[#888] text-sm mb-1">
                  Review your details before confirming.
                </p>
                <div className="bg-[#F5F2EC] rounded-2xl p-5 flex flex-col gap-3">
                  {[
                    {
                      label: "Name",
                      value: `${form.firstName} ${form.lastName}`,
                    },
                    { label: "Email", value: form.email },
                    { label: "Phone", value: form.phone },
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
                  By confirming, you agree to our booking policy. A confirmation
                  email will be sent to {form.email}.
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
                  className="px-6 items-center py-3 rounded-full border-2 border-[#D0CCC4] text-sm font-semibold text-[#555] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all duration-200"
                >
                  Back
                  <ArrowLeft
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              )}
              {step < 2 ? (
                <button
                  onClick={next}
                  className="group flex items-center gap-2 px-8 py-3 rounded-full bg-[#2D4A1E] text-white text-sm font-bold hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 shadow-md"
                >
                  Continue
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
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
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking ✓"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <footer className="py-6 text-center border-t border-[#E8E4DC]">
          <p className="text-[#bbb] text-xs">
            © {new Date().getFullYear()} Golf. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
