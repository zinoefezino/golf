import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    // ── Who booked ──
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null means guest booking
    },

    // ── Guest info (only filled for guest bookings) ──
    guestInfo: {
      firstName: { type: String, default: "" },
      lastName: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
    },

    // ── Booking details ──
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    players: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
      default: 1,
    },
    holes: {
      type: String,
      enum: ["9", "18"],
      required: [true, "Please select 9 or 18 holes"],
    },
    cart: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },

    // ── Status ──
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    // ── Payment ──
    paymentRef: {
      type: String,
      default: "",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
