"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Calendar,
  ShoppingCart,
  Loader2,
} from "lucide-react";

import MemberNav from "@/components/membernav";
import {
  MEMBERSHIP_CONFIG,
  calculateTotal,
  getMaxBookingDate,
  getMinBookingDate,
} from "@/lib/pricing";

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
                <Check className="w-4 h-4" strokeWidth={3} />
              ) : (
                i + 1
              )}
            </div>

            <span
              className={`text-xs font-semibold ${
                i === current ? "text-[#1A1A1A]" : "text-[#aaa]"
              }`}
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

export default function MemberBookPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const membershipType = user?.membershipType ?? "standard";
  const config = MEMBERSHIP_CONFIG?.[membershipType] ??
    MEMBERSHIP_CONFIG?.standard ?? {
      freeCart: false,
      advanceDays: 0,
      discount: 0,
      label: "Standard",
      badge: "",
    };

  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    date: "",
    time: "",
    players: "1",
    holes: "",
    cart: config.freeCart,
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (config.freeCart) {
      setForm((f) => ({
        ...f,
        cart: true,
      }));
    }
  }, [config.freeCart]);

  const set = (field, val) => {
    setForm((f) => ({
      ...f,
      [field]: val,
    }));

    setErrors((e) => ({
      ...e,
      [field]: "",
    }));

    setApiError("");
  };

  const pricing = form.holes
    ? calculateTotal({
        holes: form.holes,
        cart: form.cart,
        membershipType,
        freeCart: config.freeCart,
      })
    : null;

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: form.date,
          time: form.time,
          players: form.players,
          holes: form.holes,
          cart: form.cart,
          notes: form.notes,
          totalAmount: pricing?.total ?? 0,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Failed to create booking.");
        return;
      }

      setSubmitted(true);
    } catch {
      setApiError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F2EC] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-sm border border-[#E8E4DC] text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#C8E650] flex items-center justify-center">
            <Check className="w-8 h-8 text-[#2D4A1E]" strokeWidth={3} />
          </div>

          <h2 className="text-2xl font-black text-[#1A1A1A]">
            Booking Confirmed!
          </h2>

          <p className="text-[#666] text-sm leading-relaxed">
            Your tee time for <strong>{form.date}</strong> at{" "}
            <strong>{form.time}</strong> has been saved to your account.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href="/member/bookings"
              className="flex-1 bg-[#2D4A1E] text-white font-bold text-sm py-3 rounded-full hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 text-center"
            >
              View My Bookings
            </Link>

            <button
              onClick={() => {
                setForm({
                  date: "",
                  time: "",
                  players: "1",
                  holes: "",
                  cart: config.freeCart,
                  notes: "",
                });

                setStep(0);
                setSubmitted(false);
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
      <MemberNav />

      <main className="max-w-3xl mx-auto px-5 md:px-10 py-8 md:py-10 pb-24 md:pb-10 flex flex-col gap-6">
        <div>
          {/* <Link
            href="/member/dashboard"
            className=" md:hidden flex items-center gap-1.5 text-sm font-semibold text-[#888] hover:text-[#2D4A1E] transition-colors group mb-4 w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Dashboard
          </Link> */}

          <p className="text-[#4A7C2F] text-sm font-semibold italic mb-1">
            Member Booking
          </p>

          <h2 className="text-[#1A1A1A] text-3xl font-black leading-tight tracking-tight">
            Book a Round
          </h2>

          <p className="text-[#888] text-sm mt-1">
            Your booking will be saved to your account and tracked in your
            history.
          </p>
        </div>

        {/* Member Banner */}
        <div className="bg-[#2D4A1E] rounded-2xl px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#C8E650] flex items-center justify-center text-[#1A1A1A] font-black text-sm overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div>
              <p className="text-white font-bold text-sm">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="text-white/55 text-xs">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="bg-[#C8E650] text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full">
              {config.label}
            </span>

            {config.discount > 0 && (
              <span className="bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full">
                {config.discount * 100}% off green fees
              </span>
            )}

            {config.freeCart && (
              <span className="bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <ShoppingCart className="w-3.5 h-3.5" />
                Free cart
              </span>
            )}

            <span className="bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Book up to {config.advanceDays}{" "}
              {config.advanceDays === 1 ? "day" : "days"} ahead
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8E4DC]">
          <StepIndicator current={step} />

          {apiError && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-4 py-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {apiError}
            </div>
          )}

          {step === 0 && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Date" error={errors.date}>
                  <input
                    className={inputClass}
                    type="date"
                    min={getMinBookingDate()}
                    max={getMaxBookingDate(membershipType)}
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
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
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

              <div
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 ${
                  config.freeCart
                    ? "bg-[#C8E650]/15 border border-[#C8E650]"
                    : "bg-[#F5F2EC]"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    Golf Cart Rental
                  </p>

                  <p className="text-xs text-[#888] mt-0.5">
                    {config.freeCart
                      ? "Included free with your Premium membership"
                      : "Add a cart — $20"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => !config.freeCart && set("cart", !form.cart)}
                  disabled={config.freeCart}
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

              <InputField label="Special Requests">
                <textarea
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Any special requirements..."
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                />
              </InputField>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <p className="text-[#888] text-sm">
                Review your booking before confirming.
              </p>

              <div className="bg-[#2D4A1E] rounded-2xl p-5 flex flex-col gap-2">
                <div className="flex justify-between text-base font-black text-white">
                  <span>Total</span>
                  <span>${pricing?.total}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div
            className={`flex mt-8 gap-3 ${
              step > 0 ? "justify-between" : "justify-end"
            }`}
          >
            {step > 0 && (
              <button
                onClick={back}
                className="px-6 py-3 rounded-full border-2 border-[#D0CCC4] text-sm font-semibold text-[#555] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all duration-200 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}

            {step < 1 ? (
              <button
                onClick={next}
                className="px-8 py-3 rounded-full bg-[#2D4A1E] text-white text-sm font-bold hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 shadow-md flex items-center gap-2"
              >
                Review Booking
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 rounded-full bg-[#C8E650] text-[#1A1A1A] text-sm font-bold hover:bg-[#2D4A1E] hover:text-white transition-all duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  <>
                    Confirm Booking
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
