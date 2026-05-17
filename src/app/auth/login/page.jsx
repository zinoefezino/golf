"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const inputClass =
  "w-full bg-[#F5F2EC] border border-[#E0DDD6] rounded-xl px-4 py-3 text-base text-[#1A1A1A] placeholder:text-[#bbb] focus:outline-none focus:border-[#C8E650] focus:ring-2 focus:ring-[#C8E650]/30 transition-all duration-200";

function PasswordInput({ value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        className={inputClass}
        type={show ? "text" : "password"}
        placeholder="Enter your password"
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

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const set = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: "" }));
    setAuthError("");
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setAuthError("");
    // const res = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    // if (res?.error) setAuthError("Invalid email or password.");
    // else router.push("/member");
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── LEFT: Photo panel ── */}
      <div className="hidden md:flex md:w-[45%] relative shrink-0">
        <Image
          src="/img11.avif"
          alt="Golf course fairway"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/25" />

        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
          <Link href="/" className="flex items-center gap-2 group">
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

        {/* Bottom text */}
        <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
          <p className="text-[#C8E650] text-sm font-semibold italic mb-3">
            Welcome Back
          </p>
          <h2 className="text-white text-4xl font-black leading-tight tracking-tight mb-4">
            Good to see you
            <br />
            on the green.
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Log in to manage your tee times, view booking history, and enjoy all
            your member benefits.
          </p>

          {/* Testimonial */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
            <p className="text-white/80 text-sm leading-relaxed italic">
              "Pine Ridge is the best club I've ever played at. The course is
              immaculate and the staff are world-class."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-9 h-9 rounded-full bg-[#C8E650] flex items-center justify-center text-[#1A1A1A] font-bold text-sm">
                JD
              </div>
              <div>
                <p className="text-white text-xs font-bold">James D.</p>
                <p className="text-white/50 text-xs">
                  Premium Member since 2019
                </p>
              </div>
            </div>
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
            href="/auth/signup"
            className="text-sm font-semibold text-[#2D4A1E]"
          >
            Sign up
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-10 max-w-md mx-auto w-full">
          {/* Heading */}
          <div className="mb-8">
            <p className="text-[#4A7C2F] text-sm font-semibold italic mb-1">
              Members
            </p>
            <h1 className="text-[#1A1A1A] text-3xl font-black leading-tight tracking-tight mb-1">
              Welcome Back
            </h1>
            <p className="text-[#888] text-sm">
              No account?{" "}
              <Link
                href="/auth/signup"
                className="text-[#2D4A1E] font-semibold hover:underline"
              >
                Sign up free
              </Link>
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5">
            {/* Auth error */}
            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-4 py-3 rounded-xl flex items-center gap-2">
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
                {authError}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#444] uppercase tracking-wider">
                Email Address
              </label>
              <input
                className={inputClass}
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#444] uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#2D4A1E] font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => set("remember", !form.remember)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  form.remember
                    ? "bg-[#2D4A1E] border-[#2D4A1E]"
                    : "bg-white border-[#D0CCC4] group-hover:border-[#2D4A1E]"
                }`}
              >
                {form.remember && (
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
              <span className="text-sm text-[#555]">Remember me</span>
            </label>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#2D4A1E] text-white font-bold text-sm py-3.5 rounded-full hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E0DDD6]" />
              <span className="text-xs text-[#bbb] font-medium">or</span>
              <div className="flex-1 h-px bg-[#E0DDD6]" />
            </div>

            {/* Guest option */}
            <Link
              href="/booking"
              className="w-full text-center border-2 border-[#E0DDD6] bg-white text-[#555] font-semibold text-sm py-3 rounded-full hover:border-[#2D4A1E] hover:text-[#2D4A1E] transition-all duration-200"
            >
              Book as Guest Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
