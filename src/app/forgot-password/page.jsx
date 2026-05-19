"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const inputClass =
  "w-full bg-[#F5F2EC] border border-[#E0DDD6] rounded-xl px-4 py-3 text-base text-[#1A1A1A] placeholder:text-[#bbb] focus:outline-none focus:border-[#C8E650] focus:ring-2 focus:ring-[#C8E650]/30 transition-all duration-200";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    // await fetch("/api/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ══ LEFT: Photo panel ══ */}
      <div className="hidden md:flex md:w-[42%]  shrink-0 sticky top-0 h-screen">
        <Image
          src="/hero.webp"
          alt="Golf course"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/20" />

        {/* Logo */}
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

        {/* Bottom text */}
        <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
          <p className="text-[#C8E650] text-sm font-semibold italic mb-3">
            Account Recovery
          </p>
          <h2 className="text-white text-4xl font-black leading-tight tracking-tight mb-4">
            We'll get you
            <br />
            back on the green.
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-8">
            Enter your email and we'll send you a secure link to reset your
            password. Check your spam folder if you don't see it.
          </p>

          {/* Steps */}
          <div className="flex flex-col gap-4">
            {[
              { step: "1", text: "Enter your account email" },
              { step: "2", text: "Check your inbox for the reset link" },
              { step: "3", text: "Set a new password and log in" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4">
                <span className="w-7 h-7 rounded-full bg-[#C8E650] text-[#1A1A1A] text-xs font-black flex items-center justify-center shrink-0">
                  {item.step}
                </span>
                <span className="text-white/70 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ RIGHT: Form panel ══ */}
      <div className="flex-1 bg-[#F5F2EC] flex flex-col overflow-y-auto">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-6 py-5 bg-white border-b border-[#E8E4DC] sticky top-0 z-20">
          <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
              <path d="M16 2 A14 14 0 0 0 16 30 Z" fill="#4A7C2F" />
              <path d="M16 2 A14 14 0 0 1 16 30 Z" fill="#C8E650" />
            </svg>
            <span className="text-lg font-bold text-[#1A1A1A]">Golf</span>
          </Link>
          <Link href="/login" className="text-sm font-semibold text-[#2D4A1E]">
            Back to Login
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-12 max-w-md mx-auto w-full">
          {/* ── Sent state ── */}
          {sent ? (
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#C8E650] flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#2D4A1E]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <div>
                <h1 className="text-[#1A1A1A] text-2xl font-black mb-2">
                  Check Your Inbox
                </h1>
                <p className="text-[#666] text-sm leading-relaxed">
                  We sent a password reset link to{" "}
                  <strong className="text-[#1A1A1A]">{email}</strong>. The link
                  expires in <strong>15 minutes</strong>.
                </p>
              </div>

              {/* Tips card */}
              <div className="w-full bg-white border border-[#E8E4DC] rounded-2xl p-5 text-left flex flex-col gap-3">
                <p className="text-xs font-semibold text-[#888] uppercase tracking-wider">
                  Didn't receive it?
                </p>
                <ul className="flex flex-col gap-2.5 text-sm text-[#555]">
                  {[
                    "Check your spam or junk folder",
                    "Make sure you entered the correct email",
                    "Wait a few minutes and try again",
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8E650] mt-1.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  setSent(false);
                  setEmail("");
                }}
                className="w-full bg-[#2D4A1E] text-white font-bold text-sm py-3.5 rounded-full hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300"
              >
                Resend Email
              </button>

              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm font-semibold text-[#555] hover:text-[#2D4A1E] transition-colors group"
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
                Back to Login
              </Link>
            </div>
          ) : (
            /* ── Form state ── */
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[#4A7C2F] text-sm font-semibold italic mb-1">
                  Account Recovery
                </p>
                <h1 className="text-[#1A1A1A] text-3xl font-black leading-tight tracking-tight mb-1">
                  Forgot Password?
                </h1>
                <p className="text-[#888] text-sm leading-relaxed">
                  No worries. Enter your email and we'll send you a reset link
                  right away.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8E4DC] flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#444] uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    className={inputClass}
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                </div>

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
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                <Link
                  href="/login"
                  className="flex items-center justify-center gap-1.5 text-sm font-semibold text-[#555] hover:text-[#2D4A1E] transition-colors group"
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
                  Back to Login
                </Link>
              </div>

              <p className="text-center text-xs text-[#aaa]">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-[#2D4A1E] font-semibold hover:underline"
                >
                  Log in
                </Link>
                {" · "}
                <Link
                  href="/sign-up"
                  className="text-[#2D4A1E] font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          )}
        </div>

        <footer className="py-6 text-center border-t border-[#E8E4DC]">
          <p className="text-[#bbb] text-xs">
            © {new Date().getFullYear()} Gol. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
