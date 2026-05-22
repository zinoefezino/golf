import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";
import { calculateTotal } from "@/lib/pricing";

// ── Validation schema ──
const BookingSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  players: z.coerce.number().min(1).max(4),
  holes: z.enum(["9", "18"]),
  cart: z.boolean().default(false),
  notes: z.string().optional().default(""),

  // Guest only fields (optional for members)
  guestInfo: z
    .object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email(),
      phone: z.string().min(1),
    })
    .optional(),
});

// ── GET: fetch bookings for logged-in member ──
export async function GET(req) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    await connectDB();

    const bookings = await Booking.find({ userId: session.user.id }).sort({
      createdAt: -1,
    }); // newest first

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("GET bookings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}

// ── POST: create a new booking (member or guest) ──
export async function POST(req) {
  try {
    const body = await req.json();

    // ── Validate ──
    const parsed = BookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 },
      );
    }

    await connectDB();

    // Check if logged in — member booking
    const session = await auth();

    // ── Calculate price server-side (source of truth) ──
    const membershipType = session?.user?.membershipType ?? "public";
    const pricing = calculateTotal({
      holes: parsed.data.holes,
      cart: parsed.data.cart,
      membershipType,
    });

    const booking = await Booking.create({
      ...parsed.data,
      userId: session?.user?.id ?? null,
      guestInfo: session ? {} : parsed.data.guestInfo,
      status: "pending",
      totalAmount: pricing.total,
    });

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}
