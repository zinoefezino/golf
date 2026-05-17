"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const inputClass =
  "w-full bg-[#F5F2EC] border border-[#E0DDD6] rounded-xl px-4 py-3 text-base text-[#1A1A1A] placeholder:text-[#bbb] focus:outline-none focus:border-[#C8E650] focus:ring-2 focus:ring-[#C8E650]/30 transition-all duration-200";

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

function PasswordInput({ placeholder, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        className={inputClass}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#555] transition-colors"
      >
        {show ? (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}

function StrengthBar({ password }) {
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) =>
    r.test(password),
  ).length;
  const colors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-[#4A7C2F]",
  ];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  if (!password) return null;
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex gap-1 flex-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : "bg-[#E0DDD6]"}`}
          />
        ))}
      </div>
      <span className="text-xs text-[#888]">{labels[score - 1] ?? ""}</span>
    </div>
  );
}

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
  membership: "public",
  agree: false,
};

export default function SignUpPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (form.password.length < 8) e.password = "At least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!form.agree) e.agree = "You must agree to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    // await fetch("/api/register", { method: "POST", body: JSON.stringify(form) });
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  };

  if (done) {
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
            Account Created!
          </h2>
          <p className="text-[#666] text-sm leading-relaxed">
            Welcome, <strong>{form.firstName}</strong>! Your account is ready.
            Log in to start booking your rounds.
          </p>
          <Link
            href="/auth/login"
            className="w-full bg-[#2D4A1E] text-white font-bold text-sm py-3.5 rounded-full hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 text-center"
          >
            Go to Login
          </Link>
          <Link
            href="/"
            className="text-sm text-[#888] hover:text-[#2D4A1E] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── LEFT: Photo panel ── */}
      <div className="hidden md:flex md:w-[45%] relative shrink-0">
        {/* Photo */}
        <Image
          src="/img2.avif"
          alt="Golf course at dawn"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/20" />

        {/* Logo top-left */}
        <div className="absolute top-8 left-8 z-10">
          <Link href="/" className="group flex items-center gap-2">
            <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
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

        {/* Text at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
          <p className="text-[#C8E650] text-sm font-semibold italic mb-3">
            Join the Club
          </p>
          <h2 className="text-white text-4xl font-black leading-tight tracking-tight mb-4">
            Your best round
            <br />
            starts here.
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Create your account and get access to priority bookings, member
            discounts, and exclusive course events.
          </p>
          {/* Member badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              "Priority Booking",
              "Member Discounts",
              "Event Access",
              "Booking History",
            ].map((b) => (
              <span
                key={b}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Form panel ── */}
      <div className="flex-1 bg-[#F5F2EC] flex flex-col overflow-y-auto">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-6 py-5 bg-white border-b border-[#E8E4DC]">
          <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
              <path d="M16 2 A14 14 0 0 0 16 30 Z" fill="#4A7C2F" />
              <path d="M16 2 A14 14 0 0 1 16 30 Z" fill="#C8E650" />
            </svg>
            <span className="text-lg font-bold text-[#1A1A1A]">Golf</span>
          </Link>
          <Link
            href="/auth/login"
            className="text-sm font-semibold text-[#2D4A1E]"
          >
            Log in
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-10 max-w-lg mx-auto w-full">
          {/* Heading */}
          <div className="mb-8">
            <p className="text-[#4A7C2F] text-sm font-semibold italic mb-1">
              Get Started
            </p>
            <h1 className="text-[#1A1A1A] text-3xl font-black leading-tight tracking-tight mb-1">
              Create Your Account
            </h1>
            <p className="text-[#888] text-sm">
              Already a member?{" "}
              <Link
                href="/auth/login"
                className="text-[#2D4A1E] font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
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

            {/* Membership */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#444] uppercase tracking-wider">
                Membership Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "public", label: "Guest", sub: "Pay per round" },
                  { id: "member", label: "Member", sub: "Priority booking" },
                  { id: "premium", label: "Premium", sub: "All access" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => set("membership", m.id)}
                    className={`flex flex-col items-center gap-0.5 py-3 px-2 rounded-xl border-2 text-center transition-all duration-150 ${
                      form.membership === m.id
                        ? "bg-[#2D4A1E] border-[#2D4A1E] text-white"
                        : "bg-white border-[#E0DDD6] text-[#555] hover:border-[#2D4A1E]"
                    }`}
                  >
                    <span className="text-sm font-bold">{m.label}</span>
                    <span
                      className={`text-xs ${form.membership === m.id ? "text-white/65" : "text-[#aaa]"}`}
                    >
                      {m.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <InputField label="Password" error={errors.password}>
              <PasswordInput
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
              />
              <StrengthBar password={form.password} />
            </InputField>

            <InputField label="Confirm Password" error={errors.confirm}>
              <PasswordInput
                placeholder="Re-enter your password"
                value={form.confirm}
                onChange={(e) => set("confirm", e.target.value)}
              />
            </InputField>

            {/* Terms */}
            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => set("agree", !form.agree)}
                  className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                    form.agree
                      ? "bg-[#2D4A1E] border-[#2D4A1E]"
                      : "bg-white border-[#D0CCC4] group-hover:border-[#2D4A1E]"
                  }`}
                >
                  {form.agree && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-[#666] leading-relaxed">
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="text-[#2D4A1E] font-semibold hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-[#2D4A1E] font-semibold hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agree && (
                <p className="text-red-500 text-xs ml-8">{errors.agree}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#2D4A1E] text-white font-bold text-sm py-3.5 rounded-full hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
