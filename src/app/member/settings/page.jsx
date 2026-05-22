"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import MemberNav from "@/components/membernav";

const inputClass =
  "w-full bg-[#F5F2EC] border border-[#E0DDD6] rounded-xl px-4 py-3 text-base text-[#1A1A1A] placeholder:text-[#bbb] focus:outline-none focus:border-[#C8E650] focus:ring-2 focus:ring-[#C8E650]/30 transition-all duration-200";

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

function Toggle({ enabled, onChange, label, sub }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#F0EDE6] last:border-0">
      <div>
        <p className="text-sm font-semibold text-[#1A1A1A]">{label}</p>
        {sub && <p className="text-xs text-[#888] mt-0.5">{sub}</p>}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0 ml-4 ${enabled ? "bg-[#2D4A1E]" : "bg-[#D0CCC4]"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${enabled ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  // ── Password ──
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwErrors, setPwErrors] = useState({});
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwApiError, setPwApiError] = useState("");

  const setPw = (field, val) => {
    setPwForm((f) => ({ ...f, [field]: val }));
    setPwErrors((e) => ({ ...e, [field]: "" }));
    setPwApiError("");
  };

  const validatePw = () => {
    const e = {};
    if (!pwForm.current) e.current = "Required";
    if (pwForm.newPw.length < 8) e.newPw = "At least 8 characters";
    if (pwForm.newPw !== pwForm.confirm) e.confirm = "Passwords do not match";
    setPwErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePwSave = async () => {
    if (!validatePw()) return;
    setPwSaving(true);
    setPwApiError("");

    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current: pwForm.current, newPw: pwForm.newPw }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPwApiError(data.error || "Failed to update password.");
        return;
      }

      setPwSaved(true);
      setPwForm({ current: "", newPw: "", confirm: "" });
      setTimeout(() => setPwSaved(false), 3000);
    } catch (err) {
      setPwApiError("Network error. Please try again.");
    } finally {
      setPwSaving(false);
    }
  };

  // ── Notifications ──
  const [notifs, setNotifs] = useState({
    bookingConfirmation: true,
    bookingReminder: true,
    cancellationAlert: true,
    promotions: false,
    newsletter: false,
  });
  const toggleNotif = (key) => setNotifs((n) => ({ ...n, [key]: !n[key] }));

  // ── Delete account ──
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await fetch("/api/user", { method: "DELETE" });
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      console.error("Delete account error:", err);
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <MemberNav />

      <main className="max-w-3xl mx-auto px-5 md:px-10 py-8 md:py-10 pb-24 md:pb-10 flex flex-col gap-8">
        {/* ── Page header ── */}
        <div>
          <p className="text-[#4A7C2F] text-sm font-semibold italic mb-1">
            Member Area
          </p>
          <h2 className="text-[#1A1A1A] text-3xl font-black leading-tight tracking-tight">
            Settings
          </h2>
        </div>

        {/* ── Change password ── */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E8E4DC] flex flex-col gap-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-base font-black text-[#1A1A1A]">
              Change Password
            </h2>
            {pwSaved && (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D4A1E] bg-[#C8E650]/20 border border-[#C8E650] px-3 py-1.5 rounded-full">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Password updated
              </div>
            )}
          </div>

          {pwApiError && (
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
              {pwApiError}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#444] uppercase tracking-wider">
                Current Password
              </label>
              <PasswordInput
                placeholder="Enter current password"
                value={pwForm.current}
                onChange={(e) => setPw("current", e.target.value)}
              />
              {pwErrors.current && (
                <p className="text-red-500 text-xs">{pwErrors.current}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#444] uppercase tracking-wider">
                New Password
              </label>
              <PasswordInput
                placeholder="Min. 8 characters"
                value={pwForm.newPw}
                onChange={(e) => setPw("newPw", e.target.value)}
              />
              {pwErrors.newPw && (
                <p className="text-red-500 text-xs">{pwErrors.newPw}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#444] uppercase tracking-wider">
                Confirm New Password
              </label>
              <PasswordInput
                placeholder="Re-enter new password"
                value={pwForm.confirm}
                onChange={(e) => setPw("confirm", e.target.value)}
              />
              {pwErrors.confirm && (
                <p className="text-red-500 text-xs">{pwErrors.confirm}</p>
              )}
            </div>
          </div>

          <button
            onClick={handlePwSave}
            disabled={pwSaving}
            className="self-start px-6 py-3 rounded-full bg-[#2D4A1E] text-white text-sm font-bold hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 disabled:opacity-60 flex items-center gap-2"
          >
            {pwSaving ? (
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
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </div>

        {/* ── Notifications ── */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E8E4DC] flex flex-col gap-2">
          <h2 className="text-base font-black text-[#1A1A1A] mb-3">
            Email Notifications
          </h2>
          <Toggle
            label="Booking Confirmation"
            sub="Get an email when a booking is confirmed"
            enabled={notifs.bookingConfirmation}
            onChange={() => toggleNotif("bookingConfirmation")}
          />
          <Toggle
            label="Booking Reminder"
            sub="Reminder 24 hours before your tee time"
            enabled={notifs.bookingReminder}
            onChange={() => toggleNotif("bookingReminder")}
          />
          <Toggle
            label="Cancellation Alert"
            sub="Get notified when a booking is cancelled"
            enabled={notifs.cancellationAlert}
            onChange={() => toggleNotif("cancellationAlert")}
          />
          <Toggle
            label="Promotions & Offers"
            sub="Member discounts and special deals"
            enabled={notifs.promotions}
            onChange={() => toggleNotif("promotions")}
          />
          <Toggle
            label="Newsletter"
            sub="Course news, events, and updates"
            enabled={notifs.newsletter}
            onChange={() => toggleNotif("newsletter")}
          />
        </div>

        {/* ── Danger zone ── */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-red-100 flex flex-col gap-4">
          <h2 className="text-base font-black text-red-500">Danger Zone</h2>
          <p className="text-sm text-[#666] leading-relaxed">
            Deleting your account is permanent. All your bookings, profile data,
            and history will be removed and cannot be recovered.
          </p>
          <button
            onClick={() => setDeleteConfirm(true)}
            className="self-start px-6 py-2.5 rounded-full border-2 border-red-200 text-red-500 text-sm font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
          >
            Delete My Account
          </button>
        </div>
      </main>

      {/* ── Delete modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl flex flex-col gap-5">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto">
              <svg
                className="w-7 h-7 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-black text-[#1A1A1A] mb-1">
                Delete Account?
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                This is permanent and cannot be undone. Type{" "}
                <strong>DELETE</strong> to confirm.
              </p>
            </div>
            <input
              className={inputClass}
              placeholder='Type "DELETE" to confirm'
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setDeleteConfirm(false);
                  setDeleteInput("");
                }}
                className="flex-1 border-2 border-[#E0DDD6] text-[#555] font-semibold text-sm py-2.5 rounded-full hover:border-[#1A1A1A] transition-all"
              >
                Cancel
              </button>
              <button
                disabled={deleteInput !== "DELETE" || deleting}
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-500 text-white font-semibold text-sm py-2.5 rounded-full hover:bg-red-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleting ? (
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
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
