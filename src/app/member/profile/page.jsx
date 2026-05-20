"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MemberNav from "@/components/membernav";

const inputClass =
  "w-full bg-[#F5F2EC] border border-[#E0DDD6] rounded-xl px-4 py-3 text-base text-[#1A1A1A] placeholder:text-[#bbb] focus:outline-none focus:border-[#C8E650] focus:ring-2 focus:ring-[#C8E650]/30 transition-all duration-200";

function InputField({ label, hint, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#444] uppercase tracking-wider">
          {label}
        </label>
        {hint && <span className="text-xs text-[#aaa]">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [apiError, setApiError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [originalForm, setOriginalForm] = useState(null);
  const fileRef = useRef(null);

  // ── Populate form from session ──
  useEffect(() => {
    if (user) {
      const initial = {
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        phone: user.phone ?? "",
        bio: user.bio ?? "",
        avatar: user.avatar ?? "",
      };
      setForm(initial);
      setOriginalForm(initial);
    }
  }, [user]);

  const set = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: "" }));
    setSaved(false);
    setApiError("");
  };

  const isDirty = originalForm
    ? JSON.stringify(form) !== JSON.stringify(originalForm) || avatarPreview
    : false;

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setApiError("");

    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Failed to update profile.");
        return;
      }

      // Update session so all fields reflect immediately without re-login
      await update({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        bio: form.bio,
        avatar: form.avatar,
      });

      setOriginalForm(form);
      setAvatarPreview(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setApiError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
      set("avatar", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDiscard = () => {
    if (originalForm) setForm(originalForm);
    setAvatarPreview(null);
    setErrors({});
    setSaved(false);
    setApiError("");
  };

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  const memberYear = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <MemberNav />

      <main className="max-w-3xl mx-auto px-5 md:px-10 py-8 md:py-10 pb-24 md:pb-10 flex flex-col gap-8">
        {/* ── Page header ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-[#4A7C2F] text-sm font-semibold italic mb-1">
              Member Area
            </p>
            <h1 className="text-[#1A1A1A] text-3xl font-black leading-tight tracking-tight">
              Edit Profile
            </h1>
          </div>

          {isDirty && (
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                onClick={handleDiscard}
                className="px-5 py-2.5 rounded-full border-2 border-[#D0CCC4] text-sm font-semibold text-[#555] hover:border-[#1A1A1A] transition-all"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 rounded-full bg-[#2D4A1E] text-white text-sm font-bold hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 disabled:opacity-60 flex items-center gap-2"
              >
                {saving ? (
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
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          )}

          {saved && !isDirty && (
            <div className="flex items-center gap-2 bg-[#C8E650]/20 border border-[#C8E650] text-[#2D4A1E] text-sm font-semibold px-4 py-2 rounded-full self-start md:self-auto">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              Profile updated
            </div>
          )}
        </div>

        {/* API error */}
        {apiError && (
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
            {apiError}
          </div>
        )}

        {/* ── Avatar ── */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E8E4DC] flex flex-col gap-6">
          <h2 className="text-base font-black text-[#1A1A1A]">Profile Photo</h2>
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full bg-[#2D4A1E] flex items-center justify-center text-white text-2xl font-black overflow-hidden border-4 border-[#E8E4DC]">
                {avatarPreview || form.avatar ? (
                  <img
                    src={avatarPreview || form.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 bg-[#C8E650] text-[#1A1A1A] text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white capitalize">
                {user?.membershipType}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-[#1A1A1A]">
                {form.firstName} {form.lastName}
              </p>
              <p className="text-xs text-[#888]">Member since {memberYear}</p>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="text-xs font-semibold bg-[#F5F2EC] border border-[#E0DDD6] text-[#555] px-3 py-1.5 rounded-full hover:border-[#2D4A1E] hover:text-[#2D4A1E] transition-all"
                >
                  Upload Photo
                </button>
                {avatarPreview && (
                  <button
                    onClick={() => {
                      setAvatarPreview(null);
                      set("avatar", originalForm?.avatar ?? "");
                    }}
                    className="text-xs font-semibold text-red-400 hover:text-red-600 px-3 py-1.5 rounded-full border border-red-200 hover:border-red-400 transition-all"
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className="text-xs text-[#bbb]">JPG or PNG. Max 2MB.</p>
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* ── Personal info ── */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E8E4DC] flex flex-col gap-5">
          <h2 className="text-base font-black text-[#1A1A1A]">
            Personal Information
          </h2>
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
          <InputField
            label="Email Address"
            hint="Contact support to change email"
          >
            <input
              className={`${inputClass} opacity-60 cursor-not-allowed`}
              value={user?.email ?? ""}
              disabled
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
          <InputField label="Bio" hint="Optional">
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="Tell us a bit about yourself..."
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
            />
          </InputField>
        </div>

        {/* ── Membership (read only) ── */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E8E4DC] flex flex-col gap-5">
          <h2 className="text-base font-black text-[#1A1A1A]">Membership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Membership Type", value: user?.membershipType ?? "—" },
              { label: "Member Since", value: memberYear },
              { label: "Status", value: "Active" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#F5F2EC] rounded-2xl p-4 flex flex-col gap-1"
              >
                <span className="text-xs text-[#888] font-medium uppercase tracking-wide">
                  {item.label}
                </span>
                <span className="text-sm font-black text-[#1A1A1A] capitalize">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#aaa]">
            To upgrade or change your membership,{" "}
            <Link
              href="/contact"
              className="text-[#2D4A1E] font-semibold hover:underline"
            >
              contact us
            </Link>
            .
          </p>
        </div>

        {/* Sticky bottom save bar */}
        {isDirty && (
          <div className="sticky bottom-24 md:bottom-4 bg-white border border-[#E8E4DC] rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-lg flex items-center justify-between gap-3 md:gap-4">
            {/* Message */}
            <p className="text-xs md:text-sm text-[#888] font-medium">
              Unsaved changes
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={handleDiscard}
                className="px-4 py-2 md:py-2.5 rounded-full border border-[#D0CCC4] text-xs md:text-sm font-semibold text-[#555] hover:border-[#1A1A1A] transition-all"
              >
                Discard
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 md:py-2.5 rounded-full bg-[#2D4A1E] text-white text-xs md:text-sm font-bold hover:bg-[#C8E650] hover:text-[#1A1A1A] transition-all duration-300 disabled:opacity-60 flex items-center gap-2"
              >
                {saving ? (
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
                    Saving
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
