// ── Central membership configuration ──
// Used across dashboard, booking form, and API

export const MEMBERSHIP_CONFIG = {
  standard: {
    label: "Standard",
    discount: 0.1,
    advanceDays: 14,
    freeCart: false,
    color: "#4A7C2F",
    badge: "bg-[#4A7C2F]/15 text-[#2D4A1E]",
    perks: [
      { label: "Book tee times", included: true },
      { label: "Basic booking history", included: true },
      { label: "Priority tee time slots", included: true },
      { label: "10% green fee discount", included: true },
      { label: "Book 14 days in advance", included: true },
      { label: "Member-only events", included: true },
      { label: "20% green fee discount", included: false },
      { label: "Book 30 days in advance", included: false },
      { label: "Free cart rental", included: false },
      { label: "Monthly guest pass", included: false },
    ],
  },

  premium: {
    label: "Premium",
    discount: 0.2,
    advanceDays: 30,
    freeCart: true,
    color: "#C8E650",
    badge: "bg-[#C8E650] text-[#1A1A1A]",
    perks: [
      { label: "Book tee times", included: true },
      { label: "Basic booking history", included: true },
      { label: "Priority tee time slots", included: true },
      { label: "10% green fee discount", included: true },
      { label: "Book 14 days in advance", included: true },
      { label: "Member-only events", included: true },
      { label: "20% green fee discount", included: true },
      { label: "Book 30 days in advance", included: true },
      { label: "Free cart rental", included: true },
      { label: "Monthly guest pass", included: true },
    ],
  },
};

// ── Green fee base prices ──
export const GREEN_FEES = {
  9: 35, // $35 base for 9 holes
  18: 65, // $65 base for 18 holes
};

export const CART_FEE = 20; // $20 cart rental

// ── Calculate total booking price ──
export function calculateTotal({ holes, cart, membershipType, freeCart }) {
  const config =
    MEMBERSHIP_CONFIG[membershipType] ?? MEMBERSHIP_CONFIG.standard;

  const greenFee = GREEN_FEES[holes] ?? 0;
  const discountRate = Number.isFinite(config?.discount) ? config.discount : 0;
  const discount = greenFee * discountRate;

  const cartFee = cart ? (freeCart || config.freeCart ? 0 : CART_FEE) : 0;
  const total = greenFee - discount + cartFee;

  return {
    greenFee,
    discount,
    discountPercent: config.discount * 100,
    cartFee,
    total,
  };
}

// ── Get max bookable date based on membership ──
export function getMaxBookingDate(membershipType) {
  // Default to standard if membershipType is missing/unknown.
  const config =
    MEMBERSHIP_CONFIG[membershipType] ?? MEMBERSHIP_CONFIG.standard;
  const date = new Date();

  // Ensure advanceDays exists even if config is malformed.
  const advanceDays = Number.isFinite(config?.advanceDays)
    ? config.advanceDays
    : MEMBERSHIP_CONFIG.standard.advanceDays;

  date.setDate(date.getDate() + advanceDays);
  return date.toISOString().split("T")[0];
}

// ── Get min bookable date (always today) ──
export function getMinBookingDate() {
  return new Date().toISOString().split("T")[0];
}
