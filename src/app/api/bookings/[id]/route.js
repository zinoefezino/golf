import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";

// ── PATCH: update booking status ──
export async function PATCH(req, { params }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    // ── Next.js 15: params is a Promise, must be awaited ──
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const allowed = ["pending", "confirmed", "cancelled"];
    if (!allowed.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 },
      );
    }

    await connectDB();

    // Only allow the owner to update their own booking
    const booking = await Booking.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { status },
      { returnDocument: "after" }, // replaces deprecated `new: true`
    );

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking }, { status: 200 });
  } catch (error) {
    console.error("PATCH booking error:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 },
    );
  }
}

// ── GET: single booking ──
export async function GET(req, { params }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    // ── Next.js 15: params is a Promise, must be awaited ──
    const { id } = await params;

    await connectDB();

    const booking = await Booking.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking }, { status: 200 });
  } catch (error) {
    console.error("GET booking error:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 },
    );
  }
}
