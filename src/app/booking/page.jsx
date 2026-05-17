"use client";

import { useState } from "react";
import Link from "next/link";

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
    <div className="flex items-center justify-center gap-0 mb-10">
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
              className={`w-16 md:w-24 h-px mx-2 mb-5 transition-all duration-300 ${
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
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full bg-white border border-[#E0DDD6] rounded-xl px-4 py-3 text-[#1A1A1A] placeholder:text-[#bbb] focus:outline-none focus:border-[#C8E650] focus:ring-2 focus:ring-[#C8E650]/30 transition-all duration-200 text-base";

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    // await fetch("/api/bookings", { method: "POST", body: JSON.stringify(form) });
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC] flex flex-col">
      {/* ── Top bar ── */}
      <header className="w-full px-6 md:px-16 py-5 flex items-center justify-center border-b border-[#E8E4DC] bg-white/70 backdrop-blur-sm sticky top-0 z-20">
        {/* Logo — click to go home */}
        <Link href="/" className="group flex items-center gap-2">
          <svg
            viewBox="0 0 32 32"
            className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
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
          <svg
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </Link>
      </header>

      {/* ── Page body ── */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-12 md:py-20">
        {/* Success screen */}
        {submitted ? (
          <div className="w-full max-w-lg bg-white rounded-3xl p-10 shadow-sm border border-[#E8E4DC] text-center flex flex-col items-center gap-5">
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
              Thanks, <strong>{form.firstName}</strong>! Your tee time request
              for <strong>{form.date}</strong> at <strong>{form.time}</strong>{" "}
              has been received. We'll send a confirmation to{" "}
              <strong>{form.email}</strong> shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full">
              <button
                onClick={() => {
                  setForm(initialForm);
                  setStep(0);
                  setSubmitted(false);
                }}
                className="flex-1 bg-[#2D4A1E] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300"
              >
                Book Another
              </button>
              <Link
                href="/"
                className="flex-1 text-center border-2 border-[#D0CCC4] text-[#555] font-semibold text-sm px-6 py-3 rounded-full hover:border-[#2D4A1E] hover:text-[#2D4A1E] transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Page heading */}
            <div className="text-center mb-10 max-w-lg">
              <p className="text-[#4A7C2F] text-sm font-semibold italic mb-2">
                Tee Time
              </p>
              <h1 className="text-[#1A1A1A] text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3">
                Book Your Round
              </h1>
              <p className="text-[#888] text-sm leading-relaxed">
                Reserve your spot on the course. No account needed just fill in
                your details below.
              </p>
            </div>

            {/* Form card */}
            <div className="w-full max-w-2xl bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-[#E8E4DC]">
              <StepIndicator current={step} />

              {/* ── Step 0: Personal Details ── */}
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

              {/* ── Step 1: Date, Time & Preferences ── */}
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

                  {/* Time slot grid */}
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

                  {/* Holes */}
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

                  {/* Cart rental toggle */}
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
                      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                        form.cart ? "bg-[#2D4A1E]" : "bg-[#D0CCC4]"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                          form.cart ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Notes */}
                  <InputField label="Special Requests (optional)">
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={3}
                      placeholder="Any special requirements or notes..."
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                    />
                  </InputField>
                </div>
              )}

              {/* ── Step 2: Confirm ── */}
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
                    By confirming, you agree to our booking policy. A
                    confirmation email will be sent to {form.email}.
                  </p>
                </div>
              )}

              {/* ── Navigation ── */}
              <div
                className={`flex mt-8 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}
              >
                {step > 0 && (
                  <button
                    onClick={back}
                    className="px-6 py-3 rounded-full border-2 border-[#D0CCC4] text-sm font-semibold text-[#555] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all duration-200"
                  >
                    ← Back
                  </button>
                )}
                {step < 2 ? (
                  <button
                    onClick={next}
                    className="px-8 py-3 rounded-full bg-[#2D4A1E] text-white text-sm font-bold hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 shadow-md"
                  >
                    Continue →
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
          </>
        )}
      </main>

      {/* ── Minimal footer ── */}
      <footer className="py-6 text-center border-t border-[#E8E4DC]">
        <p className="text-[#bbb] text-xs">
          © {new Date().getFullYear()} Golf. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
