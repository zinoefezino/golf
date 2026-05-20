"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  Users,
  MapPin,
  Circle,
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

const inputClass =
  "w-full bg-[#F5F2EC] border border-[#E0DDD6] rounded-xl px-4 py-3 text-base text-[#1A1A1A] placeholder:text-[#bbb] focus:outline-none focus:border-[#C8E650] focus:ring-2 focus:ring-[#C8E650]/30 transition-all duration-200";

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
          ...form,
          guestInfo: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setSubmitted(true);
    } catch (err) {
      setApiError(err.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F2EC] flex items-center justify-center px-4 text-center">
        <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-sm border border-[#E8E4DC] flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#C8E650] flex items-center justify-center text-[#2D4A1E]">
            <Check size={32} strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-black text-[#1A1A1A]">
            Booking Received!
          </h2>
          <p className="text-[#666] text-sm leading-relaxed">
            Thanks, <strong>{form.firstName}</strong>! Your tee time for{" "}
            <strong>{form.date}</strong> at <strong>{form.time}</strong> is
            confirmed. Details have been sent to <strong>{form.email}</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
            <button
              onClick={() => {
                setForm(initialForm);
                setStep(0);
                setSubmitted(false);
              }}
              className="flex-1 bg-[#2D4A1E] text-white font-bold text-sm py-3 rounded-full hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all"
            >
              Book Another
            </button>
            <Link
              href="/"
              className="flex-1 border-2 border-[#D0CCC4] text-[#555] font-semibold text-sm py-3 rounded-full hover:border-[#2D4A1E] hover:text-[#2D4A1E] transition-all"
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
      {/* Photo panel */}
      <div className="hidden md:flex md:w-[42%] shrink-0 sticky top-0 h-screen">
        <Image
          src="/img14.avif"
          alt="Golf course"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

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
          <h2 className="text-white text-4xl font-black leading-tight mb-6">
            Reserve your spot on the course.
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Calendar size={16} className="text-[#C8E650]" />
              </div>
              <p className="text-sm font-medium">Real-time availability</p>
            </div>

            <div className="flex items-center gap-3 text-white/80">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Users size={16} className="text-[#C8E650]" />
              </div>
              <p className="text-sm font-medium">Book for up to 4 players</p>
            </div>

            <div className="flex items-center gap-3 text-white/80">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <MapPin size={16} className="text-[#C8E650]" />
              </div>
              <p className="text-sm font-medium">Premium course access</p>
            </div>
          </div>

          <p className="text-white/50 text-xs max-w-xs border-t border-white/10 pt-4">
            Quick booking, no membership required. All equipment rentals
            available on-site.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 bg-[#F5F2EC] flex flex-col overflow-y-auto">
        <div className="flex-1 px-6 md:px-12 py-10 max-w-2xl mx-auto w-full">
          <div className="mb-8">
            <p className="text-[#4A7C2F] text-sm font-semibold italic mb-1">
              Book a Round
            </p>
            <h1 className="text-[#1A1A1A] text-3xl font-black tracking-tight">
              Book Your Tee Time
            </h1>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8E4DC]">
            <StepIndicator current={step} />

            {apiError && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl flex items-center gap-2">
                {apiError}
              </div>
            )}

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
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => set("time", t)}
                        className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all ${form.time === t ? "bg-[#C8E650] border-[#C8E650] text-[#1A1A1A]" : "bg-white border-[#E0DDD6] text-[#555] hover:border-[#C8E650]"}`}
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
                        className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${form.holes === h ? "bg-[#2D4A1E] border-[#2D4A1E] text-white" : "bg-white border-[#E0DDD6] text-[#555] hover:border-[#2D4A1E]"}`}
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
                    <p className="text-xs text-[#888]">
                      Add a cart to your booking
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => set("cart", !form.cart)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${form.cart ? "bg-[#2D4A1E]" : "bg-[#D0CCC4]"}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.cart ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-4">
                <div className="bg-[#F5F2EC] rounded-2xl p-5 flex flex-col gap-3">
                  {[
                    {
                      label: "Name",
                      value: `${form.firstName} ${form.lastName}`,
                    },
                    { label: "Date", value: `${form.date} at ${form.time}` },
                    {
                      label: "Players",
                      value: `${form.players} Players (${form.holes} Holes)`,
                    },
                    { label: "Cart", value: form.cart ? "Yes" : "No" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between border-b border-[#E8E4DC] last:border-0 pb-3 last:pb-0"
                    >
                      <span className="text-xs font-semibold text-[#888] uppercase">
                        {label}
                      </span>
                      <span className="text-sm font-semibold text-[#1A1A1A]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              className={`flex mt-8 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}
            >
              {step > 0 && (
                <button
                  onClick={back}
                  className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#D0CCC4] text-sm font-semibold text-[#555] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all"
                >
                  <ArrowLeft size={18} /> Back
                </button>
              )}
              {step < 2 ? (
                <button
                  onClick={next}
                  className="group flex items-center gap-2 px-8 py-3 rounded-full bg-[#2D4A1E] text-white text-sm font-bold hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all shadow-md"
                >
                  Continue{" "}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-3 rounded-full bg-[#C8E650] text-[#1A1A1A] text-sm font-bold hover:bg-[#2D4A1E] hover:text-white transition-all shadow-md disabled:opacity-60"
                >
                  {loading ? "Processing..." : "Confirm Booking ✓"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
